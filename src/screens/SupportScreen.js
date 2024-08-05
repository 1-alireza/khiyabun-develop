import {TextInput, StyleSheet, Text, View, Pressable, Linking, Alert} from "react-native";
import {useCallback, useState} from "react";
import CustomDropdown from "../components/CustomDropdown";
import {useTheme} from "@react-navigation/native";
import KhiyabunIcons from "../components/KhiyabunIcons";
import {useTranslation} from "react-i18next";


function SupportScreen() {
    const {t, i18n} = useTranslation();
    const {colors} = useTheme();
    const styles = useThemedStyles(colors)
    const [supportSubjectSelected, setIsSupportSubjectSelected] = useState(false);
    const [supportSubject, setSupportSubject] = useState("");
    const supportOptions = [
        {label: "Start a conversation", value: "Start a conversation"},
        {label: "Report a bug", value: "Report a bug"},
        {label: "Features request", value: "Features request"},
        {label: "Talk to cofounders", value: "Talk to cofounders"},
    ]

    const changeSupportSubjected=(subject)=>{
        setIsSupportSubjectSelected(!supportSubjectSelected)
        setSupportSubject(subject)
    }
    return (
        <View style={styles.mainView}>

            {supportSubjectSelected &&( <View style={styles.supportSubjectWrapper}>
                <Text style={styles.supportSubject}>{t("subject")} :</Text>
                <Text style={styles.supportSubjectText}>{supportSubject}</Text>
            </View>)}
            {supportSubjectSelected &&(
                <View style={styles.supportInputWrapper}>
            <Pressable style={{width:"7%"}} >
                <KhiyabunIcons name={"smile-outline"} size={24} color={colors.onSurface} />
            </Pressable>
            <TextInput style={styles.supportInput} placeholder={t("write_message")}
                       placeholderTextColor={colors.onSurfaceLowest} />
            <View style={styles.supportInputActions} >
                <Pressable>
                    <KhiyabunIcons name={"attach-outline"} size={24} color={colors.onSurface}/>
                </Pressable>
                <Pressable>
                    <KhiyabunIcons name={"microphone-outline"} size={24} color={colors.onSurface}/>
                </Pressable>

            </View>
        </View>
            )}
            {!supportSubjectSelected &&(
                <View style={styles.dropDownWrapper}>
                    <CustomDropdown data={supportOptions} defaultValue={"supportOptions"}
                                    placeHolder={"Select conversation subject"} callBackFunction={changeSupportSubjected}/>
                </View>
            )}
        </View>


    )
}

const useThemedStyles = (colors) => {
    return StyleSheet.create({
        mainView: {
            paddingBottom: 16,
            justifyContent: "center",
            position: "relative",
            height: "100%"
        },
        dropDownWrapper: {
            width: "80%",
            marginTop: 100,
            position: "absolute",
            left: 40,
            top: 200
        },
        supportSubjectWrapper: {
            flexDirection: "row",
            justifyContent: 'flex-start',
            alignItems: "center",
            position: "absolute",
            top: 0,
            width: "100%",
            paddingHorizontal: 20,
            paddingVertical: 10,
            gap: 70,
            backgroundColor: colors.surfaceContainerLowest
        },
        supportSubject: {
            color: colors.onSurfaceLow,
            fontSize: 14,
            lineHeight: 20,
            fontFamily: "dana-regular",
        },
        supportSubjectText: {
            color: colors.onSurface,
            fontFamily: "dana-bold",
            fontSize: 14,
            lineHeight: 20,

        },
        supportInputWrapper: {
            flexDirection: "row",
            justifyContent: 'flex-start',
            alignItems: "center",
            position: "absolute",
            bottom: 0,
            width: "100%",
            paddingHorizontal: 10,
            paddingVertical: 10,
            backgroundColor: colors.surfaceContainerLowest,
            gap:5
        },
        supportInput: {
            color: colors.onSurface,
            width: "70%",
            height: "100%",
        },
        supportInputActions: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent:"space-around",
            width:"20%",
        }
    });
};


export default SupportScreen