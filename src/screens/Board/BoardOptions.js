import { Text ,StyleSheet,Pressable} from "react-native"
import KhiyabunIcons from "../../components/KhiyabunIcons";
import { useTheme } from "@react-navigation/native";
import gStyles from "../../global-styles/GlobalStyles";
function BoardOptions({text,iconName,onPressHandler}) {
    const { colors } = useTheme();
    const styles = useThemedStyles(colors);
    return (
        <Pressable style={styles.boardOptions} onPress={onPressHandler}>
            <KhiyabunIcons name={iconName} size={24} style={styles.boardOptionsIcons} />
            <Text style={styles.boardOptionsText}>
                {text}
            </Text>
        </Pressable>
    )
}
const useThemedStyles = (colors) => {

    return StyleSheet.create({
        boardOptions: {
            backgroundColor: colors.surfaceContainerLowest,
            flexDirection: "column",
            paddingHorizontal: 8,
            paddingVertical: 24,
            borderRadius: 8,
            gap: 8,
            justifyContent: "center",
            alignItems: "center",
            flex: 1,
        },
        boardOptionsIcons: {
            color: colors.secondary
        },
        boardOptionsText: {
            color: colors.onSurface,
            fontWeight: "500",
            fontSize: 12,
            lineHeight: 16,
            fontFamily: gStyles.fontBold.fontFamily,
        }

    });
};
export default BoardOptions