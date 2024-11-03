import {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Platform} from "react-native";

const hardwareBackHandler = () => {
    const navigation = useNavigation();

    useEffect(() => {
        if (Platform.OS === 'android') return;
        const handlePopState = (event) => {
            if (navigation.canGoBack()) {
                navigation.goBack();
            } else {
                console.log('No more routes to go back to.');
            }
        };
        window.addEventListener('popstate', handlePopState);

        return () => {
            window.removeEventListener('popstate', handlePopState);
        };
    }, [navigation]);
};

export default hardwareBackHandler;