import KhiyabunIcons from "../../components/KhiyabunIcons";
import { Text, View, StyleSheet, Pressable, Share, TouchableOpacity, I18nManager } from "react-native";
import { useTheme } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { CheckBox } from "@rneui/themed";
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
} from 'react-native-popup-menu';
import DraggableFlatList, { ScaleDecorator } from "react-native-draggable-flatlist";
import CustomModal from "../../components/CustomModal";
import DraggableCheckbox from "./DraggableCheckbox";
import { useTranslation } from "react-i18next";
import jalaali from "jalaali-js";
import { deleteRequest, putRequest } from "../../utils/sendRequest";
import { errorHandling } from "../../utils/errorHandling";
import { useSelector } from "react-redux";
import gStyles from "../../global-styles/GlobalStyles";
import CustomMenu from "../../components/customMenu";
import CustomText from "../../components/CustomText";


function CheckListItem({ item, editCallback, onEditCallback }) {
    const userToken = useSelector(state => state.login.token);
    const { colors } = useTheme();
    const { t, i18n } = useTranslation();
    const styles = useThemedStyles(colors)
    const [checkboxes, setCheckboxes] = useState([item.items]);
    const [checked, setChecked] = useState(false);
    const [isDeleteCheckListModalVisible, setIsDeleteCheckListModalVisible] = useState(false)
    const [isLocked, setIsLocked] = useState(item.private)
    const [isModalVisible, setIsModalVisible] = useState(false)
    const isRTL = I18nManager.isRTL;
    const currentDate = new Date(item.createDate);
    const jalaliDate = jalaali.toJalaali(currentDate);
    const dayJalali = jalaliDate.jd;
    const monthJalali = getJalaliMonthName(jalaliDate.jm);
    const yearJalali = jalaliDate.jy;
    const hourJalali = currentDate.getHours();
    const minuteJalali = currentDate.getMinutes();
    const formattedJalaliDate = `${dayJalali} ${monthJalali} ${yearJalali}, ${hourJalali}:${minuteJalali < 10 ? "0" + minuteJalali : minuteJalali} ${hourJalali >= 12 ? "ق.ظ." : "ب.ظ."}`;

    useEffect(() => {
        setCheckboxes(item.items);
    }, [item.items]);

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

    const toggleDeleteCheckListModal = () => setIsDeleteCheckListModalVisible(!isDeleteCheckListModalVisible)

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

    const toggleModal = () => {
        setIsModalVisible(!isModalVisible);
    };

    const toggleLock = () => {
        setIsLocked(!isLocked);
        setIsModalVisible(!isModalVisible);
    };

    const toggleCheckbox = () => setChecked(!checked);

    const handleCheckboxChange = async (id) => {
        const targetCheckBox = checkboxes.find(item => item.id === id);
        try {
            let res = await putRequest(`checklists/mark?checklistId=${item.objectId}&itemId=${id}&isDone=${!targetCheckBox.done}`, {}, userToken)
            console.log("CheckboxChange", res)
            if (res.statusCode === 200) {
                errorHandling(res, "confirm")
            } else {
                errorHandling(res, "warning")
            }
        } catch (e) {
            errorHandling(res, "error")
        }
        onEditCallback()
    };

    const deleteItem = async (id) => {
        const filteredData = checkboxes.filter(item => item.id !== id);
        console.log(filteredData)
        setCheckboxes(filteredData)
        try {
            const body = {
                title: item.title,
                items: filteredData,
            }
            console.log(body)
            let res = await putRequest(`checklists?id=${item.objectId}`, body, userToken)
            console.log("checklist edited", res)
            if (res.statusCode === 200) {
                errorHandling(res, "confirm")
            } else {
                errorHandling(res, "warning")
            }
        } catch (e) {
            errorHandling(res, "error")
        }

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
                        fontFamily={gStyles.fontMain.fontFamily}
                        containerStyle={styles.checkBox}
                        textStyle={styles.deleteText}
                    />

                </View>
            </View>
        )
    }


    const deleteCheckList = async () => {
        try {
            let res = await deleteRequest(`checklists?id=${item.objectId}`, {}, userToken)
            if (res.statusCode === 200) {
                errorHandling(res, "confirm")
            } else {
                errorHandling(res, "warning")
            }

        } catch (e) {
            errorHandling(res, "error")
        }
        onEditCallback()
    }


    const DeleteCheckListModal = () => {
        return (
            <Text style={styles.logoutModalText}>
                {t("delete_note_warning")}
            </Text>
        )
    }


    const renderCheckBox = ({ item, drag, isActive }) => <DraggableCheckbox item={item}
        checkHandler={handleCheckboxChange}
        deleteCallback={deleteItem} drag={drag}
        isActive={isActive} />


    const menuItems = [
        {
            text: "edit",
            onSelect: () => editCallback(item),
            icon: "edit-outline"
        },
        {
            text: "share",
            onSelect: onShare,
            icon: "share-outline"
        },
        {
            text: "Delete",
            onSelect: toggleDeleteCheckListModal,
            icon: "trash-outline",
            style: styles.popUpOptionLast
        },
    ];


    return (
        <>
            <View style={styles.note}>
                <View style={styles.noteHeader}>
                    <CustomText size={16} lineHeight={24} customStyle={styles.noteHeaderText} weight={"bold"} color={colors.onSurfaceHigh}>
                        {item.title}
                    </CustomText>

                    <View style={styles.noteHeaderIcon}>
                        <Pressable onPress={() => {
                            toggleModal()
                        }}>
                            {
                                isLocked && (
                                    <KhiyabunIcons name={"lock-outline"} size={16} color={colors.onSurfaceLowest} />

                                )
                            }
                            {
                                !isLocked && (
                                    <KhiyabunIcons name={"unlock-outline"} size={16} color={colors.onSurfaceLowest} />

                                )
                            }

                        </Pressable>
                        <CustomMenu items={menuItems} />
                    </View>
                </View>
                <DraggableFlatList
                    data={checkboxes}
                    renderItem={renderCheckBox}
                    keyExtractor={(item) => `draggable-item-${item.id}`}
                    onDragEnd={({ data: updatedData }) => setCheckboxes(updatedData)}
                />
                <CustomText size={10}
                    lineHeight={16} color={colors.onSurfaceLowest}>
                    {isRTL ? formattedJalaliDate : formattedDate}

                </CustomText>

            </View>
            <CustomModal type={"warning"}
                isVisible={isModalVisible}
                onClose={toggleModal}
                width={80}
                disabled={!checked}
                cancelButtonText={t("cancel")}
                actionButtonText={t("confirm")}
                hasCloseIcon={true}
                modalBody={<PrivateModal />}
                modalTitle={t("checkList_status")}
                actionCallback={toggleLock} />
            <CustomModal type={"warning"}
                isVisible={isDeleteCheckListModalVisible}
                onClose={toggleDeleteCheckListModal}
                width={80}
                cancelButtonText={t("cancel")}
                actionButtonText={t("confirm")}
                hasCloseIcon={true}
                modalBody={<DeleteCheckListModal />}
                modalTitle={"Note status"}
                actionCallback={deleteCheckList} />
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
        noteHeaderText: {
            width: "70%",
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
            fontFamily: gStyles.fontMain.fontFamily,
            color: colors.onSurfaceContainer,
            marginVertical: 8,
            textAlign: "justify"
        },

        radio: {
            backgroundColor: "transparent",
            borderWidth: 0,
            padding: 0,
            margin: 0,
            marginRight: 0,
            marginLeft: 0,
            marginVertical: 10,
        },

        title: {
            fontSize: 14,
            lineHeight: 24,
            color: colors.onSurfaceHigh,
            fontFamily: gStyles.fontMain.fontFamily

        },
        checkboxContainer: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
        },
        deleteIcon: {
            justifyContent: "center",
            alignItems: "center",
        },
        secondaryText: {
            fontSize: 14,
            lineHeight: 20,
            color: colors.onSurfaceLow,
            fontFamily: gStyles.fontMain.fontFamily,
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
            width: "90%",
            color: colors.onSurfaceHigh,
            fontFamily: gStyles.fontMain.fontFamily,
            textAlign: "justify"

        },
        deleteWrapper: {
            flexDirection: "row",
            alignItems: "stretch",
            justifyContent: "flex-end",
            marginVertical: 10,
            paddingRight: 10,
        },
    });
};


export default CheckListItem

