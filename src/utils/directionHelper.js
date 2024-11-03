import { I18nManager } from 'react-native';
import i18n from "i18next";

export const updateDirection = (dir) => {
    console.log("line 4 updateDirection",dir);
    console.log("language user is",i18n.language);
    if (dir === 'rtl') {
        I18nManager.allowRTL(true);
        I18nManager.forceRTL(true);
    }
    else{
        I18nManager.allowRTL(false);
        I18nManager.forceRTL(false);
    }
};
