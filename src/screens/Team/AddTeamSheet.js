import {useTranslation} from "react-i18next";
import {useTheme} from "@react-navigation/native";
import {Pressable, StyleSheet, Text, View} from "react-native";
import Sheet from "../../components/Sheet";
import Button from "../../components/Button";
import React, {useEffect, useState} from "react";
import Input from "../../components/Input";
import {putRequest, postRequest} from "../../utils/sendRequest";
import {CheckBox} from "@rneui/themed";
import {TabView, SceneMap} from 'react-native-tab-view';
import {errorHandling} from "../../utils/errorHandling";

const AddTeamSheet = ({isVisible, onClose}) => {
    const {t, i18n} = useTranslation();
    const {colors} = useTheme();
    const styles = useThemedStyles(colors)
    const [disabled, setDisabled] = useState(true)
    const [checked, setChecked] = useState(false)
    const [teamCode, setTeamCode] = useState('')
    const getTeamCode = (val) => {
        setTeamCode(teamCode => val)
        console.log(teamCode)
        val === '' ? setDisabled(true) : setDisabled(false)
    }


    const joinTeam = async () => {
        try {
            const body = {
                invitationCode: teamCode,
            }
            let res = await postRequest("teams", body)
            console.log("joinedTeam", res)
            if (res.statusCode === 200) {
                errorHandling(res, "confirm")
                if (checked) {
                    setActiveTeam(res.data.id)
                }
            } else {
                console.log("warning")
                errorHandling(res, "warning")
            }
        } catch (e) {
            errorHandling(res, "error")
        }
        setTeamCode('')
        setDisabled(true)
        setChecked(false)
        onClose()


    }

    const setActiveTeam = async (selectedTeamId) => {
        try {
            console.log("id", selectedTeamId)
            let res = await putRequest(`profile/active_team?teamId=${selectedTeamId}`,)
            console.log("activeTeam", res)
            if (res.statusCode === 200) {
                errorHandling(res, "confirm")
            } else {
                errorHandling(res, "warning")

            }
        } catch (e) {
            errorHandling(res, "error")

        }
        onClose()
    }


    return (
        <Sheet isOpen={isVisible} fitContent={true} onClose={onClose} snapPoint={500}>
            <View style={styles.sheetHeader}>
                <Text style={styles.sheetHeaderText}>{t("Join_team_using_code")}</Text>
            </View>
            <View style={styles.sheetBody}>
                <Text>
                    {t("enter_team_info")}
                </Text>
                <Input placeholder={t("team_code")} onChangeText={getTeamCode}/>
                <View style={styles.deleteWrapper}>
                    <CheckBox
                        iconRight={false}
                        size={20}
                        checked={checked}
                        onPress={() => setChecked(!checked)}
                        iconType="material-community"
                        checkedIcon="checkbox-marked"
                        uncheckedIcon="checkbox-blank-outline"
                        checkedColor={colors.primary}
                        containerStyle={styles.checkBox}
                        title={t("active_team")}
                        textStyle={styles.deleteText}
                    />
                </View>
            </View>
            <View style={styles.sheetOptions}>
                <Button label={t("cancel")} sizeButton={"small"} style={styles.cancelButton} width={40}
                        styleText={styles.cancelButtonText} onPress={onClose}/>
                <Button label={t("join")} sizeButton={"medium"} style={styles.selectButton}
                        styleText={styles.selectButtonText} disabled={disabled} width={60} onPress={joinTeam}
                        isBorder={true} borderColor={colors.primaryOutline}/>
            </View>
        </Sheet>


    )

}

const useThemedStyles = (colors) => {
    return StyleSheet.create({
        sheetBody: {
            paddingBottom: 16,
            flexDirection: "column",
            gap: 8,
            width: "100%",
            height: 200
        },
        sheetOptions: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            position: "absolute",

            bottom: 0,
            marginBottom: 20,
            width: "100%",
        },
        selectButton: {
            borderRadius: 8,
            backgroundColor: colors.primaryContainer,
            justifyContent: "center",
            alignItems: "center"
        },
        selectButtonText: {
            fontWeight: "500",
            fontSize: 16,
            lineHeight: 24,
            fontFamily: "dana-regular",
            color: colors.darkPrimary
        },
        cancelButton: {
            borderRadius: 8,
            backgroundColor: colors.surfaceContainerLowest,
            justifyContent: "center",
            alignItems: "center"
        },
        cancelButtonText: {
            fontWeight: "500",
            fontSize: 16,
            lineHeight: 24,
            fontFamily: "dana-regular",
            color: colors.darkPrimary
        },
        sheetHeader: {
            backgroundColor: colors.surfaceContainerLowest,
            marginHorizontal: 16,
            marginVertical: 8,
            justifyContent: "center",
            alignItems: "center"
        },
        sheetHeaderText: {
            paddingHorizontal: 16,
            color: colors.onSurface,
            fontFamily: "dana-bold",
            lineHeight: 24
        },
        checkBox: {
            backgroundColor: "transparent",
            borderWidth: 0,
            padding: 0,
            margin: 0,
            marginRight: 0,
            marginLeft: 0,
            marginBottom: 0,
            marginTop: 5
        },
        deleteText: {
            fontSize: 14,
            lineHeight: 20,
            color: colors.onSurfaceHigh,
            fontFamily: "dana-regular",
            textAlign: "justify"

        },

    });
};


export default AddTeamSheet;