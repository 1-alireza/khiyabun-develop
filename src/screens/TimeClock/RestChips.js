import {View, StyleSheet, FlatList, Dimensions, ActivityIndicator} from 'react-native';
import {useTheme} from "@react-navigation/native";
import Card from "../../components/Card";
import CustomText from "../../components/CustomText";
import React, {memo, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useTranslation} from "react-i18next";
import {getRequest} from "../../utils/sendRequest";
import {setWorkLogData} from "../../redux/slices/workLogSlice";

const RestChips = memo(() => {
    const styles = useThemedStyles();
    const {colors} = useTheme();
    const {t} = useTranslation();
    const userToken = useSelector(state => state.login.token);
    const {workLogData} = useSelector(state => state.workLog);
    const [restsList, setRestsList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchData = async () => {
            await getWorkLogData();
        };
        fetchData();
    }, []);

    useEffect(() => {
        const createRestsListUi = () => {
            if (!workLogData || !workLogData.rests) return [];

            return workLogData.rests.map(rest => {
                const {startTime, endTime, restType} = rest;

                if (startTime) {
                    const start = new Date(startTime);
                    const end = endTime ? new Date(endTime) : new Date();
                    const durationInSeconds = Math.round((end - start) / 1000);
                    const hours = Math.floor(durationInSeconds / 3600);
                    const minutes = Math.floor((durationInSeconds % 3600) / 60);

                    let formattedDuration;
                    if (endTime) {
                        if (durationInSeconds < 60) {
                            formattedDuration = t('less_than_one_minute')
                        } else {
                            formattedDuration = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
                        }
                    } else if (!endTime) formattedDuration = t('ongoing');

                    return {formattedDuration, restType};
                } else {
                    return {formattedDuration: 'invalid start', restType};
                }
            });
        };

        const durations = createRestsListUi();
        setRestsList(durations);
    }, [workLogData]);

    const getWorkLogData = async () => {
        setIsLoading(true);
        try {
            let res = await getRequest("work_log/latest", {}, userToken);

            if (res.statusCode === 200) {
                dispatch(setWorkLogData(res.data));
            }
        } catch (error) {
            console.error("Error fetching work log data:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Card customStyle={styles.container}>
            {isLoading ? (
                <ActivityIndicator size="large" color={colors.primary} style={{flex: 1}}/>
            ) : (<FlatList
                    data={restsList}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({item, index}) => (
                        <View style={styles.restContainer}>
                            <CustomText size={14} weight={'bold'} color={colors.onSurface} lineHeight={18}
                                        customStyle={{marginBottom: 6}}>
                                {t('rest')} {index + 1}
                            </CustomText>
                            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                <CustomText size={12} color={colors.onSurface} lineHeight={16}>
                                    {item.restType}
                                </CustomText>
                                <CustomText size={12} color={colors.onSurface} lineHeight={16}>
                                    {t('duration')}: {item.formattedDuration}
                                </CustomText>
                            </View>
                        </View>
                    )}
                />
            )}
        </Card>
    );
});

const useThemedStyles = () => {

    const {colors} = useTheme();

    return StyleSheet.create({
        container: {
            marginTop: 8,
            width: (Dimensions.get('window').width - 15),
            padding: 10,
            flexDirection: "column",
            alignSelf: "center",
            flex: 1
        },
        restContainer: {
            flexDirection: 'column',
            backgroundColor: colors.surface,
            padding: 10,
            marginBottom: 10,
            borderRadius: 8,
            borderColor: colors.border,
            borderWidth: 1,

        },
    });
};

export default RestChips;