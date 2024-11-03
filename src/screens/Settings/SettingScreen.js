import React, { useEffect, useRef, useState } from "react";
import Card from "../../components/Card";
import BoardCard from "../Board/BoardCard";
import { useTheme } from "@react-navigation/native";
import {StyleSheet, ScrollView, View, Text, Pressable, Platform} from "react-native";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "../../components/LanguageSwitcher";
import ChangeThemeSwitcher from "../../components/ChangeThemeSwitcher";
import SelectTheme from "../../components/SelectTheme";
import FontSizeSheet from "./FontSizeSheet";
import PhoneNumberSheet from "./PhoneNumberSheet";
import SecurtiyPassSheet from "./SecurityPassSheet";
import CustomModal from "../../components/CustomModal";
import { CheckBox } from '@rneui/themed';
import { Linking } from 'react-native';
import { useDispatch, useSelector } from "react-redux";
import gStyles from "../../global-styles/GlobalStyles";
import { deleteRequest, getRequest } from "../../utils/sendRequest";
import { errorHandling } from "../../utils/errorHandling";
import Input from "../../components/Input";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TOKEN_KEY } from "../../utils/constant";
import { signOut } from "../../redux/slices/loginSlice";
import CustomText from "../../components/CustomText";

function SettingScreen({ navigation }) {
    const { t, i18n } = useTranslation();
    const { colors } = useTheme();
    const styles = useThemedStyles(colors);
    const [isLanguageModalVisible, setIsLanguageModalVisible] = useState(false)
    const [isThemeModalVisible, setIsThemeModalVisible] = useState(false)
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false)
    const [isFontModalVisible, setIsFontModalVisible] = useState(false)
    const passRef = useRef('');
    const [isPhoneModalVisible, setIsPhoneModalVisible] = useState(false)
    const [whoSeesPhoneNumber, setWhoSeesPhoneNumber] = useState('')
    const [isPasswordModalVisible, setIsPasswordModalVisible] = useState(false)
    const [checked, setChecked] = useState(false);
    const language = useSelector((state) => state.language.language);
    const dispatch = useDispatch()
    const userToken = useSelector(state => state.login.token);
    let curLanguage;
    language === "fa" ? curLanguage = "فارسی" : language === "en" ? curLanguage = "English" : curLanguage = "العربیه"
    const toggleCheckbox = () => setChecked(!checked);

    const openBottomSheet = () => {
        setIsLanguageModalVisible(true);
    };
    const closeBottomSheet = () => {
        setIsLanguageModalVisible(false);
    };
    const openFontModal = () => {
        setIsFontModalVisible(true);
    };
    const closeFontModal = () => {
        setIsFontModalVisible(false);
    };
    const openPhoneModal = () => {
        setIsPhoneModalVisible(true);
    };
    const closePhoneModal = () => {
        setIsPhoneModalVisible(false);
        getAppSettings()
    };
    const openPasswordModal = () => {
        setIsPasswordModalVisible(true);
    };
    const closePasswordModal = () => {
        setIsPasswordModalVisible(false);
    };

    const openThemeSheet = () => {
        setIsThemeModalVisible(true);
    };

    const closeThemeSheet = () => {
        setIsThemeModalVisible(false);
    };

    const toggleModal = () => {
        setIsDeleteModalVisible(!isDeleteModalVisible)
    }

    useEffect(() => {
        getAppSettings()
    }, []);

    const getAppSettings = async () => {
        console.log("sdf")
        let res = await getRequest("app_settings", {}, userToken)
        if (res.statusCode === 200) {
            if (res.data.everyoneSeesPhoneNumber) {
                setWhoSeesPhoneNumber("everybody")
            } else {
                setWhoSeesPhoneNumber("nobody")

            }

        }
        console.log("user phone", res)

    }

    const handleTurnNotificationsOn = async () => {
        await Linking.openSettings();
    };

    const getPassword = async (value) => passRef.current = value;

    const deleteAccount = async () => {
        const body = {
            password: passRef.current
        }
        console.log(body)
        try {
            let res = await deleteRequest(`profile`, body, userToken)
            console.log("account Deleted", res)
            if (res.statusCode === 200) {
                await AsyncStorage.setItem(TOKEN_KEY, "");
                dispatch(signOut());
                navigation.navigate("Login");
                if (Platform.OS !== 'android') window.history.pushState({}, 'Login');
                errorHandling(res, "confirm")
            } else {
                errorHandling(res, "warning")
            }

        } catch (e) {
            errorHandling(res, "error")
        }
    }


    const DeleteAccount = () => {
        return (
            <View>

                <CustomText size={14} lineHeight={20} customStyle={styles.secondaryText} textAlign={"justify"} weight={"bold"}
                    color={colors.onSurfaceLow}>{t("deleteAccountCheckbox")}</CustomText>
                <Input onChangeText={getPassword} label={t("enter_pass_to_delete_account")}
                    placeholder={t("enter_password")} />
                <View style={styles.deleteWrapper}>
                    <CheckBox
                        iconRight={false}
                        size={20}
                        checked={checked}
                        onPress={toggleCheckbox}
                        iconType="material-community"
                        checkedIcon="checkbox-marked"
                        uncheckedIcon="checkbox-blank-outline"
                        checkedColor={colors.primary}
                        containerStyle={styles.checkBox}
                        title={<View>
                            <CustomText
                                size={15}
                                color={colors.onSurfaceHigh}
                                lineHeight={24}
                                textAlign={'left'}
                                customStyle={{
                                    paddingHorizontal: 6,
                                }}
                            >
                                {t("deleteAccountAlert")}
                            </CustomText>
                        </View>}
                        textStyle={styles.deleteText}
                    />

                </View>
            </View>
        )
    }

    return (
        <>
            <ScrollView style={styles.mainView}>
                <Card>
                    <View style={styles.cardHeader}>
                        <CustomText size={16} lineHeight={24} weight={"bold"}
                            color={colors.onSurface}>{t("about")}</CustomText>

                    </View>
                    <ChangeThemeSwitcher />
                    <BoardCard title={t("language")} place={"middle"} textStyle={styles.appActionText}
                        onPress={openBottomSheet}
                        secondaryText={curLanguage} icon={"direction-right-bold"}
                        iconStyle={styles.directionIconStyle} />
                    <BoardCard title={t("theme")} place={"middle"} textStyle={styles.appActionText}
                        onPress={openThemeSheet} secondaryText={"blue"} icon={"direction-right-bold"}
                        iconStyle={styles.directionIconStyle} />
                    <BoardCard title={t("font")} place={"middle"} textStyle={styles.appActionText}
                        icon={"direction-right-bold"} iconStyle={styles.directionIconStyle}
                        onPress={openFontModal} />
                    <BoardCard title={t("notifications")} place={"last"} textStyle={styles.appActionText}
                        icon={"direction-right-bold"} iconStyle={styles.directionIconStyle}
                        onPress={handleTurnNotificationsOn} />
                </Card>
                <Card>
                    <View style={styles.cardHeader}>
                        <CustomText size={16} lineHeight={24} weight={"bold"}
                            color={colors.onSurface}>{t("privacy_security")}</CustomText>
                    </View>
                    <BoardCard title={t("phone_number")} place={"first"} textStyle={styles.appActionText}
                        secondaryText={t(whoSeesPhoneNumber)} icon={"direction-right-bold"}
                        iconStyle={styles.directionIconStyle} onPress={openPhoneModal} />
                    <BoardCard title={t("security_password")} place={"middle"} textStyle={styles.appActionText}
                        icon={"direction-right-bold"} iconStyle={styles.directionIconStyle}
                        onPress={() => {
                            navigation.navigate("ChangePassword");
                            if (Platform.OS !== 'android') window.history.pushState({}, 'ChangePassword');
                        }} />
                    <BoardCard title={t("blocked_users")} place={"middle"} textStyle={styles.appActionText}
                        secondaryText={"22"} icon={"direction-right-bold"}
                        iconStyle={styles.directionIconStyle}
                        onPress={() => {
                            navigation.navigate("BlockedUsers");
                            if (Platform.OS !== 'android') window.history.pushState({}, 'BlockedUsers');
                        }} />
                    <BoardCard title={t("delete-account")} place={"last"} textStyle={styles.logoutText}
                        icon={"trash-outline"} iconStyle={styles.logoutText} onPress={toggleModal} />
                </Card>
            </ScrollView>
            <LanguageSwitcher isVisible={isLanguageModalVisible} onClose={closeBottomSheet} />
            <SelectTheme isVisible={isThemeModalVisible} onClose={closeThemeSheet} />
            <FontSizeSheet isVisible={isFontModalVisible} onClose={closeFontModal} />
            <CustomModal isVisible={isDeleteModalVisible}
                onClose={toggleModal} type={"error"}
                disabled={!checked}
                modalBody={<DeleteAccount />}
                modalTitle={t("Delete_khiyabun_account")} titleIcon={"close-circle-bold"}
                width={90} actionButtonText={t("Delete")} actionCallback={deleteAccount}
                cancelButtonText={t("cancel")} />
            <PhoneNumberSheet isVisible={isPhoneModalVisible} onClose={closePhoneModal} />
            <SecurtiyPassSheet isVisible={isPasswordModalVisible} onClose={closePasswordModal} />
        </>
    )
}

