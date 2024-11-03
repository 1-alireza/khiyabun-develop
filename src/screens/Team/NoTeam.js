import {useTranslation} from "react-i18next";
import {useTheme} from "@react-navigation/native";
import {StyleSheet,Text} from "react-native";

export default function NoTeam() {    const {t, i18n} = useTranslation();
    const {colors} = useTheme();
    const styles = useThemedStyles(colors)

    return (
        <Text >
            {t("no_team_warning")}
        </Text>
    )

}
const useThemedStyles = (colors) => {
    return StyleSheet.create({

    });
};
