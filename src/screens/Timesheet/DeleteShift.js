import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {useTheme} from '@react-navigation/native';
import Button from "../../components/Button";
import {useTranslation} from "react-i18next";
import KhiyabunIcons from "../../components/KhiyabunIcons";
import CustomText from "../../components/CustomText";
import Input from "../../components/Input";
import CustomModal from "../../components/CustomModal";

const DeleteShift = () => {
    const {t} = useTranslation();
    const styles = useThemedStyles();
    const {colors} = useTheme();
    const [DeleteShift, setDeleteShift] = useState(false);
    const [isDeleteShiftModalVisible, setIsDeleteShiftModalVisible] = useState(false)
    const toggleDeleteShiftModal = () => {
        setIsDeleteShiftModalVisible(!isDeleteShiftModalVisible);
    }
    const confirmDeleteShift = () => {
        setDeleteShift(true);
        setIsDeleteShiftModalVisible(!isDeleteShiftModalVisible);
    }


    return (
        <View style={styles.container}>
            <View style={styles.deleteShift}>
                <View style={styles.circle}>
                    <KhiyabunIcons style={styles.circleIcon} name="trash-bold"
                                   size={24} color={colors.error}/>
                </View>
                <CustomText
                    size={16} color={colors.onSurface} lineHeight={24}
                    textAlign={'center'} weight={'bold'} customStyle={{padding: 12}}>
                    {t("delete_shift")}
                </CustomText>
                <CustomText
                    size={14} color={colors.onSurface} lineHeight={20}
                    textAlign={'center'} customStyle={{paddingHorizontal: 24}}>
                    This action will be sent for your managers approval before taking effect You can follow the status
                    of your request at ‘my request’
                </CustomText>
                <View style={{marginTop: 24, alignItems: "flex-start"}}>
                    <Input placeholder={"Attach a note to your request"} label={t("note")} multiline={true}/>
                </View>
            </View>

            <Button label="Send for approval"
                    sizeButton={"medium"}
                    style={styles.finishButton}
                    styleText={styles.finishButtonText}
                    isBorder="true"
                    typeButton="full"
                    textWeight="bold"
                    onPress={toggleDeleteShiftModal}
            />
            <CustomModal isVisible={isDeleteShiftModalVisible} width={90} modalTitle={"Delete information"}
                         onClose={toggleDeleteShiftModal}
                         actionCallback={confirmDeleteShift}
                         actionButtonText={"Got it"}
                         titleIcon={"info-circle-bold"}
                         type={"info"} hasDoubleBtn={false} modalBody={<CustomText
                size={14} color={colors.onSurfaceLow} lineHeight={20}>
                The shift you deleted was sent for your managers approval
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
            backgroundColor: colors.errorContainer,
            alignItems: "center",
            justifyContent: "center",
        },
        circleIcon: {},
        finishButton: {
            backgroundColor: colors.errorContainer,
            borderColor: colors.errorOutline,
        },
        finishButtonText: {
            color: colors.darkError,
        },

    });
};


export default DeleteShift;