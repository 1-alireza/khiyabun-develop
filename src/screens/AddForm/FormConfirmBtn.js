import {Alert, StyleSheet} from "react-native";
import gStyles from "../../global-styles/GlobalStyles";
import {useTranslation} from "react-i18next";
import {useTheme} from "@react-navigation/native";
import Button from "../../components/Button";
import React, {useState} from "react";
import {useUploadFile} from "../../utils/uploadMedia";
import {useSelector} from "react-redux";
import {errorHandling} from "../../utils/errorHandling";
import * as ImagePicker from "expo-image-picker";

export default function FormConfirmBtn({setProgress}){
    const {t, i18n} = useTranslation();
    const {colors} = useTheme();
    const styles = useThemedStyles(colors)
    const { uploadFile } = useUploadFile();
    const uploadState = useSelector((state) => state.upload);
    const [uploadStatus, setUploadStatus] = useState('');
    const handleUpload = async () => {
        const res = await ImagePicker.launchImageLibraryAsync({
                    mediaTypes: ImagePicker.MediaTypeOptions.All,
                    allowsEditing: true,
                    aspect: [1, 1],
                    quality: 1,
                    cameraType: "front"
                });
        const filename = res.assets[0].uri.split('/').pop();
        const file = {
            uri: res.assets[0].uri,
            name: filename,
            type: res.assets[0].mimeType || 'application/octet-stream',
        };
        console.log(file)

        const result = await uploadFile(setProgress,file);
        if (result.success) {
            console.log("uplaod res",result.data.data)
            errorHandling(result.data, "confirm")
        } else {
            errorHandling(result.data, "error")
        }
        setProgress(0);
    };



    const startProgress = () => {
        setProgress(0);
        const interval = setInterval(() => {
            setProgress((oldProgress) => {
                if (oldProgress >= 1) {
                    clearInterval(interval);
                    return 1;
                }
                return Math.min(oldProgress + 0.1, 1);
            });
        }, 1000); // Update progress every second
    };




    return(
        <Button label={t("add_form")} sizeButton={"medium"}
                style={styles.selectButton}
                styleText={styles.selectButtonText} width={90}
                onPress={handleUpload}
                isBorder={true} borderColor={colors.primaryOutline}/>
    )
}

const useThemedStyles = (colors) => {
    return StyleSheet.create({
        selectButton: {
            borderRadius: 8,
            backgroundColor: colors.primary,
            justifyContent: "center",
            alignItems: "center",
            marginHorizontal:16,
            marginVertical:10
        },
        selectButtonText: {
            fontWeight: "500",
            fontSize: 16,
            lineHeight: 24,
            fontFamily: "dana-regular",
            color: colors.textOn
        },
    });
};
