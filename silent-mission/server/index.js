const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const QRCode = require('qrcode');
const os = require('os');
const path = require('path');
const { pickMission } = require('./missions');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, '..', 'public')));

// ---------------------------------------------------------------------------
// Game state (single in-memory room — one workshop session at a time)
// ---------------------------------------------------------------------------

const ROLES = ['knower', 'intermediary', 'performer'];

function freshTeamSlots() {
  return { knower: null, intermediary: null, performer: null };
}

function initialState() {
  return {
    phase: 'setup', // setup -> lobby -> briefing -> playing -> team_done -> final_result
    teams: {
      team_a: { id: 'team_a', name: { ar: 'الفريق الأول', en: 'Team One' }, color: '#FF6B5B', slots: freshTeamSlots(), result: null, timeUsedSec: null },
      team_b: { id: 'team_b', name: { ar: 'الفريق الثاني', en: 'Team Two' }, color: '#3DDC97', slots: freshTeamSlots(), result: null, timeUsedSec: null }
    },
    activeTeamId: 'team_a',
    missionType: null, // 'technical' | 'physical'
    difficulty: null, // 'easy' | 'medium' | 'hard'
    mission: null, // full mission object (host + knower only)
    timer: { running: false, remainingSec: 0, totalSec: 0 },
    winnerTeamId: null
  };
}

let state = initialState();
let timerInterval = null;

function publicState() {
  // Strip mission secret details for broadcast to player/spectator views.
  const { mission, ...rest } = state;
  const safeMission = mission ? {
    id: mission.id,
    type: mission.type,
    difficulty: mission.difficulty,
    timeLimitSec: mission.timeLimitSec,
    needsBoard: !!mission.needsBoard
  } : null;
  return { ...rest, mission: safeMission };
}

function hostState() {
  // Host sees everything, including the mission.
  return state;
}

function knowerState() {
  return state.mission;
}

function broadcast() {
  io.to('spectators').emit('state', publicState());
  io.to('host').emit('state', hostState());
  // Knower(s) on each team get the full mission if one is set
  for (const teamId of Object.keys(state.teams)) {
    const team = state.teams[teamId];
    if (team.slots.knower) {
      io.to(team.slots.knower).emit('mission', state.mission);
    }
  }
}

function clearTimer() {
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
}

function startTimer(seconds) {
  clearTimer();
  state.timer = { running: true, remainingSec: seconds, totalSec: seconds };
  timerInterval = setInterval(() => {
    state.timer.remainingSec -= 1;
    if (state.timer.remainingSec <= 0) {
      state.timer.remainingSec = 0;
      state.timer.running = false;
      clearTimer();
    }
    broadcast();
  }, 1000);
}

function pauseTimer() {
  state.timer.running = false;
  clearTimer();
  broadcast();
}

function resumeTimer() {
  if (state.timer.remainingSec > 0 && !timerInterval) {
    state.timer.running = true;
    timerInterval = setInterval(() => {
      state.timer.remainingSec -= 1;
      if (state.timer.remainingSec <= 0) {
        state.timer.remainingSec = 0;
        state.timer.running = false;
        clearTimer();
      }
      broadcast();
    }, 1000);
  }
}

function getLocalIp() {
  const ifaces = os.networkInterfaces();
  for (const name of Object.keys(ifaces)) {
    for (const iface of ifaces[name]) {
      if (iface.family === 'IPv4' && !iface.internal) {
        return iface.address;
      }
    }
  }
  return 'localhost';
}

// ---------------------------------------------------------------------------
// REST endpoints
// ---------------------------------------------------------------------------

app.get('/api/join-info', async (req, res) => {
  const ip = getLocalIp();
  const base = `http://${ip}:${PORT}`;
  const teams = {};
  for (const teamId of Object.keys(state.teams)) {
    teams[teamId] = {};
    for (const role of ROLES) {
      const url = `${base}/play.html?team=${teamId}&role=${role}`;
      teams[teamId][role] = {
        url,
        qr: await QRCode.toDataURL(url, { margin: 1, width: 240 })
      };
    }
  }
  res.json({ base, teams });
});

// ---------------------------------------------------------------------------
// Socket.IO realtime
// ---------------------------------------------------------------------------

