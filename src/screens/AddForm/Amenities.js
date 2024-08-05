import {useTranslation} from "react-i18next";
import {useTheme} from "@react-navigation/native";
import {StyleSheet, View, Text, Pressable} from "react-native";
import Card from "../../components/Card";
import KhiyabunIcons from "../../components/KhiyabunIcons";
import React, {useState} from "react";
import {CheckBox} from "@rneui/themed"
import AddFormCard from "./AddFormCard";

function Amenities() {
    const {t, i18n} = useTranslation();
    const {colors} = useTheme();
    const styles = useThemedStyles(colors)
    const [checkboxes, setCheckboxes] = useState([
            {
                content: "Real state",
                checked: false,
                id: 0
            },
            {
                content: "Villa",
                checked: false,
                id: 1
            },
            {
                content: "Shop",
                checked: false,
                id: 2
            },
        {
            content: "Real state",
            checked: false,
            id: 3
        },
        {
            content: "Villa",
            checked: false,
            id: 4
        },
        {
            content: "Shop",
            checked: false,
            id: 5
        },
        ]
    )
    const [tempCheckboxes, setTempCheckboxes] = useState([
            {
                content: "Apartment",
                checked: false,
                id: 0
            },
            {
                content: "Land",
                checked: false,
                id: 1
            },
            {
                content: "Factory",
                checked: false,
                id: 2
            },
        ]
    )
    const handleCheckboxChange = (index) => {
        const updatedCheckboxes = [...checkboxes];
        updatedCheckboxes[index].checked = !updatedCheckboxes[index].checked;
        setCheckboxes(updatedCheckboxes);
    };

    const handleTempCheckboxChange = (index) => {
        const updatedCheckboxes = [...tempCheckboxes];
        updatedCheckboxes[index].checked = !updatedCheckboxes[index].checked;
        setTempCheckboxes(updatedCheckboxes);
    };


    return (
        <AddFormCard header={t("amenities")}>
            <View style={styles.checkBoxWrapper}>
                <View style={styles.cardWrapper}>
                    {checkboxes.map((checkbox, index) => (
                        <CheckBox
                            iconRight={false}
                            size={20}
                            key={index}
                            checked={checkbox.checked}
                            onPress={() => handleCheckboxChange(index)}
                            iconType="material-community"
                            checkedIcon="checkbox-marked"
                            uncheckedIcon="checkbox-blank-outline"
                            containerStyle={styles.radio}
                            checkedColor={colors.primary}
                            textStyle={checkbox.checked ? [styles.title, {
                                color: colors.onSurfaceLow,
                                textDecorationLine: "line-through"
                            }] : styles.title}
                            title={checkbox.content}


                        />
                    ))}
                </View>

                <View style={styles.cardWrapper}>
                    {tempCheckboxes.map((checkbox, index) => (
                        <CheckBox
                            iconRight={false}
                            size={20}
                            key={index}
                            checked={checkbox.checked}
                            onPress={() => handleTempCheckboxChange(index)}
                            iconType="material-community"
                            checkedIcon="checkbox-marked"
                            uncheckedIcon="checkbox-blank-outline"
                            containerStyle={styles.radio}
                            checkedColor={colors.primary}
                            textStyle={checkbox.checked ? [styles.title, {
                                color: colors.onSurfaceLow,
                                textDecorationLine: "line-through"
                            }] : styles.title}
                            title={checkbox.content}
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
            width:"50%",

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
            alignItems: 'flex-start',
            padding: 8,
            justifyContent: "flex-start"
        }

    });
};
export default Amenities