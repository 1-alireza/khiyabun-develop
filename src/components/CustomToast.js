import Toast from 'react-native-toast-message';
import { StatusBar } from 'react-native';

const CustomToast = {
    show: (text, type = 'default', position = 'top', time = 5000) => {
        const offset = position === 'top'
            ? { topOffset: (StatusBar.currentHeight || 20) + 10 }
            : { bottomOffset: 20 };

        const config = {
            type: 'myToast',
            // text2: 'This is something 👋',
            text1: text,
            props: { toastType: type },
            position,
            visibilityTime: time,
            ...offset
        };

        Toast.show(config);
    },
    hide: () => {
        Toast.hide();
    },
};

export default CustomToast;