// Mission bank — bilingual (ar/en). Each mission is shown ONLY to the Knower + Host.
// type: 'technical' | 'physical'
// difficulty: 'easy' | 'medium' | 'hard'

const MISSIONS = [
  // ---------- TECHNICAL ----------
  {
    id: 'tech_easy_1',
    type: 'technical',
    difficulty: 'easy',
    timeLimitSec: 360,
    title: { ar: 'بناء الشكل', en: 'Build the Shape' },
    briefing: {
      ar: 'على شاشة المنفّذ شبكة 4×4 فاضية. المطلوب تلوين 4 خلايا لتشكيل حرف "L": العمود الأيسر كامل (4 خلايا) + الخلية اليمنى السفلية.',
      en: 'The performer\'s screen has an empty 4×4 grid. Color 4 cells to form the letter "L": the full left column (4 cells) plus the bottom-right cell.'
    },
    successCondition: {
      ar: 'الشكل الناتج مطابق لحرف L المطلوب.',
      en: 'The resulting shape matches the required letter L.'
    },
    hint: {
      ar: 'ابدأ بالزاوية السفلية، وابني للأعلى أولاً.',
      en: 'Start from the bottom corner and build upward first.'
    }
  },
  {
    id: 'tech_medium_1',
    type: 'technical',
    difficulty: 'medium',
    timeLimitSec: 300,
    title: { ar: 'الرمز السري', en: 'The Secret Code' },
    briefing: {
      ar: 'هناك رمز من 4 أرقام (مثال: 7-3-9-1) يجب على المنفّذ إدخاله بالترتيب الصحيح في الشاشة. الأرقام لا تظهر إلا للعارف.',
      en: 'There is a 4-digit code (e.g. 7-3-9-1) the performer must enter in the correct order on screen. The digits are visible only to the Knower.'
    },
    successCondition: {
      ar: 'الرمز المُدخل مطابق تمامًا للرمز السري بالترتيب.',
      en: 'The entered code matches the secret code exactly in order.'
    },
    hint: {
      ar: 'رقم واحد كل مرة، وتأكد من التسلسل قبل المتابعة.',
      en: 'One digit at a time, and confirm the sequence before moving on.'
    }
  },
  {
    id: 'tech_hard_1',
    type: 'technical',
    difficulty: 'hard',
    timeLimitSec: 240,
    title: { ar: 'المسار المعقّد', en: 'The Complex Path' },
    briefing: {
      ar: 'شبكة 5×5، يجب على المنفّذ الضغط على مسار محدد من 7 خلايا متصلة (يبدأ من الزاوية العلوية اليسرى) بدون الضغط على أي خلية خاطئة.',
      en: 'A 5×5 grid. The performer must tap a specific path of 7 connected cells (starting from the top-left corner) without tapping any wrong cell.'
    },
    successCondition: {
      ar: 'كل الخلايا الصحيحة مُفعّلة بالترتيب وبدون أخطاء.',
      en: 'All correct cells are activated in order with no mistakes.'
    },
    hint: {
      ar: 'المسار يتحرك فقط لأعلى/أسفل أو يمين/شمال، لا قطر.',
      en: 'The path only moves up/down or left/right, never diagonally.'
    }
  },

  // ---------- PHYSICAL ----------
  {
    id: 'phys_easy_1',
    type: 'physical',
    difficulty: 'easy',
    timeLimitSec: 420,
    title: { ar: 'رسالة الطاولة', en: 'The Table Message' },
    briefing: {
      ar: 'اذهبوا إلى طاولة محددة (يحددها المضيف)، وضعوا فوقها أي جهاز أو غرض على شكل خط مستقيم باتجاه الباب.',
      en: 'Go to a specific table (set by the host). Place any device or object on top of it in a straight line pointing toward the door.'
    },
    successCondition: {
      ar: 'الفريق يقف عند الطاولة الصحيحة والغرض موجّه بشكل صحيح.',
      en: 'The team is at the correct table and the object is correctly oriented.'
    },
    hint: {
      ar: 'استخدم اللوحة لرسم سهم اتجاه بسيط.',
      en: 'Use the board to draw a simple direction arrow.'
    },
    needsBoard: true
  },
  {
    id: 'phys_medium_1',
    type: 'physical',
    difficulty: 'medium',
    timeLimitSec: 360,
    title: { ar: 'تشكيل الحرف T', en: 'Form the Letter T' },
    briefing: {
      ar: 'اذهبوا إلى طاولتين متجاورتين (يحددهما المضيف)، وقوموا بتدوير إحداهما بحيث تتشكل الطاولتان معًا على شكل حرف T، ثم انتظروا عند منطقة الاستراحة.',
      en: 'Go to two adjacent tables (set by the host) and rotate one of them so the two tables together form the letter T, then wait at the rest area.'
    },
    successCondition: {
      ar: 'الطاولتان مرتّبتان على شكل T والفريق واقف عند منطقة الاستراحة.',
      en: 'The two tables are arranged in a T shape and the team is standing at the rest area.'
    },
    hint: {
      ar: 'رسم شكل T على اللوحة يوضح اتجاه الطاولة الثانية بسرعة.',
      en: 'Drawing a T on the board quickly shows the direction of the second table.'
    },
    needsBoard: true
  },
  {
    id: 'phys_hard_1',
    type: 'physical',
    difficulty: 'hard',
    timeLimitSec: 300,
    title: { ar: 'سلسلة المحطات', en: 'The Station Chain' },
    briefing: {
      ar: 'الفريق يجب أن يزور 3 طاولات بترتيب محدد (مثال: طاولة 5، ثم طاولة 2، ثم طاولة 7)، وعند كل طاولة يرسم المنفّذ دائرة بالماركر على اللوحة (إن وُجدت قريبًا)، وفي الطاولة الأخيرة يقف الفريق بشكل دائرة متماسكة.',
      en: 'The team must visit 3 tables in a specific order (e.g. table 5, then table 2, then table 7). At each table, the performer draws a circle with the marker on the nearby board, and at the last table the team stands in a tight circle.'
    },
    successCondition: {
      ar: 'الترتيب الصحيح للطاولات الثلاث، مع تنفيذ كل خطوة.',
      en: 'The correct order of all three tables, with every step executed.'
    },
    hint: {
      ar: 'الترتيب هو الجزء الأهم — خطوة واحدة بالخطأ تُفسد المهمة.',
      en: 'The order is the most important part — one wrong step ruins the mission.'
    },
    needsBoard: true
  }
];

function getMissionsByType(type) {
  return MISSIONS.filter(m => m.type === type);
}

function getMission(id) {
  return MISSIONS.find(m => m.id === id);
}

function pickMission(type, difficulty) {
  const pool = MISSIONS.filter(m => m.type === type && m.difficulty === difficulty);
  if (pool.length === 0) return null;
  return pool[Math.floor(Math.random() * pool.length)];
}

module.exports = { MISSIONS, getMissionsByType, getMission, pickMission };
