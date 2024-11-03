import React, {useEffect, useState} from "react";
import {ActivityIndicator, FlatList, I18nManager, Platform, Pressable, StyleSheet, View} from "react-native";
import {useNavigation, useTheme} from "@react-navigation/native";
import KhiyabunIcons from "../../components/KhiyabunIcons";
import Card from "../../components/Card";
import MyDatePicker from "../../components/Picker";
import {getRequest} from "../../utils/sendRequest";
import {useDispatch, useSelector} from "react-redux";
import CustomText from "../../components/CustomText";
import {useTranslation} from "react-i18next";
import {toJalaali} from 'jalaali-js';
import {setProductiveTime} from "../../redux/slices/workLogSlice";
import {setExportData} from "../../redux/slices/exportDataSlice";
import Loader from "../../components/Loader";

const TimesheetScreen = () => {
    const {colors} = useTheme();
    const {t} = useTranslation();
    const styles = useThemedStyles();
    const navigation = useNavigation();
    const lang = useSelector(state => state.language.language);
    const userToken = useSelector(state => state.login.token);
    const dispatch = useDispatch();

    const [isLoading, setIsLoading] = useState(true);
    const [workLogData, setWorkLogData] = useState([]);

    const [fromTime, setFromTime] = useState("");
    const [toTime, setToTime] = useState("");

    const [totalAbsence, setTotalAbsence] = useState("00:00");
    const [totalWork, setTotalWork] = useState("00:00");

    const [currentPage, setCurrentPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);


    useEffect(() => {
        const fetchTotalData = async () => {
            try {
                await getWorkLogTotal();
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching work_log:', error);
            }
        };
        fetchTotalData();
    }, []);

    useEffect(() => {
        const fetchReportData = async () => {
            try {
                await getWorkLogReport(fromTime, toTime);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching work_log:', error);
            }
        };
        fetchReportData();
    }, [fromTime, toTime]);

    const getWorkLogTotal = async () => {
        const res = await getRequest("work_log/total", {}, userToken);
        if (res.statusCode === 200) {
            setTotalAbsence(res.data.absence);
            setTotalWork(res.data.overall);
        }
    };

    const getWorkLogReport = async (fromTime, toTime, page) => {
        const body = {
            page: page,
            size: 14,
            fromTime: fromTime,
            toTime: toTime,
        };
        const res = await getRequest("work_log", body, userToken);
        if (res.statusCode === 200) {
            setWorkLogData(prevWorkLogData => [...prevWorkLogData, ...res.data]);
            dispatch(setExportData(res.data));
            setHasMore(res.data.length > 0);
        }
    };

    const handleFromTimeChange = (formattedDate) => {
        setFromTime(formattedDate);
        console.log(formattedDate);
    };

    const handleToTimeChange = (formattedDate) => {
        setToTime(formattedDate);
        console.log(formattedDate);
    };

    const onLogPress = (data) => {
        navigation.navigate("DayLog");
        if (Platform.OS !== 'android') window.history.pushState({}, 'DayLog');
    };

    const getFormattedWeekday = (dateString, lang) => {
        const date = new Date(dateString);
        const weekdays = lang === 'fa'
            ? ['ی شنبه', 'د شنبه', 'س شنبه', 'چ شنبه', 'پ شنبه', 'جمعه', 'شنبه']
            : ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const dayIndex = date.getDay();
        return weekdays[dayIndex];
    };

    const getFormattedDay = (dateString, lang) => {
        const date = new Date(dateString);
        if (lang === 'fa') {
            const jalaliDate = toJalaali(date.getFullYear(), date.getMonth() + 1, date.getDate());
            return jalaliDate.jd.toString().padStart(2, '0');
        } else {
            const locale = 'en-US';
            const options = {day: '2-digit'};
            const formatter = new Intl.DateTimeFormat(locale, options);
            const dayPart = formatter.formatToParts(date).find(part => part.type === 'day');
            return dayPart ? dayPart.value : '';
        }
    };

    const loadMoreData = async () => {
        if (!isLoading && hasMore) {
            setIsLoading(true);
            const nextPage = currentPage + 1;
            setCurrentPage(nextPage);

            await getWorkLogReport(fromTime, toTime, nextPage);
            setIsLoading(false);
        }
    };

    const renderDataItem = (item) => {
        return (
            <Pressable style={styles.itemWrapper} key={item.id} onPress={() => onLogPress(item)}>
                <View style={styles.leftWrapper}>
                    <View style={styles.dateWrapper}>
                        <CustomText size={9} color={colors.onSurfaceLowest} weight={'bold'} lineHeight={16}
                                    textAlign={'center'}>
                            {getFormattedWeekday(item.date, lang === 'fa' ? 'fa' : 'en')}
                        </CustomText>
                        <CustomText size={14} color={colors.onSurface} weight={'bold'} lineHeight={20}
                                    textAlign={'center'}>
                            {getFormattedDay(item.date, lang === 'fa' ? 'fa' : 'en')}
                        </CustomText>
                    </View>
                    <View style={styles.titleWrapper}>
                        <CustomText size={16} color={colors.onSurfaceHigh} lineHeight={24}
                                    textAlign={'left'}>
                            {t("daily_total")} {item.title}
                        </CustomText>
                        {item.desc &&
                            <CustomText size={12} color={colors.onSurfaceLow} lineHeight={16} textAlign={'left'}>
                                {item.desc}
                            </CustomText>
                        }
                    </View>
                </View>
                <KhiyabunIcons style={styles.playIcon}
                               name={(I18nManager.isRTL) ? "direction-left-bold" : "direction-right-bold"} size={24}
                               color={colors.onSurface}/>
            </Pressable>
        );
    };

    const renderDataSection = ({item}) => {
        return (
            <View style={styles.list}>
                <View style={styles.overall2}>
                    <View style={styles.wrapper}>
                        <CustomText size={14} color={colors.onSurfaceLow} lineHeight={20}>
                            {t("total")}
                        </CustomText>
                        <CustomText size={14} color={colors.onSurface} weight={'bold'} lineHeight={20}>
                            {item.total}
                        </CustomText>
                    </View>
                    <View style={styles.wrapper}>
                        <CustomText size={14} color={colors.onSurfaceLow} lineHeight={20}>
                            {t("absence")}
                        </CustomText>
                        <CustomText size={14} color={colors.onSurface} weight={'bold'} lineHeight={20}>
                            {item.absence}
                        </CustomText>
                    </View>
                </View>
                <FlatList
                    data={item.data}
                    keyExtractor={(item, index) => item.id + index}
                    renderItem={({item}) => renderDataItem(item)}
                />
            </View>
        );
    };

    const renderDateItem = ({item}) => {
        return (
            <View>
                <View style={styles.dateContainer}>
                    <CustomText size={12} color={colors.onSurfaceContainer} lineHeight={16}
                                textAlign={'center'}>
                        {item.date}
                    </CustomText>
                </View>
                <FlatList
                    data={[item]}
                    keyExtractor={(item, index) => item.id + index}
                    renderItem={renderDataSection}
                />
            </View>
        );
    };


    if (isLoading && !currentPage) {
        return <Loader/>;
    }


    return (
        <FlatList style={styles.container}
                  data={workLogData}
                  keyExtractor={(item, index) => item.date + index}
                  renderItem={renderDateItem}
                  ListHeaderComponent={() => (
                      <>
                          <View style={styles.pickerWrapper}>
                              <MyDatePicker type="date" size={1} placeHolder={t("start_date")}
                                            onDateChange={handleFromTimeChange}/>
                              <MyDatePicker type="date" size={1} placeHolder={t("finish_date")}
                                            onDateChange={handleToTimeChange}/>
                          </View>
                          <Card customStyle={{paddingVertical: 8, paddingHorizontal: 16, marginTop: 8}}>
                              <View style={styles.headerTextWrapper}>
                                  <KhiyabunIcons name="clock-bold" size={18} color={colors.primary}/>
                                  <CustomText size={16} color={colors.onSurface} weight={'bold'} lineHeight={24}
                                              customStyle={{marginBottom: 2}}>
                                      {t("overall_totals")}
                                  </CustomText>
                              </View>

                              <View style={styles.overall}>
                                  <View style={styles.wrapper}>
                                      <CustomText size={14} color={colors.onSurfaceLow} lineHeight={20}>
                                          {t("total")}
                                      </CustomText>
                                      <CustomText size={14} color={colors.onSurface} weight={'bold'} lineHeight={20}>
                                          {totalWork}
                                      </CustomText>
                                  </View>
                                  <View style={styles.wrapper}>
                                      <CustomText size={14} color={colors.onSurfaceLow} lineHeight={20}>
                                          {t("absence")}
                                      </CustomText>
                                      <CustomText size={14} color={colors.onSurface} weight={'bold'} lineHeight={20}>
                                          {totalAbsence}
                                      </CustomText>
                                  </View>
                              </View>
                          </Card>
                      </>
                  )}
                  onEndReached={loadMoreData}
                  onEndReachedThreshold={0.5}
                  ListFooterComponent={isLoading && workLogData.length > 0 ?
                      <ActivityIndicator size="large" color={colors.primary} style={{paddingVertical: 16}}/> : null}
        />
    );

}

const useThemedStyles = () => {
    const {colors} = useTheme();
    return StyleSheet.create({
        container: {
            marginHorizontal: 8,
        },
        headerTextWrapper: {
            flexDirection: "row",
            alignItems: "center",
            gap: 5,
            marginBottom: 10,
        },
        overall: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginHorizontal: 5,
        },
        overall2: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingVertical: 6,
            paddingHorizontal: 12
        },
        wrapper: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 6,
        },
        dateContainer: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 16,
        },
        pickerWrapper: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
        },
        list: {
            backgroundColor: colors.surfaceContainerLowest,
            padding: 8,
            borderRadius: 8,
            marginVertical: 6,
        },
        itemWrapper: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingVertical: 12,
            paddingHorizontal: 8,
            borderTopWidth: 1,
            borderTopColor: colors.outlineSurface,
        },
        leftWrapper: {
            flexDirection: "row",
            alignItems: "center",
        },
        dateWrapper: {
            width: 40,
            height: 44,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: colors.surface,
            borderRadius: 6,
            gap: 2,
        },
        titleWrapper: {
            marginHorizontal: 8
        },
        playIcon: {marginRight: 4}

    });
};

export default TimesheetScreen;