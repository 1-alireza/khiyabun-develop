import {useTranslation} from "react-i18next";
import {useTheme} from "@react-navigation/native";
import {Pressable, StyleSheet, Text, View} from "react-native";
import Sheet from "../../components/Sheet";
import Button from "../../components/Button";
import React, {useState, useEffect} from "react";
import Input from "../../components/Input";
import AudioRecorder from "./AudioRecorder";
import {CheckBox} from "@rneui/themed";
import {putRequest} from "../../utils/sendRequest";
// const editNote=async ()=>{
//     const body = {
//         title:header,
//         isPrivate:true,
//     }
//     let res = await putRequest(`profile/active_team?teamId=${teamId}`,)
//     console.log("activeTeam", res)
// }

const EditNoteSheet = ({isVisible, onClose, contentValue, headerValue, onChangeCallback, type, id}) => {
    const {t, i18n} = useTranslation();
    const {colors} = useTheme();
    const styles = useThemedStyles(colors)
    const [val, setVal] = useState(contentValue);
    const [titleVal, setTitleVal] = useState(headerValue);
    const [disabled, setDisabled] = useState(true);

    useEffect(() => {
        setVal(contentValue);
        setTitleVal(headerValue);
    }, [contentValue, headerValue]);
    const getInputValue = (value) => {
        setVal(value)
    }
    const getTitleInputValue = (value) => {
        setTitleVal(value)
    }


    const editTextNote = () => {
        onChangeCallback(titleVal, val, id)
    }
    const editVoiceNoteData = (uri, title) => {
        setVal(uri)
        setTitleVal(title)
        onChangeCallback(uri, title, "audio")
    }


    return (
        <Sheet isOpen={isVisible}
               contentWrapperStyle={styles.wrapper}
               fitContent={true}
               onClose={onClose}
               snapPoint={500}>
            <View style={styles.sheetHeader}>
                <Text style={styles.sheetHeaderText}>{t("Edit note")}</Text>
            </View>
            <View style={type === "VOICE" ? [styles.sheetBody, {height: 100}] : styles.sheetBody}>
                {type === "TEXT" ?
                    <>
                        <Input label={"Note title"}
                               onChangeText={getTitleInputValue}
                               value={titleVal}
                               customStyles={{marginBottom: 20}}
                               placeholder={"Attach a title to your note"}/>
                        <Input label={"Note Body"}
                               onChangeText={getInputValue}
                               value={val}
                               multiline={true}
                               linesNumber={20}
                               customStyles={{height: 150}}
                               placeholder={"Attach a note to your request"}/>
                        <View style={styles.sheetOptions}>
                            <Button label={"cancel"}
                                    sizeButton={"small"}
                                    style={styles.cancelButton}
                                    width={30}
                                    styleText={styles.cancelButtonText}
                                    onPress={onClose}
                            />
                            <Button label={"Save"}
                                    sizeButton={"medium"}
                                    style={styles.selectButton}
                                    styleText={styles.selectButtonText}
                                    width={70}
                                    onPress={() => editTextNote("text")}
                                    isBorder={true}
                                    borderColor={colors.primaryOutline}/>
                        </View>
                    </> :
                    <AudioRecorder onChangeCallback={editVoiceNoteData} type={"edit"} value={headerValue}
                                   onClose={onClose}/>
                }
            </View>
        </Sheet>


    )

}

const useThemedStyles = (colors) => {
    return StyleSheet.create({
        sheetBody: {
            paddingBottom: 16,
            gap: 8,
            width: "100%",
            height: 350,
            marginBottom: 40,

        },
        sheetOptions: {
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
            position: "absolute",
            bottom: -40,
            marginBottom: 20,
            width: "100%",
        },
        wrapper: {
            padding: 0,
            paddingHorizontal: 10,
            paddingVertical: 5
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
        recordVoiceWrapper: {
            justifyContent: 'center',
            alignItems: "center",
            gap: 8
        },

    });

};


export default EditNoteSheet;