import React, {useEffect, useState, useMemo} from 'react';
import {useColorScheme} from "react-native";
import {NavigationContainer} from '@react-navigation/native';
import {useFonts} from "expo-font";
import {I18nextProvider} from 'react-i18next';
import i18n from "./src/utils/i18n";
import StackNavigator from './src/navigation/StackNavigator';
import {Provider, useDispatch, useSelector} from "react-redux";
import store, {persistor} from "./src/redux/store";
import {toggleTheme} from "./src/redux/slices/themeSlice";
import {changeLanguageState} from "./src/redux/slices/languageSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {MenuProvider} from "react-native-popup-menu";
import AppDarkTheme from "./src/global-styles/AppDarkTheme";
import AppLightTheme from "./src/global-styles/AppLightTheme";
import {LANGUAGE_KEY, TOKEN_KEY} from "./src/utils/constant";
import {PersistGate} from "redux-persist/integration/react";
import "react-native-gesture-handler";
import Toast from "react-native-toast-message";
import {toastConfig} from "./src/utils/constant";


// import {userLogin} from "./src/redux/actions/loginAction";
// Wrap the whole app with <GestureHandlerRootView>
import {GestureHandlerRootView} from "react-native-gesture-handler";

import {getUserDeviceInfo} from "./src/utils/getUserDeviceInfo";
import {signIn} from "./src/redux/slices/loginSlice";
import {usePushNotifications} from "./usePushNotifications";

const App = () => {
    const {expoPushToken, notification} = usePushNotifications();
    // const data = JSON.stringify(notification, undefined, 2);
    console.log("expoPushToken:", expoPushToken)
    // ExponentPushToken[Ag0kRJMzPBjWO1vQhAPSdg]
    const [fontsLoaded] = useFonts({
        'dana-regular': require('./assets/fonts/dana/regular.ttf'),
        'dana-bold': require('./assets/fonts/dana/bold.ttf'),
        'poppins-regular': require('./assets/fonts/poppins/regular.ttf'),
        'poppins-thin': require('./assets/fonts/poppins/thin.ttf'),
        'poppins-bold': require('./assets/fonts/poppins/bold-italic.ttf'),
        'khiyabun-icons': require('./assets/fonts/icons/khiyabun-icons.ttf'),
        'dana-persian-num': require('./assets/fonts/dana/fa-num-regular.ttf')
    });

    const dispatch = useDispatch();
    const isDarkMode = useSelector(state => state.theme.darkTheme);
    const systemTheme = useColorScheme();

    useEffect(() => {
        const retrieveTheme = async () => {
            try {
                const storedTheme = await AsyncStorage.getItem('theme');
                if (storedTheme !== null) {
                    dispatch(toggleTheme(storedTheme));
                } else {
                    dispatch(toggleTheme(systemTheme));
                }
            } catch (error) {
                console.error('Error retrieving theme:', error);
            }
        };
        retrieveTheme();
    }, [dispatch, systemTheme]);
    useEffect(() => {
        const retrieveUserLogin = async () => {
            try {
                const hasToken = await AsyncStorage.getItem(TOKEN_KEY)
                if (hasToken !== null) {
                    dispatch(signIn(hasToken));
                }
            } catch (error) {
                console.error('Error retrieving theme:', error);
            }
        };
        retrieveUserLogin();
    }, [dispatch]);

    useEffect(() => {
        // dispatch(userLogin());
        const setLanguageFromStorage = async () => {
            try {
                const savedLanguage = await AsyncStorage.getItem(LANGUAGE_KEY);
                console.log("savedLanguage", savedLanguage);
                if (savedLanguage) {
                    await i18n.changeLanguage(savedLanguage);
                    dispatch(changeLanguageState(savedLanguage));
                } else {
                    dispatch(changeLanguageState(i18n.language));
                }
            } catch (error) {
                console.error('Error retrieving language:', error);
            }
        };

        setLanguageFromStorage();

        const handleLanguageChange = async (lng) => {
            try {
                await AsyncStorage.setItem(LANGUAGE_KEY, lng);
            } catch (error) {
                console.error('Error saving language:', error);
            }
        };

        i18n.on('languageChanged', handleLanguageChange);

        return () => {
            i18n.off('languageChanged', handleLanguageChange);
        };
    }, [dispatch]);

    const theme = useMemo(() => (isDarkMode ? AppDarkTheme : AppLightTheme), [isDarkMode]);

    if (!fontsLoaded) {
        return null;
    }
    return (
        <NavigationContainer theme={theme}>
            <StackNavigator/>
            <Toast config={toastConfig}/>
        </NavigationContainer>
    );
};

const RootApp = () => (
    <Provider store={store}>
        {/*<PersistGate persistor={persistor}>*/}
        <I18nextProvider i18n={i18n}>
            <MenuProvider>
                <App/>
            </MenuProvider>
        </I18nextProvider>
        {/*</PersistGate>*/}
    </Provider>
);

export default RootApp;