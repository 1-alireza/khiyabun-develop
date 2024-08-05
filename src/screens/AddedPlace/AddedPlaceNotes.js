import {useTranslation} from "react-i18next";
import {useTheme} from "@react-navigation/native";
import {StyleSheet, View, Text, Pressable} from "react-native";
import Card from "../../components/Card";
import KhiyabunIcons from "../../components/KhiyabunIcons";
import React, {useState} from "react";
import FlagNote from "./FlagNote";
import {CheckBox} from "@rneui/themed";

function AddedPlaceCheckList() {
    const {t, i18n} = useTranslation();
    const {colors} = useTheme();
    const styles = useThemedStyles(colors)
    const [seeMore, setSeeMore] = useState(false)

    const notes = [
        {
            content: "We talk about home price",
            time: "Updated Sat, Nov04 . 21:52",
            id: 0
        },

        {
            content: "Owner send me a document",
            time: "Updated Sat, Nov04 . 21:52",
            id: 1
        },
        {
            content: "We talk about home price",
            time: "Updated Sat, Nov04 . 21:52",
            id: 2
        },
    ]

    const handleSeeMore = () => {
        setSeeMore((seeMore) => !seeMore)
    }


    return (
        <Card customStyle={styles.card}>
            <View style={styles.cardWrapper}>
                <View style={styles.headerContainer}>
                    <View style={styles.cardHeaderWrapper}>
                        <KhiyabunIcons name={"messages-3-bold"} size={16} color={colors.primary}
                                       style={{marginTop: -2}}/>
                        <Text style={styles.cardHeader}>
                            {t("notes")}
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
                <View style={seeMore ? styles.fullNoteWrapper : styles.noteWrapper}>
                    {notes.map((note, index) => (
                        <FlagNote content={note.content} time={note.time}/>
                    ))}
                </View>

                <Pressable style={styles.seeAllWrapper} onPress={handleSeeMore}>
                    <Text style={styles.seeAll}>
                        {t("see_all")}
                    </Text>
                </Pressable>
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
        },
        seeAll: {
            color: colors.darkPrimary,
            fontSize: 14,
            lineHeight: 20
        },
        seeAllWrapper: {
            alignItems: "center",
            marginVertical: 10
        },
        noteWrapper: {
            height: 128,
            overflow: "hidden"
        },
        fullNoteWrapper: {
            overflow: "hidden"
        }

    });
};
export default AddedPlaceCheckList