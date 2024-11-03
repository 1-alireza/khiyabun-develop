import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import KhiyabunIcons from './KhiyabunIcons';
import {useTheme} from "@react-navigation/native";
import Badge from "./Badge";
import CustomText from "./CustomText";

const PageHeader = ({
                        title,
                        titleColor,
                        titleSize,
                        leftIconName,
                        rightIconName,
                        onLeftIconPress,
                        onRightIconPress,
                        badgeCount,
                        children,
                    }) => {
    const styles = useThemedStyles();
    const {colors} = useTheme();

    const handleLeftIconPress = () => {
        if (onLeftIconPress) {
            onLeftIconPress();
        }
    };

    const handleRightIconPress = () => {
        if (onRightIconPress) {
            onRightIconPress();
        }
    };

    return (
        <>
            <View style={styles.header}>
                {leftIconName?
                    <TouchableOpacity activeOpacity={0.7} onPress={handleLeftIconPress}>
                        <KhiyabunIcons name={leftIconName} size={24} color={colors.onSurface}/>
                    </TouchableOpacity>:<View style={{width:24,height:24}}/>
                }

                <CustomText
                    size={titleSize ? titleSize : 16} weight={'bold'}
                    color={titleColor ? titleColor : colors.onSurfaceHigh}
                    lineHeight={26}
                    textAlign={'center'}>
                    {title}
                </CustomText>

                {rightIconName?.length ?
                    <TouchableOpacity activeOpacity={0.7} onPress={handleRightIconPress}>
                        <KhiyabunIcons name={rightIconName} size={24} color={colors.onSurface}/>
                        {badgeCount > 0 && (<Badge text={badgeCount > 9 ? "+9" : badgeCount}
                                                   width={18} height={14} badgeStyle={styles.badge} fontSize={10}/>)}
                    </TouchableOpacity> : children?children:<View style={{width:24,height:24}}/>
                }
            </View>
        </>
    );
};


const useThemedStyles = () => {
    const {colors} = useTheme();

    return StyleSheet.create({
        header: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: 15,
            height: 60,
            backgroundColor: colors.surfaceContainerLowest,
        },
        badge: {
            position: "absolute",
            top: -6,
            right: -6,
        },
        rightEmpty: {
            width: 24,
            height: 24
        }
    });
};
export default PageHeader;
