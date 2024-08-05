import React, {useState} from "react";
import {Platform, StyleSheet, Text, View} from "react-native";
import Button from "../../components/Button";
import {useTranslation} from "react-i18next";
import {useTheme} from "@react-navigation/native";
import gStyles from "../../global-styles/GlobalStyles"
import Card from "../../components/Card";
import KhiyabunIcons from "../../components/KhiyabunIcons";

const SetLocationScreen = ({navigation}) => {
    const {t} = useTranslation();
    const {colors} = useTheme();
    const styles = useThemedStyles(colors);

    const [location,setLocation]= useState(false);

    const countrySelected = "IRAN, Tehran";
    const addressSelected = "Sa’adat abad, koche felan";

    const getUserLocation = () => {
        console.log("get user location from map");
    }
    const goToSetWorkingHours = () => {
        navigation.navigate("SetWorkingHours")
    }

    return (
        <View style={[gStyles.container,styles.container]}>
            <Button
                label={<KhiyabunIcons name="pin-location-bold" size={24} color={(location)?colors.primary:colors.error}/>}
                style={[styles.getLocationBtn,(Platform.OS === "ios")?styles.shadow:styles.elevation]}
                typeButton="circle"
                colorButton="light"
                onPress={getUserLocation}
                borderColor="dark"
            />
            <Card style={styles.selectedLocation}>
                <View style={[gStyles.row, styles.title]}>
                    <Text style={[gStyles.col_1,styles.locationIcon]}>
                        <KhiyabunIcons name="location-on-outline" size={20} color={colors.onSurfaceHigh}/>
                    </Text>
                    <Text style={[gStyles.col_11,styles.titleText]}>{t("selected_location")}</Text>
                </View>
                <View style={[gStyles.row, styles.body]}>
                    <View style={[gStyles.col_12,styles.content]}>
                        <Text style={styles.country}>{countrySelected}</Text>
                        <Text style={styles.address}>{addressSelected}</Text>
                    </View>
                    <View style={styles.button}>
                        <Button
                            label={t("continue")}
                            typeButton="full"
                            sizeButton="medium"
                            onPress={goToSetWorkingHours}
                        />
                    </View>
                </View>
            </Card>
        </View>
    )
}
const useThemedStyles = (colors) => {
    return StyleSheet.create({
        container:{
            flexDirection:"column",
            alignItems:"flex-end",
            justifyContent:"flex-end",
        },
        getLocationBtn:{
            alignItems:"center",
            justifyContent:"flex-start",
            backgroundColor: colors.surfaceContainerLowest,

        },
        shadow: {
            shadowOffset: {
                width: 0,
                height: 4
            },
            shadowOpacity: 0.2,
            shadowRadius: 0,
        },
        elevation: {
            elevation: 1,
        },
        selectedLocation:{
            padding:0,
            marginVertical: 20
        },
        title:{
            height: 48,
            paddingVertical: 8,
            paddingHorizontal: 12,
            flexWrap:"nowrap",
            alignItems:"center",
            borderBottomWidth: 1,
            borderColor: colors.outlineSurface
        },
        locationIcon:{
            justifyContent:"flex-start"
        },
        titleText:{
            fontSize: 16,
            color:colors.onSurfaceHigh
        },
        body:{
            paddingHorizontal: 16,
        },
        content:{
            flexWrap:"nowrap",
            justifyContent:"center",
            height: 56,
        },
        country:{
            fontSize: 16,
            color:colors.onSurfaceHigh
        },
        address:{
            fontSize: 12,
            color:colors.onSurfaceLow
        },
        button:{
            width: "100%",
            justifyContent:"center",
            height: 80
        }
    });
};
export default SetLocationScreen;
