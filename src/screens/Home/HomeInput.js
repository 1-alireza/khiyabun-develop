import React, {useState, useMemo} from 'react';
import {Platform, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView} from 'react-native';
import KhiyabunIcons from "../../components/KhiyabunIcons";
import {useTheme} from "@react-navigation/native";
import gStyles from "../../global-styles/GlobalStyles";
import PropTypes from 'prop-types';

const HomeInput = ({
                         style = {},
                         placeHolder,
                         onCommentPress,
                         disabled = false
                     }) => {
    const {colors} = useTheme();
    const styles = useMemo(() => useThemedStyles(colors), [colors]);

    const [inputValue, setInputValue] = useState('');

    const handleCommentPress = () => {
        if (!disabled) {
            onCommentPress(inputValue);
            setInputValue('');
        }
    };

    return (
        <KeyboardAvoidingView
            style={[styles.container, style]}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <TextInput
                style={styles.input}
                placeholder={placeHolder}
                placeholderTextColor={colors.onSurfaceLow}
                value={inputValue}
                onChangeText={setInputValue}
                editable={!disabled}
                accessibilityLabel={placeHolder}
            />
            <TouchableOpacity
                activeOpacity={0.8}
                style={styles.sendButton}
                onPress={handleCommentPress}
                accessibilityLabel="Send Comment"
                disabled={disabled}
            >
                <KhiyabunIcons name="send-2-bold" size={20} color={colors.textOn}/>
            </TouchableOpacity>
        </KeyboardAvoidingView>
    );
};

const useThemedStyles = (colors) => {
    return StyleSheet.create({
        container: {
            flexDirection: 'row',
            alignItems: 'center',
            borderRadius: 25,
            borderWidth: 1,
            paddingHorizontal: 3,
            paddingVertical: 3,
            marginHorizontal: 10,
            backgroundColor: colors.primaryContainer,
            borderColor: colors.primaryOutline,
        },
        input: {
            ...gStyles.fontMain,
            flex: 1,
            color: colors.onSurface,
            fontSize: 12,
            paddingHorizontal: 12,
            outlineStyle: 'none'
        },
        sendButton: {
            backgroundColor: colors.primary,
            borderRadius: 20,
            padding: 8,
        },
    });
};

HomeInput.propTypes = {
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    placeHolder: PropTypes.string.isRequired,
    onCommentPress: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
};

export default HomeInput;