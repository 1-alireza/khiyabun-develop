import React, {useState} from "react";
import Card from "../../components/Card";
import BoardCard from "../Board/BoardCard";
import {useTheme} from "@react-navigation/native";
import {StyleSheet, ScrollView, View, Text, Pressable} from "react-native";
import {useTranslation} from "react-i18next";
import LanguageSwitcher from "../../components/LanguageSwitcher";
import ChangeThemeSwitcher from "../../components/ChangeThemeSwitcher";
import SelectTheme from "../../components/SelectTheme";
import FontSizeSheet from "./FontSizeSheet";
import PhoneNumberSheet from "./PhoneNumberSheet";
import SecurtiyPassSheet from "./SecurtiyPassSheet";
import CustomModal from "../../components/CustomModal";
import {CheckBox} from '@rneui/themed';
import gStyles from "../../global-styles/GlobalStyles";
import {Linking} from 'react-native';
import {useSelector} from "react-redux";


function SettingScreen({navigation}) {
    const [isLanguageModalVisible, setIsLanguageModalVisible] = useState(false)
    const [isThemeModalVisible, setIsThemeModalVisible] = useState(false)
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false)
    const [isFontModalVisible, setIsFontModalVisible] = useState(false)
    const [isPhoneModalVisible, setIsPhoneModalVisible] = useState(false)
    const [isPasswordModalVisible, setIsPasswordModalVisible] = useState(false)
    const [checked, setChecked] = useState(false);
    const language = useSelector((state) => state.language.language);
    let curLanguage;
    language==="fa"? curLanguage="فارسی":language==="en"?curLanguage="English":curLanguage="العربیه"
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
    const handleTurnNotificationsOn = async () => {
        await Linking.openSettings();
    };


    const {t, i18n} = useTranslation();
    const {colors} = useTheme();
    const styles = useThemedStyles(colors);

    const DeleteAccount = () => {
        return (
            <View>
                <Text style={styles.secondaryText}>
                    {t("deleteAccountCheckbox")}
                </Text>
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
                        title={t("deleteAccountAlert")}
                        textStyle={styles.deleteText}
                    />
                    {/*<Pressable onPress={toggleCheckbox} >*/}
                    {/*    <Text style={styles.deleteText}>*/}
                    {/*        {t("deleteAccountAlert") }*/}

                    {/*    </Text>*/}
                    {/*</Pressable>*/}

                </View>
            </View>
        )
    }

    return (
        <>
            <ScrollView style={styles.mainView}>
                <Card>
                    <View style={styles.cardHeader}>
                        <Text style={styles.cardHeaderText}>
                            {t("about")}
                        </Text>
                    </View>
                    <ChangeThemeSwitcher/>
                    <BoardCard title={t("language")} place={"middle"} textStyle={styles.appActionText}
                               onPress={openBottomSheet}
                               secondaryText={curLanguage} icon={"direction-right-bold"}
                               iconStyle={styles.directionIconStyle}/>
                    <BoardCard title={t("theme")} place={"middle"} textStyle={styles.appActionText}
                               onPress={openThemeSheet} secondaryText={"blue"} icon={"direction-right-bold"}
                               iconStyle={styles.directionIconStyle}/>
                    <BoardCard title={t("font")} place={"middle"} textStyle={styles.appActionText}
                               icon={"direction-right-bold"} iconStyle={styles.directionIconStyle}
                               onPress={openFontModal}/>
                    <BoardCard title={t("notifications")} place={"last"} textStyle={styles.appActionText}
                               icon={"direction-right-bold"} iconStyle={styles.directionIconStyle}
                               onPress={handleTurnNotificationsOn}/>
                </Card>
                <Card>
                    <View style={styles.cardHeader}>
                        <Text style={styles.cardHeaderText}>
                            {t("privacy_security")}
                        </Text>
                    </View>
                    <BoardCard title={t("phone_number")} place={"first"} textStyle={styles.appActionText}
                               secondaryText={t("everybody")} icon={"direction-right-bold"}
                               iconStyle={styles.directionIconStyle} onPress={openPhoneModal}/>
                    <BoardCard title={t("security_password")} place={"middle"} textStyle={styles.appActionText}
                               icon={"direction-right-bold"} iconStyle={styles.directionIconStyle}
                               onPress={openPasswordModal}/>
                    <BoardCard title={t("blocked_users")} place={"middle"} textStyle={styles.appActionText}
                               secondaryText={"22"} icon={"direction-right-bold"}
                               iconStyle={styles.directionIconStyle} onPress={() => navigation.navigate("BlockedUsers")}/>
                    <BoardCard title={t("delete-account")} place={"last"} textStyle={styles.logoutText}
                               icon={"trash-outline"} iconStyle={styles.logoutText} onPress={toggleModal}/>
                </Card>
            </ScrollView>
            <LanguageSwitcher isVisible={isLanguageModalVisible} onClose={closeBottomSheet}/>
            <SelectTheme isVisible={isThemeModalVisible} onClose={closeThemeSheet}/>
            <FontSizeSheet isVisible={isFontModalVisible} onClose={closeFontModal}/>
            <CustomModal isVisible={isDeleteModalVisible} onClose={toggleModal} type={"error"}
                         modalBody={<DeleteAccount/>}
                         modalTitle={t("Delete_khiyabun_account")} titleIcon={"close-circle-bold"}
                         width={90} actionButtonText={t("Delete")} cancelButtonText={t("cancel")}/>
            <PhoneNumberSheet isVisible={isPhoneModalVisible} onClose={closePhoneModal}/>
            <SecurtiyPassSheet isVisible={isPasswordModalVisible} onClose={closePasswordModal}/>
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
            fontSize: 16,
            lineHeight: 24,
            fontFamily: "dana-regular",
            paddingHorizontal: 8,
            color: colors.error
        },
        secondaryText: {
            fontSize: 14,
            lineHeight: 20,
            color: colors.onSurfaceLow,
            fontFamily: "dana-regular",
            textAlign: "justify"
        },
        checkBox: {
            flex: 1,
            // alignItems:"flex-end",
            backgroundColor: "transparent",
            borderWidth: 0,
            padding: 0,
            margin: 0,
            marginRight: 0,
            marginLeft: 0,
            marginBottom: 0
        },
        deleteText: {
            fontSize: 16,
            lineHeight: 24,
            color: colors.onSurfaceHigh,
            fontFamily: "dana-regular",
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
            fontSize: 16,
            lineHeight: 24,
            fontFamily:gStyles.fontMain.fontFamily,
            paddingHorizontal: 8,
            color: colors.onSurfaceHigh
        },
        cardHeader: {
            paddingHorizontal: 8,
            paddingVertical: 4
        },
        cardHeaderText: {
            fontSize: 16,
            fontFamily: "dana-bold",
            lineHeight: 24,
            color: colors.onSurface
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