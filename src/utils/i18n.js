// i18n.js
import 'intl-pluralrules';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import arTranslation from './../../assets/i18n/ar.json'; // ترجمه‌های زبان عربی
import enTranslation from '../../assets/i18n/en.json'; // ترجمه‌های زبان انگلیسی
import faTranslation from './../../assets/i18n/fa.json'; // ترجمه‌های زبان فارسی

import arAli from './../../assets/i18n/ali/ar.json';
import faAli from './../../assets/i18n/ali/fa.json';
import enAli from './../../assets/i18n/ali/en.json';

import arPars from './../../assets/i18n/parsa/ar.json';
import faPars from './../../assets/i18n/parsa/fa.json';
import enPars from './../../assets/i18n/parsa/en.json';

// تنظیمات i18next
i18n.use(initReactI18next) // استفاده از initReactI18next
    .init({
        lng: 'fa', // زبان پیش‌فرض
        fallbackLng: 'fa', // زبان پشتیبانی شده پیش‌فرض
        resources: {
            ar: { translation: {...arTranslation,...arAli,...arPars} }, // ترجمه‌های عربی
            en: { translation: {...enPars,...enAli,...enTranslation} }, // ترجمه‌های انگلیسی
            fa: { translation: {...faTranslation,...faAli,...faPars} }  // ترجمه‌های فارسی
        },
        interpolation: {
            escapeValue: false // اجازه به وارد کردن مقادیر دیگر در متن‌ها
        }
    });

export default i18n;
