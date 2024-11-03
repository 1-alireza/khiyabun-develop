import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {useTheme} from '@react-navigation/native';
import Button from "../../components/Button";
import {useTranslation} from "react-i18next";
import KhiyabunIcons from "../../components/KhiyabunIcons";
import CustomText from "../../components/CustomText";
import Input from "../../components/Input";
import MyDatePicker from "../../components/Picker";
import CustomModal from "../../components/CustomModal";

const EditShift = () => {
    const {t} = useTranslation();
    const styles = useThemedStyles();
    const {colors} = useTheme();
    const [EditeShift, setEditeShift] = useState(false);
    const [isEditeShiftModalVisible, setIsEditeShiftModalVisible] = useState(false)
    const toggleEditeShiftModal = () => {
        setIsEditeShiftModalVisible(!isEditeShiftModalVisible);
    }
    const confirmEditeShift = () => {
        setEditeShift(true);
        setIsEditeShiftModalVisible(!isEditeShiftModalVisible);
    }

    return (
        <View style={styles.container}>
            <View style={styles.deleteShift}>
                <View style={styles.circle}>
                    <KhiyabunIcons style={styles.circleIcon} name="edit-bold"
                                   size={24} color={colors.info}/>
                </View>
                <CustomText
                    size={16} color={colors.onSurface} lineHeight={24}
                    textAlign={'center'} weight={'bold'} customStyle={{padding: 12}}>
                    {t("edit_shift")}
                </CustomText>
                <CustomText
                    size={14} color={colors.onSurface} lineHeight={20}
                    textAlign={'center'} customStyle={{paddingHorizontal: 24}}>
                    All request will be sent for a manager’s approval

                </CustomText>
                <View style={{marginTop: 24, alignItems: "flex-start"}}>

                    <View style={styles.pickerWrapper}>
                        <MyDatePicker type="date" size={2} placeHolder={"Start date"} label={"Start date"}
                                      customStyles={{marginBottom: 16}}/>
                        <MyDatePicker type="date" size={2} placeHolder={"End date"} label={"End date"}
                                      customStyles={{marginBottom: 24}} supportText={"Total hours: 7:13"}/>
                    </View>
                    <Input placeholder={"Attach a note to your request"} label={t("note")} multiline={true}/>
                </View>
            </View>

            <Button
                label={"Send for approval"}
                sizeButton="medium"
                typeButton="full"
                colorButton="light"
                isBorder="true"
                textWeight="bold"
                onPress={toggleEditeShiftModal}
            />
            <CustomModal isVisible={isEditeShiftModalVisible} width={90} modalTitle={"Edit information"}
                         onClose={toggleEditeShiftModal}
                         actionCallback={confirmEditeShift}
                         actionButtonText={"Got it"}
                         titleIcon={"info-circle-bold"}
                         type={"info"} hasDoubleBtn={false} modalBody={<CustomText
                size={14} color={colors.onSurfaceLow} lineHeight={20}>
                The shift you edited was sent for your managers approval
            </CustomText>}/>
        </View>
    );
};


const useThemedStyles = () => {
    const {colors} = useTheme();

    return StyleSheet.create({
        container: {
            flex: 1,
            marginTop: "7.5%",
            margin: 16,
            justifyContent: "space-between",
            alignItems: "center"
        },
        deleteShift: {
            alignItems: "center",
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
        circle: {
            width: 90,
            height: 90,
            borderRadius: 50,
            backgroundColor: colors.primaryContainer,
            alignItems: "center",
            justifyContent: "center",
        },
        finishButton: {
            backgroundColor: colors.errorContainer,
            borderColor: colors.errorOutline,
        },
        finishButtonText: {
            color: colors.darkError,
        },

    });
};


export default EditShift;