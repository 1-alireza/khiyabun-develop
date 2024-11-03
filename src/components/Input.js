import React, {useState, forwardRef} from 'react';
import {View, TextInput, StyleSheet, Pressable, I18nManager} from 'react-native';
import KhiyabunIcons from "./KhiyabunIcons";
import {useTheme} from "@react-navigation/native";
import Button from "./Button";
import gStyles from "../global-styles/GlobalStyles"
import CustomText from "./CustomText";

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
                              onEndEditing,
                              onPressIn
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
            {label &&
                <CustomText
                    size={14} color={colors.onSurface} lineHeight={16}
                    textAlign={'left'} customStyle={{marginBottom: 5, marginLeft: 3}}>
                    {label}
                </CustomText>
            }
            <View style={[styles.inputContainer, customStyles, {borderColor, backgroundColor}]}>
                {leftIcon && type !== "number" &&
                    <KhiyabunIcons name={leftIcon} size={24}
                                   color={error ? colors.error : disabled ? colors.onDisabled : colors.onSurfaceLow}
                                   style={{marginRight: 5}}/>}

                {type === 'number' && prefixNumber && (
                    <CustomText
                        size={14}
                        color={textColor}
                        lineHeight={20}
                        textAlign={'left'}
                        customStyle={{
                            marginTop: 3,
                            marginLeft: 8,
                            marginRight: 8,
                            paddingRight: 16,
                            borderRightWidth: 1,
                            borderRightColor: colors.outlineSurface,
                            gap: 8,
                        }}>
                        {prefixNumber}
                    </CustomText>
                )}

                {type === 'file' ? (
                    <>
                        <View style={styles.fileInput}>
                            <CustomText
                                size={12} color={textColor} lineHeight={16}
                                textAlign={'left'} customStyle={{marginTop: 3, marginLeft: 3}}>
                                {value || placeholder}
                            </CustomText>
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
                        onPressIn={onPressIn}

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
            {supportText &&
                <CustomText
                    size={12} color={textColor} lineHeight={16}
                    textAlign={'left'} customStyle={{marginTop: 3, marginLeft: 3}}>
                    {supportText}
                </CustomText>}
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
        inputContainer: {
            writingDirection: "ltr",
            flexDirection: 'row',
            alignItems: 'center',
            borderWidth: 1,
            borderRadius: 8,
            padding: 10,
            height: 48,
        },
        input: {
            fontFamily: (I18nManager.isRTL) ? gStyles.danaPersianNumber.fontFamily : gStyles.fontMain.fontFamily,
            flex: 1,
            outlineStyle: 'none'
        },
        fileInput: {
            flex: 1,
            paddingVertical: 10,
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
