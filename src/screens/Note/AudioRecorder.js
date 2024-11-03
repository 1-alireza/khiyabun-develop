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
import gStyles from "../../global-styles/GlobalStyles";
import CustomText from "../../components/CustomText";
import {useUploadFile} from "../../utils/uploadMedia";
import {useSelector} from "react-redux";
import {errorHandling} from "../../utils/errorHandling";
import {postRequest} from "../../utils/sendRequest";

export const AudioRecorder = ({onChangeCallback, type, value, onClose, status}) => {
    const {t, i18n} = useTranslation();
    const {colors} = useTheme();
    const styles = useThemedStyles(colors)
    const userToken = useSelector(state => state.login.token);
    const [recording, setRecording] = useState();
    const [uri, setUri] = useState();
    const [isRecording, setIsRecording] = useState(false);
    const [recordingDone, setRecordingDone] = useState(false);
    const [val, setVal] = useState('');
    const [disabled, setDisabled] = React.useState(true);
    const [voiceData, setVoiceData] = useState({});
    const [fileName, setFileName] = useState('');
    const [fileType, setFileType] = useState('');
    const {uploadFile} = useUploadFile();
    const uploadState = useSelector((state) => state.upload);
    const [uploadStatus, setUploadStatus] = useState('');
    const [progress, setProgress] = useState(0);
    const [elapsedTime, setElapsedTime] = useState(0);
    const [timerId, setTimerId] = useState(0);
    const [timerActive, setTimerActive] = useState(false);
    const startTimer = () => {
        setTimerActive(true);
        setElapsedTime(0);

        // Update the timer every second
        const timerId = setInterval(() => {
            setElapsedTime((prevTime) => prevTime + 1);
        }, 1000);

        return timerId;
    };

    const stopTimer = (timerId) => {
        setTimerActive(false);
        clearInterval(timerId);
    };

    const handleUpload = async (setProgress, file) => {
        console.log(file, "heree")
        const result = await uploadFile(setProgress, file);
        console.log(result.data.data[0], "sfa")
        setVoiceData(result.data.data[0])
        if (result.success) {
            console.log("uplaod res", result)
            errorHandling(result.data, "confirm")
        } else {
            errorHandling(result.data, "error")
        }
        setProgress(0);

    };

    useEffect(() => {
        askForAudioPermission();
    }, []);

    const askForAudioPermission = async () => {
        const {status} = await Audio.requestPermissionsAsync()
        if (status !== 'granted') {
            console.log('Permission to access audio recording was denied');
        }
    };

    const getInputValue = (value) => {
        setVal(value)
    }

    const startRecording = async () => {
        setRecordingDone(false)
        const id = startTimer(); // Start the timer and get the timer ID
        setTimerId(id);

        try {
            const {recording} = await Audio.Recording.createAsync(
                {
                    // You can configure the audio recording settings here
                    android: {
                        extension: '.wav',
                        outputFormat: Audio.RECORDING_OPTION_OUTPUT_FORMAT_WAVE,
                        audioEncoder: Audio.RECORDING_OPTION_AUDIO_ENCODER_PCM,
                        sampleRate: 44100,
                        numberOfChannels: 1,
                    },
                    ios: {
                        // Settings specific to iOS
                        extension: '.wav',
                        outputFormat: Audio.RECORDING_OPTION_OUTPUT_FORMAT_LINEAR_PCM,
                        audioEncoder: Audio.RECORDING_OPTION_AUDIO_ENCODER_LINEAR_PCM,
                        sampleRate: 44100,
                        numberOfChannels: 1,
                        // Optionally, add more settings here
                    },
                }
            );
            console.log(recording)
            setRecording(recording);
            setIsRecording(true);
        } catch (err) {
        }
    };

    const addVoiceNote = async () => {
        let body = {
            title: val,
            type: "VOICE",
            isPrivate: status,
            voice: voiceData
        }
        try {
            let res = await postRequest("notes", body, userToken)
            if (res.statusCode === 200) {
                errorHandling(res, "confirm")
            } else {
                errorHandling(res, "warning")
            }
        } catch (e) {
            errorHandling(res, "error")
        } finally {
            onChangeCallback()
            onClose()
        }
    }

    const stopRecording = async () => {
        setIsRecording(false);
        stopTimer(timerId); // Stop the timer
        try {
            await recording.stopAndUnloadAsync();
        } catch (err) {
            // Do nothing -- already unloaded.
        }
        const uri = recording.getURI();
        if (uri) {
            // Use FileSystem API to get details
            const fileUriParts = uri.split('/');
            const nameWithExtension = fileUriParts[fileUriParts.length - 1];
            const nameParts = nameWithExtension.split('.');
            const name = nameParts[0]; // filename without extension
            const type = nameParts.length > 1 ? nameParts[nameParts.length - 1] : ''; // file type
            const file = {
                uri: uri,
                name: name,
                type: `Audio/${type}`
            };
            handleUpload(setProgress, file)
            setFileName(name);
            setFileType(type);
        }
        setTimeout(() => {


        }, 400)

        setRecordingDone(true)

        setUri(uri)
        console.log('Recording stopped and stored at', uri);
        setRecording(undefined)

        const fileInfo = await FileSystem.getInfoAsync(uri);
        console.log(fileInfo.exists);
    };


    return (
        <View style={styles.voiceNoteWrapper}>
            <Input label={t("note_title")} customStyles={styles.input} onChangeText={getInputValue} value={value}
                   placeholder={t("attach_note")}/>
            {!isRecording && type === "add" ? (<Pressable style={styles.recordVoiceWrapper}>
                        <Pressable style={styles.recordVoice} onLongPress={startRecording}>
                            <KhiyabunIcons name={"microphone-outline"} size={24} color={colors.textOn}/>
                        </Pressable>
                        <CustomText size={14} lineHeight={20}
                                    color={colors.onSurface}>{recordingDone ? t("record_again") : t("record")}</CustomText>
                    </Pressable>
                )
                : isRecording && type === "add" ?
                    <Pressable style={styles.recordVoiceWrapper}>
                        <Pressable style={styles.recordVoice} onPress={stopRecording}>
                            <KhiyabunIcons name={"stop-bold"} size={24} color={colors.textOn}/>
                        </Pressable>
                        <CustomText size={14} lineHeight={20} color={colors.onSurface}>{t("stop_record")}</CustomText>
                    </Pressable> : ""
            }
            {isRecording && (
                <CustomText size={18} color={colors.primary} customStyle={styles.timerText}>
                    {`${Math.floor(elapsedTime / 60)}:${(elapsedTime % 60).toString().padStart(2, '0')}`}
                </CustomText>

            )}
            {recordingDone && (
                <View style={{paddingHorizontal: 20}}>
                    <VoicePlayer audioFile={uri}/>
                </View>
            )}
            <View style={styles.sheetOptions}>
                <Button label={t("cancel")} sizeButton={"small"} style={styles.cancelButton} width={30}
                        onPress={onClose}
                        styleText={styles.cancelButtonText}/>
                <Button label={t("save")} sizeButton={"medium"} style={styles.selectButton}
                        styleText={styles.selectButtonText} width={70}
                        isBorder={true} borderColor={colors.primaryOutline} onPress={() => addVoiceNote()}/>
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
        sheetOptions: {
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
            width: "100%",
            marginTop: 65,
            position: "absolute",
            bottom: 10


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
            fontFamily: gStyles.fontMain.fontFamily,
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
            fontFamily: gStyles.fontMain.fontFamily,
            color: colors.darkPrimary
        },
        voiceNoteWrapper: {
            paddingVertical: 16,
            paddingHorizontal: 8,
            width: "100%",
            height: "100%",
            backgroundColor: colors.surfaceContainerLowest
        },
        timerText: {
            marginTop: 10,
            textAlign: "center"
        },

    });

};

export default AudioRecorder;