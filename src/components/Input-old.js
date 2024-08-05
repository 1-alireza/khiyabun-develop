import React from "react";
import {
    View,
    Text,
    TextInput,
    StyleSheet
} from "react-native";
import {useTheme} from "@react-navigation/native";


const InputOld = (
    {
        label,
        leftIcon,
        rightIcon,
        style,
        multiline,
        type,
        placeholder,
        onChange,
        value
    }) => {

    const {colors} = useTheme();
    const styles = useThemedStyles(colors);
    const onChangeHandler = (val) => {
        onChange(val)
    }
    let styleFinal = (style) ? [styles.input, style] : styles.input;

    return (
        <View style={styles.container}>
            {(label) ?
                <View>
                    <Text>{label}</Text>
                </View> : ""}
            <TextInput
                multiline={multiline}
                keyboardType={type}
                style={styleFinal}
                placeholder={placeholder}
                onChange={onChangeHandler}
                value={value}
            />
        </View>
    )
}
const useThemedStyles = (colors) => {
    return StyleSheet.create({
        container: {
            width: "100%",
            marginTop: 15
        },
        input: {
            fontFamily: "dana-regular",
            minHeight: 35,
            maxHeight: 100,
            fontSize: 15,
            padding: 5,
            paddingHorizontal: 10,
            borderWidth: 1,
            borderColor: 'gray',
            backgroundColor: '#ffffff',
            borderRadius: 5
        }
    })
}

export default InputOld;
