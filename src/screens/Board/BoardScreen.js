import {View, ScrollView, StyleSheet, Text, Pressable, Platform} from "react-native"
import React, {useState} from "react";
import {useTranslation} from "react-i18next";
import {useNavigation, useTheme} from "@react-navigation/native";
import Card from "../../components/Card";
import ChangeThemeSwitcher from "../../components/ChangeThemeSwitcher";
import LanguageSwitcher from "../../components/LanguageSwitcher";
import BoardOptions from "./BoardOptions";
import BoardProfile from "./BoardProfile";
import BoardCard from "./BoardCard";
import SocialMediaIcons from "./SocialMediaIcons";
import NewMessageInfo from "./NewMessageInfo";
import SelectTheme from "../../components/SelectTheme";
import CustomModal from "../../components/CustomModal";
import {I18nManager} from 'react-native';
import {useDispatch, useSelector} from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {TOKEN_KEY} from "../../utils/constant";
import {signOut} from "../../redux/slices/loginSlice";
import {errorHandling} from "../../utils/errorHandling";
import gStyles from "../../global-styles/GlobalStyles";
import EmptyData from "../../components/EmptyData";
import CustomText from "../../components/CustomText";

const BoardScreen = ({route, navigation}) => {
    const dispatch = useDispatch();
    const {t} = useTranslation();
    const {colors} = useTheme();
    const styles = useThemedStyles(colors);
    const isRTL = I18nManager.isRTL;
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [isLogOutModalVisible, setIsLogOutModalVisible] = useState(false)
    const [isThemeModalVisible, setIsThemeModalVisible] = useState(false)
    const profileData = useSelector((state) => state.profile.profileData);
    console.log(profileData)
    const language = useSelector((state) => state.language.language);
    let curLanguage;
    language === "fa" ? curLanguage = "فارسی" : language === "en" ? curLanguage = "English" : curLanguage = "العربیه"


    const icon = isRTL ? "direction-left-bold" : "direction-right-bold"
    const openBottomSheet = () => {
        setIsModalVisible(true);
    };

    const toggleModal = () => {
        setIsLogOutModalVisible(!isLogOutModalVisible)
    }

    const closeBottomSheet = () => {
        setIsModalVisible(false);
    };

    const openThemeBottomSheet = () => {
        setIsThemeModalVisible(true);
    };

    const closeThemeBottomSheet = () => {
        setIsThemeModalVisible(false);
    };
    const ModalBody = () => {
        return (
            <CustomText size={16} color={colors.onSurfaceHigh} lineHeight={24}>
                {t("log_in_warning")}
            </CustomText>)
    }

    const userLogOut = async () => {
        try {
            await AsyncStorage.setItem(TOKEN_KEY, "");
            dispatch(signOut());
            navigation.navigate("Login");
            if (Platform.OS !== 'android') window.history.pushState({}, 'Login');
        } catch (e) {
            console.log(e);
            errorHandling(t("default_error"), "error");
        }
    }


    return (
        <>
            {profileData ?
                <ScrollView style={styles.mainView}>
                    <BoardProfile onPress={() => {
                        navigation.navigate("ProfileS");
                        if (Platform.OS !== 'android') window.history.pushState({}, 'ProfileS');
                    }}/>
                    <NewMessageInfo onPress={() => {
                        navigation.navigate("chats");
                        if (Platform.OS !== 'android') window.history.pushState({}, 'chats');
                    }}/>
                    <View style={styles.boardOptionsWrapper}>
                        <BoardOptions text={t("request")} iconName={"messages-3-outline"}
                                      onPressHandler={() => {
                                          navigation.navigate("Request");
                                          if (Platform.OS !== 'android') window.history.pushState({}, 'Request');
                                      }}/>
                        <BoardOptions text={t("note")} iconName={"edit-outline"}
                                      onPressHandler={() => {
                                          navigation.navigate("Note");
                                          if (Platform.OS !== 'android') window.history.pushState({}, 'Note');
                                      }}/>
                        <BoardOptions text={t("checklist")} iconName={"tick-circle-outline"}
                                      onPressHandler={() => {
                                          navigation.navigate("CheckList");
                                          if (Platform.OS !== 'android') window.history.pushState({}, 'CheckList');
                                      }}/>
                        {/*<BoardOptions text={t("form")} iconName={"document-text-outline"}*/}
                        {/*              onPressHandler={() => {*/}
                        {/*                  navigation.navigate("Form");*/}
                        {/*                  if (Platform.OS !== 'android') window.history.pushState({}, 'Form');*/}
                        {/*              }}/>*/}
                        <BoardOptions text={t("flag")} iconName={"flag-outline"}
                                      onPressHandler={() => {
                                          navigation.navigate("Prof");
                                          if (Platform.OS !== 'android') window.history.pushState({}, 'Prof');
                                      }}/>
                    </View>
                    <Card>
                        <ChangeThemeSwitcher/>

                        <BoardCard title={t("language")} place={"middle"} textStyle={styles.appActionText}
                                   onPress={openBottomSheet}
                                   secondaryText={curLanguage} icon={icon}
                                   iconStyle={styles.directionIconStyle}/>

                        <BoardCard title={t("theme")} place={"last"} textStyle={styles.appActionText}
                                   onPress={openThemeBottomSheet} secondaryText={"blue"} icon={icon}
                                   iconStyle={styles.directionIconStyle}/>
                    </Card>
                    <Card>
                        <BoardCard title={t("settings")} place={"first"} textStyle={styles.appActionText}
                                   onPress={() => {
                                       navigation.navigate("Setting");
                                       if (Platform.OS !== 'android') window.history.pushState({}, 'Setting');
                                   }} icon={icon}
                                   iconStyle={styles.directionIconStyle}/>
                        <BoardCard title={t("help_support")} place={"last"} textStyle={styles.appActionText}
                                   icon={icon} iconStyle={styles.directionIconStyle}
                                   onPress={() => {
                                       navigation.navigate("HelpAndSupport");
                                       if (Platform.OS !== 'android') window.history.pushState({}, 'HelpAndSupport');
                                   }}/>
                    </Card>
                    <Card>
                        <BoardCard title={t("team")} place={"last"} textStyle={styles.appActionText}
                                   secondaryText={profileData.activeTeamName || t("no_team")} icon={icon}
                                   iconStyle={styles.directionIconStyle} onPress={() => {
                            navigation.navigate("Team");
                            if (Platform.OS !== 'android') window.history.pushState({}, 'Team');
                        }}/>
                    </Card>
                    <Card>
                        <BoardCard title={t("reporting")} place={"last"} textStyle={styles.appActionText}
                                   icon={icon} iconStyle={styles.directionIconStyle}/>
                    </Card>
                    <Card>
                        <BoardCard title={t("khiyabun")} place={"last"} textStyle={styles.appActionText}
                                   onPress={() => {
                                       navigation.navigate("Khiyabun");
                                       if (Platform.OS !== 'android') window.history.pushState({}, 'Khiyabun');
                                   }} icon={icon}
                                   iconStyle={styles.directionIconStyle}/>
                    </Card>
                    <Card>
                        <BoardCard title={t("logout")}
                                   place={"last"}
                                   textStyle={styles.logoutText}
                                   icon={"logout-outline"}
                                   iconStyle={styles.logOutIcon}
                                   onPress={toggleModal}
                        >

                        </BoardCard>
                    </Card>
                    <SocialMediaIcons/>
                </ScrollView> :
                <EmptyData/>
            }

            <LanguageSwitcher isVisible={isModalVisible} onClose={closeBottomSheet}/>
            <SelectTheme isVisible={isThemeModalVisible} onClose={closeThemeBottomSheet}/>
            <CustomModal isVisible={isLogOutModalVisible}
                         width={80}
                         modalStyle={styles.modalStyle}
                         onClose={toggleModal}
                         modalTitle={t("logout_account")}
                         actionButtonText={t("logout")}
                         cancelButtonText={t("cancel")}
                         titleIcon={"close-circle-bold"}
                         hasCloseIcon={true}
                         modalBody={<ModalBody/>}
                         type={"error"}
                         actionCallback={userLogOut}
            />
        </>
    );
}
const useThemedStyles = (colors) => {
    return StyleSheet.create({
        mainView: {
            paddingHorizontal: 16,
            paddingBottom: 16,
        },
        boardOptionsWrapper: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 15,
            marginBottom: 10,
            gap: 8,
        },
        logoutText: {
            fontWeight: "400",
            // fontSize: 16,
            // lineHeight: 24,
            fontFamily: gStyles.fontMain.fontFamily,
            paddingHorizontal: 8,
            color: colors.error
        },
        appActionText: {
            fontWeight: "400",
            // fontSize: 16,
            // lineHeight: 24,
            fontFamily: gStyles.fontMain.fontFamily,
            paddingHorizontal: 8,
            color: colors.onSurfaceHigh
        },
        logOutIcon: {
            color: colors.error
        },
        directionIconStyle: {
            color: colors.onSurface
        },
        logoutModalText: {
            // fontSize: 16,
            // lineHeight: 24,
            fontFamily: gStyles.fontMain.fontFamily,
            color: colors.onSurfaceHigh
        },
    });
};


export default BoardScreen;