const useThemedStyles = (colors) => {
    return StyleSheet.create({
        mainView: {
            paddingHorizontal: 16,
            paddingBottom: 8,
        },
        logoutText: {
            fontWeight: "400",
            fontFamily: gStyles.fontMain.fontFamily,
            color: colors.error
        },
        secondaryText: {
            marginBottom: 20
        },
        checkBox: {
            flex: 1,
            backgroundColor: "transparent",
            borderWidth: 0,
            padding: 0,
            margin: 0,
            marginRight: 0,
            marginLeft: 0,
            marginVertical: 10
        },
        deleteText: {
            // fontSize: 16,
            // lineHeight: 24,
            color: colors.onSurfaceHigh,
            fontFamily: gStyles.fontMain.fontFamily,
            textAlign: "justify"

        },
        deleteWrapper: {
            flexDirection: "row",
            alignItems: "stretch",
            justifyContent: "flex-end",
            marginVertical: 10,
            paddingHorizontal: 10
        },
        appActionText: {
            fontWeight: "400",
            // fontSize: 16,
            // lineHeight: 24,
            fontFamily: gStyles.fontMain.fontFamily,
            paddingHorizontal: 8,
            color: colors.onSurfaceHigh
        },
        cardHeader: {
            paddingHorizontal: 8,
            paddingVertical: 4
        },
        modalBody: {
            paddingHorizontal: 8,
            paddingBottom: 16,
            flexDirection: "column",
            gap: 8
        },
        logOutIcon: {
            color: colors.error
        },
        directionIconStyle: {
            color: colors.onSurface
        }
    });
};


export default SettingScreen
