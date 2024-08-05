import {Alert, StyleSheet} from "react-native";
import gStyles from "../../global-styles/GlobalStyles";
import {useTranslation} from "react-i18next";
import {useTheme} from "@react-navigation/native";
import Button from "../../components/Button";
import React, {useState} from "react";
import {useUploadFile} from "../../utils/uploadMedia";
import {useSelector} from "react-redux";
import CustomProgressBar from "../../components/Progressbar";

export default function FormConfirmBtn(){
    const {t, i18n} = useTranslation();
    const {colors} = useTheme();
    const styles = useThemedStyles(colors)
    const { uploadFile } = useUploadFile();
    const uploadState = useSelector((state) => state.upload);
    const [progress, setProgress] = useState(0);
    const [uploadStatus, setUploadStatus] = useState('');
    const handleUpload = async () => {

        const result = await uploadFile(setProgress,"image");
        if (result.success) {
            console.log("uplaod res",result)
            Alert.alert("Upload Successful", "File uploaded successfully!");
        } else {
            Alert.alert("Upload Error", result.error);
        }
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
