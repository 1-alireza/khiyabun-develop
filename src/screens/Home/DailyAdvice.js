import React, {useEffect, useState} from "react";
import {
    View,
    ImageBackground,
    StyleSheet,
    Dimensions,
    I18nManager,
    Pressable
} from 'react-native';
import {useSelector} from "react-redux"
import {useTranslation} from "react-i18next";
import {useTheme} from "@react-navigation/native";
import KhiyabunIcons from "../../components/KhiyabunIcons";
import {getRequest, putRequest} from "../../utils/sendRequest";
import CustomSkeleton from "../../components/CustomSkeleton";
import CustomText from "../../components/CustomText";
import CustomToast from "../../components/CustomToast";

function DailyAdvice() {
    const {t} = useTranslation();
    const styles = useThemedStyles();
    const {colors} = useTheme();
    const userToken = useSelector(state => state.login.token);

    const [typeName, setTypeName] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
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
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching daily advice:', error);
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
        const res = await getRequest("feed/daily_advices", {}, userToken);
        console.log("daily res", res)
        if (res.statusCode === 200) {
            setLatestAdvice(res.data.text);
            setDailyAdviceId(res.data.id);
            setUserReaction(res.data.userReaction);
            setTypeName(res.data.typeName || null);
            setImageUrl(res.data.imageUrl || null);
        } else {
            console.error('Error fetching advice:', res);
        }
    };
    const updateLikeOrDislike = async (type) => {
        if (dailyAdviceId === null) return;

        const body = {type: type || null};
        const res = await putRequest(`feed/daily_advices?id=${dailyAdviceId}`, body, userToken);
        if (res.statusCode === 200) {
            setUserReaction(type);
            if (type === "LIKE") {
                setLiked(true);
                setDisliked(false);
                CustomToast.show(t("like_advice"), "confirm");
            } else if (type === "DISLIKE") {
                setDisliked(true);
                setLiked(false);
                CustomToast.show(t("dislike_advice"), "warning");
            } else {
                if (liked) {
                    setLiked(false);
                } else if (disliked) {
                    setDisliked(false);
                }
            }
        } else {
            console.error('Error updating reaction:', res);
        }
    };

    const handleLikePress = () => {
        if (liked) {
            updateLikeOrDislike(null);
        } else {
            updateLikeOrDislike("LIKE");
        }
    };

    const handleDislikePress = () => {
        if (disliked) {
            updateLikeOrDislike(null);
        } else {
            updateLikeOrDislike("DISLIKE");
        }
    };

    return (
        <View style={styles.container}>
            <ImageBackground
                source={imageUrl ? {uri: imageUrl} : require('../../../assets/img/home-dailyAdvice-bg.png')}
                style={styles.imageBackground}
            >
                <View style={styles.chips}>
                    <CustomText size={11} weight={'bold'} color={colors.onSurface}
                                lineHeight={(I18nManager.isRTL) ? 16 : 18}>
                        {typeName ? typeName : t("daily_advice")}
                    </CustomText>
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
                        <CustomText size={13} weight={'bold'} color={colors.white}
                                    lineHeight={20} customStyle={styles.adviceText}>
                            {latestAdvice}
                        </CustomText>
                        :
                        <CustomText size={13} weight={'bold'} color={colors.white}
                                    lineHeight={20} customStyle={styles.adviceText}>
                            {t("no_advice_available")}
                        </CustomText>
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
            width: (I18nManager.isRTL) ? 75 : 100,
            height: 30,
            paddingVertical: 6,
            marginTop: '4%',
            marginBottom: '4%',
            marginHorizontal: 20,
            borderRadius: 100,
        },
        adviceText: {
            borderRadius: 10,
            overflow: 'hidden',
            marginHorizontal: 23,
        },
        skeleton: {
            borderRadius: 5,
            textAlign: 'left',
            marginHorizontal: 20,
        },
        likeAndDislikeWrapper: {
            flexDirection: (I18nManager.isRTL) ? "row-reverse" : "row",
            justifyContent: (I18nManager.isRTL) ? "flex-end" : "flex-start",
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
    });
};

export default DailyAdvice;