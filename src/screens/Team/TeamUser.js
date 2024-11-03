import {I18nManager, Image, Pressable, StyleSheet, Text, View} from "react-native";
import {useTranslation} from "react-i18next";
import {useTheme} from "@react-navigation/native";
import React, {useState} from "react";
import {deleteRequest, putRequest} from "../../utils/sendRequest";
import gStyles from "../../global-styles/GlobalStyles";
import CustomModal from "../../components/CustomModal";
import {errorHandling} from "../../utils/errorHandling";
import Chips from "../../components/Chips";
import {useSelector} from "react-redux";
import CustomMenu from "../../components/customMenu";


function TeamUser({item, onDeleteCallBack}) {
    const {t, i18n} = useTranslation();
    const userToken = useSelector(state => state.login.token);
    const {colors} = useTheme();
    const isRTL = I18nManager.isRTL;
    const styles = useThemedStyles(colors, isRTL)
    const [isLeaveModalVisible, setIsLeaveModalVisible] = useState(false)
    const [isActiveModalVisible, setIsActiveModalVisible] = useState(false)
    const toggleDeleteModal = () => setIsLeaveModalVisible(!isLeaveModalVisible);
    const toggleActiveModal = () => setIsActiveModalVisible(!isActiveModalVisible);

    const leaveTeam = async () => {
        try {
            let res = await deleteRequest(`teams?id=${item.id}`, {}, userToken)
            console.log("teamDeleted", res)
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

    const menuItems = [
        {
            text: "set_as_active",
            onSelect: toggleActiveModal,
            icon: "info-circle-outline"
        },
        {
            text: "team_info",
            onSelect: () => console.log("TeamList Info"),
            icon: "info-circle-outline"
        },
        {
            text: "leave_team",
            onSelect: toggleDeleteModal,
            icon: "trash-outline"
        },
    ];


    const setActiveTeam = async (selectedTeamId) => {
        try {
            console.log("id", selectedTeamId)
            let res = await putRequest(`profile/active_team?teamId=${selectedTeamId}`, {}, userToken)
            console.log("activeTeam", res)
            if (res.statusCode === 200) {
                errorHandling(res, "confirm")
            } else {
                errorHandling(res, "warning")

            }
        } catch (e) {
            errorHandling(res, "error")

        }
        setIsActiveModalVisible(false)
        onDeleteCallBack()
    }


    const LeaveTeamModal = () => {
        return (
            <Text style={styles.logoutModalText}>
                {t("leave_team_warning")}
            </Text>
        )
    }
    const SetActiveTeamModal = () => {
        return (
            <Text style={styles.logoutModalText}>
                {t("set_active_team_warning")}
            </Text>
        )
    }
    const trimmedName = item.name?.length > 0 ? item.name?.charAt(0) : '';
    return (
        <>
            <Pressable style={styles.blockUser}>
                <View style={styles.userData}>
                    {item.teamImage ? (
                            <Image source={{uri: `http://${item.teamImage.downloadUrl}`}} style={styles.avatarImage}
                                   onError={(error) => console.log('Image failed to load', error.nativeEvent.error)}
                            />
                        ) :

                        (
                            <View style={styles.contactProfile}>
                                <Text style={styles.contactShortName}>
                                    {trimmedName}
                                </Text>
                            </View>
                        )
                    }
                    <View>
                        <Text style={styles.username}>
                            {item.name}
                        </Text>
                        <Text style={styles.userDistance}>
                            {item.numberOfMembers}
                        </Text>
                    </View>
                </View>
                {
                    item.activeTeam && (
                        <Chips type={"confirm"} text={t("active_team_chips")} width={80}/>
                    )
                }
                <CustomMenu items={menuItems} />

            </Pressable>
            <CustomModal type={"warning"}
                         isVisible={isLeaveModalVisible}
                         onClose={toggleDeleteModal}
                         width={80}
                         cancelButtonText={t("cancel")}
                         actionButtonText={t("confirm")}
                         hasCloseIcon={true}
                         modalBody={<LeaveTeamModal/>}
                         modalTitle={t("leave_team")}
                         actionCallback={leaveTeam}/>
            <CustomModal type={"warning"}
                         isVisible={isActiveModalVisible}
                         onClose={toggleActiveModal}
                         width={80}
                         cancelButtonText={t("cancel")}
                         actionButtonText={t("confirm")}
                         hasCloseIcon={true}
                         modalBody={<SetActiveTeamModal/>}
                         modalTitle={t("set_as_active")}
                         actionCallback={() => setActiveTeam(item.id)}/>
        </>

    )

}

const useThemedStyles = (colors, isRTl) => {
    return StyleSheet.create({
        blockUser: {
            flexDirection: "row",
            alignItems: 'center',
            justifyContent: "space-between",
            padding: 8
        },
        activeTeam: {
            flexDirection: "row",
            alignItems: 'center',
            justifyContent: "space-between",
            padding: 8
        },
        contactProfile: {
            width: 40,
            height: 40,
            borderRadius: 100,
            backgroundColor: colors.primary,
            justifyContent: "center",
            alignItems: "center",
        },
        logoutModalText: {
            fontSize: 14,
            lineHeight: 24,
            fontFamily: gStyles.fontMain.fontFamily,
            color: colors.onSurfaceHigh
        },
        contactShortName: {
            fontFamily: gStyles.fontBold.fontFamily,
            fontSize: 18,
            color: colors.surfaceContainerLowest,
            marginTop: 4
        },
        userData: {
            flexDirection: "row",
            alignItems: "center",
            gap: 16
        },
        username: {
            fontSize: 16,
            lineHeight: 24,
            fontFamily: gStyles.fontMain.fontFamily,
            color: colors.onSurface

        },
        userDistance: {
            fontFamily: isRTl ? gStyles.danaPersianNumber.fontFamily : gStyles.fontMain.fontFamily,
            fontSize: 14,
            lineHeight: 20,
            color: colors.onSurfaceLow
        },
        unBlock: {
            color: colors.darkPrimary,
            fontFamily: gStyles.fontBold.fontFamily,
            fontSize: 14,
            lineHeight: 20
        },
        avatarImage: {
            width: 40,
            height: 40,
            borderRadius: 50,
            overflow: "hidden",
        },
        popUpRTl: {
            borderRadius: 8,
            backgroundColor: colors.surfaceContainerLowest,
            position: "relative",
            left: 0,
            marginLeft: 155,
            paddingRight: 20,
            width: 220
        },
        popUp: {
            borderRadius: 8,
            backgroundColor: colors.surfaceContainerLowest,
            position: "relative",
            left: 0,
            marginLeft: 155,
            paddingRight: 20,
            width: 220
        },
        popUpOption: {
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
            fontFamily: gStyles.fontMain.fontFamily,
            color: colors.onSurfaceHigh
        },
    });
};

export default TeamUser