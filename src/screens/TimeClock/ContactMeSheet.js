import {useTranslation} from "react-i18next";
import {useTheme} from "@react-navigation/native";
import {Dimensions, Pressable, StyleSheet, Text, View} from "react-native";
import Sheet from "../../components/Sheet";
import Button from "../../components/Button";
import {CheckBox} from '@rneui/themed';
import React, {useState} from "react";
import KhiyabunIcons from "../../components/KhiyabunIcons";
import CustomDropdown from "../../components/CustomDropdown";

const restTypes = [
    {label: 'I am taking a nap', value: '1'},
    {label: 'I am praying', value: '2'},
    {label: 'I am having lunch', value: '3'},
    {label: 'I am smoking', value: '4'},
    {label: 'i am on phone', value: '5'},
];

const options = [
    'I answer the call',
    'Send me SMS',
    'Send me email',
    'Send me message on WhatsApp',
    'Send me message on Telegram',
];


const ContactMeSheet = ({isVisible, onConfirm, onCancel}) => {
    const {colors} = useTheme();
    const styles = useThemedStyles(colors);
    const [selectedOption, setSelectedOption] = useState(null);
    const [restType, setRestType] = useState("i am taking a nap");

    const handleSelectOption = (option) => {
        if (selectedOption === option) {
            setSelectedOption(null); // Uncheck if already checked
        } else {
            setSelectedOption(option); // Check if not checked
        }
    };

    const selectRestType = (type) => {
        setRestType(type);
    };

    const resetSelection = () => {
        setSelectedOption(null); // Uncheck all options
    };

    return (
        <Sheet isOpen={isVisible} fitContent={true} onClose={onCancel} snapPoint={500}>
            <Text style={styles.sheetHeaderText}>Contact me</Text>
            <CustomDropdown
                placeHolder="i am taking a nap"
                data={restTypes}
                callBackFunction={selectRestType}
                defaultValue={restType}
            />
            <View style={styles.optionsWrapper}>
                {options.map((option, index) => (
                    <Pressable key={option} onPress={() => handleSelectOption(option)}>
                        <View style={styles.optionWrapper}>
                            <CheckBox
                                checkedIcon={<KhiyabunIcons name="tick-circle-bold" size={20} color={colors.primary}/>}
                                uncheckedIcon={<KhiyabunIcons name="circle-outline" size={20}
                                                              color={colors.onSurface}/>}
                                containerStyle={styles.checkBox}
                                checked={selectedOption === option}
                            />
                            <Text style={styles.optionText}>{option}</Text>
                        </View>
                        {index < options.length - 1 && <View style={styles.separator}/>}
                    </Pressable>
                ))}
            </View>

            <View style={styles.sheetButtons}>
                <Button
                    label="Confirm"
                    sizeButton="medium"
                    style={styles.confirmButton}
                    styleText={styles.confirmButtonText}
                    width={60}
                    onPress={() => {
                        onConfirm(selectedOption)
                        resetSelection(); // Uncheck all options when canceling
                    }}
                    isBorder={true}
                    borderColor={colors.primaryOutline}
                />
                <Button
                    label="Cancel"
                    sizeButton="small"
                    style={styles.cancelButton}
                    width={40}
                    styleText={styles.cancelButtonText}
                    onPress={() => {
                        onCancel();
                        resetSelection(); // Uncheck all options when canceling
                    }}
                />
            </View>
        </Sheet>
    );
};
const useThemedStyles = (colors) => {
    return StyleSheet.create({
        sheetHeaderText: {
            fontFamily: "dana-bold",
            fontWeight: "700",
            fontSize: 16,
            lineHeight: 24,
            color: colors.onSurface
        },
        optionsWrapper: {
            marginBottom: 16,
        },
        optionWrapper: {
            flexDirection: "row",
            alignItems: "center",
            paddingVertical: 6,
            width: Dimensions.get('window').width - 50

        },
        optionText: {
            fontFamily: "dana-regular",
            color: colors.onSurfaceHigh,
            fontSize: 16,
            fontWeight: "400",
            lineHeight: 24,
            textAlign: "left",
        },
        checkBox: {
            marginTop: 0,
            marginBottom: 0,
            marginLeft: 0,
            paddingLeft: 0,
            paddingRight: 0,
            paddingTop: 0,
            paddingBottom: 0,
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
            fontWeight: "500",
            fontSize: 16,
            lineHeight: 24,
            fontFamily: "dana-bold",
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
            fontWeight: "500",
            fontSize: 16,
            lineHeight: 24,
            fontFamily: "dana-bold",
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