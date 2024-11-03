import { StyleSheet } from "react-native";
import { useTranslation } from "react-i18next";
import { useTheme } from "@react-navigation/native";
import Button from "../../components/Button";
import React from "react";

export default function ChangePasswordConfirmBtn({ onPress, disabled }) {
    const { t, i18n } = useTranslation();
    const { colors } = useTheme();
    const styles = useThemedStyles(colors)
    return (
        <Button label={t("confirm")} sizeButton={"medium"}
            style={styles.selectButton}
            styleText={styles.selectButtonText} width={95}
            onPress={onPress}
            disabled={disabled}
            isBorder={true} borderColor={colors.primaryOutline} />
    )
}

const useThemedStyles = (colors) => {
    return StyleSheet.create({
        selectButton: {
            borderRadius: 8,
            backgroundColor: colors.primary,
            justifyContent: "center",
            alignItems: "center",
            marginHorizontal: 12,
            marginVertical: 10,
            position: "absolute",
            bottom: 0
        },
        selectButtonText: {
            fontWeight: "500",
            fontSize: 16,
            lineHeight: 24,
            color: colors.textOn
        },
    });
};
