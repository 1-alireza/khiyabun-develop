import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Pressable, I18nManager} from 'react-native';
import {Audio} from 'expo-av';
import KhiyabunIcons from "../../components/KhiyabunIcons";
import {useTheme} from "@react-navigation/native";
import {useTranslation} from "react-i18next";
import Slider from 'react-native-elements'


const VoicePlayer = ({audioFile}) => {
    const {colors} = useTheme();
    const styles = useThemedStyles(colors);
    const {t, i18n} = useTranslation();
    const [sound, setSound] = useState();
    const [isPlaying, setIsPlaying] = useState(false);
    const [duration, setDuration] = useState(0);
    const [position, setPosition] = useState(0);
    const [isBuffering, setIsBuffering] = useState(false);
    const playIcon = <KhiyabunIcons name={"play-arrow-bold"} size={24} color={colors.surfaceContainerLowest}/>
    const pauseIcon = <KhiyabunIcons name={"pause-bold"} size={24} style={styles.icon}
                                     color={colors.surfaceContainerLowest}/>

    const handlePlaySound = async () => {
        try {
            if (sound) {
                await sound.playAsync();
                setIsPlaying(true);
            } else {
                const {sound: newSound} = await Audio.Sound.createAsync(
                    {uri: audioFile},
                    {shouldPlay: true},
                    onPlaybackStatusUpdate
                );
                setSound(newSound);
                setIsPlaying(true);
            }
        } catch (error) {
            console.log('Error playing sound: ', error);
        }
    };

    const handlePauseSound = async () => {
        try {
            if (sound) {
                await sound.pauseAsync();
                setIsPlaying(false);

            }
        } catch (error) {
            console.log('Error pausing sound: ', error);
        }
    };

    const onPlaybackStatusUpdate = (status) => {
        if (status.isLoaded) {
            setDuration(status.durationMillis);
            setPosition(status.positionMillis);
            setIsPlaying(status.isPlaying);
            setIsBuffering(status.isBuffering);
        }
    };

    const formatTime = (milliseconds) => {
        if (milliseconds == null || milliseconds < 0) {
            return '00:00';
        }

        const totalSeconds = Math.floor(milliseconds / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;

        const pad = (number) => {
            if (number < 10) {
                return '0' + number;
            }
            return number;
        };

        return pad(minutes) + ':' + pad(seconds);
    };

    return (
        <View style={styles.container}>
            <Pressable style={styles.controlButton} onPress={isPlaying ? handlePauseSound : handlePlaySound}>
                {isPlaying ? pauseIcon : playIcon}
            </Pressable>
            <View style={styles.progressBarContainer}>
                <View style={[styles.progressBarWrapper]}>
                    <View style={[styles.progressBar, {width: (position / duration) * 100 + '%'}]}/>
                </View>
                <Text style={styles.timeText}>{formatTime(position)}</Text>
            </View>
        </View>
    );
};


const useThemedStyles = (colors) => {
    const isRTL = I18nManager.isRTL;

    return StyleSheet.create({
        container: {
            flexDirection: isRTL ? "row-reverse" : "row",
            alignItems: 'center',
            justifyContent: "flex-start",
            paddingVertical: 16,
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
            borderRadius: 4,
            justifyContent: "center",
            alignItems: isRTL ? "flex-end" : "flex-start",
            marginTop: 20,
            gap: 5,

        },
        progressBarWrapper: {
            height: 5,
            borderRadius: 4,
            width: "90%",
            backgroundColor: colors.surfaceContainer,
            position: "relative"
        },
        progressBar: {
            height: 5,
            borderRadius: 4,
            backgroundColor: colors.primary,
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: 999
        },
        timeContainer: {
            width: '90%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            backgroundColor: "yellow"
        },
        timeText: {
            color: colors.primary,
            fontSize: 14,
            fontFamily: 'dana-regular'
        },
    });
};


export default VoicePlayer;