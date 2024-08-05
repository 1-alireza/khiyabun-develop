import KhiyabunIcons from "../../components/KhiyabunIcons";
import {Text, View, StyleSheet, Pressable, Share, I18nManager} from "react-native";
import {useTheme} from "@react-navigation/native";
import React, {useState} from "react";
import VoicePlayer from "./VoicePlayer";
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
} from 'react-native-popup-menu';
import CustomModal from "../../components/CustomModal";
import {CheckBox} from "@rneui/themed";
import gStyles from '../../global-styles/GlobalStyles'
import {useTranslation} from "react-i18next";
import {deleteRequest, putRequest} from "../../utils/sendRequest";
import {errorHandling} from "../../utils/errorHandling";
import jalaali from "jalaali-js";

function TextNote({item, onDeleteCallBack, openEditSheet}) {
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false)
    const [checked, setChecked] = useState(false);
    const [isLocked, setIsLocked] = useState(item.isPrivate)
    const {t, i18n} = useTranslation();
    const {colors} = useTheme();
    const styles = useThemedStyles(colors)
    const isRTL = I18nManager.isRTL;
    const currentDate = new Date(item.createDate);
    const jalaliDate = jalaali.toJalaali(currentDate);

    const dayJalali = jalaliDate.jd;
    const monthJalali = getJalaliMonthName(jalaliDate.jm);
    const yearJalali = jalaliDate.jy;
    const hourJalali = currentDate.getHours();
    const minuteJalali = currentDate.getMinutes();

    const formattedJalaliDate = `${dayJalali} ${monthJalali} ${yearJalali}, ${hourJalali}:${minuteJalali < 10 ? "0" + minuteJalali : minuteJalali} ${hourJalali >= 12 ? "ق.ظ." : "ب.ظ."}`;

    function getJalaliMonthName(monthNumber) {
        const monthNames = [
            "فروردین", "اردیبهشت", "خرداد", "تیر",
            "مرداد", "شهریور", "مهر", "آبان",
            "آذر", "دی", "بهمن", "اسفند"
        ];
        return monthNames[monthNumber - 1];
    }

    const options = {
        day: '2-digit', // Day of the month (e.g., 16)
        month: 'short', // Short month name (e.g., Nov)
        year: 'numeric', // Full year (e.g., 2023)
        hour: '2-digit', // Hour (e.g., 09)
        minute: '2-digit', // Minute (e.g., 24)
        hour12: true, // Use 12-hour clock (am/pm)
        locale: 'en-US', // Set the locale to Iranian Persian
        // locale: 'fa-IR', // Set the locale to Iranian Persian
    };
    const formattedDate = currentDate.toLocaleString('en-US', options);

    const toggleModal = () => setIsModalVisible(!isModalVisible);
    const toggleDeleteModal = () => setIsDeleteModalVisible(!isDeleteModalVisible);
    const toggleCheckbox = () => setChecked(!checked);

    const toggleLock = async () => {
        try {
            const body = {
                isPrivate: !item.status,
            }
            let res = await putRequest(`notes?id=${item.id}`, body)
            console.log("activeTeam", res)
            if (res.statusCode === 200) {
                setIsLocked(!isLocked);
                errorHandling(res, "confirm")
            } else {
                errorHandling(res, "warning")
            }
        } catch (e) {
            errorHandling(res, "error")
        }
        onDeleteCallBack()
        setIsModalVisible(!isModalVisible);
    };
    const deleteNote = async () => {
        try {
            let res = await deleteRequest(`notes?id=${item.id}`)
            console.log("note deleted", res)
            if (res.statusCode === 200) {
                errorHandling(res, "confirm")
            } else {
                errorHandling(res, "warning")
            }

        } catch (e) {
            errorHandling(res, "error")
        }
        onDeleteCallBack()
    }


    const PrivateModal = () => {
        return (
            <View>
                <Text style={styles.secondaryText}>
                    {t("status_warning")}
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
                        title={t("do_not_show")}
                        checkedColor={colors.primary}
                        containerStyle={styles.checkBox}
                        textStyle={styles.deleteText}
                    />

                </View>
            </View>
        )
    }
    const DeleteModal = () => {
        return (
            <Text style={styles.logoutModalText}>
                {t("delete_note_warning")}
            </Text>
        )
    }


    const onShare = async () => {
        try {
            const result = await Share.share({
                message: 'Check out this awesome app built with React Native!',
            });
            if (result.action === Share.sharedAction) {
                // Content shared successfully
            } else if (result.action === Share.dismissedAction) {
                // User dismissed the share dialog
            }
        } catch (error) {
            alert(error.message);
        }
    }


    return (
        <>
            <View style={styles.note}>
                <View style={styles.noteHeader}>
                    <Text style={styles.noteHeaderText}>
                        {item.title}
                    </Text>
                    <View style={styles.noteHeaderIcon}>
                        <Pressable onPress={() => {
                            toggleModal()
                        }}>
                            {
                                isLocked && (
                                    <KhiyabunIcons name={"lock-outline"} size={16} color={colors.onSurfaceLowest}/>

                                )
                            }
                            {
                                !isLocked && (
                                    <KhiyabunIcons name={"unlock-outline"} size={16} color={colors.onSurfaceLowest}/>

                                )
                            }
                        </Pressable>
                        <Menu>
                            <MenuTrigger>
                                <KhiyabunIcons name={"more-bold"} size={20} color={colors.onSurface}/>
                            </MenuTrigger>
                            <MenuOptions optionsContainerStyle={styles.popUp}>
                                <MenuOption style={styles.popUpOption} onSelect={() => openEditSheet(item)}>
                                    <KhiyabunIcons name={"edit-outline"} size={20} color={colors.onSurfaceHigh}/>
                                    <Text style={styles.popUpOptionText}>{t("edit")}</Text>
                                </MenuOption>
                                <MenuOption style={styles.popUpOption} onSelect={() => onShare()}>
                                    <KhiyabunIcons name={"share-outline"} size={20} color={colors.onSurfaceHigh}/>
                                    <Text style={styles.popUpOptionText}>{t("share")}</Text>
                                </MenuOption>
                                <MenuOption style={styles.popUpOptionLast} onSelect={toggleDeleteModal}>
                                    <KhiyabunIcons name={"trash-outline"} size={20} color={colors.onSurfaceHigh}/>
                                    <Text style={styles.popUpOptionText}>{t("Delete")}</Text>
                                </MenuOption>
                            </MenuOptions>
                        </Menu>
                    </View>
                </View>
                {item.type === "TEXT" && (
                    <Text style={styles.noteText}>
                        {item.text}
                    </Text>
                )}
                {item.type === "audio" && (
                    <VoicePlayer audioFile={item.content}/>
                )}

                <Text style={styles.noteFooterText}>
                    {isRTL ? formattedJalaliDate : formattedDate}
                </Text>
            </View>
            <CustomModal type={"warning"}
                         isVisible={isModalVisible}
                         onClose={toggleModal} width={80}
                         cancelButtonText={t("cancel")}
                         actionButtonText={t("confirm")}
                         hasCloseIcon={true}
                         modalBody={<PrivateModal/>}
                         modalTitle={t("note_status")}
                         disabled={!checked}
                         actionCallback={toggleLock}/>
            <CustomModal type={"warning"}
                         isVisible={isDeleteModalVisible}
                         onClose={toggleDeleteModal}
                         width={80}
                         cancelButtonText={t("cancel")}
                         actionButtonText={t("confirm")}
                         hasCloseIcon={true}
                         modalBody={<DeleteModal/>}
                         modalTitle={t("delete_note")}
                         actionCallback={deleteNote}/>

        </>
    )

}

