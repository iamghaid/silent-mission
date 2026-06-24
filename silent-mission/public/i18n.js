// Shared i18n dictionary + language toggle for all Silent Mission pages.
// Usage: include this script, call applyLanguage() on load, and call
// t('key') anywhere to get the active-language string.

const I18N = {
  ar: {
    app_name: 'المهمة الصامتة',
    lang_toggle: 'English',
    dir: 'rtl',

    // Roles
    role_knower: 'العارف',
    role_intermediary: 'الوسيط',
    role_performer: 'المنفّذ',
    role_knower_desc: 'يعرف المهمة وحده. يشوف ويسمع، لكن لا يتكلم.',
    role_intermediary_desc: 'يشوف العارف ويتكلم مع المنفّذ، لكن لا يسمع.',
    role_performer_desc: 'يسمع الوسيط ويتكلم وينفّذ المهمة، لكن لا يشوف.',

    can_see: 'يشوف',
    can_hear: 'يسمع',
    can_talk: 'يتكلم',
    cannot_see: 'لا يشوف',
    cannot_hear: 'لا يسمع',
    cannot_talk: 'لا يتكلم',

    // Join / landing
    join_title: 'انضم إلى المهمة',
    join_subtitle: 'اسكن رمز QR الخاص بدورك',
    waiting_for_host: 'بانتظار المضيف لبدء الجولة...',
    you_are: 'أنت',
    on_team: 'في',
    waiting_for_mission: 'بانتظار المهمة...',
    mission_starting_soon: 'المهمة تبدأ قريبًا',

    // Mission / play
    mission_briefing: 'بدأ التحضير',
    mission_in_progress: 'المهمة جارية',
    time_left: 'الوقت المتبقي',
    your_role: 'دورك',
    secret_mission_for_knower_only: 'هذه المهمة سرية — تظهر فقط للعارف',
    mission_title: 'عنوان المهمة',
    mission_brief: 'التفاصيل',
    success_condition: 'شرط النجاح',
    follow_silently: 'تذكّر: التزم بقواعد التواصل المسموحة لدورك فقط!',
    cannot_see_mission: 'لا تستطيع رؤية تفاصيل المهمة — استمع لزميلك جيدًا',
    cannot_hear_instructions: 'لا تستطيع السماع — راقب الإشارات جيدًا',

    // Host
    host_title: 'لوحة تحكم المضيف',
    setup_phase: 'إعداد الجولة',
    choose_mission_type: 'اختر نوع المهمة',
    mission_type_technical: 'مهمة تقنية 💻',
    mission_type_physical: 'مهمة فيزيائية 🏫',
    choose_difficulty: 'اختر الصعوبة',
    difficulty_easy: 'سهل',
    difficulty_medium: 'متوسط',
    difficulty_hard: 'صعب',
    current_team: 'الفريق الحالي',
    team_one: 'الفريق الأول',
    team_two: 'الفريق الثاني',
    show_join_codes: 'عرض رموز الانضمام',
    players_joined: 'اللاعبون المنضمون',
    start_briefing: 'بدء التحضير (عرض المهمة)',
    start_mission_timer: 'بدء المهمة والتايمر',
    pause_timer: 'إيقاف مؤقت',
    resume_timer: 'استكمال',
    mark_success: 'نجح ✅',
    mark_fail: 'فشل ❌',
    next_team: 'الفريق التالي',
    show_final_result: 'عرض النتيجة النهائية',
    play_again: 'جولة جديدة',
    mission_secret_panel: 'لوحة المهمة (للمضيف فقط)',
    host_knows_mission_note: 'بصفتك المضيف، أنت تعرف المهمة لإدارة الوقت والحكم على المهمات الفيزيائية.',
    not_joined_yet: 'لم ينضم بعد',
    waiting_room: 'غرفة الانتظار',
    all_three_joined: 'انضم الثلاثة! جاهز للبدء',
    needs_board_note: '🖊️ هذه المهمة تحتاج اللوحة الصغيرة والماركر',

    // Results
    final_result_title: 'النتيجة النهائية',
    winner_is: 'الفريق الفائز',
    result_success: 'نجح',
    result_fail: 'فشل',
    time_used: 'الوقت المستخدم',
    tie_broken_by_time: 'تم الفصل بالوقت',
    congratulations: 'تهانينا!',

    // Misc
    seconds_short: 'ث',
    minutes_short: 'د',
    back: 'رجوع',
    copy_link: 'نسخ الرابط',
    copied: 'تم النسخ!',
    scan_to_join: 'اسكن للانضمام'
  },

  en: {
    app_name: 'Silent Mission',
    lang_toggle: 'العربية',
    dir: 'ltr',

    role_knower: 'Knower',
    role_intermediary: 'Intermediary',
    role_performer: 'Performer',
    role_knower_desc: 'The only one who knows the mission. Can see and hear, but cannot talk.',
    role_intermediary_desc: 'Watches the Knower and talks to the Performer, but cannot hear.',
    role_performer_desc: 'Hears the Intermediary, can talk, and carries out the mission, but cannot see.',

    can_see: 'Can see',
    can_hear: 'Can hear',
    can_talk: 'Can talk',
    cannot_see: 'Cannot see',
    cannot_hear: 'Cannot hear',
    cannot_talk: 'Cannot talk',

    join_title: 'Join the Mission',
    join_subtitle: 'Scan the QR code for your role',
    waiting_for_host: 'Waiting for the host to start the round...',
    you_are: 'You are the',
    on_team: 'on',
    waiting_for_mission: 'Waiting for the mission...',
    mission_starting_soon: 'Mission starting soon',

    mission_briefing: 'Briefing started',
    mission_in_progress: 'Mission in progress',
    time_left: 'Time left',
    your_role: 'Your role',
    secret_mission_for_knower_only: 'This mission is secret — visible only to the Knower',
    mission_title: 'Mission Title',
    mission_brief: 'Details',
    success_condition: 'Success Condition',
    follow_silently: 'Remember: stick to your role\'s allowed communication only!',
    cannot_see_mission: 'You cannot see the mission — listen carefully to your teammate',
    cannot_hear_instructions: 'You cannot hear — watch the signals closely',

    host_title: 'Host Control Panel',
    setup_phase: 'Round Setup',
    choose_mission_type: 'Choose mission type',
    mission_type_technical: 'Technical Mission 💻',
    mission_type_physical: 'Physical Mission 🏫',
    choose_difficulty: 'Choose difficulty',
    difficulty_easy: 'Easy',
    difficulty_medium: 'Medium',
    difficulty_hard: 'Hard',
    current_team: 'Current team',
    team_one: 'Team One',
    team_two: 'Team Two',
    show_join_codes: 'Show join codes',
    players_joined: 'Players joined',
    start_briefing: 'Start briefing (reveal mission)',
    start_mission_timer: 'Start mission & timer',
    pause_timer: 'Pause',
    resume_timer: 'Resume',
    mark_success: 'Success ✅',
    mark_fail: 'Fail ❌',
    next_team: 'Next team',
    show_final_result: 'Show final result',
    play_again: 'New round',
    mission_secret_panel: 'Mission panel (host only)',
    host_knows_mission_note: 'As the host, you know the mission so you can manage time and judge physical missions.',
    not_joined_yet: 'Not joined yet',
    waiting_room: 'Waiting room',
    all_three_joined: 'All three joined! Ready to start',
    needs_board_note: '🖊️ This mission needs the mini board and marker',

    final_result_title: 'Final Result',
    winner_is: 'Winning team',
    result_success: 'Success',
    result_fail: 'Fail',
    time_used: 'Time used',
    tie_broken_by_time: 'Tie broken by time',
    congratulations: 'Congratulations!',

    seconds_short: 's',
    minutes_short: 'm',
    back: 'Back',
    copy_link: 'Copy link',
    copied: 'Copied!',
    scan_to_join: 'Scan to join'
  }
};

function getLang() {
  return localStorage.getItem('sm_lang') || 'ar';
}

function setLang(lang) {
  localStorage.setItem('sm_lang', lang);
  applyLanguage();
  if (typeof onLanguageChanged === 'function') onLanguageChanged(lang);
}

function t(key) {
  const lang = getLang();
  return (I18N[lang] && I18N[lang][key]) || (I18N.ar[key]) || key;
}

function applyLanguage() {
  const lang = getLang();
  document.documentElement.lang = lang;
  document.documentElement.dir = I18N[lang].dir;
  document.querySelectorAll('[data-i18n]').forEach(el => {
    el.textContent = t(el.getAttribute('data-i18n'));
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    el.placeholder = t(el.getAttribute('data-i18n-placeholder'));
  });
  const toggleBtn = document.getElementById('lang-toggle-label');
  if (toggleBtn) toggleBtn.textContent = t('lang_toggle');
}

function initLangToggle(buttonId) {
  const btn = document.getElementById(buttonId);
  if (!btn) return;
  btn.addEventListener('click', () => {
    setLang(getLang() === 'ar' ? 'en' : 'ar');
  });
}

document.addEventListener('DOMContentLoaded', applyLanguage);
