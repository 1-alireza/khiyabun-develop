import { I18nManager } from 'react-native';

export const updateDirection = (dir) => {
    console.log("line 4 updateDirection",dir);
    if (dir === 'rtl') {
        I18nManager.allowRTL(true);
        I18nManager.forceRTL(true);
    }
    else{
        I18nManager.allowRTL(false);
        I18nManager.forceRTL(false);
    }
};
