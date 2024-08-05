import React, {useEffect, useState} from "react";
import {View, ImageBackground, Text, TouchableOpacity, StyleSheet, Dimensions, I18nManager} from 'react-native';
import {useTheme} from "@react-navigation/native";
import HomeInputUI from "./HomeInputUI";
import {useTranslation} from "react-i18next";
import gStyles from "../../global-styles/GlobalStyles";
import {useSelector} from "react-redux";
import {getRequest, putRequest} from "../../utils/sendRequest";
import CustomSkeleton from "../../components/CustomSkeleton";

function News() {
    const {t} = useTranslation();
    const styles = useThemedStyles();
    const lang = useSelector(state => state.language.language);

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
            } catch (error) {
                console.error('Error fetching news:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    const getNews = async () => {
        const body = {
            page: 0,
            size: 1,
            sortBy: "createDate",
            sortOrder: "desc",
            fromTime: "2024-05-03T00:00:00",
            toTime: "2024-05-03T23:59:59",
        };
        const res = await getRequest("feed/news", body);
        if (res.statusCode === 200) {
            return res.data;
        } else {
            throw new Error('Failed to fetch news, status code: ' + res.statusCode);
        }
    };

    const commentOnNews = async (text) => {
        const body = {text};
        setIsCommenting(true);
        try {
            const res = await putRequest(`feed/news?id=${newsId}`, body);
            if (res.statusCode !== 200) {
                console.error('Error updating comment:', res);
            }
        } catch (error) {
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
                    <Text style={styles.chipsText}>{t("news")}</Text>
                </View>

                {isLoading ?
                    <>
                        <CustomSkeleton cStyle={[styles.skeleton, {marginBottom: 10, marginTop: 5}]}
                                        height={18} width={275}/>
                        <CustomSkeleton cStyle={[styles.skeleton, {marginBottom: 10}]}
                                        height={18} width={175}/>
                    </>
                    : latestNews ?
                        <>
                            <Text style={[styles.newsText, {marginTop: 10}]}>
                                {lang === 'fa' ? latestNews.title?.fa : latestNews.title?.en}
                            </Text>
                            <Text style={[styles.newsText, {marginBottom: 10}]}>
                                {lang === 'fa' ? latestNews.text?.fa : latestNews.text?.en}
                            </Text>
                        </>
                        : (
                            <Text style={styles.text}>{t("no_news_available")}</Text>
                        )}

                <HomeInputUI
                    disabled={!latestNews || isCommenting}
                    style={"margin"}
                    placeHolder={t("news_comment")}
                    onCommentPress={handleCommentSubmit}
                />
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
            width: 60,
            height: 30,
            marginBottom: 5,
            marginHorizontal: 20,
            borderRadius: 100,
        },
        chipsText: {
            ...gStyles.fontBold,
            fontSize: 12,
            fontWeight: '500',
            lineHeight: 18,
            color: colors.onSurface,
        },
        newsText: {
            fontFamily: (lang === 'fa') ? gStyles.danaPersianNumber.fontFamily : gStyles.fontBold.fontFamily,
            borderRadius: 10,
            overflow: 'hidden',
            color: colors.white,
            fontSize: 14,
            fontWeight: '500',
            lineHeight: 20,
            textAlign: 'left',
            marginHorizontal: 23
        },
        skeleton: {
            borderRadius: 10,
            textAlign: 'left',
            marginHorizontal: 20,
        },
        text: {
            fontFamily: lang === 'fa' ? gStyles.danaPersianNumber.fontFamily : gStyles.fontBold.fontFamily,
            color: colors.white,
            marginHorizontal: 25,
            marginVertical: 10,
            fontSize: 14,
            lineHeight: 20,
        },
    });
};

export default News;
