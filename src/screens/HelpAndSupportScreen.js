import React from "react";
import {StyleSheet, ScrollView} from "react-native";
import Card from "../components/Card";
import {useTranslation} from "react-i18next";
import {useTheme} from "@react-navigation/native";
import ListItem from "../components/ListItem";
const HelpAndSupportScreen = ({navigation}) => {
    const { t, i18n } = useTranslation();
    const { colors } = useTheme();
    const styles = useThemedStyles(colors);




    return (
        <ScrollView style={styles.mainView}>
            <Card>
                <ListItem  text={t("support")} iconName={"headphone-bold"} place={"first"} isExternalLink={false} onPress={()=>navigation.navigate("Support")}/>
                       <ListItem  text={t("FAQ")} iconName={"help-bold"} place={"middle"}/>
                <ListItem  text={t("tutorial")} iconName={"teacher-bold"} place={"middle"}/>
                <ListItem  text={t("contact_us")} iconName={"call-bold"} place={"last"}/>
            </Card>
        </ScrollView>
    );
}

const useThemedStyles = (colors) => {
    return StyleSheet.create({
        mainView: {
            paddingHorizontal: 16,
            paddingBottom: 16,
        },
    });
};

export default HelpAndSupportScreen;
