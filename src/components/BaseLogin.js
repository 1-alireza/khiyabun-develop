import React from 'react';
import {
    ScrollView,
    View,
    StyleSheet,
    ImageBackground,
    Dimensions,
    Platform,
} from "react-native";
import {useTheme} from "@react-navigation/native";
import KhiyabunIcons from "./KhiyabunIcons";
import CustomText from "./CustomText";

const BaseLogin = ({title, description, bottomContent, children}) => {
    const {colors} = useTheme();
    const styles = useThemedStyles(colors);
    const isWeb = Platform.OS === 'web';

    return (
        isWeb ? (
            <View style={styles.container}>
                <ImageBackground
                    source={require('./../../assets/img/login-bg.png')}
                    style={styles.background}
                >
                    <View style={[styles.card]}>
                        <View style={styles.top}>
                            <View style={styles.logoWrapper}>
                                <KhiyabunIcons name="Logo" size={40} style={styles.logo}/>
                                {/*<Image*/}
                                {/*    style={styles.logo}*/}
                                {/*    source={require('./../../assets/img/logo/logo.png')}*/}
                                {/*/>*/}
                            </View>
                            <CustomText size={15} weight={'bold'} color={colors.onSurface}
                                        customStyle={{marginTop: 16}}>
                                {title}
                            </CustomText>
                            <CustomText lineHeight={20} size={13} color={colors.onSurface} textAlign={'center'}
                                        customStyle={{
                                            width: 296,
                                            marginHorizontal: 32,
                                            marginTop: 8,
                                        }}>
                                {description}
                            </CustomText>
                        </View>
                        <View style={styles.middle}>
                            {children}
                        </View>
                        <View style={styles.bottom}>
                            <CustomText weight={'bold'} size={13} color={colors.onSurface} textAlign={'center'}
                                        customStyle={{
                                            marginHorizontal: 16,
                                            marginVertical: 16
                                        }}>
                                {bottomContent}
                            </CustomText>
                        </View>
                    </View>

                </ImageBackground>
            </View>
        ) : (
            <ScrollView>
                <View style={styles.container}>
                    <ImageBackground
                        source={require('./../../assets/img/login-bg.png')}
                        style={styles.background}
                    >
                        <View style={[styles.card]}>
                            <View style={styles.top}>
                                <View style={styles.logoWrapper}>
                                    <KhiyabunIcons name="Logo" size={40} style={styles.logo}/>
                                    {/*<Image*/}
                                    {/*    style={styles.logo}*/}
                                    {/*    source={require('./../../assets/img/logo/logo.png')}*/}
                                    {/*/>*/}
                                </View>
                                <CustomText size={15} weight={'bold'} color={colors.onSurface}
                                            customStyle={{marginTop: 16}}>
                                    {title}
                                </CustomText>
                                <CustomText lineHeight={20} size={13} color={colors.onSurface} textAlign={'center'}
                                            customStyle={{
                                                width: 296,
                                                marginHorizontal: 32,
                                                marginTop: 8,
                                            }}>
                                    {description}
                                </CustomText>

                            </View>
                            <View style={styles.middle}>
                                {children}
                            </View>
                            <View style={styles.bottom}>
                                <CustomText weight={'bold'} size={13} color={colors.onSurface} textAlign={'center'}
                                            customStyle={{
                                                marginHorizontal: 16,
                                                marginVertical: 16
                                            }}>
                                    {bottomContent}
                                </CustomText>
                            </View>
                        </View>

                    </ImageBackground>
                </View>
            </ScrollView>
        )
    )
}

const useThemedStyles = (colors) => {
    return StyleSheet.create({
        container: {
            flex: 1,
            height: Dimensions.get('window').height,
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
        },
        middle: {
            flex: 10,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: "center",
            width: '100%',
        },
        bottom: {
            flex: 2,
            flexDirection: 'column',
            justifyContent: 'flex-end',
            alignItems: "center",
            width: '100%',
        },
        logoWrapper: {
            width: 114,
            height: 40,
            marginTop: 24
        },
        logo: {
            width: '100%',
            height: '100%',
            color: colors.primary
        },
    });
};

export default BaseLogin;
