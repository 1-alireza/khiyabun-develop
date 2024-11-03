import React, {useState} from "react";
import {Dimensions, Pressable, StyleSheet, View} from "react-native";
import {useTheme} from "@react-navigation/native";
import {CheckBox} from '@rneui/themed';
import KhiyabunIcons from "../../components/KhiyabunIcons";
import Sheet from "../../components/Sheet";
import Button from "../../components/Button";
import CustomDropdown from "../../components/CustomDropdown";
import CustomText from "../../components/CustomText";
import {useSelector} from "react-redux";
import {useTranslation} from "react-i18next";

const enOptions = {
    restTypes: [
        {label: 'I am taking a nap', value: 'I am taking a nap'},
        {label: 'I am praying', value: 'I am praying'},
        {label: 'I am having lunch', value: 'I am having lunch'},
        {label: 'I am smoking', value: 'I am smoking'},
        {label: 'I am on the phone', value: 'I am on the phone'},
    ],
    options: [
        'I answer the call',
        'Send me SMS',
        'Send me email',
        'Send me message on WhatsApp',
        'Send me message on Telegram',
    ],
};
const faOptions = {
    restTypes: [
        {label: 'من در حال خواب هستم', value: 'من در حال خواب هستم'},
        {label: 'در حال نماز خواندن هستم', value: 'در حال نماز خواندن هستم'},
        {label: 'من در حال ناهارخوردن هستم', value: 'من در حال ناهارخوردن هستم'},
        {label: 'من در حال سیگار کشیدن هستم', value: 'من در حال سیگار کشیدن هستم'},
        {label: 'من در حال صحبت با تلفن هستم', value: 'من در حال صحبت با تلفن هستم'},
    ],
    options: [
        'من به تماس پاسخ می‌دهم',
        'به من پیامک ارسال کنید',
        'به من ایمیل ارسال کنید',
        'به من در واتس‌اپ پیام ارسال کنید',
        'به من در تلگرام پیام ارسال کنید',
    ],
};

const ContactMeSheet = ({
                            isVisible,
                            setSelectedDropdown,
                            selectedCheckbox,
                            setSelectedCheckbox,
                            onConfirm,
                            onCancel,
                        }) => {
    const {colors} = useTheme();
    const styles = useThemedStyles(colors);
    const lang = useSelector(state => state.language.language);
    const [data, setData] = useState(lang === "fa" ? faOptions : enOptions);
    const {t} = useTranslation();
    const handleSelectedDropdownOption = (type) => {
        setSelectedDropdown(type);
    };

    const handleSelectedCheckboxOption = (option) => {
        if (selectedCheckbox === option) {
            setSelectedCheckbox(null);
        } else {
            setSelectedCheckbox(option);
        }
    };

    const resetSelection = () => {
        setSelectedCheckbox(null);
        setSelectedDropdown(null);
    };

    return (
        <Sheet isOpen={isVisible} fitContent={true} onClose={onCancel} snapPoint={500}>
            <CustomText
                size={15} weight={'bold'} color={colors.onSurface} lineHeight={24}>
                {t('contact_me')}
            </CustomText>

            <CustomDropdown
                placeHolder={t('select_rest_type')}
                data={data.restTypes}
                callBackFunction={handleSelectedDropdownOption}
                defaultValue={null}
            />
            <View style={styles.optionsWrapper}>
                {data.options.map((option, index) => (
                    <View key={option}>
                        <View style={styles.optionWrapper}>
                            <CheckBox
                                checkedIcon={<KhiyabunIcons name={'tick-circle-outline'} size={20} color={colors.primary}/>}
                                uncheckedIcon={<KhiyabunIcons name={'circle-outline'} size={20} color={colors.onSurface}/>}
                                containerStyle={styles.checkBox}
                                checked={selectedCheckbox === option}
                                onPress={() => handleSelectedCheckboxOption(option)}
                                title={<View>
                                    <CustomText
                                        size={15}
                                        color={colors.onSurfaceHigh}
                                        lineHeight={24}
                                        textAlign={'left'}
                                        customStyle={{
                                            paddingHorizontal: 6,
                                        }}
                                    >
                                        {option}
                                    </CustomText>
                                </View>}
                            />
                        </View>
                        {index < data.options.length - 1 && <View style={styles.separator}/>}
                    </View>
                ))}
            </View>

            <View style={styles.sheetButtons}>
                <Button
                    label={t('confirm')}
                    sizeButton="medium"
                    style={styles.confirmButton}
                    styleText={styles.confirmButtonText}
                    width={60}
                    onPress={onConfirm}
                    isBorder={true}
                    borderColor={colors.primaryOutline}
                />
                <Button
                    label={t('cancel')}
                    sizeButton="small"
                    style={styles.cancelButton}
                    width={40}
                    styleText={styles.cancelButtonText}
                    onPress={() => {
                        onCancel();
                        resetSelection();
                    }}
                />
            </View>
        </Sheet>
    );
};
const useThemedStyles = (colors) => {
    return StyleSheet.create({
        optionsWrapper: {
            marginBottom: 16,
        },
        optionWrapper: {
            flexDirection: "row",
            alignItems: "center",
            paddingVertical: 6,
            width: Dimensions.get('window').width - 50
        },
        checkBox: {
            marginTop: 0,
            marginBottom: 0,
            marginLeft: 0,
            paddingLeft: 0,
            paddingRight: 0,
            paddingTop: 0,
            paddingBottom: 0,
            color: colors.onSurface,
            backgroundColor: colors.surfaceContainerLowest,
        },
        sheetButtons: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
        },
        confirmButton: {
            borderRadius: 8,
            backgroundColor: colors.primaryContainer,
            justifyContent: "center",
            alignItems: "center",
            width: Dimensions.get('window').width / 2 - 35,
        },
        confirmButtonText: {
            fontSize: 16,
            lineHeight: 24,
            color: colors.darkPrimary
        },
        cancelButton: {
            borderRadius: 8,
            backgroundColor: colors.surfaceContainerLowest,
            justifyContent: "center",
            alignItems: "center",
            width: Dimensions.get('window').width / 2 - 35,
        },
        cancelButtonText: {
            fontSize: 16,
            lineHeight: 24,
            color: colors.darkPrimary
        },
        separator: {
            height: 1,
            backgroundColor: colors.outlineSurface,
            marginVertical: 10,
        },

    });
};

export default ContactMeSheet;