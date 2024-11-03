import React, {useState, useEffect} from 'react';
import {View, Text, Pressable, StyleSheet, I18nManager} from 'react-native';
import {Audio} from 'expo-av';
import KhiyabunIcons from "../../components/KhiyabunIcons";
import {useTheme} from "@react-navigation/native";
import gStyles from "../../global-styles/GlobalStyles";
import Slider from '@react-native-community/slider';
import CustomText from "../../components/CustomText";

const VoicePlayer = ({audioFile}) => {
    const {colors} = useTheme();
    const styles = useThemedStyles(colors);

    const [sound, setSound] = useState();
    const [isPlaying, setIsPlaying] = useState(false);
    const [duration, setDuration] = useState(0);
    const [position, setPosition] = useState(0);
    const [intervalId, setIntervalId] = useState(null);

    useEffect(() => {
        loadSound();
        return cleanup;
    }, [audioFile]);

    const loadSound = async () => {
        try {
            const {sound: newSound} = await Audio.Sound.createAsync(
                {uri: audioFile},
                {},
                onPlaybackStatusUpdate
            );
            setSound(newSound);
        } catch (error) {
            console.error("Error loading sound:", error);
        }
    };

    const onPlaybackStatusUpdate = async (status) => {
        if (status.isLoaded) {
            setDuration(status.durationMillis);
            setPosition(status.positionMillis);
            setIsPlaying(status.isPlaying);

            // Check if playback has finished
            if (status.positionMillis >= status.durationMillis && isPlaying) {
                resetPlayback(); // Reset if position meets or exceeds duration
            }
        } else {
            console.error("Sound not loaded, status:", status);
        }
    };

    const resetPlayback = async () => {
        if (sound) {
            await sound.stopAsync();
            setPosition(0); // Reset position to start
            setIsPlaying(false); // Update playing state
        }
    };

    const handlePlaySound = async () => {
        if (!sound) {
            console.warn("Sound not loaded, cannot play.");
            return;
        }
        try {
            await sound.playAsync();
            setIsPlaying(true);
            startPositionTracker();
        } catch (error) {
            console.error("Error playing sound:", error);
        }
    };

    const handlePauseSound = async () => {
        if (sound) {
            try {
                await sound.pauseAsync();
                setIsPlaying(false);
                clearInterval(intervalId);
            } catch (error) {
                console.error("Error pausing sound:", error);
            }
        }
    };

    const handleSliderValueChange = async (value) => {
        console.log(value,"sad")
        const newPosition = value * duration;
        setPosition(newPosition);
        if (sound) {
            try {
                await sound.setPositionAsync(newPosition);
            } catch (error) {
                console.error("Error setting position on sound:", error);
            }
        }
    };

    const startPositionTracker = () => {
        if (intervalId) clearInterval(intervalId);

        const id = setInterval(async () => {
            if (sound) {
                const status = await sound.getStatusAsync();
                if (status.isLoaded) {
                    setPosition(status.positionMillis);
                }
            }
        }, 100);
        setIntervalId(id);
    };

    const cleanup = async () => {
        if (sound) {
            await sound.stopAsync();
            await sound.unloadAsync();
        }
        clearInterval(intervalId);
    };

    const formatTime = (milliseconds) => {
        if (milliseconds == null || milliseconds < 0) {
            return '00:00';
        }
        const totalSeconds = Math.floor(milliseconds / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    };

    return (
        <View style={styles.container}>
            <View style={styles.progressBarContainer}>
                <Slider
                    style={styles.slider}
                    minimumValue={0}
                    maximumValue={1}
                    value={duration > 0 ? position / duration : 0}
                    onValueChange={handleSliderValueChange}
                    minimumTrackTintColor={colors.primary}
                    maximumTrackTintColor={colors.surfaceContainer}
                    thumbTintColor={colors.primary}
                />
                <CustomText customStyle={styles.timeText} color={colors.primary} size={14}>{formatTime(position)}</CustomText>

            </View>
            <Pressable style={styles.controlButton} onPress={isPlaying ? handlePauseSound : handlePlaySound}>
                <KhiyabunIcons
                    name={isPlaying ? "pause-bold" : "play-arrow-bold"}
                    size={24}
                    color={colors.surfaceContainerLowest}
                />
            </Pressable>
        </View>
    );
};

const useThemedStyles = (colors) => {
    const isRTL = I18nManager.isRTL;

    return StyleSheet.create({
        container: {
            flexDirection: isRTL ? "row" : "row-reverse",
            alignItems: 'center',
            justifyContent: "flex-start",
            paddingHorizontal: 8,
            gap: 4,
        },
        controlButton: {
            alignItems: 'center',
            justifyContent: 'center',
            width: 48,
            height: 48,
            padding: 12,
            borderRadius: 100,
            backgroundColor: colors.primary
        },
        progressBarContainer: {
            width: '90%',
            marginTop: 20,
            justifyContent: "center",
            alignItems: 'flex-end',
            marginBottom: 10
        },
        slider: {
            width: '100%', // Full width slider
            height: 20,
        },
        timeText: {
            paddingHorizontal: 10
        },
    });
};


export default VoicePlayer;