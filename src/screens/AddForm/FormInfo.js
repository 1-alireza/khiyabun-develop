import Input from "../../components/Input";
import CustomDropdown from "../../components/CustomDropdown";
import Card from "../../components/Card";
import {useTranslation} from "react-i18next";
import {useTheme} from "@react-navigation/native";
import {StyleSheet} from "react-native";


export default function FormInfo() {
    const {t, i18n} = useTranslation();
    const {colors} = useTheme();
    const styles = useThemedStyles(colors)
    const supportOptions = [
        {label: "Start a conversation", value: "Start a conversation"},
        {label: "Report a bug", value: "Report a bug"},
        {label: "Features request", value: "Features request"},
        {label: "Talk to cofounders", value: "Talk to cofounders"},
    ]
    return (
        <Card customStyle={styles.card}>
            <Input placeholder={t("total_price")} customStyles={{marginVertical: 20}}/>
            <Input placeholder={t("area_size")}/>
            <CustomDropdown style={styles.customDropdown} data={supportOptions} placeHolder={t("year_built")}/>
            <CustomDropdown style={styles.customDropdown} data={supportOptions} placeHolder={t("bedroom")}/>
        </Card>
    )
}
const useThemedStyles = (colors) => {
    return StyleSheet.create({
        customDropdown: {
            paddingVertical: 10
        },
        card: {
            width: "90%",
            marginHorizontal: 16
        }
    });
};
