import React, {useEffect, useState} from 'react';
import {
    ScrollView,
    View,
    Text,
    StyleSheet,
    Image,
    ImageBackground,
    Keyboard,
    TouchableWithoutFeedback,
    Dimensions,
    I18nManager
} from "react-native";
import {useTheme} from "@react-navigation/native";
import gStyles from "../global-styles/GlobalStyles";

const BaseLogin = (props) => {
    const {colors} = useTheme();
    const styles = useThemedStyles(colors);
    const [screenHeight, setScreenHeight] = useState(Dimensions.get('window').height);

    useEffect(() => {
        const updateScreenHeight = () => {
            setScreenHeight(Dimensions.get('window').height);
        };

        Dimensions.addEventListener('change', updateScreenHeight);

        // return () => Dimensions.removeEventListener('change', updateScreenHeight);
    }, []);

    return (
        <ScrollView>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <View style={[styles.container, {height: screenHeight}]}>
                    <ImageBackground
                        source={require('./../../assets/img/login-bg.png')}
                        style={styles.background}
                    >
                        <View style={[styles.card]}>
                            <View style={styles.top}>
                                <View style={styles.logoWrapper}>
                                    <Image
                                        style={styles.logo}
                                        source={require('./../../assets/img/logo/logo.png')}
                                    />
                                </View>
                                <Text style={styles.title}>{props.title}</Text>
                                <Text style={styles.description}>{props.description}</Text>
                            </View>
                            <View style={styles.middle}>
                                {props.children}
                            </View>
                            <View style={styles.bottom}>
                                <Text style={styles.bottomWrapper}>
                                    {props.bottomContent}
                                </Text>
                            </View>
                        </View>

                    </ImageBackground>
                </View>
            </TouchableWithoutFeedback>
        </ScrollView>
    )
}

const useThemedStyles = (colors) => {
    return StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        },
        background: {
            flex: 1,
            resizeMode: 'cover',
            justifyContent: 'center',
            width: '100%',
            height: 535,
        },
        card: {
            flex: 1,
            alignItems: 'center',
            backgroundColor: colors.surfaceContainerLowest,
            margin: 16,
            paddingHorizontal: 16,
            marginTop: 80,
            borderRadius: 16,
        },
        top: {
            flex: 3,
            width: '100%',
            alignItems: "center",
            // backgroundColor:'red'
        },
        middle: {
            flex: 10,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: "center",
            width: '100%',
            // marginHorizontal: 32,
            // backgroundColor:'yellow'
        },
        bottom: {
            flex: 2,
            flexDirection: 'column',
            justifyContent: 'flex-end',
            alignItems: "center",
            width: '100%',
            // backgroundColor:'pink'
        },
        logoWrapper: {
            width: 114,
            height: 40,
            marginTop: 24
        },
        logo: {
            width: '100%',
            height: '100%'
        },
        title: {
            fontFamily: 'dana-bold',
            color: colors.onSurface,
            fontSize: 16,
            marginTop: 16
        },
        description: {
            fontFamily: (I18nManager.isRTL)?gStyles.danaPersianNumber.fontFamily: gStyles.fontMain.fontFamily,
            color: colors.onSurface,
            width: 296,
            marginHorizontal: 32,
            marginTop: 8,
            fontSize: 14,
            lineHeight: 20,
            textAlign: 'center'
        },
        bottomWrapper: {
            fontSize: 14,
            color: colors.onSurface,
            fontFamily: 'dana-bold',
            marginHorizontal: 16,
            marginVertical: 16,
            textAlign: 'center'
        }
    });
};
export default BaseLogin;
