import Toast from 'react-native-toast-message';
import {StatusBar} from "react-native";

const CustomToast = {
    show: (text,type,position,time) => {
        let offset = (!position || position === "top")?{topOffset:StatusBar.currentHeight-16}: {bottomOffset: 20}
        let config = {
            type: 'myToast',
            text1: text,
            // text2: 'This is something 👋',
            props:{
                toastType: type
            },
            position: (position)?position:"top",
            visibilityTime: (time)?time:5000,
            ...offset
        };
        Toast.show(config);
    },
    hide: () => {
        Toast.hide();
    },
};

export default CustomToast;
