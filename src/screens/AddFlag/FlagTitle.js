import {useTranslation} from "react-i18next";
import {useTheme} from "@react-navigation/native";
import {useState} from "react";
import {StyleSheet, Text, View} from "react-native";

import Input from "../../components/Input";


export default function FlagTitle() {
    const {t, i18n} = useTranslation();
    const {colors} = useTheme();
    const styles = useThemedStyles(colors)
    const [selectedIndex, setSelectedIndex] = useState(0);

    return (

        <View style={styles.statusWrapper}>
        <Input placeholder={"title_of_place"}/>


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
            paddingBottom: 16,
            paddingVertical:8,
            marginBottom:10
        },
        flagWrapper: {
            flexDirection: "row",
            alignItems: 'center',
            justifyContent: "space-evenly",
            marginVertical:10
        },
        flagDesc:{
            fontSize:12,
            lineHeight:16,
            color:colors.onSurface
        },
        flagDataWrapper:{
            alignItems:'center',
            justifyContent:"center"
        }
    });
};