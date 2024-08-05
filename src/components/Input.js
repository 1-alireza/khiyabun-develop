import React, {useState, forwardRef} from 'react';
import {View, TextInput, Text, StyleSheet, Pressable, I18nManager} from 'react-native';
import KhiyabunIcons from "./KhiyabunIcons";
import {useTheme} from "@react-navigation/native";
import Button from "./Button";
import gStyles from "../global-styles/GlobalStyles"

const Input = forwardRef(({
                              label,
                              type = 'text',
                              leftIcon,
                              rightIcon,
                              placeholder = "Placeholder",
                              error,
                              disabled,
                              onChangeText,
                              onFileSelect,
                              value,
                              prefixNumber,
                              supportText,
                              multiline = false,
                              linesNumber = 1,
                              customStyles,
                              maxLength,
                              inputCustomStyle,
                              secureTextEntry,
                              onFocus,
                              iconFunctionCallBack,
                              onEndEditing
                          }, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    const styles = useThemedStyles();
    const {colors} = useTheme();
    const handleFocus = () => {
        setIsFocused(true);
        if (onFocus) {
            onFocus();
        }
    };
    const handleBlur = () => {
        (value) ? setIsFocused(true) : setIsFocused(false);
    }
    const handleIconClick = () => {
        iconFunctionCallBack();
    }


    // console.log(customStyles)

    let borderColor;
    if (error) {
        borderColor = colors.error;
    } else if (isFocused) {
        borderColor = colors.primary;
    } else if (disabled) {
        borderColor = colors.outlineDisabled;
    } else {
        borderColor = colors.outlineSurface;
    }

    let textColor;
    if (error) {
        textColor = colors.error;
    } else if (disabled) {
        textColor = colors.onDisabled;
    } else {
        textColor = colors.onSurfaceLowest;
    }

    let backgroundColor;
    if (disabled) {
        backgroundColor = colors.disabledSurface;
    } else {
        backgroundColor = colors.surfaceContainerLowest;
    }

    return (
        <>
            {label && <Text style={styles.inputLabel}>{label}</Text>}
            <View style={[styles.inputContainer, customStyles, {borderColor, backgroundColor}]}>
                {leftIcon && type !== "number" &&
                    <KhiyabunIcons name={leftIcon} size={24}
                                   color={error ? colors.error : disabled ? colors.onDisabled : colors.onSurfaceLow}
                                   style={{marginRight: 5}}/>}

                {type === 'number' && prefixNumber && (
                    <Text style={[styles.prefix, {color: textColor}]}>{prefixNumber}</Text>)}

                {type === 'file' ? (
                    <>
                        <View style={styles.fileInput}>
                            <Text style={{color: textColor}}>{value || placeholder}</Text>
                        </View>
                        <Button
                            onPress={onFileSelect}
                            label="Choose file"
                            sizeButton="small"
                            width={38}
                            typeButton="full"
                            colorButton="light"
                            isBorder={true}
                            borderColor="light"
                            styleText={styles.buttonTextStyle}
                            disabled={disabled}
                        />
                    </>
                ) : (
                    <TextInput
                        ref={ref}
                        style={[styles.input, {color: colors.onSurface}, inputCustomStyle]}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        onChangeText={onChangeText}
                        value={value}
                        placeholder={placeholder}
                        placeholderTextColor={textColor}
                        keyboardType={type === 'number' ? 'numeric' : 'default'}
                        editable={!disabled}
                        multiline={multiline}
                        numberOfLines={linesNumber}
                        maxLength={maxLength}
                        secureTextEntry={secureTextEntry}
                        onEndEditing={onEndEditing}
                    />
                )}
                {(rightIcon) ?
                    (iconFunctionCallBack) ?
                        <Pressable
                            style={({pressed}) => [
                                {
                                    opacity: pressed ? .8 : 1
                                }
                            ]}
                            disabled={disabled}
                            onPress={handleIconClick}
                        >
                            <KhiyabunIcons name={rightIcon} size={24}
                                           color={disabled ? colors.onDisabled : colors.onSurface}
                                           style={styles.icon}/>
                        </Pressable> :
                        <KhiyabunIcons name={rightIcon} size={24}
                                       color={disabled ? colors.onDisabled : colors.onSurface}
                                       style={styles.icon}/> : ""
                }
            </View>
            {supportText && <Text style={[styles.supportText, {color: textColor}]}>{supportText}</Text>}
        </>
    );
});

const useThemedStyles = () => {
    const {colors} = useTheme();

    return StyleSheet.create({
        // container: {
        //     marginVertical: 10,
        //     width: "100%"
        // },
        inputLabel: {
            marginBottom: 5,
            marginLeft: 3,
            fontSize: 14,
            fontWeight: '400',
            lineHeight: 16,
            textAlign: "left",
            color: colors.onSurface
        },
        inputContainer: {
            direction: "ltr",
            flexDirection: 'row',
            alignItems: 'center',
            borderWidth: 1,
            borderRadius: 8,
            padding: 10,
            height: 48,

        },
        input: {
            fontFamily: (I18nManager.isRTL)?gStyles.danaPersianNumber.fontFamily: gStyles.fontMain.fontFamily,
            flex: 1,
        },
        fileInput: {
            flex: 1,
            paddingVertical: 10,
        },
        supportText: {
            ...gStyles.fontMain,
            marginTop: 3,
            marginLeft: 3,
            fontSize: 12,
            fontWeight: '400',
            lineHeight: 16,
            textAlign: "left",
        },
        prefix: {
            fontFamily: (I18nManager.isRTL)?gStyles.danaPersianNumber.fontFamily: gStyles.fontMain.fontFamily,
            paddingLeft: 8,
            paddingRight: 16,
            marginRight: 8,
            fontSize: 14,
            fontWeight: '400',
            lineHeight: 20,
            textAlign: "left",
            borderRightWidth: 1,
            borderRightColor: colors.outlineSurface,
            gap: 8,
        },
        chooseFileButtonText: {
            color: colors.darkPrimary,
            borderWidth: 1,
            borderColor: colors.primaryOutline,
            backgroundColor: colors.primaryContainer,
            paddingHorizontal: 24,
            paddingVertical: 8,
            borderRadius: 8,
            fontWeight: '500',
            lineHeight: 20,
            fontSize: 14
        },
        buttonTextStyle: {
            fontWeight: '500',
            lineHeight: 20,
            fontSize: 14
        }
    });
};
export default Input;
