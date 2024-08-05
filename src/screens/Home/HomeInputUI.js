import React, {useState} from 'react';
import {Platform, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView} from 'react-native';
import KhiyabunIcons from "../../components/KhiyabunIcons";
import {useTheme} from "@react-navigation/native";
import gStyles from "../../global-styles/GlobalStyles";

const HomeInputUI = ({style, placeHolder, onCommentPress, disabled}) => {
    const styles = useThemedStyles();
    const {colors} = useTheme();

    const [inputValue, setInputValue] = useState('');
    const handleCommentPress = () => {
        onCommentPress(inputValue);
        setInputValue('');
    };

    return (
        <KeyboardAvoidingView style={[styles.container, style && {marginHorizontal: 20}]}
                              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <TextInput
                style={styles.input}
                placeholder={placeHolder}
                placeholderTextColor={colors.onSurfaceLow}
                value={inputValue}
                onChangeText={setInputValue}
                editable={!disabled}
            />
            <TouchableOpacity activeOpacity={0.8} style={styles.sendButton} onPress={handleCommentPress}>
                <KhiyabunIcons name="send-2-bold" size={20} color={colors.textOn}/>
            </TouchableOpacity>
        </KeyboardAvoidingView>
    );
};
const useThemedStyles = () => {
    const {colors} = useTheme();

    return StyleSheet.create({
        container: {
            flexDirection: 'row',
            alignItems: 'center',
            borderRadius: 25,
            borderWidth: 1,
            paddingHorizontal: 3,
            paddingVertical: 3,
            backgroundColor: colors.primaryContainer,
            borderColor: colors.primaryOutline,
        },
        input: {
            ...gStyles.fontMain,
            flex: 1,
            color: colors.onSurface,
            fontSize: 12,
            paddingHorizontal: 12,
        },
        sendButton: {
            backgroundColor: colors.primary,
            borderRadius: 20,
            padding: 8,
        },

    });
};

export default HomeInputUI;