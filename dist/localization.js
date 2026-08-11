"use strict";
// Sri Lankan Holiday API - Localization & Multi-language Dictionary (v3.2.1)
Object.defineProperty(exports, "__esModule", { value: true });
exports.HOLIDAY_TRANSLATIONS = exports.CATEGORIES_LOCALIZED = exports.DAYS_OF_WEEK_LOCALIZED = void 0;
exports.normalizeLang = normalizeLang;
exports.localizeHoliday = localizeHoliday;
function normalizeLang(langOrLocale) {
    if (!langOrLocale)
        return 'en';
    const clean = langOrLocale.toLowerCase().trim();
    if (clean.startsWith('si'))
        return 'si';
    if (clean.startsWith('ta'))
        return 'ta';
    return 'en';
}
exports.DAYS_OF_WEEK_LOCALIZED = {
    en: {
        Monday: 'Monday',
        Tuesday: 'Tuesday',
        Wednesday: 'Wednesday',
        Thursday: 'Thursday',
        Friday: 'Friday',
        Saturday: 'Saturday',
        Sunday: 'Sunday'
    },
    si: {
        Monday: 'සඳුදා',
        Tuesday: 'අඟහරුවාදා',
        Wednesday: 'බදාදා',
        Thursday: 'බ්‍රහස්පතින්දා',
        Friday: 'සිකුරාදා',
        Saturday: 'සෙනසුරාදා',
        Sunday: 'ඉරිදා'
    },
    ta: {
        Monday: 'திங்கள்',
        Tuesday: 'செவ்வாய்',
        Wednesday: 'புதன்',
        Thursday: 'வியாழன்',
        Friday: 'வெள்ளி',
        Saturday: 'சனி',
        Sunday: 'ஞாயிறு'
    }
};
exports.CATEGORIES_LOCALIZED = {
    en: {
        public_and_bank: 'Public & Bank Holiday',
        public: 'Public Holiday',
        bank: 'Bank Holiday',
        observance: 'Observance'
    },
    si: {
        public_and_bank: 'මහජන හා බැංකු නිවාඩු දිනය',
        public: 'මහජන නිවාඩු දිනය',
        bank: 'බැංකු නිවාඩු දිනය',
        observance: 'විශේෂ සංවත්සර දිනය'
    },
    ta: {
        public_and_bank: 'பொது மற்றும் வங்கி விடுமுறை',
        public: 'பொது விடுமுறை',
        bank: 'வங்கி விடுமுறை',
        observance: 'சிறப்பு விசேட நாள்'
    }
};
exports.HOLIDAY_TRANSLATIONS = {
    'tamil thai pongal day': {
        siName: 'දෙමළ තෛපොං‌ගල් දිනය',
        taName: 'தமிழ் தைப்பොங்கல் தினம்',
        siDesc: 'දෙමළ ජනයා විසින් සමරනු ලබන අස්වැන්න නෙළීමේ උත්සවය.',
        taDesc: 'தமிழர்களால் கொண்டாடப்படும் அறுவடைத் திருநாள்.'
    },
    'duruthu full moon poya day': {
        siName: 'දුරුතු පසළොස්වක පෝය දිනය',
        taName: 'துருத்து முழு நிலவு பௌர்ணமி நாள்',
        siDesc: 'බුදුරජාණන් වහන්සේගේ ප්‍රථම ලංකාගමනය සිහිපත් කෙරෙන පෝය දිනය.',
        taDesc: 'புத்தரின் இலங்கைக்கான முதல் வருகையைக் குறிக்கும் பௌர்ணமி நாள்.'
    },
    'national day': {
        siName: 'නිදහස් දිනය',
        taName: 'சுதந்திர தினம்',
        siDesc: 'ශ්‍රී ලංකාවේ ජාතික නිදහස් දිනය.',
        taDesc: 'இலங்கையின் தேசிய சுதந்திர தினம்.'
    },
    'independence day': {
        siName: 'නිදහස් දිනය',
        taName: 'சுதந்திர தினம்',
        siDesc: 'ශ්‍රී ලංකාවේ ජාතික නිදහස් දිනය.',
        taDesc: 'இலங்கையின் தேசிய சுதந்திர தினம்.'
    },
    'navam full moon poya day': {
        siName: 'නවැම් පසළොස්වක පෝය දිනය',
        taName: 'நவம் முழு நிலவு பௌர்ணமி நாள்',
        siDesc: 'සැරියුත් මුගලන් මහ රහතන් වහන්සේලා අග්‍රශ්‍රාවක තනතුරට පත්වීම සිහිපත් කිරීම.',
        taDesc: 'சாரரிபுத்தர் மற்றும் மொக்கல்லானர் முதன்மைச் சீடர்களாக நியமிக்கப்பட்டதை நினைவுகூரும் நாள்.'
    },
    'maha sivarathri day': {
        siName: 'මහා ශිවරාත්‍රී දිනය',
        taName: 'மகா சிவராத்திரி தினம்',
        siDesc: 'ශිව දෙවියන් උදෙසා හින්දු භක්තිකයන් පවත්වන මහෝත්සවය.',
        taDesc: 'சிவபெருமானைக் கௌரவிக்கும் இந்துக்களின் புனித இரவு.'
    },
    'medin full moon poya day': {
        siName: 'මැදින් පසළොස්වක පෝය දිනය',
        taName: 'மெதின் முழு நிலவு பௌர்ணமி நாள்',
        siDesc: 'බුදුරජාණන් වහන්සේ කිඹුල්වත්පුරයට වැඩම කරවීම සිහිපත් කිරීම.',
        taDesc: 'புத்தர் தனது பிறந்த ஊரான கபிலவஸ்துவிற்கு விஜயம் செய்ததை நினைவுகூரும் நாள்.'
    },
    'good friday': {
        siName: 'මහ සිකුරාදා දිනය',
        taName: 'புனித வெள்ளி',
        siDesc: 'ජේසුස් ක්‍රිස්තුස් වහන්සේගේ කුරුසිපත්වීම සිහිපත් කෙරෙන දිනය.',
        taDesc: 'இயேசு கிறிஸ்துவின் சிலுவை மரணத்தை நினைவுகூரும் கிறிஸ்தவப் புனித நாள்.'
    },
    'eid al-fitr': {
        siName: 'ඊද් අල්-ෆිතර් (අවුරුදු උත්සවය)',
        taName: 'ஈதுல் பித்ர் (ரமழான் பெருநாள்)',
        siDesc: 'රාමසාන් උපවාස සමය අවසානය සලකුණු කෙරෙන ඉස්ලාමීය උත්සවය.',
        taDesc: 'ரமழான் நோன்பு காலத்தின் முடிவைக் குறிக்கும் இஸ்லாமியப் பெருநாள்.'
    },
    'bak full moon poya day': {
        siName: 'බක් පසළොස්වක පෝය දිනය',
        taName: 'பக் முழு நிலவு பௌர்ணமி நாள்',
        siDesc: 'බුදුරජාණන් වහන්සේගේ දෙවන ලංකාගමනය සිහිපත් කිරීම.',
        taDesc: 'புத்தரின் இலங்கைக்கான இரண்டாவது வருகையைக் குறிக்கும் பௌர்ணமி நாள்.'
    },
    'sinhala and tamil new year eve': {
        siName: 'සිංහල හා දෙමළ අලුත් අවුරුදු පූර්ව දිනය',
        taName: 'சிங்கள தமிழ் புத்தாண்டு முன்தினம்',
        siDesc: 'අලුත් අවුරුදු උදාවට පෙර දිනය.',
        taDesc: 'புத்தாண்டு பிறப்பதற்கு முந்தைய நாள்.'
    },
    'sinhala and tamil new year day': {
        siName: 'සිංහල හා දෙමළ අලුත් අවුරුදු දිනය',
        taName: 'சிங்கள தமிழ் புத்தாண்டு தினம்',
        siDesc: 'සූර්යයා මීන රාශියෙන් මේෂ රාශියට සංක්‍රමණය වීම සමරන සාම්ප්‍රදායික අවුරුදු උත්සවය.',
        taDesc: 'சூரியன் மீனம் ராசியிலிருந்து மேஷம் ராசிக்கு பெயர்வதைக் கொண்டாடும் பாரம்பரிய புத்தாண்டு.'
    },
    'may day': {
        siName: 'ලෝක කම්කරු දිනය',
        taName: 'மே தினம் (தொழிலாளர் தினம்)',
        siDesc: 'ලෝකවාසී කම්කරුවන්ගේ අයිතිවාසිකම් සමරන දිනය.',
        taDesc: 'தொழிலாளர்களின் உரிமைகளையும் சாதனைகளையும் கொண்டாடும் சர்வதேச நாள்.'
    },
    'vesak full moon poya day': {
        siName: 'වෙසක් පසළොස්වක පෝය දිනය',
        taName: 'வைகாசி முழு நிலவு பௌர்ணமி நாள்',
        siDesc: 'බුදුරජාණන් වහන්සේගේ උපත, බුදුවීම සහ පරිනිර්වාණය සිහිපත් කෙරෙන ශ්‍රේෂ්ඨතම බෞද්ධ උත්සවය.',
        taDesc: 'புத்தரின் பிறப்பு, ஞானம் மற்றும் பரினிர்வாணத்தைக் குறிக்கும் மிக முக்கிய பௌத்த திருநாள்.'
    },
    'day following vesak full moon poya day': {
        siName: 'වෙසක් පසළොස්වක පෝය දිනට පසු දිනය',
        taName: 'வைகாசி பௌர்ணமிக்கு அடுத்த நாள்',
        siDesc: 'වෙසක් උත්සවයේ දෙවන දිනය.',
        taDesc: 'வைகாசி விசாகக் கொண்டாட்டத்தின் இரண்டாம் நாள்.'
    },
    'poson full moon poya day': {
        siName: 'පොසොන් පසළොස්වක පෝය දිනය',
        taName: 'பொசன் முழு நிலவு பௌர்ණமி நாள்',
        siDesc: 'මිහිඳු මහිමයෙන් ශ්‍රී ලංකාවට බුදුදහම ලැබීම සිහිපත් කිරීම.',
        taDesc: 'மஹிந்த தேரர் இலங்கைக்கு பௌத்த மதத்தைக் கொண்டு வந்ததை நினைவுகூரும் நாள்.'
    },
    'eid al-adha': {
        siName: 'ඊද් අල්-අදහ (හජ්ජි උත්සවය)',
        taName: 'ஈதுல் அல்ஹா (ஹஜ்ஜி பெருநாள்)',
        siDesc: 'ඉස්ලාමීය හජ්ජි වන්දනාව හා කැපවීම සමරන උත්සවය.',
        taDesc: 'இஸ்லாமியர்களின் தியாகப் பெருநாள்.'
    },
    'esala full moon poya day': {
        siName: 'ඇසළ පසළොස්වක පෝය දිනය',
        taName: 'ஆடி முழு நிலவு பௌர்ணமி நாள்',
        siDesc: 'බුදුරජාණන් වහන්සේගේ ප්‍රථම ධර්ම දේශනාව (ධම්මචක්කප්පវត្តන සූත්‍රය) සහ දළදා පෙරහැර මංගල්‍යය.',
        taDesc: 'புத்தரின் முதல் போதனையையும் கண்டி பெரஹரா விழாவையும் குறிக்கும் நாள்.'
    },
    'nikini full moon poya day': {
        siName: 'නිකිණි පසළොස්වක පෝය දිනය',
        taName: 'நிகினி முழு நிலவு பௌர்ணமி நாள்',
        siDesc: 'පළමු ධර්ම සංගායනාව පැවැත්වීම සිහිපත් කිරීම.',
        taDesc: 'முதலாவது பௌத்த மாநாடு கூடியதை நினைவுகூரும் நாள்.'
    },
    'milad-un-nabi': {
        siName: 'මිලාද්-උන්-නබි (නබි නායකතුමාගේ උපන්දින)',
        taName: 'மிலாத்-உன்-நபி (நபிகள் நாயகம் பிறந்த நாள்)',
        siDesc: 'මුහම්මද් නබිනායකතුමාගේ උපන් දිනය සිහිපත් කිරීම.',
        taDesc: 'நபிகள் நாயகத்தின் அவதார தினத்தைக் கொண்டாடும் புனித நாள்.'
    },
    'binara full moon poya day': {
        siName: 'බිනර පසළොස්වක පෝය දිනය',
        taName: 'பினர முழு நிலவு பௌர்ணமி நாள்',
        siDesc: 'මෙහෙණි සස්න (භික්ෂුණී ශාසනය) ආරම්භ වීම සිහිපත් කිරීම.',
        taDesc: 'பௌத்த பெண் துறவிகள் அமைக்கப்பட்டதை நினைவுகூரும் நாள்.'
    },
    'vap full moon poya day': {
        siName: 'වප් පසළොස්වක පෝය දිනය',
        taName: 'வப் முழு நிலவு பௌர்ணமி நாள்',
        siDesc: 'වස් පවාරණය සහ කඨින චීවර පූජා සමය ආරම්භය.',
        taDesc: 'கட்டின சீவர தானக் காலத்தின் தொடக்கத்தைக் குறிக்கும் நாள்.'
    },
    'deepavali': {
        siName: 'දීපාවලී උත්සව දිනය',
        taName: 'தீபாவளித் திருநாள்',
        siDesc: 'අලෝකයේ උත්සවය ලෙස හින්දු භක්තිකයන් විසින් සමරනු ලබන මහෝත්සවය.',
        taDesc: 'ஒளிமயமான எதிர்காலத்தைக் குறிக்கும் இந்துக்களின் தீபத் திருநாள்.'
    },
    'il full moon poya day': {
        siName: 'ඉල් පසළොස්වක පෝය දිනය',
        taName: 'இல் முழு நிலவு பௌர்ණமி நாள்',
        siDesc: 'පළමු ධර්මදූත පිරිස ධර්ම ප්‍රචාරය සඳහා පිටත්ව යාම.',
        taDesc: 'முதல் பௌத்த தர்ம தூதுக்குழுக்கள் அனுப்பப்பட்டதை நினைவுகூரும் நாள்.'
    },
    'unduvap full moon poya day': {
        siName: 'උඳුවප් පසළොස්වක පෝය දිනය',
        taName: 'உந்துவப் முழு நிலவு பௌர்ணமி நாள்',
        siDesc: 'සංඝමිත්තා තෙරණිය විසින් ශ්‍රී මහා බෝධි අංකුරය ලංකාවට වැඩම කරවීම.',
        taDesc: 'சங்கமித்தை தெரணியார் ஸ்ரீ மகா போதி கிளையைக் கொண்டு வந்ததை நினைவுகூரும் நாள்.'
    },
    'christmas day': {
        siName: 'නත්තල් දිනය',
        taName: 'கிறிஸ்துமஸ் தினம்',
        siDesc: 'ජේසුස් ක්‍රිස්තුස් වහන්සේගේ උපත සමරන මහෝත්සවය.',
        taDesc: 'இயேசு கிறிஸ்துவின் பிறப்பைக் கொண்டாடும் கிறிஸ்தவப் பெருநாள்.'
    }
};
function localizeHoliday(holiday, langOrLocale) {
    const lang = normalizeLang(langOrLocale);
    if (lang === 'en')
        return holiday;
    const key = holiday.name.toLowerCase().trim();
    // Find exact matching key or partial match
    let translation = exports.HOLIDAY_TRANSLATIONS[key];
    if (!translation) {
        for (const [k, trans] of Object.entries(exports.HOLIDAY_TRANSLATIONS)) {
            if (key.includes(k) || k.includes(key)) {
                translation = trans;
                break;
            }
        }
    }
    const localizedName = lang === 'si'
        ? (translation?.siName || holiday.name)
        : (translation?.taName || holiday.name);
    const localizedDesc = lang === 'si'
        ? (translation?.siDesc || holiday.description)
        : (translation?.taDesc || holiday.description);
    const localizedDayOfWeek = exports.DAYS_OF_WEEK_LOCALIZED[lang][holiday.dayOfWeek] || holiday.dayOfWeek;
    const localizedCategory = exports.CATEGORIES_LOCALIZED[lang][holiday.category] || holiday.category;
    return {
        ...holiday,
        name: localizedName,
        description: localizedDesc,
        dayOfWeek: localizedDayOfWeek,
        categoryNameLocalized: localizedCategory,
        lang
    };
}
