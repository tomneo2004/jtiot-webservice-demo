import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import ch from './locales/ch.json';
import en from './locales/en.json';

// the translations
// (tip move them in a JSON file and import them)
const resources = {
  ch,
  en
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "ch",
    debug: true,
    returnObjects: true,

    fallbackLng: 'en',

    ns: ['common', 
    'RequestToken',
    'VerifyToken',
    'WHistory',
    'SleepRecord',
    'ProductList',
    'HelloWorld',
    'HBHistory',
    'BRHistory',
    'BreathArray',
    'BedRecord',
    'BCGArray',
    'AlarmList',
    'DeviceStatus',
    'ResponseCode',
    'SleepRecordType',
    'BedRecordType',
    'AlarmType',
    'VerifyTokenResponseCode'],

    defaultNS: 'common',
    keySeparator: false,
    interpolation: {
        escapeValue: false,
    },
    react: {
        wait: true,
    },
  });

  export default i18n;
