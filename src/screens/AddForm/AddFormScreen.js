import {useTheme} from "@react-navigation/native";
import {ScrollView, StyleSheet, View} from "react-native";
import {ButtonGroup} from "@rneui/themed";
import {useState} from "react";
import {useTranslation} from "react-i18next";
import FormType from "./FormType";
import PropertyType from "./PropertyType";
import PropertyUse from "./PropertyUse";
import AddressDetails from "./AddressDetails";
import ContactInfo from "./ContactInfo";
import FormInfo from "./FormInfo";
import FloorData from "./FloorData";
import Amenities from "./Amenities";
import FormConfirmBtn from "./FormConfirmBtn";
function AddFormScreen() {
    const {t, i18n} = useTranslation();
    const {colors} = useTheme();
    const styles = useThemedStyles(colors)


    return (
        <ScrollView style={styles.mainView}>
            <FormType/>
            <PropertyType/>
            <PropertyUse/>
            <AddressDetails/>
            <ContactInfo/>
            <FormInfo/>
            <FloorData/>
            <Amenities/>
            <FormConfirmBtn/>
        </ScrollView>
    )
}


const useThemedStyles = (colors) => {
    return StyleSheet.create({
        mainView: {
            paddingBottom: 16,
        },
    });
};


export default AddFormScreen