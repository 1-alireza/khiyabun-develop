import React, {useState, useEffect} from "react";
import {Audio,} from "expo-av";
import {View, Text, Pressable, StyleSheet} from 'react-native'
import VoicePlayer from "./VoicePlayer";
import KhiyabunIcons from "../../components/KhiyabunIcons";
import {useTranslation} from "react-i18next";
import Input from "../../components/Input";
import * as FileSystem from 'expo-file-system';
import {useTheme} from "@react-navigation/native";
import Button from "../../components/Button";

export const AudioRecorder = ({onChangeCallback, type, value, onClose}) => {
    const {t, i18n} = useTranslation();
    const {colors} = useTheme();
    const styles = useThemedStyles(colors)
    const [recording, setRecording] = useState();
    const [uri, setUri] = useState();
    const [isRecording, setIsRecording] = useState(false);
    const [recordingDone, setRecordingDone] = useState(false);
    const [val, setVal] = useState('');
    const [disabled, setDisabled] = React.useState(true);


    useEffect(() => {
        // Request audio recording permission on component mount
        askForAudioPermission();
    }, []);

    const askForAudioPermission = async () => {
        const {status} = await Audio.requestPermissionsAsync()
        if (status !== 'granted') {
            alert('Permission to access audio recording was denied');
        }
    };
    const getInputValue = (value) => {
        setVal(value)
    }
    const startRecording = async () => {
        setRecordingDone(false)
        setDisabled(true)

        try {
            console.log('Requesting permissions..');
            console.log('Starting recording..');
            const {recording} = await Audio.Recording.createAsync(
                Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
            );
            setRecording(recording);
            setIsRecording(true);
            console.log('Recording started');
        } catch (err) {
            console.error('Failed to start recording', err);
        }
    };


    const stopRecording = async () => {
        console.log('Stopping recording..');
        setIsRecording(false);
        try {
            await recording.stopAndUnloadAsync();
        } catch (err) {
            // Do nothing -- already unloaded.
        }

        const uri = recording.getURI();
        setRecordingDone(true)
        setDisabled(false)

        setUri(uri)
        // const soundObject = new Audio.Sound();
        // await soundObject.loadAsync({ uri });
        // await soundObject.playAsync();
        console.log('Recording stopped and stored at', uri);
        setRecording(undefined)
        const fileName = uri;

        const fileInfo = await FileSystem.getInfoAsync(fileName);
        alert(fileInfo.exists);
    };


    return (
        <View style={styles.voiceNoteWrapper}>
            <Input label={t("note_title")} customStyles={styles.input} onChangeText={getInputValue} value={value}
                   placeholder={t("attach_note")}/>
            {!isRecording && type === "add" ? (<Pressable style={styles.recordVoiceWrapper}>
                <Pressable style={styles.recordVoice} onLongPress={startRecording} on>
                    <KhiyabunIcons name={"microphone-outline"} size={24} color={colors.textOn}/>
                </Pressable>
                <Text style={styles.recordText}>{recordingDone ? "Record again" : "Record voice"}</Text>
            </Pressable>
            )
                : isRecording && type === "add" ?
                <Pressable style={styles.recordVoiceWrapper}>
                    <Pressable style={styles.recordVoice} onPress={stopRecording}>
                        <KhiyabunIcons name={"stop-bold"} size={24} color={colors.textOn}/>
                    </Pressable>
                    <Text style={styles.recordText}>stop recording</Text>
                </Pressable> : ""
            }
            {recordingDone && (
                <VoicePlayer audioFile={uri}/>
            )}
            <View style={styles.sheetOptions}>
                <Button label={t("cancel")} sizeButton={"small"} style={styles.cancelButton} width={30}
                        onPress={onClose}
                        styleText={styles.cancelButtonText}/>
                <Button label={t("save")} disabled={disabled} sizeButton={"medium"} style={styles.selectButton}
                        styleText={styles.selectButtonText} width={70}
                        isBorder={true} borderColor={colors.primaryOutline} onPress={() => onChangeCallback(uri, val)}/>
            </View>
        </View>


    );
};

const useThemedStyles = (colors) => {
    return StyleSheet.create({
        recordVoice: {
            backgroundColor: colors.primary,
            height: 56,
            width: 56,
            borderRadius: 100,
            justifyContent: "center",
            alignItems: "center"
        },
        recordVoiceWrapper: {
            justifyContent: 'center',
            alignItems: "center",
            gap: 8,
            width: "100%",
        },
        voiceTab: {
            backgroundColor: colors.surfaceContainerLowest,
            width: '100%',
            justifyContent: 'center',
            alignItems: "center"
        },
        input: {
            marginBottom: 50
        },
        recordText: {
            fontSize: 14,
            lineHeight: 20,
            color: colors.onSurface
        },
        sheetOptions: {
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
            width: "100%",
            marginTop: 65

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
        voiceNoteWrapper: {
            paddingVertical: 16,
            paddingHorizontal: 8,
            width: "100%",
            height: "100%",
            backgroundColor: colors.surfaceContainerLowest
        }

    });

};

export default AudioRecorder;