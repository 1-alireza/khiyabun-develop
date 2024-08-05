import {useTranslation} from "react-i18next";
import {useTheme} from "@react-navigation/native";
import {useState} from "react";
import {StyleSheet, Text, View} from "react-native";
import {ButtonGroup} from "@rneui/themed";
import KhiyabunIcons from "../../components/KhiyabunIcons";


export default function FlagsCategory() {
    const {t, i18n} = useTranslation();
    const {colors} = useTheme();
    const styles = useThemedStyles(colors)
    const [selectedIndex, setSelectedIndex] = useState(0);

    return (

        <View style={styles.statusWrapper}>
            <Text style={styles.title}>
                {t("flags")}
            </Text>
            <View style={styles.flagWrapper}>
                <View style={styles.flagDataWrapper}>
                    <KhiyabunIcons name={"flag-bold"} color={colors.confirm} size={20}/>
                    <Text>
                        {t("house")}
                    </Text>
                </View>
                <View style={styles.flagDataWrapper}>
                    <KhiyabunIcons name={"flag-bold"} color={colors.primary} size={20}/>
                    <Text>
                        {t("villa")}

                    </Text>
                </View>
                <View style={styles.flagDataWrapper}>
                    <KhiyabunIcons name={"flag-bold"} color={colors.warning} size={20}/>
                    <Text>
                        {t("cando")}

                    </Text>
                </View>
                <View style={styles.flagDataWrapper}>
                    <KhiyabunIcons name={"flag-bold"} color={colors.primary} size={20}/>
                    <Text>
                        {t("town-house")}
                    </Text>
                </View>
                <View style={styles.flagDataWrapper}>
                    <KhiyabunIcons name={"flag-bold"} color={"#FF00FF"} size={20}/>
                    <Text style={styles.flagDesc}>
                        {t("room")}
                    </Text>
                </View>


            </View>
        </View>
    )
}
const useThemedStyles = (colors) => {
    return StyleSheet.create({
        container: {
            borderTopLeftRadius: 100,
            borderTopRightRadius: 100,
            borderBottomRightRadius: 100,
            borderBottomLeftRadius: 100,
        },
        title: {
            fontSize: 16,
            lineHeight: 24,
            color: colors.primary,
        },

        statusWrapper: {
            borderBottomColor: colors.outlineSurface,
            borderBottomWidth: 1,
            paddingBottom: 8,
            marginBottom: 10
        },
        flagWrapper: {
            flexDirection: "row",
            alignItems: 'center',
            justifyContent: "space-evenly",
            marginVertical: 10
        },
        flagDesc: {
            fontSize: 12,
            lineHeight: 16,
            color: colors.onSurface
        },
        flagDataWrapper: {
            alignItems: 'center',
            justifyContent: "center"
        }
    });
};