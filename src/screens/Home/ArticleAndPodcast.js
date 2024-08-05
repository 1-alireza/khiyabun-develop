import React, {useEffect, useState} from "react";
import {View, Text, StyleSheet, Dimensions, I18nManager} from 'react-native';
import {useTheme} from "@react-navigation/native";
import {useTranslation} from "react-i18next";
import HomeCard from "./HomeCartUI";
import Chips from "../../components/Chips";
import Svg, {Path, LinearGradient, Defs, Stop} from 'react-native-svg';
import gStyles from "../../global-styles/GlobalStyles";
import {getRequest} from "../../utils/sendRequest";
import {useSelector} from "react-redux";
import CustomSkeleton from "../../components/CustomSkeleton";

const CurvedLinesSVG = ({customStyle}) => {
    return (
        <View style={customStyle}>
            <Svg style={{opacity: 0.2}} width="175" height="175" viewBox="0 0 175 175" fill="none"
                 xmlns="http://www.w3.org/2000/svg">
                <Path
                    d="M173.899 -8.87891C166.641 -6.40856 152.325 4.35119 153.13 27.6274C154.137 56.7226 176.095 74.93 181.585 102.378C185.637 122.637 185.062 173.378 160.358 194.696"
                    stroke="url(#paint0_linear_3869_1217)" stroke-width="1.46215"/>
                <Path
                    d="M162.437 -10.4355C155.178 -7.9652 140.862 2.79455 141.667 26.0707C142.674 55.166 164.632 73.3733 170.122 100.822C174.174 121.081 173.599 171.821 148.895 193.14"
                    stroke="url(#paint1_linear_3869_1217)" stroke-width="1.46215"/>
                <Path
                    d="M151.269 -13.459C144.01 -10.9886 129.694 -0.228859 130.499 23.0473C131.506 52.1425 153.464 70.3499 158.954 97.7983C163.006 118.057 162.431 168.798 137.727 190.116"
                    stroke="url(#paint2_linear_3869_1217)" stroke-width="1.46215"/>
                <Path
                    d="M138.755 -18.9219C131.496 -16.4515 117.181 -5.69178 117.986 17.5844C118.992 46.6796 140.951 64.887 146.44 92.3353C150.492 112.594 149.917 163.335 125.214 184.653"
                    stroke="url(#paint3_linear_3869_1217)" stroke-width="1.46215"/>
                <Path
                    d="M128.03 -23.2637C120.772 -20.7933 106.456 -10.0336 107.261 13.2426C108.268 42.3378 130.226 60.5452 135.716 87.9936C139.768 108.252 139.193 158.993 114.489 180.311"
                    stroke="url(#paint4_linear_3869_1217)" stroke-width="1.46215"/>
                <Path
                    d="M116.987 -26.7051C109.729 -24.2347 95.413 -13.475 96.2181 9.8012C97.2246 38.8964 119.183 57.1038 124.673 84.5521C128.725 104.811 128.15 155.552 103.446 176.87"
                    stroke="url(#paint5_linear_3869_1217)" stroke-width="1.46215"/>
                <Path
                    d="M105.696 -29.2246C98.4378 -26.7543 84.122 -15.9945 84.9271 7.28167C85.9336 36.3769 107.892 54.5843 113.382 82.0326C117.434 102.292 116.859 153.032 92.1552 174.35"
                    stroke="url(#paint6_linear_3869_1217)" stroke-width="1.46215"/>
                <Path
                    d="M94.2374 -30.8223C86.9788 -28.3519 72.663 -17.5922 73.4681 5.68401C74.4746 34.7792 96.4332 52.9866 101.923 80.435C105.975 100.694 105.4 151.435 80.6962 172.753"
                    stroke="url(#paint7_linear_3869_1217)" stroke-width="1.46215"/>
                <Path
                    d="M82.6905 -31.5195C75.4319 -29.0492 61.1161 -18.2894 61.9213 4.98674C62.9277 34.082 84.8864 52.2894 90.376 79.7377C94.4278 99.9966 93.8528 150.737 69.1493 172.056"
                    stroke="url(#paint8_linear_3869_1217)" stroke-width="1.46215"/>
                <Path
                    d="M71.1241 -31.3496C63.8655 -28.8793 49.5497 -18.1195 50.3549 5.15667C51.3613 34.2519 73.32 52.4593 78.8096 79.9076C82.8614 100.167 82.2864 150.907 57.5829 172.225"
                    stroke="url(#paint9_linear_3869_1217)" stroke-width="1.46215"/>
                <Path
                    d="M59.5967 -30.3594C52.3382 -27.889 38.0224 -17.1293 38.8275 6.1469C39.8339 35.2421 61.7926 53.4495 67.2823 80.8978C71.3341 101.157 70.7591 151.898 46.0556 173.216"
                    stroke="url(#paint10_linear_3869_1217)" stroke-width="1.46215"/>
                <Path
                    d="M48.1631 -28.5996C40.9046 -26.1293 26.5888 -15.3695 27.3939 7.90667C28.4004 37.0019 50.359 55.2093 55.8487 82.6576C59.9005 102.917 59.3255 153.657 34.622 174.975"
                    stroke="url(#paint11_linear_3869_1217)" stroke-width="1.46215"/>
                <Path
                    d="M36.8624 -26.1221C29.6038 -23.6518 15.288 -12.892 16.0931 10.3841C17.0996 39.4794 39.0582 57.6868 44.5479 85.1351C48.5997 105.394 48.0247 156.135 23.3212 177.453"
                    stroke="url(#paint12_linear_3869_1217)" stroke-width="1.46215"/>
                <Path
                    d="M25.7315 -22.9717C18.473 -20.5013 4.15712 -9.74159 4.96227 13.5346C5.96871 42.6298 27.9274 60.8372 33.417 88.2855C37.4688 108.544 36.8938 159.285 12.1903 180.603"
                    stroke="url(#paint13_linear_3869_1217)" stroke-width="1.46215"/>
                <Path
                    d="M14.8018 -19.1895C7.54326 -16.7191 -6.77257 -5.95936 -5.96741 17.3168C-4.96098 46.4121 16.9977 64.6194 22.4874 92.0678C26.5391 112.327 25.9641 163.067 1.26065 184.386"
                    stroke="url(#paint14_linear_3869_1217)" stroke-width="1.46215"/>
                <Defs>
                    <LinearGradient id="paint0_linear_3869_1217" x1="168.285" y1="-8.87891" x2="168.285"
                                    y2="194.696" gradientUnits="userSpaceOnUse">
                        <Stop/>
                        <Stop offset="1" stop-opacity="0"/>
                    </LinearGradient>
                    <LinearGradient id="paint1_linear_3869_1217" x1="156.822" y1="-10.4355" x2="156.822" y2="193.14"
                                    gradientUnits="userSpaceOnUse">
                        <Stop/>
                        <Stop offset="1" stop-opacity="0"/>
                    </LinearGradient>
                    <LinearGradient id="paint2_linear_3869_1217" x1="145.654" y1="-13.459" x2="145.654" y2="190.116"
                                    gradientUnits="userSpaceOnUse">
                        <Stop/>
                        <Stop offset="1" stop-opacity="0"/>
                    </LinearGradient>
                    <LinearGradient id="paint3_linear_3869_1217" x1="133.141" y1="-18.9219" x2="133.141"
                                    y2="184.653" gradientUnits="userSpaceOnUse">
                        <Stop/>
                        <Stop offset="1" stop-opacity="0"/>
                    </LinearGradient>
                    <LinearGradient id="paint4_linear_3869_1217" x1="122.416" y1="-23.2637" x2="122.416"
                                    y2="180.311" gradientUnits="userSpaceOnUse">
                        <Stop/>
                        <Stop offset="1" stop-opacity="0"/>
                    </LinearGradient>
                    <LinearGradient id="paint5_linear_3869_1217" x1="111.373" y1="-26.7051" x2="111.373" y2="176.87"
                                    gradientUnits="userSpaceOnUse">
                        <Stop/>
                        <Stop offset="1" stop-opacity="0"/>
                    </LinearGradient>
                    <LinearGradient id="paint6_linear_3869_1217" x1="100.082" y1="-29.2246" x2="100.082" y2="174.35"
                                    gradientUnits="userSpaceOnUse">
                        <Stop/>
                        <Stop offset="1" stop-opacity="0"/>
                    </LinearGradient>
                    <LinearGradient id="paint7_linear_3869_1217" x1="88.623" y1="-30.8223" x2="88.623" y2="172.753"
                                    gradientUnits="userSpaceOnUse">
                        <Stop/>
                        <Stop offset="1" stop-opacity="0"/>
                    </LinearGradient>
                    <LinearGradient id="paint8_linear_3869_1217" x1="77.0761" y1="-31.5195" x2="77.0761"
                                    y2="172.056" gradientUnits="userSpaceOnUse">
                        <Stop/>
                        <Stop offset="1" stop-opacity="0"/>
                    </LinearGradient>
                    <LinearGradient id="paint9_linear_3869_1217" x1="65.5097" y1="-31.3496" x2="65.5097"
                                    y2="172.225" gradientUnits="userSpaceOnUse">
                        <Stop/>
                        <Stop offset="1" stop-opacity="0"/>
                    </LinearGradient>
                    <LinearGradient id="paint10_linear_3869_1217" x1="53.9824" y1="-30.3594" x2="53.9824"
                                    y2="173.216" gradientUnits="userSpaceOnUse">
                        <Stop/>
                        <Stop offset="1" stop-opacity="0"/>
                    </LinearGradient>
                    <LinearGradient id="paint11_linear_3869_1217" x1="42.5488" y1="-28.5996" x2="42.5488"
                                    y2="174.975" gradientUnits="userSpaceOnUse">
                        <Stop/>
                        <Stop offset="1" stop-opacity="0"/>
                    </LinearGradient>
                    <LinearGradient id="paint12_linear_3869_1217" x1="31.248" y1="-26.1221" x2="31.248" y2="177.453"
                                    gradientUnits="userSpaceOnUse">
                        <Stop/>
                        <Stop offset="1" stop-opacity="0"/>
                    </LinearGradient>
                    <LinearGradient id="paint13_linear_3869_1217" x1="20.1171" y1="-22.9717" x2="20.1171"
                                    y2="180.603" gradientUnits="userSpaceOnUse">
                        <Stop/>
                        <Stop offset="1" stop-opacity="0"/>
                    </LinearGradient>
                    <LinearGradient id="paint14_linear_3869_1217" x1="9.18744" y1="-19.1895" x2="9.18744"
                                    y2="184.386" gradientUnits="userSpaceOnUse">
                        <Stop/>
                        <Stop offset="1" stop-opacity="0"/>
                    </LinearGradient>
                </Defs>
            </Svg>
        </View>
    );
};

