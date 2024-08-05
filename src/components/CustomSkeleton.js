import React from "react";
import {useTheme} from "@react-navigation/native";
import {LinearGradient as SkeletonLinearGradient} from "expo-linear-gradient";
import {Skeleton} from "@rneui/themed";

function CustomLinearGradient(props) {
    const {colors} = useTheme();

    return (
        <SkeletonLinearGradient
            {...props}
            colors={[colors.surface, colors.outlineSurface]}
            style={{flex: 1}}
        />
    )
};

export default function CustomSkeleton({width, height, bgColor, cStyle}) {
    const {colors} = useTheme();

    return (
        <Skeleton style={[{backgroundColor: bgColor ? bgColor : colors.background}, cStyle]}
                  LinearGradientComponent={CustomLinearGradient}
                  animation="wave" width={width} height={height}/>
    )

}
