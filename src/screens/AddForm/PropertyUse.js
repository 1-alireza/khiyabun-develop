import {useTranslation} from "react-i18next";
import {useTheme} from "@react-navigation/native";
import {StyleSheet, View, Text, Pressable} from "react-native";
import Card from "../../components/Card";
import KhiyabunIcons from "../../components/KhiyabunIcons";
import React, {useState} from "react";
import {CheckBox} from "@rneui/themed"
import AddFormCard from "./AddFormCard";
import gStyles from "../../global-styles/GlobalStyles";


function PropertyUse() {
    const {t, i18n} = useTranslation();
    const {colors} = useTheme();
    const styles = useThemedStyles(colors)
    const [selectedCheckboxIndex, setSelectedCheckboxIndex] = useState(null);
    const [checkboxes, setCheckboxes] = useState([
            {
                content: "Residential",
                id: 0
            },
            {
                content: "Official",
                id: 1
            },
            {
                content: "Commercial",
                id: 2
            },
        ]
    )

    const handleCheckboxChange = (index) => {
        setSelectedCheckboxIndex(index);
    };


    return (
        <AddFormCard header={t("property_use")}>
            <View style={styles.checkBoxWrapper}>
                <View style={styles.cardWrapper}>
                    {checkboxes.map((checkbox, index) => (
                        <CheckBox
                            iconRight={false}
                            size={20}
                            checked={index === selectedCheckboxIndex}
                            onPress={() => handleCheckboxChange(index)}
                            title={checkbox.content}
                            checkedIcon="checkbox-marked"
                            uncheckedIcon="checkbox-blank-outline"
                            key={index}
                            iconType="material-community"
                            containerStyle={styles.radio}
                            checkedColor={colors.primary}
                            textStyle={styles.title}


                        />
                    ))}
                </View>
            </View>

        </AddFormCard>

    )
}

const useThemedStyles = (colors) => {
    return StyleSheet.create({
        cardWrapper: {
            paddingHorizontal: 4,
            width: "50%"
        },

        radio: {
            backgroundColor: "transparent",
            borderWidth: 0,
            padding: 0,
            margin: 0,
            marginRight: 0,
            marginLeft: 0,
            marginVertical: 5,
        },
        checkBoxWrapper: {
            flexDirection: "row",
            alignItems: 'center',
            padding: 8,
            justifyContent: "flex-start"
        },
        title: {
            fontFamily: gStyles.fontBold.fontFamily,
            fontSize: 12
        },

    });
};
export default PropertyUse