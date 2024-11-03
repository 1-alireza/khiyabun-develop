import React, {useState} from "react";
import {Dimensions, Platform, ScrollView, StyleSheet, View} from "react-native";
import ToggleSwitch from "toggle-switch-react-native";
import {useTheme} from "@react-navigation/native";
import {useTranslation} from "react-i18next";

import Card from "../../components/Card";
import Input from "../../components/Input";
import Button from "../../components/Button";
import CustomText from "../../components/CustomText";
import globalStyle from "../../global-styles/GlobalStyles";
import TagInput from "../../components/TagInput";
import PersianDatePicker from "../../components/JalaliDate";
import {convertJalaliToGregorian, convertToJalali} from "../../utils/helper";
import MyDatePicker from "../../components/Picker";
import i18n from "i18next";
import {useDispatch, useSelector} from "react-redux";
import {registerUser} from "../../redux/actions/profileAction";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {TOKEN_KEY} from "../../utils/constant";
import {errorHandling} from "../../utils/errorHandling";

const SetProfileScreen = ({navigation, route}) => {
    const locale = i18n.language;
    const {t} = useTranslation();
    const styles = useThemedStyles();
    const {colors} = useTheme();
    const dispatch = useDispatch();
    const userToken = useSelector(state => state.login.token);
    const is_loading = useSelector(state => state.profile.loading);

    const [loading, setLoading] = useState(false)
    const [showPhone, setShowPhone] = useState(false);
    const [firstname, setFirstname] = useState({
        entered_value: null,
        correct_value: false
    });
    const [lastname, setLastname] = useState({
        entered_value: null,
        correct_value: false
    });
    const [birthday, setBirthday] = useState("");
    const [businessName, setBusinessName] = useState({
        entered_value: null
    });
    const [bio, setBio] = useState({
        entered_value: null,
        correct_value: false
    });

    //change below state
    const [expertises, setExpertises] = useState([]);

    const onToggleShowPhone = () => {
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
    const onChangeBusinessNameHandler = (value) => {
        if (value.trim().length) {
            setBusinessName(prevState => ({...prevState, entered_value: value}));
        } else if (value.length) {
            setBusinessName(prevState => ({...prevState, entered_value: value}));
        } else {
            setBusinessName(prevState => ({...prevState, entered_value: null}));
        }
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

    let length = (bio.entered_value !== null) ? bio.entered_value.trim().length : 0,
        maxLength = 70;
    const isButtonDisabled = !(firstname.correct_value && lastname.correct_value && birthday.trim().length && bio.correct_value);

    const onChangeHandler = (date) =>{
        let selectedDate;
        if(locale === "fa"){
            selectedDate = convertJalaliToGregorian(date);
        }
        else {
            selectedDate = date;
        }
        setBirthday(selectedDate);
    }

    const onGetExpertisesHandler = (received_expertises) => {
        setExpertises(() => received_expertises);
    }
    const setProfileHandler = async () => {
        setLoading(true);
        let data = {
            userData: {
                "isPhoneVisible": showPhone,
                "firstName": firstname.entered_value,
                "lastName": lastname.entered_value,
                "businessName": businessName.entered_value,
                "specializations": expertises,
                "birthday": birthday,
                "bio": bio.entered_value,
            },
            token: userToken
        };

        dispatch(registerUser(data)).then(action => {
            let response = action.payload;
            console.log("response in setProfile",response);
            if(response.statusCode === 200){
                navigation.navigate("SetLocation");
                if (Platform.OS !== 'android') window.history.pushState({}, 'SetLocation');
            }
            else {
                errorHandling(response,"error");
            }
            setLoading(is_loading);
        });
    }

    return (
        <>
            <ScrollView style={[globalStyle.container, styles.container]}>
                <Card style={styles.phone_visibility}>
                    <View style={[globalStyle.row, {alignItems: "center"}]}>
                        <View style={globalStyle.col_10}>
                            <CustomText customStyle={styles.textPhoneVisibility}>{t("phone_visibility")}</CustomText>
                            <CustomText customStyle={styles.questionVisibility}>{t("can_everyone")}</CustomText>
                        </View>
                        <View style={globalStyle.col_2}>
                            <ToggleSwitch
                                isOn={showPhone}
                                onColor={colors.primary}
                                offColor={colors.onSurfaceLowest}
                                size="medium"
                                onToggle={onToggleShowPhone}
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
                    <TagInput
                        placeholderText={t("enter_expertise")}
                        getData={onGetExpertisesHandler}
                    />

                    <MyDatePicker
                        placeHolder={t("birthday")}
                        supportText={t("show_to")}
                        calenderType={locale}
                        onDateChange={onChangeHandler}
                        type="date"
                    />
                </Card>
                <Card style={styles.wrapperEnteredInfo}>
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
                </Card>
            </ScrollView>
            <View style={[globalStyle.container, styles.buttonWrapper]}>
                <Button
                    onPress={setProfileHandler}
                    label={t("continue")}
                    sizeButton="medium"
                    typeButton="full"
                    disabled={isButtonDisabled}
                    showLoading={loading}
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
            fontSize: 15,
            fontWeight: "500",
            lineHeight: 24,
            color: colors.onSurfaceHigh
        },
        questionVisibility: {
            fontSize: 10,
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