function ArticleAndPodcast() {
    const {t} = useTranslation();
    const lang = useSelector(state => state.language.language);
    const {colors} = useTheme();
    const styles = useThemedStyles();

    const [latestPodcast, setLatestPodcast] = useState([]);
    const [latestArticle, setLatestArticle] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            await getLatestPodcast();
            await getLatestArticle();
            setIsLoading(false);
        };
        fetchData();
    }, []);

    const getLatestPodcast = async () => {
        const body = {
            page: 0,
            size: 1,
            sortBy: "createDate",
            sortOrder: "desc",
            fromTime: "2024-05-03T00:00:00",
            toTime: "2024-05-03T23:59:59",
        };
        const res = await getRequest("feed/podcasts", body);
        if (res.statusCode === 200) {
            setLatestPodcast(res.data);
        }
    };

    const getLatestArticle = async () => {
        const body = {
            page: 0,
            size: 1,
            sortBy: "createDate",
            sortOrder: "desc",
            fromTime: "2024-05-03T00:00:00",
            toTime: "2024-05-03T23:59:59",
        };
        const res = await getRequest("feed/articles", body);
        if (res.statusCode === 200) {
            setLatestArticle(res.data);
        }
    };

    return (
        <View style={styles.container}>
            <HomeCard HeaderIcon={"radar-2-bold"} HeaderText={t("article_and_podcast")}>
                <View style={styles.wrapper}>

                    <View style={styles.background}>
                        <CurvedLinesSVG customStyle={{backgroundColor: colors.warningContainer}}/>
                        {isLoading ?
                            <CustomSkeleton width={160} height={175} cStyle={{position:"absolute"}}/>
                            :
                            <View style={styles.innerContent}>
                                <View style={styles.content}>
                                    <Chips customStyle={styles.chips} width={60} text={t("article")} height={30}
                                           type="warning" transparent={false}/>
                                    {latestArticle.length > 0 ?
                                        <Text style={styles.text}>
                                            {lang === 'fa' ? latestArticle[0].title.fa : latestArticle[0].title.en}
                                        </Text> :
                                        <Text style={styles.text}>{t("no_article_available")}</Text>}
                                </View>
                            </View>
                        }

                    </View>
                    <View style={styles.background}>
                        <CurvedLinesSVG customStyle={{backgroundColor: colors.errorContainer}}/>
                        {isLoading ?
                            <CustomSkeleton width={160} height={175} cStyle={{position:"absolute"}}/>
                            :
                            <View style={styles.innerContent}>
                                <View style={styles.content}>
                                    <Chips customStyle={styles.chips} width={70} text={t("podcast")} height={30}
                                           type="error" transparent={false}/>
                                    <View style={styles.textWrapper}>
                                        {latestPodcast.length > 0 ? (
                                            <>
                                                <Text style={[styles.text, {color: colors.onSurfaceLow}]}>
                                                    {t("episode")} {latestPodcast[0].episode}
                                                </Text>
                                                <Text style={styles.text}>
                                                    {lang === 'fa' ? latestPodcast[0].title.fa : latestPodcast[0].title.en}
                                                </Text>
                                            </>
                                        ) : (
                                            <Text style={styles.text}>{t("no_podcast_available")}</Text>
                                        )}
                                    </View>
                                </View>
                            </View>
                        }
                    </View>
                </View>
            </HomeCard>
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
        wrapper: {
            flexDirection: I18nManager.isRTL ? "row-reverse" : "row",
            justifyContent: "space-between",
            marginTop: 10,
        },
        background: {
            position: "relative",
            width: Dimensions.get('window').width / 2 - 35,
            justifyContent: 'space-between',
            borderRadius: 6,
            overflow: "hidden"
        },
        chips: {
            marginHorizontal: 10,
            marginVertical: 10,
        },
        skeleton: {
            position: "absolute",
            backgroundColor: colors.background,
        },
        innerContent: {
            position: "absolute",
        },
        content: {
            justifyContent: "space-between",
            height: 160,
            width: 155,
        },
        text: {
            fontFamily: lang === 'fa' ? gStyles.danaPersianNumber.fontFamily : gStyles.fontBold.fontFamily,
            color: colors.onSurface,
            marginHorizontal: 10,
            fontSize: 14,
            lineHeight: 20,
            textAlign: I18nManager.isRTL ? "left" : "right",
        },
    });
};

export default ArticleAndPodcast;