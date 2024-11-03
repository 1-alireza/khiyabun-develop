import React, {useEffect, useState} from "react";
import {View, ImageBackground, StyleSheet, Dimensions} from 'react-native';
import {useTheme} from "@react-navigation/native";
import HomeInput from "./HomeInput";
import {useTranslation} from "react-i18next";
import {useSelector} from "react-redux";
import {getRequest, putRequest} from "../../utils/sendRequest";
import CustomSkeleton from "../../components/CustomSkeleton";
import CustomText from "../../components/CustomText";
import CustomToast from "../../components/CustomToast";

function News() {
    const {t} = useTranslation();
    const {colors} = useTheme();
    const styles = useThemedStyles();
    const userToken = useSelector(state => state.login.token);

    const [latestNews, setLatestNews] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [newsId, setNewsId] = useState(null);
    const [isCommenting, setIsCommenting] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getNews();
                if (res.length) {
                    setNewsId(res[0].id);
                    setLatestNews(res[0]);
                }
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching news:', error);
            }
        };
        fetchData();
    }, []);

    const getNews = async () => {
        const res = await getRequest("feed/news", {}, userToken);
        if (res.statusCode === 200) {
            return res.data;
        }
    };

    const commentOnNews = async (text) => {
        const body = {text};
        setIsCommenting(true);
        try {
            const res = await putRequest(`feed/news?id=${newsId}`, body, userToken);
            if (res.statusCode === 200) {

                CustomToast.show(t("comment_on_news"), "confirm");
            }
        } catch (error) {
            CustomToast.show(t("default_error"), "error");
            console.error('Error commenting on news:', error);
        } finally {
            setIsCommenting(false);
        }
    };

    const handleCommentSubmit = (comment) => {
        if (comment) {
            commentOnNews(comment);
        }
    };

    return (
        <View style={styles.container}>
            <ImageBackground source={require('../../../assets/img/home-news-bg.png')} style={styles.imageBackground}>
                <View style={styles.chips}>
                    <CustomText size={11} color={colors.onSurface}
                                weight={'bold'}
                                lineHeight={18}>

                        {t("news")}
                    </CustomText>
                </View>

                {isLoading ?
                    <>
                        <CustomSkeleton cStyle={[styles.skeleton, {marginBottom: 10, marginTop: 5}]}
                                        height={20} width={275}/>
                        <CustomSkeleton cStyle={[styles.skeleton, {marginBottom: 10}]}
                                        height={20} width={175}/>
                    </>
                    : latestNews ?
                        <>
                            <CustomText size={13} color={colors.white}
                                        weight={'bold'}
                                        textAlign={'left'}
                                        lineHeight={20}
                                        customStyle={{
                                            borderRadius: 10,
                                            overflow: 'hidden',
                                            marginHorizontal: 23, marginTop: 10
                                        }}>
                                {latestNews.title}
                            </CustomText>
                            <CustomText size={13} color={colors.white}
                                        weight={'bold'}
                                        textAlign={'left'}
                                        lineHeight={20}
                                        customStyle={{
                                            borderRadius: 10,
                                            overflow: 'hidden',
                                            marginHorizontal: 23, marginBottom: 10
                                        }}>
                                {latestNews.text}
                            </CustomText>
                        </>
                        : (
                            <CustomText size={13} color={colors.white}
                                        weight={'bold'}
                                        lineHeight={20}
                                        customStyle={{
                                            marginHorizontal: 25,
                                            marginVertical: 10
                                        }}>
                                {t("no_news_available")}
                            </CustomText>
                        )}

                <HomeInput
                    disabled={!latestNews || isCommenting}
                    placeHolder={t("news_comment")}
                    onCommentPress={handleCommentSubmit}
                />
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
            width: 60,
            height: 30,
            marginBottom: 5,
            marginHorizontal: 20,
            borderRadius: 100,
        },
        skeleton: {
            borderRadius: 5,
            textAlign: 'left',
            marginHorizontal: 20,
        },
    });
};

export default News;
