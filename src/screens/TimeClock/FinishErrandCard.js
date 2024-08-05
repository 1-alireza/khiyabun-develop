import {useTranslation} from "react-i18next";
import {useTheme} from "@react-navigation/native";
import {Pressable, Dimensions,StyleSheet, Text, TextInput, View} from "react-native";
import Button from "../../components/Button";
import React, {useState, useEffect} from "react";
import KhiyabunIcons from "../../components/KhiyabunIcons";
import Card from "../../components/Card";



const FinishErrandCard = ({changeMode}) => {
    const {t, i18n} = useTranslation();
    const {colors} = useTheme();
    const styles = useThemedStyles(colors)


    return (
        <Card customStyle={styles.cardWrapper}>
            <View style={styles.details}>
                <View style={styles.detailContainer}>
                    <KhiyabunIcons  name={"clock-outline"} size={16}/>
                    <Text style={styles.detailText}>
                        03:19:10
                    </Text>

                </View>
                <View style={styles.detailContainer}>
                    <KhiyabunIcons  name={"car-outline"} size={16}/>
                    <Text style={styles.detailText}>
                        5 KM
                    </Text>

                </View>
            </View>
            <Button label={t("finish_work")} sizeButton={"medium"}
                    style={styles.finishButton}
                    width={70}
                    styleText={styles.finishButtonText}
                    isBorder={true}
                    onPress={changeMode}

            />
        </Card>



    )

}

const useThemedStyles = (colors) => {
    return StyleSheet.create({
        cardWrapper: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            position:"absolute",
            top:5,
            width:"90%",
            padding:16
        },
        finishButton: {
            backgroundColor: colors.errorContainer,
            borderColor: colors.errorOutline,
            borderRadius: 8,
            justifyContent: "center",
            alignItems: "center",
        },
        finishButtonText: {
            fontFamily: "dana-bold",
            fontWeight: "500",
            fontSize: 14,
            lineHeight: 24,
            textAlign: "center",
            color: colors.darkError,
        },
        detailContainer:{
            flexDirection:"row",
            alignItems:"center",
            justifyContent:"space-between",
            width:"80%"
        },
        detailText:{
            color:colors.onSurfaceContainer,
            fontSize:14,
            lineHeight:20
        },
        details:{
        width:"30%",
        gap:4
        }
    });
};


export default FinishErrandCard;