import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      heroTitle1: "The Art of",
      heroTitle2: "Fine Tailoring",
      subtitle: "Established 1998 · Masters of Fine Tailoring",
      description: "Where heritage meets craftsmanship. Each garment is meticulously handcrafted by master artisans using the world's finest fabrics.",
      exploreBtn: "Explore Collection",
      viewBtn: "View Suits"
    }
  },
  hi: {
    translation: {
      heroTitle1: "सिलाई की",
      heroTitle2: "उत्कृष्ट कला",
      subtitle: "स्थापना 1998 · बेहतरीन सिलाई के उस्ताद",
      description: "जहाँ विरासत का शिल्प कौशल से मिलन होता है। दुनिया के सबसे बेहतरीन कपड़ों का उपयोग करके हमारे मास्टर कारीगरों द्वारा हर पोशाक को सावधानीपूर्वक तैयार किया जाता है।",
      exploreBtn: "कलेक्शन देखें",
      viewBtn: "सूट्स देखें"
    }
  }
};

i18n
  .use(LanguageDetector) // Automatically detects user browser language
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', // Default starting language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false 
    }
  });

export default i18n;