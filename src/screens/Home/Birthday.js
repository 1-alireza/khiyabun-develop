import React, {useRef, useState, useEffect} from 'react';
import {View, FlatList, Pressable, StyleSheet, Dimensions, I18nManager} from 'react-native';
import {useTranslation} from 'react-i18next';
import HomeProfile from './HomeProfile';
import HomeInput from './HomeInput';
import HomeCard from "./HomeCard";
import {getRequest, putRequest} from "../../utils/sendRequest";
import CustomSkeleton from "../../components/CustomSkeleton";
import CustomText from "../../components/CustomText";
import {useTheme} from "@react-navigation/native";
import {useSelector} from "react-redux";
import CustomToast from "../../components/CustomToast";

function Birthday() {
    const {colors} = useTheme();
    const {t} = useTranslation();
    const styles = useThemedStyles();
    const ref = useRef(null);
    const userToken = useSelector(state => state.login.token);

    const [todayBirthdays, setTodayBirthdays] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isCommenting, setIsCommenting] = useState(false);

    const [activeUserId, setActiveUserId] = useState(null);
    const [isLayoutDone, setIsLayoutDone] = useState(false);
    const ITEM_WIDTH = Dimensions.get('window').width / 2 - 15;

    useEffect(() => {
        const fetchData = async () => {
            await getTodayBirthdays();

        };
        fetchData();
    }, []);

    const getTodayBirthdays = async () => {
        setIsLoading(true);

        try {
            const res = await getRequest("feed/birthdays", {}, userToken);
            console.log("birthdays", res);

            if (res.statusCode === 200) {
                setTodayBirthdays(res.data);
                if (res.data[0]) setActiveUserId(res.data[0].userId);
            } else {
                console.error("Error fetching birthdays:", res);
            }
        } catch (error) {
            console.error("An error occurred while fetching birthdays:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleComment = async (text) => {
        const body = {text};
        setIsCommenting(true);
        try {
            const res = await putRequest(`feed/birthdays?userId=${activeUserId}`, body, userToken);
            console.log("res birth", res)
            if (res.statusCode === 200) {
                CustomToast.show(t("birthday_congratulation"), "confirm");
            }
        } catch (error) {
            CustomToast.show(t("default_error"), "error");
            console.error('Error commenting on news:', error);
        } finally {
            setIsCommenting(false);
        }
    };

    const renderItem = ({item}) => {
        const text = ` سالگیت مبارک${item.age}تولد `;
        const name = item.firstname;
        const imgUrl = item.profileImage ? item.profileImage.downloadUrl : null;
        console.log(imgUrl)
        return (
            <Pressable
                onPress={() => {
                    setActiveUserId(item.userId);
                }}
                style={{
                    opacity: item.userId === activeUserId ? 1 : 0.4,
                    marginHorizontal: 1,
                    width: ITEM_WIDTH,
                }}
            >
                <HomeProfile imgUrl={imgUrl} text={text} name={name}/>
            </Pressable>
        );
    };

    const scrollToActiveUserId = () => {
        if (isLayoutDone && activeUserId >= 0 && activeUserId < todayBirthdays.length) {
            ref.current?.scrollToIndex({
                index: activeUserId,
                animated: true,
                viewPosition: 0,
            });
        }
    };

    useEffect(() => {
        scrollToActiveUserId();
    }, [activeUserId, isLayoutDone]);

    return (
        <View style={styles.container}>
            <HomeCard HeaderIcon={"cake-bold"} HeaderText={t("birthday")} seeMore={false}>
                {isLoading ? <CustomSkeleton cStyle={{marginHorizontal: 10}} width={150} height={20}/>
                    :
                    <>
                        {todayBirthdays.length > 0 ?
                            <>
                                <View style={styles.profilesWrapper}>
                                    <FlatList
                                        ref={ref}
                                        data={todayBirthdays}
                                        keyExtractor={(item) => item.userId}
                                        renderItem={renderItem}
                                        horizontal
                                        showsHorizontalScrollIndicator={false}
                                        // onScroll={handleScroll}
                                        pagingEnabled
                                        snapToInterval={ITEM_WIDTH}
                                        decelerationRate="fast"
                                        onLayout={() => {
                                            setIsLayoutDone(true);
                                            scrollToActiveUserId();
                                        }}
                                    />
                                </View>
                                {activeUserId && (
                                    <HomeInput
                                        placeHolder={`${t("say_congratulations_to")} ${todayBirthdays.find(user => user.userId === activeUserId).firstname}`}
                                        onCommentPress={(comment) => handleComment(comment)}
                                        disabled={!todayBirthdays || isCommenting}
                                    />
                                )}
                            </>
                            :
                            <CustomText size={13} color={colors.onSurface}
                                        textAlign={I18nManager.isRTL ? "left" : "right"}
                                        lineHeight={20}
                                        customStyle={{marginHorizontal: 10, marginVertical: 10}}>
                                {t("no_birthday_available")}
                            </CustomText>
                        }
                    </>}

            </HomeCard>
        </View>
    );
}

const useThemedStyles = () => {
    return StyleSheet.create({
        container: {
            marginBottom: 20,
            width: Dimensions.get('window').width - 30,
        },
        profilesWrapper: {
            marginVertical: 8,
        },
    });
};

export default Birthday;
