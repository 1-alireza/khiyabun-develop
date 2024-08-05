import {useTranslation} from "react-i18next";
import {useTheme} from "@react-navigation/native";
import {StyleSheet, View, Text, Pressable} from "react-native";
import Card from "../../components/Card";
import KhiyabunIcons from "../../components/KhiyabunIcons";
import React, {useState} from "react";
import {CheckBox} from "@rneui/themed";

function AddedPlaceCheckList() {
    const {t, i18n} = useTranslation();
    const {colors} = useTheme();
    const styles = useThemedStyles(colors)
    const checkIcon = <KhiyabunIcons name={"tick-circle-outline"} size={20} color={colors.primary}/>
    const blankIcon = <KhiyabunIcons name={"circle-outline"} size={20} color={colors.primary}/>
    const [checkboxes, setCheckboxes] = useState([
            {
                content: "Go to the park",
                checked: false,
                id: 0
            },
            {
                content: "Go to the museum",
                checked: false,
                id: 1
            },
            {
                content: "Go to the class",
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


    return (
        <Card customStyle={styles.card}>
            <View style={styles.cardWrapper}>
                <View style={styles.headerContainer}>
                    <View style={styles.cardHeaderWrapper}>
                        <KhiyabunIcons name={"tick-circle-bold"} size={16} color={colors.primary}
                                       style={{marginTop: -2}}/>
                        <Text style={styles.cardHeader}>
                            {t("checklist")}
                        </Text>
                    </View>
                    <Pressable style={styles.cardHeaderWrapper}>
                        <Text style={styles.cardHeader}>
                            {t("add")}
                        </Text>
                        <KhiyabunIcons name={"add-outline"} size={16} color={colors.primary}
                                       style={{marginTop: -2}}/>
                    </Pressable>

                </View>
                {checkboxes.map((checkbox, index) => (
                    <CheckBox
                        iconRight={false}
                        size={20}
                        key={index}
                        checked={checkbox.checked}
                        onPress={() => handleCheckboxChange(index)}
                        iconType="material-community"
                        checkedIcon={checkIcon}
                        uncheckedIcon={blankIcon}
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
        </Card>

    )
}

const useThemedStyles = (colors) => {
    return StyleSheet.create({
        cardWrapper: {
            paddingHorizontal: 4
        },
        card: {
            width: "90%"
        },
        cardHeaderWrapper: {
            marginVertical: 10,
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
            gap: 4
        },
        cardHeader: {
            fontFamily: "dana-bold",
            fontSize: 16,
            color: colors.primary,
            lineHeight: 24,
        },
        dataWrapper: {
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
            gap: 6,
            marginVertical: 4
        },
        title: {
            fontSize: 14,
            lineHeight: 24,
            color: colors.onSurfaceHigh,
            fontFamily: "dana-regular"

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
        headerContainer: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 4
        }

    });
};
export default AddedPlaceCheckList