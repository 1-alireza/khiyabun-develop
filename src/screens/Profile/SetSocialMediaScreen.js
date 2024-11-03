import React, {useRef, useState} from "react";
import {Dimensions, Platform, ScrollView, StyleSheet, View} from "react-native";
import globalStyle from "../../global-styles/GlobalStyles";
import Input from "../../components/Input";
import Button from "../../components/Button";
import {useTheme} from "@react-navigation/native";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {updateUserProfile} from "../../redux/actions/profileAction";
import {errorHandling} from "../../utils/errorHandling";


const SetSocialMediaScreen = ({navigation}) => {
    const {t} = useTranslation();
    const styles = useThemedStyles();
    const dispatch = useDispatch();
    const userToken = useSelector(state => state.login.token);
    const is_loading = useSelector(state => state.profile.loading);

    const inputRefs = useRef([]);
    const [loading, setLoading] = useState(false)


    const [socialMedia, setSocialMedia] = useState({
        socialMedias: {
            website: "",
            Instagram: "",
            YouTube: "",
            Whatsapp: "",
            Telegram: "",
            Facebook: "",
            X: "",
            LinkedIn: ""
        },
        email:""
    })
    const onChangeHandler = (value, index) => {
        setSocialMedia((prevState) => {
            const updatedSocialMedias = {...prevState.socialMedias};
            switch (index) {
                case 0:
                    updatedSocialMedias.website = value;
                    break;
                case 1:
                    updatedSocialMedias.Instagram = value;
                    break;
                case 2:
                    updatedSocialMedias.YouTube = value;
                    break;
                case 3:
                    updatedSocialMedias.Whatsapp = value;
                    break;
                case 4:
                    updatedSocialMedias.Telegram = value;
                    break;
                case 5:
                    updatedSocialMedias.Facebook = value;
                    break;
                case 6:
                    updatedSocialMedias.X = value;
                    break;
                case 7:
                    updatedSocialMedias.LinkedIn = value;
                    break;
                default:
                    return {...prevState, email: value};
            }
            return {...prevState, socialMedias: updatedSocialMedias};
        });

    };

    const setSocialMediaHandler = () => {
        console.log("socialMedia", socialMedia.socialMedias);
        console.log("email", socialMedia.email);
        setLoading(true);
        let data = {
            userData:socialMedia,
            token: userToken
        };

        dispatch(updateUserProfile(data)).then(action => {
            let response = action.payload;
            console.log("response in setProfile", response);
            if (response.statusCode === 200) {
                navigation.navigate("Main");
                if (Platform.OS !== 'android') window.history.pushState({}, 'Main');
            } else {
                errorHandling(response, "error");
            }
            setLoading(is_loading);
        });
    }

    return (
        <>
            <ScrollView style={[globalStyle.container, styles.container]}>
                <View style={styles.inputWrapper}>
                    <Input
                        ref={el => inputRefs.current[0] = el}
                        label={t("website")}
                        customStyles={styles.input}
                        type="text"
                        placeholder={t("website_example")}
                        onChangeText={(value) => onChangeHandler(value, 0)}
                        value={socialMedia.socialMedias.website}
                    />
                </View>
                <View style={styles.inputWrapper}>
                    <Input
                        ref={el => inputRefs.current[1] = el}
                        label={t("instagram")}
                        customStyles={styles.input}
                        type="text"
                        placeholder={t("instagram_example")}
                        onChangeText={(value) => onChangeHandler(value, 1)}
                        value={socialMedia.socialMedias.Instagram}
                    />
                </View>
                <View style={styles.inputWrapper}>
                    <Input
                        ref={el => inputRefs.current[2] = el}
                        label={t("youtube")}
                        customStyles={styles.input}
                        type="text"
                        placeholder={t("youtube_example")}
                        onChangeText={(value) => onChangeHandler(value, 2)}
                        value={socialMedia.socialMedias.YouTube}
                    />
                </View>
                <View style={styles.inputWrapper}>
                    <Input
                        ref={el => inputRefs.current[3] = el}
                        label={t("whatsapp")}
                        customStyles={styles.input}
                        type="text"
                        placeholder={t("whatsapp_example")}
                        onChangeText={(value) => onChangeHandler(value, 3)}
                        value={socialMedia.socialMedias.Whatsapp}
                    />
                </View>
                <View style={styles.inputWrapper}>
                    <Input
                        ref={el => inputRefs.current[4] = el}
                        label={t("telegram")}
                        customStyles={styles.input}
                        type="text"
                        placeholder={t("telegram_example")}
                        onChangeText={(value) => onChangeHandler(value, 4)}
                        value={socialMedia.socialMedias.Telegram}
                    />
                </View>
                <View style={styles.inputWrapper}>
                    <Input
                        ref={el => inputRefs.current[5] = el}
                        label={t("facebook")}
                        customStyles={styles.input}
                        type="text"
                        placeholder={t("facebook_example")}
                        onChangeText={(value) => onChangeHandler(value, 5)}
                        value={socialMedia.socialMedias.Facebook}
                    />
                </View>
                <View style={styles.inputWrapper}>
                    <Input
                        ref={el => inputRefs.current[6] = el}
                        label={t("x")}
                        customStyles={styles.input}
                        type="text"
                        placeholder={t("x_example")}
                        onChangeText={(value) => onChangeHandler(value, 6)}
                        value={socialMedia.socialMedias.X}
                    />
                </View>
                <View style={styles.inputWrapper}>
                    <Input
                        ref={el => inputRefs.current[7] = el}
                        label={t("linkedin")}
                        customStyles={styles.input}
                        type="text"
                        placeholder={t("linkedin_example")}
                        onChangeText={(value) => onChangeHandler(value, 7)}
                        value={socialMedia.socialMedias.LinkedIn}
                    />
                </View>
                <View style={styles.inputWrapper}>
                    <Input
                        ref={el => inputRefs.current[8] = el}
                        label={t("email")}
                        customStyles={styles.input}
                        type="text"
                        placeholder={t("email_example")}
                        onChangeText={(value) => onChangeHandler(value, 8)}
                        value={socialMedia.email}
                    />
                </View>
            </ScrollView>
            <View style={[globalStyle.container, styles.buttonWrapper]}>
                <Button
                    onPress={setSocialMediaHandler}
                    label={t("continue")}
                    sizeButton="medium"
                    typeButton="full"
                    showLoading={loading}
                />
            </View>
        </>
    )
}

const useThemedStyles = () => {
    return StyleSheet.create({
        container: {
            paddingTop: 5,
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
