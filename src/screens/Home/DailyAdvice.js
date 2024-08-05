import React, {useEffect, useState} from "react";
import {
    View,
    ImageBackground,
    Text,
    StyleSheet,
    Dimensions,
    I18nManager,
    Pressable
} from 'react-native';
import {useSelector} from "react-redux"
import {useTranslation} from "react-i18next";
import {useTheme} from "@react-navigation/native";
import gStyles from "../../global-styles/GlobalStyles";
import KhiyabunIcons from "../../components/KhiyabunIcons";
import {getRequest, putRequest} from "../../utils/sendRequest";
import CustomSkeleton from "../../components/CustomSkeleton";

function DailyAdvice() {
    const {t} = useTranslation();
    const styles = useThemedStyles();
    const {colors} = useTheme();
    const lang = useSelector(state => state.language.language);

    const [latestAdvice, setLatestAdvice] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [dailyAdviceId, setDailyAdviceId] = useState(null);
    const [userReaction, setUserReaction] = useState(null);
    const [liked, setLiked] = useState(false);
    const [disliked, setDisliked] = useState(false);


    useEffect(() => {
        const fetchData = async () => {
            try {
                await fetchLatestAdvice();
            } catch (error) {
                console.error('Error fetching daily advice:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (userReaction !== null) {
            setLiked(userReaction === "LIKE");
            setDisliked(userReaction === "DISLIKE");
        }
    }, [userReaction]);

    const fetchLatestAdvice = async () => {
        const res = await getRequest("feed/daily_advices");
        if (res.statusCode === 200) {
            setLatestAdvice(res.data.text);
            setDailyAdviceId(res.data.id);
            setUserReaction(res.data.userReaction);
        } else {
            console.error('Error fetching advice:', res);
        }
    };

    const updateLikeOrDislike = async (type) => {
        const body = { type };
        const res = await putRequest(`feed/daily_advices?id=${dailyAdviceId}`, body);
        if (res.statusCode === 200) {
            setUserReaction(type);
        } else {
            console.error('Error updating reaction:', res);
        }
    };

    const handleLikePress = () => {
        if (dailyAdviceId !== null) {
            const newLikedState = !liked;
            setLiked(newLikedState);
            setDisliked(false);
            updateLikeOrDislike(newLikedState ? "LIKE" : null);
        }
    };

    const handleDislikePress = () => {
        if (dailyAdviceId !== null) {
            const newDislikedState = !disliked;
            setDisliked(newDislikedState);
            setLiked(false);
            updateLikeOrDislike(newDislikedState ? "DISLIKE" : null);
        }
    };


    return (
        <View style={styles.container}>
            <ImageBackground source={require('../../../assets/img/home-dailyAdvice-bg.png')}
                             style={styles.imageBackground}>

                <View style={styles.chips}>
                    <Text style={styles.chipsText}>{t("daily_advice")}</Text>
                </View>

                {isLoading ?
                    <>
                        <CustomSkeleton cStyle={[styles.skeleton, {marginBottom: 10, marginTop: 5}]}
                                        height={18} width={275}/>
                        <CustomSkeleton cStyle={[styles.skeleton, {marginBottom: 5}]}
                                        height={18} width={175}/>
                    </>
                    :
                    latestAdvice ?
                        <Text style={styles.adviceText}>{lang === 'fa' ? latestAdvice.fa : latestAdvice.en}</Text>
                        :
                        <Text style={styles.text}>{t("no_advice_available")}</Text>
                }

                <View style={styles.likeAndDislikeWrapper}>
                    <Pressable
                        style={[styles.likeAndDislike, {backgroundColor: disliked ? colors.error : colors.primaryContainer}]}
                        onPress={handleDislikePress}>
                        <KhiyabunIcons name="dislike-bold" size={18} color={disliked ? colors.white : colors.error}/>
                    </Pressable>

                    <Pressable
                        style={[styles.likeAndDislike, {backgroundColor: liked ? colors.confirm : colors.primaryContainer}]}
                        onPress={handleLikePress}>
                        <KhiyabunIcons name="like-bold" size={18} color={liked ? colors.white : colors.confirm}/>
                    </Pressable>
                </View>

            </ImageBackground>
        </View>
    );
}

const useThemedStyles = () => {
    const {colors} = useTheme();
    const lang = useSelector(state => state.language.language);

    return StyleSheet.create({
        container: {
            marginBottom: 20,
        },
        imageBackground: {
            height: 175,
            width: Dimensions.get('window').width - 30,
            borderRadius: 6,
            overflow: 'hidden',
            resizeMode: 'cover',
            justifyContent: 'center',
        },
        chips: {
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: colors.surface,
            color: colors.onSurface,
            width: (I18nManager.isRTL) ? 70 : 100,
            height: 30,
            paddingVertical: 6,
            marginTop: 15,
            marginBottom: 10,
            marginHorizontal: 20,
            borderRadius: 100,
        },
        chipsText: {
            ...gStyles.fontBold,
            fontSize: 12,
            fontWeight: '500',
            lineHeight: (I18nManager.isRTL) ? 16 : 22,
            color: colors.onSurface,
        },
        adviceText: {
            fontFamily: (lang === 'fa') ? gStyles.danaPersianNumber.fontFamily : gStyles.fontBold.fontFamily,
            borderRadius: 10,
            overflow: 'hidden',
            color: colors.white,
            fontSize: 14,
            fontWeight: '500',
            lineHeight: 20,
            textAlign: 'left',
            marginHorizontal: 20,
        },

        skeleton: {
            borderRadius: 10,
            textAlign: 'left',
            marginHorizontal: 20,
        },

        likeAndDislikeWrapper: {
            flexDirection: (I18nManager.isRTL) ? "row-reverse" : "row",
            marginVertical: 10,
            gap: 12,
            paddingHorizontal: 20,
        },
        likeAndDislike: {
            alignItems: 'center',
            justifyContent: 'center',
            borderWidth: 1,
            borderColor: '#D7E1FF80',
            color: colors.onSurface,
            width: 35,
            height: 35,
            borderRadius: 100,
            paddingVertical: 6,
        },
        text: {
            fontFamily: (lang === 'fa') ? gStyles.danaPersianNumber.fontFamily : gStyles.fontBold.fontFamily,
            borderRadius: 10,
            overflow: 'hidden',
            color: colors.white,
            fontSize: 14,
            fontWeight: '500',
            lineHeight: 20,
            textAlign: 'left',
            marginHorizontal: 20,
        },
    });
};

export default DailyAdvice;