io.on('connection', (socket) => {
  socket.on('register', ({ as, teamId, role }) => {
    if (as === 'host') {
      socket.join('host');
      socket.emit('state', hostState());
    } else if (as === 'spectator') {
      socket.join('spectators');
      socket.emit('state', publicState());
    } else if (as === 'player' && teamId && role && state.teams[teamId]) {
      socket.data.teamId = teamId;
      socket.data.role = role;
      state.teams[teamId].slots[role] = socket.id;
      socket.join(`player_${teamId}_${role}`);
      socket.emit('state', publicState());
      if (role === 'knower' && state.mission) {
        socket.emit('mission', state.mission);
      }
      broadcast();
    }
  });

  // ---- Host actions ----
  socket.on('host:setMissionConfig', ({ missionType, difficulty }) => {
    state.missionType = missionType;
    state.difficulty = difficulty;
    broadcast();
  });

  socket.on('host:startBriefing', () => {
    if (!state.missionType || !state.difficulty) return;
    const mission = pickMission(state.missionType, state.difficulty);
    if (!mission) return;
    state.mission = mission;
    state.phase = 'briefing';
    broadcast();
  });

  socket.on('host:startMission', () => {
    if (!state.mission) return;
    state.phase = 'playing';
    startTimer(state.mission.timeLimitSec);
    broadcast();
  });

  socket.on('host:pauseTimer', () => {
    pauseTimer();
  });

  socket.on('host:resumeTimer', () => {
    resumeTimer();
  });

  socket.on('host:resolveTeam', ({ result }) => {
    // result: 'success' | 'fail'
    const team = state.teams[state.activeTeamId];
    if (!team) return;
    clearTimer();
    team.result = result;
    team.timeUsedSec = state.mission ? (state.mission.timeLimitSec - state.timer.remainingSec) : null;
    state.timer.running = false;
    state.phase = 'team_done';
    broadcast();
  });

  socket.on('host:nextTeam', () => {
    // Move to the second team with the same mission config, reset mission pick (same difficulty/type, can be new random mission or same - we re-pick for freshness but same params)
    const order = ['team_a', 'team_b'];
    const idx = order.indexOf(state.activeTeamId);
    if (idx === 0) {
      state.activeTeamId = order[1];
      state.mission = null;
      state.phase = 'lobby';
      state.timer = { running: false, remainingSec: 0, totalSec: 0 };
      broadcast();
    } else {
      computeWinner();
      state.phase = 'final_result';
      broadcast();
    }
  });

  socket.on('host:declareWinner', ({ teamId }) => {
    state.winnerTeamId = teamId;
    state.phase = 'final_result';
    broadcast();
  });

  socket.on('host:resetGame', () => {
    clearTimer();
    state = initialState();
    broadcast();
  });

  socket.on('host:setTeamName', ({ teamId, lang, name }) => {
    if (state.teams[teamId]) {
      state.teams[teamId].name[lang] = name;
      broadcast();
    }
  });

  socket.on('disconnect', () => {
    if (socket.data && socket.data.teamId && socket.data.role) {
      const team = state.teams[socket.data.teamId];
      if (team && team.slots[socket.data.role] === socket.id) {
        team.slots[socket.data.role] = null;
        broadcast();
      }
    }
  });
});

function computeWinner() {
  const a = state.teams.team_a;
  const b = state.teams.team_b;
  if (a.result === 'success' && b.result !== 'success') {
    state.winnerTeamId = 'team_a';
  } else if (b.result === 'success' && a.result !== 'success') {
    state.winnerTeamId = 'team_b';
  } else if (a.result === b.result) {
    // tie on outcome -> faster time wins (lower timeUsedSec wins for success;
    // for double-fail, the one who used MORE time survived longer = "won")
    if (a.result === 'success') {
      state.winnerTeamId = (a.timeUsedSec <= b.timeUsedSec) ? 'team_a' : 'team_b';
    } else {
      state.winnerTeamId = (a.timeUsedSec >= b.timeUsedSec) ? 'team_a' : 'team_b';
    }
  } else {
    state.winnerTeamId = null;
  }
}

server.listen(PORT, '0.0.0.0', () => {
  const ip = getLocalIp();
  console.log(`Silent Mission server running:`);
  console.log(`  Host screen:    http://${ip}:${PORT}/host.html`);
  console.log(`  Spectator/TV:   http://${ip}:${PORT}/index.html`);
  console.log(`  Local:          http://localhost:${PORT}/host.html`);
});
