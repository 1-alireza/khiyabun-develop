import React, {memo, useEffect, useState} from "react";
import {View, StyleSheet, SectionList, TouchableOpacity, ActivityIndicator, Platform} from "react-native";
import KhiyabunIcons from "../../components/KhiyabunIcons";
import {useNavigation, useTheme, useIsFocused} from "@react-navigation/native";
import {CheckBox} from "@rneui/themed";
import {getRequest, putRequest} from "../../utils/sendRequest";
import {useSelector} from "react-redux";
import CustomText from "../../components/CustomText";
import {useTranslation} from "react-i18next";
import EmptyData from "../../components/EmptyData";
import CustomToast from "../../components/CustomToast";
import useWebBackButtonHandler from "../../navigation/hardwareBackHandler";

const CheckList = memo(() => {
    const userToken = useSelector(state => state.login.token);
    const {colors} = useTheme();
    const {t} = useTranslation();
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState([]);
    const styles = useThemedStyles();
    const navigation = useNavigation();
    const isFocused = useIsFocused();

    useEffect(() => {
        if (isFocused) {
            getCheckLists();
        }
    }, [isFocused]);

    const getCheckLists = async () => {
        setIsLoading(true);
        try {
            const res = await getRequest("checklists/today", {}, userToken);
            if (res.statusCode === 200) {
                const sections = res.data.map(item => ({
                    checklistId: item.id,
                    title: item.title,
                    data: item.items,
                }));
                setData(sections);
            }
        } catch (error) {
            console.error("Failed to fetch today checklists", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleCheckboxChange = async (checklistId, itemId, currentStatus) => {
        try {
            const res = await putRequest(`checklists/mark?checklistId=${checklistId}&itemId=${itemId}&isDone=${!currentStatus}`, {}, userToken);
            if (res.statusCode === 200) {
                setData(prevData =>
                    prevData.map(section => ({
                        ...section,
                        data: section.data.map(item =>
                            item.id === itemId ? {...item, done: !currentStatus} : item
                        )
                    }))
                );
                CustomToast.show(res.message, "confirm", "top", 3000);
            } else {
                CustomToast.show(res.message, "error");
            }
        } catch (error) {
            console.error("Failed to mark the checkbox", error);
        }
    };

    const renderItem = ({item, section}) => (
        <CheckBox
            checked={item.done}
            onPress={() => handleCheckboxChange(section.checklistId, item.id, item.done)}
            checkedIcon={<KhiyabunIcons name={'tick-circle-outline'} size={20} color={colors.primary}/>}
            uncheckedIcon={<KhiyabunIcons name={'circle-outline'} size={20} color={colors.onSurface}/>}
            containerStyle={styles.checkBox}
            title={<View style={item.done ? {opacity: 0.4} : {}}>
                <CustomText
                    size={16}
                    color={colors.onSurfaceHigh}
                    lineHeight={24}
                    textAlign={'left'}
                    customStyle={{
                        paddingHorizontal: 6,
                        textDecorationLine: item.done ? 'line-through' : 'none'
                    }}
                >
                    {item.text}
                </CustomText>
            </View>}
        />
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.headerTextWrapper}>
                    <KhiyabunIcons name="tick-circle-bold" size={18} color={colors.primary}
                                   style={{marginBottom: 3.5}}/>
                    <CustomText
                        size={16} color={colors.onSurface} weight={'bold'} lineHeight={24}
                        textAlign={'left'} customStyle={{marginBottom: 2}}>
                        {t('my_check_list')}
                    </CustomText>
                </View>
                <TouchableOpacity onPress={() => {
                    navigation.navigate("CheckList");
                    if (Platform.OS !== 'android') window.history.pushState({}, 'CheckList');
                }} activeOpacity={0.6}
                                  style={styles.headerTextWrapper}>
                    <CustomText
                        size={14} color={colors.darkPrimary} weight={'bold'} lineHeight={24}
                        customStyle={{marginBottom: 3.5}}>
                        {t('add')}
                    </CustomText>
                    <KhiyabunIcons name={"add-outline"} size={18} color={colors.darkPrimary}
                                   style={{marginBottom: 3.5}}/>
                </TouchableOpacity>
            </View>
            {isLoading ? (
                <ActivityIndicator size="large" color={colors.primary} style={{flex: 1}}/>
            ) : data.length ? (
                <SectionList
                    sections={data}
                    keyExtractor={(item, index) => item.id + index}
                    renderItem={renderItem}
                    renderSectionHeader={({section: {title}}) => (
                        <CustomText
                            size={15} color={colors.onSurface} weight={'bold'} lineHeight={24}
                            textAlign={'left'}
                            customStyle={{paddingTop: 10}}>
                            {title}
                        </CustomText>
                    )}
                    renderSectionFooter={() => (
                        <View style={{
                            borderBottomWidth: 1,
                            borderColor: colors.outlineSurface,
                            marginBottom: 8
                        }}></View>
                    )}
                />
            ) : (
                <EmptyData fullPage={false} hasSearch={false}
                           customStyle={{flex: 1, alignSelf: "center"}}/>
            )}
        </View>
    );
});

const useThemedStyles = () => {
    const {colors} = useTheme();

    return StyleSheet.create({
        container: {
            flex: 1,
            paddingHorizontal: 16,
            paddingBottom: 8,
            marginTop: 8,
            marginBottom: 8,
            borderRadius: 6,
            marginHorizontal: 6,
            flexDirection: "column",
            backgroundColor: colors.surfaceContainerLowest
        },
        header: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingTop: 16,
            paddingBottom: 10,
            borderBottomWidth: 1,
            borderColor: colors.outlineSurface
        },
        headerTextWrapper: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 4,

        },
        checkBox: {
            paddingLeft: 0,
            paddingRight: 0,
            padding: 3,
            color: colors.onSurface,
            backgroundColor: colors.surfaceContainerLowest,
        },
    });
};

export default CheckList;