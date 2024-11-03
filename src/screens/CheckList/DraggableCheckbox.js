import  {ScaleDecorator} from "react-native-draggable-flatlist";
import {Pressable, StyleSheet, View} from "react-native";
import {CheckBox} from "@rneui/themed";
import KhiyabunIcons from "../../components/KhiyabunIcons";
import React from "react";
import {useTheme} from "@react-navigation/native";
import gStyles from "../../global-styles/GlobalStyles";


function DraggableCheckbox({item, drag, isActive, deleteCallback, checkHandler, customStyle}) {
    const {colors} = useTheme();
    const styles = useThemedStyles(colors)
    const checkIcon = <KhiyabunIcons name={"tick-circle-outline"} size={20} color={colors.primary}/>
    const blankIcon = <KhiyabunIcons name={"circle-outline"} size={20} color={colors.primary}/>

    return (
        <ScaleDecorator style={styles.checkboxContainer}>
            <Pressable
                onLongPress={drag}
                disabled={isActive}
                onPress={() => checkHandler(item.id)}
            >
                <View style={customStyle ? customStyle : styles.checkboxContainer}>
                    <CheckBox
                        iconRight={false}
                        size={20}
                        onPress={() => checkHandler(item.id)}
                        key={item.id}
                        checked={item.done}
                        iconType="material-community"
                        checkedIcon={checkIcon}
                        uncheckedIcon={blankIcon}
                        containerStyle={styles.radio}
                        checkedColor={colors.primary}
                        textStyle={item.done ? [styles.title, {
                            color: colors.onSurfaceLow,
                            textDecorationLine: "line-through"
                        }] : styles.title}
                        title={item.text}
                    />
                    <Pressable onPress={() => deleteCallback(item.id)} style={styles.deleteIcon}>
                        <KhiyabunIcons name={"close-outline"} size={18} color={colors.onSurfaceLowest}/>
                    </Pressable>
                </View>
            </Pressable>
        </ScaleDecorator>
    );

}


const useThemedStyles = (colors) => {
    return StyleSheet.create({
        radio: {
            backgroundColor: "transparent",
            borderWidth: 0,
            padding: 0,
            margin: 0,
            marginRight: 0,
            marginLeft: 0,
            marginVertical: 10,
        },

        title: {
            fontSize: 14,
            lineHeight: 24,
            color: colors.onSurfaceHigh,
            fontFamily:gStyles.fontMain.fontFamily

        },
        checkboxContainer: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
        },
        deleteIcon: {
            justifyContent: "center",
            alignItems: "center",
        },
    });
};

export default DraggableCheckbox