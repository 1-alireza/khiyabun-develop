import Input from "../../components/Input";
import CustomDropdown from "../../components/CustomDropdown";
import {useTranslation} from "react-i18next";
import {useTheme} from "@react-navigation/native";
import {ImageBackground, StyleSheet, View, Text, Dimensions, Platform} from "react-native";
import {CheckBox} from "@rneui/themed";
import React, {useState} from "react";
import Button from "../../components/Button";
import * as DocumentPicker from 'expo-document-picker';
import useWebBackButtonHandler from "../../navigation/hardwareBackHandler";

const errandOptions = [
    {label: "Errand", value: "Errand"},
    {label: "Enter Office", value: "Enter Office"},
    {label: "Leave Office", value: "Leave Office"},
    {label: "Talk to cofounders", value: "Talk to cofounders"},
]
export default function SaveErrandScreen({navigation}) {
    const {t, i18n} = useTranslation();
    const {colors} = useTheme();
    const styles = useThemedStyles(colors)
    const [areaChecked, setAreaChecked] = useState(false)
    const [realStateChecked, setRealStateChecked] = useState(false)
    const [selectedFile, setSelectedFile] = useState(null);
    const pickDocument = async () => {
        try {
            const result = await DocumentPicker.getDocumentAsync({
                type: '*/*', // allows all file types; you can specify a type, e.g., 'application/pdf' for PDFs
                copyToCacheDirectory: false,
            });

            if (!result.canceled) {
                setSelectedFile(result.assets[0].uri);
                console.log('Selected file:', result);
                console.log('Selected file:', result);
                console.log(selectedFile)
                alert(`File URI: ${result.assets[0].uri}`);
            } else {
                console.log('Selected file:', result)
                alert('Document selection was canceled.');
            }
        } catch (error) {
            console.error(error);
            alert('Failed to pick a document.');
        }
    };

    return (
        <>
            <View style={styles.mainView}>
                <Input placeholder={t("errand_title")}/>
                <CustomDropdown placeHolder={"type_of_errand"} data={errandOptions}/>
                <CheckBox
                    iconRight={false}
                    size={20}
                    checked={realStateChecked}
                    onPress={() => setRealStateChecked(!realStateChecked)}
                    iconType="material-community"
                    checkedIcon="checkbox-marked"
                    uncheckedIcon="checkbox-blank-outline"
                    checkedColor={colors.primary}
                    containerStyle={styles.checkBox}
                    textStyle={styles.title}
                    title={t("real_state_appraisal")}
                />
                <CheckBox
                    iconRight={false}
                    size={20}
                    checked={areaChecked}
                    onPress={() => setAreaChecked(!areaChecked)}
                    iconType="material-community"
                    checkedIcon="checkbox-marked"
                    uncheckedIcon="checkbox-blank-outline"
                    checkedColor={colors.primary}
                    containerStyle={styles.checkBox}
                    textStyle={styles.title}
                    title={t("area_assessment")}
                />
                <Input type={"file"} placeholder={t("errand_title")} customStyles={{marginBottom: 10}}
                       onFileSelect={pickDocument}/>
                <ImageBackground source={require('../../../assets/img/Image.png')} resizeMode="cover"
                                 style={styles.image}>
                    <Text style={styles.text}>{t("map_sample")}</Text>
                    <Button
                        onPress={() => alert(44)}
                        label={t("change_map_type")}
                        sizeButton="small"
                        width={38}
                        typeButton="full"
                        colorButton="light"
                        isBorder={true}
                        borderColor="light"
                        style={styles.Button}
                        styleText={styles.buttonTextStyle}
                    />
                </ImageBackground>
                <Input placeholder={t("attach_note_errand")} label={t("note")}/>
            </View>
            <Button
                onPress={() => {
                    navigation.navigate("ErrandDetails");
                    if (Platform.OS !== 'android') window.history.pushState({}, 'ErrandDetails');
                }}
                label={t("confirm")}
                sizeButton="large"
                width={90}
                typeButton="full"
                colorButton="primary"
                isBorder={true}
                borderColor="light"
                style={styles.confirmButton}
                styleText={styles.confirmButtonTextStyle}
            />
        </>

    )

}

const useThemedStyles = (colors) => {
    return StyleSheet.create({
        mainView: {
            paddingHorizontal: 16,
            paddingVertical: 16,
        },
        checkBox: {
            backgroundColor: "transparent",
            borderWidth: 0,
            padding: 0,
            margin: 0,
            marginRight: 0,
            marginLeft: 0,
            marginBottom: 15
        },
        title: {
            fontSize: 16,
            lineHeight: 24,
            color: colors.onSurfaceHigh
        },
        image: {
            height: 175,
            width: Dimensions.get('window').width - 30,
            borderRadius: 6,
            overflow: 'hidden',
            resizeMode: 'cover',
            justifyContent: 'center',
            alignItems: "center",
            position: "relative",
            marginBottom: 10
        },
        text: {
            color: colors.onSurface,
            fontSize: 10,
            lineHeight: 16,
            fontWeight: 'bold',
            textAlign: 'center',
            position: "absolute",
            top: 8,
            backgroundColor: colors.outlineSurface,
            width: "90%",
            paddingVertical: 8,
            paddingHorizontal: 12,
            borderRadius: 100,
            borderWidth: 1,
            borderColor: colors.outlineSurface
        },
        Button: {
            position: "absolute",
            bottom: 10,
        },
        confirmButton: {
            position: "absolute",
            bottom: 10,
            marginLeft: 20
        },
        buttonTextStyle: {
            fontWeight: '500',
            lineHeight: 20,
            fontSize: 14
        },
        confirmButtonTextStyle: {
            fontSize: 16,
            lineHeight: 24,
            color: colors.textOn
        }
    });
};




