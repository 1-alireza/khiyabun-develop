import React, {useRef, useState, useEffect} from 'react';
import {View, FlatList, Pressable, StyleSheet, Dimensions, I18nManager, Text} from 'react-native';
import {useTranslation} from 'react-i18next';
import HomeProfileUI from './HomeProfileUI';
import HomeInputUI from './HomeInputUI';
import HomeCard from "./HomeCartUI";
import {getRequest} from "../../utils/sendRequest";
import gStyles from "../../global-styles/GlobalStyles";
import {useSelector} from "react-redux";
import {useTheme} from "@react-navigation/native";
import CustomSkeleton from "../../components/CustomSkeleton";

const dataEn = [
    {id: 1, title: "Happy 80th birthday", name: "meysam"},
    {id: 2, title: "Happy 21th birthday", name: "alireza"},
    {id: 3, title: "Happy 35th birthday", name: "Jack"},
];

const dataFa = [
    {id: 1, title: "تولد 20 سالگیت مبارک", name: "پارسا"},
    {id: 2, title: "تولد 21 سالگیت مبارک", name: "علیرضا"},
    {id: 3, title: "تولد 61 سالگیت مبارک", name: "میثم"}
]

function Birthday() {
    const {t} = useTranslation();
    const ref = useRef(null);
    const data = I18nManager.isRTL ? dataFa : dataEn;
    const styles = useThemedStyles();

    const [todayBirthdays, setTodayBirthdays] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const [activeIndex, setActiveIndex] = useState(0);
    const [isLayoutDone, setIsLayoutDone] = useState(false);
    const ITEM_WIDTH = Dimensions.get('window').width / 2 - 15;

    useEffect(() => {
        const fetchData = async () => {
            // await getTodayBirthdays();
            // setIsLoading(false);
        };
        fetchData();
    }, []);

    const getTodayBirthdays = async () => {
        const res = await getRequest("feed/birthdays");
        console.log("Today-Birthdays", res);
        if (res.statusCode === 200) {
            setTodayBirthdays(res.data);
        }
    };

    const renderItem = ({item, index}) => {
        return (
            <Pressable
                onPress={() => {
                    setActiveIndex(index);
                }}
                style={{
                    opacity: index === activeIndex ? 1 : 0.4,
                    marginHorizontal: 1,
                    width: ITEM_WIDTH,
                }}
            >
                {item.title && <HomeProfileUI text={item.title} name={item.name}/>}
            </Pressable>
        );
    };

    const scrollToActiveIndex = () => {
        if (isLayoutDone && activeIndex >= 0 && activeIndex < data.length) {
            ref.current?.scrollToIndex({
                index: activeIndex,
                animated: true,
                viewPosition: 0,
            });
        }
    };

    useEffect(() => {
        scrollToActiveIndex();
    }, [activeIndex, isLayoutDone]);

    return (
        <View style={styles.container}>
            <HomeCard HeaderIcon={"cake-bold"} HeaderText={t("birthday")} seeMore={false}>
                {/*{isLoading && <CustomSkeleton/>}*/}
                {todayBirthdays.length > 0 ?
                    <>
                        <View style={styles.profilesWrapper}>
                            <FlatList
                                ref={ref}
                                data={data}
                                keyExtractor={(item) => item.id.toString()}
                                renderItem={renderItem}
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                // onScroll={handleScroll}
                                pagingEnabled
                                snapToInterval={ITEM_WIDTH}
                                decelerationRate="fast"
                                onLayout={() => {
                                    setIsLayoutDone(true);
                                    scrollToActiveIndex();
                                }}
                            />
                        </View>
                        {data[activeIndex] && (
                            <HomeInputUI
                                placeHolder={`${t("say_congratulations_to")} ${data[activeIndex].name}`}
                                onCommentPress={(comment) => alert(comment)}
                            />
                        )}
                    </>
                    :
                    <Text style={styles.text}>{t("no_birthday_available")}</Text>
                }
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
            width: Dimensions.get('window').width - 30,
        },
        profilesWrapper: {
            marginVertical: 8,
        },
        text: {
            fontFamily: lang === 'fa' ? gStyles.danaPersianNumber.fontFamily : gStyles.fontBold.fontFamily,
            color: colors.onSurface,
            marginHorizontal: 10,
            marginVertical: 10,
            fontSize: 14,
            lineHeight: 20,
            // textAlign: "center",
        },
    });
};


export default Birthday;