import React, {useState} from 'react';
import {View, FlatList, StyleSheet, Platform} from 'react-native';
import {useNavigation, useTheme} from '@react-navigation/native';
import Button from "../../components/Button";
import {useTranslation} from "react-i18next";
import Card from "../../components/Card";
import KhiyabunIcons from "../../components/KhiyabunIcons";
import CustomText from "../../components/CustomText";
import Chips from "../../components/Chips";
import ClockInDetailsSheet from "./ClockInDetailsSheet";
import useWebBackButtonHandler from "../../navigation/hardwareBackHandler";

const data = [
    {id: '1', label: 'Office 1', start: '11:41 am', end: '1:44 pm', total: '0:03'},
    {id: '2', label: 'Errand', start: '11:45 am', end: '1:29 pm', total: '0:44'},
    {id: '3', label: 'Office 1', start: '1:59 am', end: '8:30 pm', total: '6:31'},
];

const DayLog = () => {
    const {t} = useTranslation();
    const styles = useThemedStyles();
    const {colors} = useTheme();
    const navigation = useNavigation();
    const [isClockInDetailsSheetSheetVisible, setClockInDetailsSheetVisible] = useState(false);

    const addNewRequest = () => {
        setClockInDetailsSheetVisible(true);
    };
    const closeSheet = () => {
        setClockInDetailsSheetVisible(false);
    };

    function deleteShift() {
        navigation.navigate("DeleteShift");
        if (Platform.OS !== 'android') window.history.pushState({}, 'DeleteShift');
    }

    function editShift() {
        navigation.navigate("EditShift");
        if (Platform.OS !== 'android') window.history.pushState({}, 'EditShift');
    }


    const renderItem = ({item}) => (
        <View style={styles.entry}>
            <Chips text={item.label} height={26} type="confirm" transparent={true}/>
            <CustomText
                size={14} color={colors.onSurfaceHigh} lineHeight={20}
                textAlign={'left'} weight={'bold'}>
                {item.start}
            </CustomText>
            <CustomText
                size={14} color={colors.onSurfaceHigh} lineHeight={20}
                textAlign={'left'} weight={'bold'}>
                {item.end}
            </CustomText>
            <CustomText
                size={14} color={colors.onSurfaceHigh} lineHeight={20}
                textAlign={'left'} weight={'bold'}>
                {item.total}
            </CustomText>
            <KhiyabunIcons style={styles.playIcon} name="direction-right-outline" size={18} color={colors.onSurface}/>
        </View>
    );

    return (
        <>
            <View style={styles.container}>
                <View>
                    <Card customStyle={{paddingVertical: 16, paddingHorizontal: 16, marginTop: 16}}>
                        <View style={styles.headerTextWrapper}>
                            <CustomText
                                size={16} color={colors.onSurfaceHigh} lineHeight={24}
                                textAlign={'left'}>
                                Total hours
                            </CustomText>
                            <CustomText
                                size={16} color={colors.primary} lineHeight={24} weight={'bold'}
                                textAlign={'left'}>
                                07:17
                            </CustomText>
                        </View>
                        <CustomText
                            size={12} color={colors.darkError} lineHeight={16}
                            textAlign={'left'}>
                            43 minutes less than the set amount
                        </CustomText>
                    </Card>
                    <Card customStyle={{paddingVertical: 8, paddingHorizontal: 8, marginTop: 8}}>
                        <View style={styles.workLogHeaderWrapper}>
                            <CustomText
                                size={14} color={colors.onSurface} lineHeight={20}
                                textAlign={'left'}>
                                Status
                            </CustomText>

                            <CustomText
                                size={14} color={colors.onSurface} lineHeight={20}
                                textAlign={'left'}>
                                Start
                            </CustomText>
                            <CustomText
                                size={14} color={colors.onSurface} lineHeight={20}
                                textAlign={'left'}>
                                End
                            </CustomText>
                            <CustomText
                                size={14} color={colors.onSurface} lineHeight={20}
                                textAlign={'left'} customStyle={{marginRight: 40}}>
                                Total
                            </CustomText>
                        </View>
                        <FlatList
                            data={data}
                            renderItem={renderItem}
                            keyExtractor={item => item.id}
                        />
                    </Card>
                </View>

                <Button
                    style={{marginVertical: 16}}
                    label={t("add_new_request")}
                    sizeButton="medium"
                    typeButton="full"
                    colorButton="light"
                    isBorder="true"
                    textWeight="bold"
                    onPress={addNewRequest}
                />

            </View>
            <ClockInDetailsSheet isVisible={isClockInDetailsSheetSheetVisible} onDeleteShift={deleteShift}
                                 onEditShift={editShift} onClose={closeSheet}/>
        </>
    );
};


const useThemedStyles = () => {
    const {colors} = useTheme();

    return StyleSheet.create({
        container: {
            flex: 1,
            marginHorizontal: 8,
            justifyContent: "space-between"
        },
        headerTextWrapper: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
        },
        workLogHeaderWrapper: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottomWidth: 1,
            borderBottomColor: colors.outlineSurface,
            padding: 8,
            marginBottom: 8,
        },
        entry: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 8,
        }
    });
};


export default DayLog;