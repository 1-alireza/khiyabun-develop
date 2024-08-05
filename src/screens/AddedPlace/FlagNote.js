import {StyleSheet, Text, View} from "react-native";
import {useTranslation} from "react-i18next";
import {useTheme} from "@react-navigation/native";
import KhiyabunIcons from "../../components/KhiyabunIcons";


export default function FlagNote({content, time}) {
    const {t, i18n} = useTranslation();
    const {colors} = useTheme();
    const styles = useThemedStyles(colors)


    return (
        <View style={styles.flagNoteCard}>
            <KhiyabunIcons name={"quote-outline"} size={24} color={colors.onSurface}/>
            <View>
                <Text style={styles.flagContent}>{content}</Text>
                <Text style={styles.flagTime}>{time}</Text>
            </View>
        </View>
    )

}
const useThemedStyles = (colors) => {
    return StyleSheet.create({
        flagNoteCard: {
            flexDirection: "row",
            alignItems: "flex-start",
            justifyContent: "flex-start",
            backgroundColor: colors.surface,
            padding: 8,
            marginVertical: 5,
            borderRadius: 6
        },
        flagContent: {
            fontSize: 14,
            lineHeight: 20,
            color: colors.onSurface,
        },
        flagTime: {
            fontSize: 12,
            lineHeight: 16,
            color: colors.onSurfaceLowest
        }

    });
};
