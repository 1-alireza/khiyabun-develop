// import React from 'react';
// import {View} from 'react-native';
// import {MotiView} from "moti";
// import {useTheme} from "@react-navigation/native";
//
// const Loader = () => {
//     const {colors} = useTheme();
//
//     const LoadingIndicator = ({size}) => {
//         return <MotiView
//             from={{
//                 width: size,
//                 height: size,
//                 borderRadius: size / 2,
//                 borderWidth: 0,
//                 shadowOpacity: 0.5,
//             }}
//             animate={{
//                 width: size + 20,
//                 height: size + 20,
//                 borderRadius: (size + 20) / 2,
//                 borderWidth: size / 10,
//                 shadowOpacity: 0.5,
//             }}
//             transition={{
//                 type: 'timing',
//                 duration: 1000,
//                 loop: true,
//             }}
//             style={{
//                 width: size,
//                 height: size,
//                 borderRadius: size / 2,
//                 borderWidth: size / 10,
//                 borderColor: colors.primary,
//                 shadowColor: "red",
//                 shadowOffset: {width: 0, height: 0},
//                 shadowOpacity: 1,
//                 shadowRadius: 10,
//             }}
//         />
//     }
//
//     return (
//         <View
//             style={{
//                 // flex: 1,
//                 marginTop: "80%",
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 backgroundColor: colors.surface,
//             }}
//         >
//             <LoadingIndicator size={50}/>
//         </View>
//     )
// };
//
//
// export default Loader;


import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {useTheme} from "@react-navigation/native";

const Loader = () => {
    const {colors} = useTheme();
    return (
        <View style={[styles.container, styles.horizontal]}>
            <ActivityIndicator size="large" color={colors.primary}/>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        marginTop:"80%",
        justifyContent: 'center',
    },
    horizontal: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10,
    },
});

export default Loader



