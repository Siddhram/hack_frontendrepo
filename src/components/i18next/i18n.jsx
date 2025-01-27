import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Translation resources with Indian languages
const resources = {
  en: {
    translation: {
      home: "Home",
      about: "About",
      contactUs: "Contact Us",
      language: "Language",
    },
  },
  hi: {
    translation: {
      home: "होम",
      about: "हमारे बारे में",
      contactUs: "संपर्क करें",
      language: "भाषा",
    },
  },
  mr: {
    translation: {
      home: "मुख्य पृष्ठ",
      about: "आमच्याबद्दल",
      contactUs: "आमच्याशी संपर्क साधा",
      language: "भाषा",
    },
  },
  ta: {
    translation: {
      home: "முகப்பு",
      about: "எங்களை பற்றி",
      contactUs: "தொடர்பு கொள்க",
      language: "மொழி",
    },
  },
  te: {
    translation: {
      home: "హోమ్",
      about: "మా గురించి",
      contactUs: "మమ్మల్ని సంప్రదించండి",
      language: "భాష",
    },
  },
  bn: {
    translation: {
      home: "হোম",
      about: "আমাদের সম্পর্কে",
      contactUs: "যোগাযোগ করুন",
      language: "ভাষা",
    },
  },
  gu: {
    translation: {
      home: "હોમ",
      about: "અમારા વિશે",
      contactUs: "સંપર્ક કરો",
      language: "ભાષા",
    },
  },
  kn: {
    translation: {
      home: "ಮುಖಪುಟ",
      about: "ನಮ್ಮ ಬಗ್ಗೆ",
      contactUs: "ನಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸಿ",
      language: "ಭಾಷೆ",
    },
  },
  ml: {
    translation: {
      home: "ഹോം",
      about: "ഞങ്ങളെ കുറിച്ച്",
      contactUs: "ബന്ധപ്പെടുക",
      language: "ഭാഷ",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en", // Default language
  fallbackLng: "en",
  interpolation: {
    escapeValue: false, // React already escapes values
  },
});

export default i18n;
