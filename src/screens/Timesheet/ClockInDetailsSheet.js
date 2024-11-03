import React from "react";
import {Dimensions, StyleSheet, View} from "react-native";
import {useTheme} from "@react-navigation/native";
import Sheet from "../../components/Sheet";
import Button from "../../components/Button";
import CustomText from "../../components/CustomText";
import Card from "../../components/Card";
import Chips from "../../components/Chips";
import Input from "../../components/Input";
import {useTranslation} from "react-i18next";

const ClockInDetailsSheet = ({isVisible, onDeleteShift, onEditShift,onClose}) => {
    const {t} = useTranslation();
    const {colors} = useTheme();
    const styles = useThemedStyles(colors);

    return (
        <Sheet isOpen={isVisible} onClose={onClose} fitContent={true} snapPoint={500}>
            <CustomText
                size={15} weight={'bold'} color={colors.onSurface} lineHeight={24}>
                Clock in details
            </CustomText>

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
                        textAlign={'left'}>
                        Total
                    </CustomText>
                </View>
                <View style={styles.entry}>
                    <Chips text={"Office 1"} height={26} type="confirm" transparent={true}/>
                    <CustomText
                        size={14} color={colors.onSurfaceHigh} lineHeight={20}
                        textAlign={'left'} weight={'bold'}>
                        11:41 am
                    </CustomText>
                    <CustomText
                        size={14} color={colors.onSurfaceHigh} lineHeight={20}
                        textAlign={'left'} weight={'bold'}>
                        1:44 pm
                    </CustomText>
                    <CustomText
                        size={14} color={colors.onSurfaceHigh} lineHeight={20}
                        textAlign={'left'} weight={'bold'}>
                        0:03
                    </CustomText>
                </View>
            </Card>

            <View style={styles.sheetBody}>
                <View style={styles.requestInfo}>
                    <CustomText
                        size={14} color={colors.onSurfaceLow} lineHeight={20}>
                        Total hours
                    </CustomText>
                    <CustomText
                        size={14} color={colors.onSurface} lineHeight={20}>
                        06:36:12
                    </CustomText>
                </View>
            </View>

            <View style={styles.sheetBody}>
                <View style={styles.requestInfo}>
                    <CustomText
                        size={14} color={colors.onSurfaceLow} lineHeight={20}>
                        Total hours
                    </CustomText>
                    <CustomText
                        size={14} color={colors.onSurface} lineHeight={20}>
                        06:36:12
                    </CustomText>
                </View>
                <View style={styles.requestInfo}>
                    <CustomText
                        size={14} color={colors.onSurfaceLow} lineHeight={20}>
                        Unacceptable rest
                    </CustomText>
                    <CustomText
                        size={14} color={colors.onSurface} lineHeight={20}>
                        00:36:12
                    </CustomText>
                </View>
                <View style={styles.requestInfo}>
                    <CustomText
                        size={14} color={colors.onSurfaceLow} lineHeight={20}>
                        acceptable rest
                    </CustomText>
                    <CustomText
                        size={14} color={colors.onSurface} lineHeight={20}>
                        00:36:12
                    </CustomText>
                </View>
            </View>

            <View style={{marginBottom: 16, alignItems: "flex-start"}}>
                <Input placeholder={"Attach a note to your request"} label={t("note")} multiline={true}/>
            </View>

            <View style={styles.sheetButtons}>
                <Button
                    label="Edit shift"
                    sizeButton="medium"
                    style={styles.editButton}
                    styleText={styles.editButtonText}
                    width={50}
                    isBorder="true"
                    textWeight="bold"
                    borderColor={colors.primaryOutline}
                    onPress={onEditShift}
                />
                <Button
                    label="Delete shift"
                    sizeButton="medium"
                    style={styles.deleteButton}
                    styleText={styles.deleteButtonText}
                    width={50}
                    isBorder="true"
                    textWeight="bold"
                    onPress={onDeleteShift}
                />
            </View>
        </Sheet>
    );
};
const useThemedStyles = (colors) => {
    return StyleSheet.create({
        sheetBody: {
            flexDirection: "column",
            gap: 8,
            width: "100%",
            backgroundColor: colors.surface,
            borderRadius: 8,
            paddingVertical: 8,
            marginBottom: 16

        },
        requestInfo: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingVertical: 8,
            paddingHorizontal: 16
        },
        workLogHeaderWrapper: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            padding: 8,
        },
        entry: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: "center",
            marginRight: 8
        },
        sheetButtons: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
        },
        editButton: {
            borderRadius: 8,
            backgroundColor: colors.primaryContainer,
            justifyContent: "center",
            alignItems: "center",
            width: Dimensions.get('window').width / 2 - 35,
        },
        editButtonText: {
            color: colors.darkPrimary,

        },
        deleteButton: {
            backgroundColor: colors.errorContainer,
            borderColor: colors.errorOutline,
        },
        deleteButtonText: {
            color: colors.darkError,
        },
    });
};


export default ClockInDetailsSheet;