import {View, StyleSheet, Pressable,} from "react-native"
import {useTheme} from "@react-navigation/native";
import {Overlay} from 'react-native-elements';
import KhiyabunIcons from "./KhiyabunIcons";
import Button from "./Button";
import React from "react";
import CustomText from "./CustomText";

const CustomModal = ({
                         isVisible,
                         animationType = "none",
                         modalBody,
                         modalTitle,
                         titleIcon,
                         hasCloseIcon = false,
                         onClose,
                         width,
                         modalStyle,
                         hasDoubleBtn = true,
                         actionButtonText,
                         cancelButtonText,
                         type = "error",
                         actionCallback,
                         disabled = false,
                         cancelCallback,
                         onCloseCallback,
                         onOpenCallback,
                     }) => {
    const {colors} = useTheme();
    const styles = useThemedStyles(colors)
    const modalClass = []
    width && modalClass.push({width: width + "%"})
    modalClass.push(modalStyle)


    return (
        <Overlay isVisible={isVisible}
                 onRequestClose={onClose}
                 overlayStyle={[styles.modalStyle, modalClass,]}
                 onBackdropPress={onClose}
                 animationType={animationType}>
            <View style={styles.modalHeader}>
                <Pressable style={styles.modalTitle}>
                    <KhiyabunIcons name={titleIcon} size={16}
                                   color={type === "error" ? colors.error : type === "warning" ? colors.warning : colors.info}/>
                    <CustomText
                        size={16} color={colors.onSurfaceHigh} lineHeight={24} weight={'bold'}>
                        {modalTitle}
                    </CustomText>
                </Pressable>
                {hasCloseIcon && (<Pressable onPress={onClose}>
                    <KhiyabunIcons name={"close-outline"} size={16}
                                   color={type === "error" ? colors.error : type === "warning" ? colors.warning : colors.info}/>
                </Pressable>)}
            </View>

            <View style={styles.modalBody}>
                {modalBody}
            </View>
            <View style={styles.modalFooter}>
                <Button textWeight={"bold"} label={actionButtonText}
                        sizeButton={"small"}
                        disabled={disabled}
                        style={[styles.actionButton, {backgroundColor: type === "error" ? colors.errorContainer : type === "warning" ? colors.warningContainer : colors.infoContainer},
                            {borderColor: type === "error" ? colors.errorOutline : type === "warning" ? colors.warningOutline : colors.infoOutline}]}
                        styleText={[styles.actionButtonText, {color: type === "error" ? colors.darkError : type === "warning" ? colors.darkWarning : colors.darkInfo}]}
                        width={hasDoubleBtn ? 50 : 100} onPress={actionCallback}
                        isBorder={true} borderColor={colors.primaryOutline}/>
                {hasDoubleBtn && (
                    <Button textWeight={"bold"} label={cancelButtonText}
                            sizeButton={"small"} style={styles.cancelButton} width={50}
                            styleText={[styles.cancelButtonText, {color: type === "error" ? colors.error : type === "warning" ? colors.warning : colors.info}]}
                            onPress={onClose}/>)}

            </View>
        </Overlay>
    )

}

const useThemedStyles = (colors) => {
    return StyleSheet.create({
        modalHeader: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between"
        },
        modalTitle: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start",
            gap: 4
        },
        modalBody: {
            paddingHorizontal: 4, marginVertical: 10
        },
        modalStyle: {
            backgroundColor: colors.surfaceContainerLowest,
            padding: 16,
            borderRadius: 8
        },
        modalFooter: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: colors.surfaceContainerLowest,
        },
        actionButton: {
            borderRadius: 8,
            backgroundColor: colors.errorContainer,
            justifyContent: "center",
            alignItems: "center",
            borderColor: colors.errorOutline
        },
        actionButtonText: {
            fontSize: 14,
            lineHeight: 20,
            color: colors.darkError
        },
        cancelButton: {
            borderRadius: 8,
            backgroundColor: colors.surfaceContainerLowest,
            justifyContent: "center",
            alignItems: "center"
        },
        cancelButtonText: {
            fontSize: 16,
            lineHeight: 24,
            color: colors.error
        },
    });
};


export default CustomModal
