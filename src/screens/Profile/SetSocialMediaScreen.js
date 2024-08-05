import React, {useState} from "react";
import {Dimensions, ScrollView, StyleSheet, View} from "react-native";
import globalStyle from "../../global-styles/GlobalStyles";
import Input from "../../components/Input";
import Button from "../../components/Button";
import {useTheme} from "@react-navigation/native";
import {useTranslation} from "react-i18next";

const SetSocialMediaScreen = ({navigation}) => {
    const {t} = useTranslation();
    const styles = useThemedStyles();

    const [firstname, setFirstname] = useState({
        entered_value: null,
        correct_value: false
    });
    const [lastname, setLastname] = useState({
        entered_value: null,
        correct_value: false
    });
    const [businessName, setBusinessName] = useState({
        entered_value: null
    });

    const onChangeFirstnameHandler = (value) => {
        if (value.trim().length) {
            setFirstname(prevState => ({...prevState, entered_value: value, correct_value: true}));
        } else if (value.length) {
            setFirstname(prevState => ({...prevState, entered_value: value, correct_value: false}));
        } else {
            setFirstname(prevState => ({...prevState, entered_value: null, correct_value: false}));
        }
    }
    const onChangeLastnameHandler = (value) => {
        if (value.trim().length) {
            setLastname(prevState => ({...prevState, entered_value: value, correct_value: true}));
        } else if (value.length) {
            setLastname(prevState => ({...prevState, entered_value: value, correct_value: false}));
        } else {
            setLastname(prevState => ({...prevState, entered_value: null, correct_value: false}));
        }
    }
    const onChangeBusinessNameHandler = (value) => {
        if (value.trim().length) {
            setBusinessName(prevState => ({...prevState, entered_value: value}));
        } else if (value.length) {
            setBusinessName(prevState => ({...prevState, entered_value: value}));
        } else {
            setBusinessName(prevState => ({...prevState, entered_value: null}));
        }
    }


    const setProfileHandler = () => {
        let senData = true;
        if (senData) {
            navigation.navigate("Main")
        }
    }

    return (
        <>
            <ScrollView style={[globalStyle.container, styles.container]}>
                <View style={styles.inputWrapper}>
                    <Input
                        label={t("website")}
                        customStyles={styles.input}
                        type="text"
                        placeholder={t("website_example")}
                        onChangeText={onChangeFirstnameHandler}
                        value={firstname.entered_value}
                        error={firstname.entered_value !== null && !firstname.entered_value.trim().length}
                        supportText={(firstname.entered_value !== null && !firstname.entered_value.trim().length) ? t("name_empty") : ""}
                    />
                </View>
                <View style={styles.inputWrapper}>
                    <Input
                        label={t("instagram")}
                        customStyles={styles.input}
                        type="text"
                        placeholder={t("instagram_example")}
                        onChangeText={onChangeLastnameHandler}
                        value={lastname.entered_value}
                        error={lastname.entered_value !== null && !lastname.entered_value.trim().length}
                        supportText={(lastname.entered_value !== null && !lastname.entered_value.trim().length) ? t("last_name_empty") : ""}

                    />
                </View>
                <View style={styles.inputWrapper}>
                    <Input
                        label={t("youtube")}
                        customStyles={styles.input}
                        type="text"
                        placeholder={t("youtube_example")}
                        onChangeText={onChangeBusinessNameHandler}
                        value={businessName.entered_value}
                        error={businessName.entered_value !== null && !businessName.entered_value.trim().length}
                        supportText={(businessName.entered_value !== null && !businessName.entered_value.trim().length) ? t("business_name_empty") : ""}
                        />
                </View>
                <View style={styles.inputWrapper}>
                    <Input
                        label={t("whatsapp")}
                        customStyles={styles.input}
                        type="text"
                        placeholder={t("whatsapp_example")}
                        onChangeText={onChangeBusinessNameHandler}
                        value={businessName.entered_value}
                        error={businessName.entered_value !== null && !businessName.entered_value.trim().length}
                        supportText={(businessName.entered_value !== null && !businessName.entered_value.trim().length) ? t("business_name_empty") : ""}
                        />
                </View>
                <View style={styles.inputWrapper}>
                    <Input
                        label={t("telegram")}
                        customStyles={styles.input}
                        type="text"
                        placeholder={t("telegram_example")}
                        onChangeText={onChangeBusinessNameHandler}
                        value={businessName.entered_value}
                        error={businessName.entered_value !== null && !businessName.entered_value.trim().length}
                        supportText={(businessName.entered_value !== null && !businessName.entered_value.trim().length) ? t("business_name_empty") : ""}
                        />
                </View>
                <View style={styles.inputWrapper}>
                    <Input
                        label={t("facebook")}
                        customStyles={styles.input}
                        type="text"
                        placeholder={t("facebook_example")}
                        onChangeText={onChangeBusinessNameHandler}
                        value={businessName.entered_value}
                        error={businessName.entered_value !== null && !businessName.entered_value.trim().length}
                        supportText={(businessName.entered_value !== null && !businessName.entered_value.trim().length) ? t("business_name_empty") : ""}
                        />
                </View>
                <View style={styles.inputWrapper}>
                    <Input
                        label={t("x")}
                        customStyles={styles.input}
                        type="text"
                        placeholder={t("x_example")}
                        onChangeText={onChangeBusinessNameHandler}
                        value={businessName.entered_value}
                        error={businessName.entered_value !== null && !businessName.entered_value.trim().length}
                        supportText={(businessName.entered_value !== null && !businessName.entered_value.trim().length) ? t("business_name_empty") : ""}
                        />
                </View>
                <View style={styles.inputWrapper}>
                    <Input
                        label={t("linkedin")}
                        customStyles={styles.input}
                        type="text"
                        placeholder={t("linkedin_example")}
                        onChangeText={onChangeBusinessNameHandler}
                        value={businessName.entered_value}
                        error={businessName.entered_value !== null && !businessName.entered_value.trim().length}
                        supportText={(businessName.entered_value !== null && !businessName.entered_value.trim().length) ? t("business_name_empty") : ""}
                        />
                </View>
                <View style={styles.inputWrapper}>
                    <Input
                        label={t("email")}
                        customStyles={styles.input}
                        type="text"
                        placeholder={t("email_example")}
                        onChangeText={onChangeBusinessNameHandler}
                        value={businessName.entered_value}
                        error={businessName.entered_value !== null && !businessName.entered_value.trim().length}
                        supportText={(businessName.entered_value !== null && !businessName.entered_value.trim().length) ? t("business_name_empty") : ""}
                        />
                </View>
            </ScrollView>
            <View style={[globalStyle.container, styles.buttonWrapper]}>
                <Button
                    onPress={setProfileHandler}
                    label={t("continue")}
                    sizeButton="medium"
                    typeButton="full"
                />
            </View>
        </>
    )
}

const useThemedStyles = () => {
    const {colors} = useTheme();
    return StyleSheet.create({
        container: {
            paddingVertical: 16,
            height: Dimensions.get('window').height
        },
        textPhoneVisibility: {
            fontSize: 16,
            fontWeight: "500",
            lineHeight: 24,
            color: colors.onSurfaceHigh
        },
        questionVisibility: {

            fontSize: 12,
            color: colors.onSurfaceLow
        },
        wrapperEnteredInfo: {
            padding: 16
        },
        inputWrapper: {
            marginBottom: 12
        },
        input: {
            width: "100%"
        },
        buttonWrapper: {
            flex: undefined,
            justifyContent: 'flex-end',
            marginVertical: 10,
            backgroundColor: "transparent"
        }
    });
};

export default SetSocialMediaScreen;
