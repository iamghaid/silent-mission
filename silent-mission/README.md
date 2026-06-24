# Silent Mission 🤫 | المهمة الصامتة

A 2-team, 3-player silent-communication workshop game. Runs entirely from the host's laptop — players join with their phones by scanning a QR code, no app or account needed.

لعبة تواصل صامت لفريقين، 3 لاعبين بكل فريق. تعمل بالكامل من لابتوب المضيف — اللاعبون ينضمون بجوالاتهم بمسح رمز QR، بدون تطبيق أو حساب.

---

## 🇬🇧 How to run it (Host laptop)

### 1. Install requirements (one time only)
You need **Node.js** (version 18 or newer) installed on the laptop. Download it from [nodejs.org](https://nodejs.org) if it isn't installed yet.

### 2. Install dependencies
Open a terminal in this folder and run:
```
npm install
```

### 3. Start the game server
```
npm start
```
You'll see something like:
```
Silent Mission server running:
  Host screen:    http://192.168.1.23:3000/host.html
  Spectator/TV:   http://192.168.1.23:3000/index.html
  Local:          http://localhost:3000/host.html
```

### 4. Connect everyone to the same Wi-Fi
The laptop and all players' phones **must be on the same local Wi-Fi network**. No internet connection is required once everyone is on the same network.

### 5. Open the screens
- **On the laptop / projector**: open the `Host screen` URL — this is your control panel.
- **Players**: each player scans the QR code shown for their role (you'll show these from the Host screen) — this opens their personal role page on their phone.
- **Optional**: if you have a second screen or projector, open the `Spectator/TV` URL there for a clean public scoreboard view.

### 6. Run a round
1. On the host screen, choose the **mission type** (Technical 💻 or Physical 🏫) and **difficulty**.
2. Click **"Show join codes"** — 3 QR codes appear (one per role) for the current team.
3. Each of the 3 players scans their QR and waits.
4. Once all 3 have joined, click **"Start briefing"** — the mission is now revealed to the host and to the Knower player only.
5. Click **"Start mission & timer"** to begin the countdown.
6. Judge the result yourself (especially for physical missions) and click **Success ✅** or **Fail ❌**.
7. Click **"Next team"** — repeat steps 2–6 for the second team with the *same* mission settings, for a fair comparison.
8. After both teams finish, the **final result** screen shows the winner automatically (success beats fail; ties are broken by time).
9. Click **"New round"** to reset and play again.

### Language
Every screen has a 🌐 language toggle button in the top corner — switches instantly between Arabic and English, including layout direction (RTL/LTR).

---

## 🇸🇦 طريقة التشغيل (لابتوب المضيف)

### 1. تثبيت المتطلبات (مرة واحدة فقط)
تحتاج **Node.js** (إصدار 18 أو أحدث) على اللابتوب. نزّله من [nodejs.org](https://nodejs.org) إذا لم يكن مثبتًا.

### 2. تثبيت الحزم
افتح Terminal داخل هذا المجلد واكتب:
```
npm install
```

### 3. تشغيل السيرفر
```
npm start
```
بيظهر لك شي شبيه بهذا:
```
Silent Mission server running:
  Host screen:    http://192.168.1.23:3000/host.html
  Spectator/TV:   http://192.168.1.23:3000/index.html
  Local:          http://localhost:3000/host.html
```

### 4. وصّل الكل بنفس الواي فاي
اللابتوب وكل جوالات اللاعبين **يجب تكون على نفس شبكة الواي فاي المحلية**. لا حاجة لإنترنت بعد ما يصير الكل على نفس الشبكة.

### 5. افتح الشاشات
- **على اللابتوب/البروجكتر**: افتح رابط `Host screen` — هذي لوحة التحكم.
- **اللاعبون**: كل لاعب يسكن رمز QR الخاص بدوره (يظهر من شاشة المضيف) — تفتح له صفحة دوره الشخصية على جواله.
- **اختياري**: لو فيه شاشة ثانية أو بروجكتر، افتح رابط `Spectator/TV` فيها لعرض عام نظيف للنقاط.

### 6. تشغيل الجولة
1. من شاشة المضيف، اختر **نوع المهمة** (تقنية 💻 أو فيزيائية 🏫) و**مستوى الصعوبة**.
2. اضغط **"عرض رموز الانضمام"** — تظهر 3 رموز QR (واحد لكل دور) للفريق الحالي.
3. كل واحد من اللاعبين الثلاثة يسكن رمزه وينتظر.
4. بعد ما يدخل الثلاثة، اضغط **"بدء التحضير"** — تنكشف المهمة للمضيف ولـ"العارف" فقط.
5. اضغط **"بدء المهمة والتايمر"** لبدء العد التنازلي.
6. احكم على النتيجة بنفسك (خصوصًا بالمهمات الفيزيائية) واضغط **نجح ✅** أو **فشل ❌**.
7. اضغط **"الفريق التالي"** — كرر الخطوات 2-6 للفريق الثاني بنفس إعدادات المهمة، لمقارنة عادلة.
8. بعد انتهاء الفريقين، تظهر شاشة **النتيجة النهائية** وتحدد الفائز تلقائيًا (النجاح يفوز على الفشل؛ والوقت يفصل في حالة التعادل).
9. اضغط **"جولة جديدة"** لإعادة التشغيل.

### اللغة
كل شاشة فيها زر 🌐 لتبديل اللغة بالأعلى — يبدّل فورًا بين العربي والإنجليزي، وحتى اتجاه الصفحة (RTL/LTR).

---

## The three roles | الأدوار الثلاثة

| Role | Can see | Can hear | Can talk |
|---|---|---|---|
| **Knower** (العارف) | ✅ | ✅ | ❌ |
| **Intermediary** (الوسيط) | ✅ | ❌ | ✅ |
| **Performer** (المنفّذ) | ❌ | ✅ | ✅ |

Only the **Knower** ever sees the mission. The Intermediary watches the Knower's signals and speaks to the Performer, who hears and acts but cannot see the mission or any written clue.

العارف وحده يرى المهمة. الوسيط يشاهد إشارات العارف ويتكلم مع المنفّذ، والمنفّذ يسمع وينفّذ بدون أن يرى المهمة أو أي دليل مكتوب.

---

## Project structure | بنية المشروع

```
silent-mission/
├── server/
│   ├── index.js       # Express + Socket.IO server, game state, timer logic
│   └── missions.js    # Bilingual mission bank (technical + physical, 3 difficulties)
├── public/
│   ├── host.html      # Host control panel
│   ├── play.html       # Player role screen (opened via QR code)
│   ├── index.html      # Spectator / projector screen
│   ├── style.css        # Shared design system
│   └── i18n.js           # Arabic/English dictionary + language toggle
├── package.json
└── README.md
```

## Adding more missions | إضافة مهمات جديدة

Open `server/missions.js` and add a new object to the `MISSIONS` array, following the same shape as the existing ones (bilingual `title`, `briefing`, `successCondition`, a `type`, `difficulty`, and `timeLimitSec`). No restart logic needed beyond restarting the server.

افتح `server/missions.js` وأضف عنصر جديد لمصفوفة `MISSIONS` بنفس شكل العناصر الموجودة (بحقول ثنائية اللغة). يكفي إعادة تشغيل السيرفر بعد الإضافة.
