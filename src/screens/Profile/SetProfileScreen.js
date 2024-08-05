import React, {useState} from "react";
import {Dimensions, ScrollView, StyleSheet, Switch, Text, View} from "react-native";
import Card from "../../components/Card";
import {useTranslation} from "react-i18next";

import globalStyle from "../../global-styles/GlobalStyles";
import {useTheme} from "@react-navigation/native";
import Input from "../../components/Input";
import {COUNTRY_CODE} from "../../utils/constant";
import CustomDropdown from "../../components/CustomDropdown";
import Button from "../../components/Button";

const SetProfileScreen = ({navigation, route}) => {
    const {t} = useTranslation();
    const styles = useThemedStyles();

    const [showPhone, setShowPhone] = useState(false);
    const [firstname, setFirstname] = useState({
        entered_value: null,
        correct_value: false
    });
    const [lastname, setLastname] = useState({
        entered_value: null,
        correct_value: false
    });
    const [birthday, setBirthday] = useState({
        entered_value: null,
        correct_value: false
    });
    const [businessName, setBusinessName] = useState({
        entered_value: null
    });
    const [bio, setBio] = useState({
        entered_value: null,
        correct_value: false
    });

    //change below state
    const [countryCode, setCountryCode] = useState("");

    const toggleShowPhone = () =>{
        setShowPhone(!showPhone);
    }
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
    const onChangeBirthdayHandler = (value) => {
        if (value.trim().length) {
            setBirthday(prevState => ({...prevState, entered_value: value, correct_value: true}));
        } else if (value.length) {
            setBirthday(prevState => ({...prevState, entered_value: value, correct_value: false}));
        } else {
            setBirthday(prevState => ({...prevState, entered_value: null, correct_value: false}));
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

    const selectCountry = (country) => {
        setCountryCode(country);
    }

    const onChangeBioHandler = (value) => {
        if (value.trim().length) {
            setBio(prevState => ({...prevState, entered_value: value, correct_value: true}));
        } else if (value.length) {
            setBio(prevState => ({...prevState, entered_value: value, correct_value: false}));
        } else {
            setBio(prevState => ({...prevState, entered_value: null, correct_value: false}));
        }

    }

    let length = (bio.entered_value !== null)?bio.entered_value.trim().length : 0,
        maxLength = 70;

    const isButtonDisabled = !(firstname.correct_value && lastname.correct_value && birthday.correct_value && bio.correct_value);

    const setProfileHandler = () => {
        let senData = true;
        if(senData){
            navigation.navigate("SetLocation")
        }
    }

    return (
        <>
            <ScrollView style={[globalStyle.container, styles.container]}>
                <Card style={styles.phone_visibility}>
                    <View style={[globalStyle.row, {alignItems: "center"}]}>
                        <View style={globalStyle.col_10}>
                            <Text style={styles.textPhoneVisibility}>{t("phone_visibility")}</Text>
                            <Text style={styles.questionVisibility}>{t("can_everyone")}</Text>
                        </View>
                        <View style={globalStyle.col_2}>
                            <Switch
                                trackColor={{false: '#767577', true: '#81b0ff'}}
                                // thumbColor={showPhone ? '#f4f3f4' : '#f5dd4b'}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={toggleShowPhone}
                                value={showPhone}
                            />
                        </View>
                    </View>
                </Card>
                <Card style={styles.wrapperEnteredInfo}>
                    <View style={styles.inputWrapper}>
                        <Input customStyles={styles.input}
                               type="text"
                               placeholder={t("first_name")}
                               onChangeText={onChangeFirstnameHandler}
                               value={firstname.entered_value}
                               error={firstname.entered_value !== null && !firstname.entered_value.trim().length}
                               supportText={(firstname.entered_value !== null && !firstname.entered_value.trim().length) ? t("name_empty") : ""}
                        />
                    </View>
                    <View style={styles.inputWrapper}>
                        <Input customStyles={styles.input}
                               type="text"
                               placeholder={t("last_name")}
                               onChangeText={onChangeLastnameHandler}
                               value={lastname.entered_value}
                               error={lastname.entered_value !== null && !lastname.entered_value.trim().length}
                               supportText={(lastname.entered_value !== null && !lastname.entered_value.trim().length) ? t("last_name_empty") : ""}
                        />
                    </View>
                    <View style={styles.inputWrapper}>
                        <Input customStyles={styles.input}
                               type="text"
                               placeholder={t("business_name")}
                               onChangeText={onChangeBusinessNameHandler}
                               value={businessName.entered_value}
                               error={businessName.entered_value !== null && !businessName.entered_value.trim().length}
                               supportText={(businessName.entered_value !== null && !businessName.entered_value.trim().length) ? t("business_name_empty") : ""}
                        />
                    </View>
                    <CustomDropdown
                        style={[styles.inputWrapper, {paddingVertical: 0}]}
                        data={COUNTRY_CODE}
                        placeHolder={t("specialization")}
                        callBackFunction={selectCountry}
                        defaultValue={countryCode}
                    />
                    <View>
                        <Input customStyles={styles.input}
                               type="text"
                               placeholder={t("birthday")}
                               rightIcon="calender-outline"
                               onChangeText={onChangeBirthdayHandler}
                               value={birthday.entered_value}
                               error={birthday.entered_value !== null && !birthday.entered_value.trim().length}
                               supportText={t("show_to")}
                        />
                    </View>
                </Card>
                <Card style={styles.wrapperEnteredInfo}>
                    <View>
                        <Input customStyles={styles.input}
                               type="text"
                               multiline={true}
                               linesNumber={3}
                               label={t("bio")}
                               placeholder={t("write_bio")}
                               onChangeText={onChangeBioHandler}
                               value={bio.entered_value}
                               error={bio.entered_value !== null && !bio.entered_value.trim().length}
                               supportText={length + "/" + maxLength}
                               maxLength={70}
                        />
                    </View>
                </Card>
            </ScrollView>
            <View style={[globalStyle.container,styles.buttonWrapper]}>
                <Button
                    onPress={setProfileHandler}
                    label={t("continue")}
                    sizeButton="medium"
                    typeButton="full"
                    disabled={isButtonDisabled}
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
        phone_visibility: {
            paddingHorizontal: 24,
            paddingVertical: 12
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

export default SetProfileScreen;