const useThemedStyles = (colors) => {
    return StyleSheet.create({
        note: {
            paddingHorizontal: 16,
            paddingVertical: 8,
        },
        noteHeader: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
        },
        logoutModalText: {
            fontSize: 14,
            lineHeight: 24,
            fontFamily: gStyles.fontMain.fontFamily,
            color: colors.onSurfaceHigh
        },
        noteHeaderText: {
            fontSize: 16,
            lineHeight: 24,
            width: "70%",
            fontFamily: "dana-bold",
            color: colors.onSurfaceHigh
        },
        noteHeaderIcon: {
            flexDirection: "row",
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8
        },
        noteText: {
            fontSize: 12,
            lineHeight: 16,
            fontFamily: gStyles.fontBold.fontFamily,// "dana-regular",
            color: colors.onSurfaceContainer,
            marginVertical: 8,
            maxHeight: 144,
            textAlign: "justify"
        },
        noteFooterText: {
            color: colors.onSurfaceLowest,
            fontSize: 10,
            fontFamily: 'dana-regular',
            lineHeight: 16
        },
        popUp: {
            borderRadius: 8,
            backgroundColor: colors.surfaceContainerLowest,
        },
        popUpOption: {
            flexDirection: "row",
            alignItems: 'center',
            justifyContent: "flex-start",
            height: 57,
            gap: 8,
            borderBottomColor: colors.outlineSurface,
            borderBottomWidth: 1,
            paddingVertical: 8,
            paddingHorizontal: 12

        },
        popUpOptionLast: {
            flexDirection: "row",
            alignItems: 'center',
            justifyContent: "flex-start",
            height: 57,
            gap: 8,
            paddingVertical: 8,
            paddingHorizontal: 12

        },
        popUpOptionText: {
            fontSize: 16,
            lineHeight: 24,

            fontFamily: 'dana-regular',
            color: colors.onSurfaceHigh
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
            backgroundColor: "transparent",
            borderWidth: 0,
            padding: 0,
            margin: 0,
            marginRight: 0,
            marginLeft: 0,
            marginBottom:0
        },
        deleteText: {
            fontSize: 14,
            lineHeight: 24,
            width: "90%",
            color: colors.onSurfaceHigh,
            fontFamily: "dana-regular",
            textAlign: "justify"
        },
        deleteWrapper: {
            flexDirection: "row",
            alignItems: "stretch",
            justifyContent: "flex-end",
            marginVertical: 10,
            paddingRight: 10
        },

    });
};

export default TextNote
