import {useTranslation} from "react-i18next";
import {useTheme} from "@react-navigation/native";
import {StyleSheet, View, Text, Pressable} from "react-native";
import Card from "../../components/Card";
import KhiyabunIcons from "../../components/KhiyabunIcons";
import React, {useState} from "react";
import AddFormCard from "./AddFormCard";


function AddDetails() {
    const {t, i18n} = useTranslation();
    const {colors} = useTheme();
    const styles = useThemedStyles(colors)


    return (
        <AddFormCard header={t("contact_info")}>
            <View style={styles.dataWrapper}>
                <Text style={styles.contactName}>
                    Alex teles
                </Text>
                <Text style={styles.contactNum}
                >
                    +98 912 345 6789
                </Text>
            </View>
            <Pressable style={styles.addContactWrapper}>
                <Text style={styles.addContact}>
                    Add new contact
                </Text>
                <KhiyabunIcons name={"add-outline"} size={18} color={colors.darkPrimary} style={{marginTop:1.5}} />
            </Pressable>
        </AddFormCard>

    )
}

const useThemedStyles = (colors) => {
    return StyleSheet.create({
        cardWrapper: {
            paddingHorizontal: 4,
            width: "50%"
        },
        contactName: {
            fontSize:16,
            lineHeight:24,
            color:colors.onSurfaceHigh
        },
        contactNum: {
            fontSize:12,
            lineHeight:16,
            color:colors.onSurfaceLow
        },
        addContact: {
            fontSize:14,
            lineHeight:20,
            color:colors.darkPrimary
        },
        dataWrapper:{
            padding:8,
            gap:4
        },
        addContactWrapper:{
            flexDirection:"row",
            alignItems:'center',
            justifyContent:"flex-start",
            padding:8
        }



    });
};
export default AddDetails