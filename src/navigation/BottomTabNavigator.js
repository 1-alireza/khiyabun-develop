// BottomTabNavigator.js

import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useTranslation} from "react-i18next";

import HomeScreen from '../screens/Home/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import AboutScreen from "../screens/AboutScreen";
import BoardScreen from "../screens/Board/BoardScreen";
import KhiyabunIcons from "../components/KhiyabunIcons";
import {useNavigation, useTheme} from "@react-navigation/native";
import IconList from "../screens/IconList";
import PageHeader from "../components/PageHeader";
import {Text, TouchableOpacity, View} from "react-native";
import TimeClockScreen from "../screens/TimeClock/TimeClockScreen";
const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
    const {t} = useTranslation();
    const {colors} = useTheme();

    return (
        <Tab.Navigator
            screenOptions={({route}) => ({
                tabBarIcon: ({focused, size}) => {
                    let iconName;
                    if (route.name === t('home')) {
                        iconName = focused ? "home-bold" : "home-outline";
                    } else if (route.name === t('profile')) {
                        iconName = focused ? "user-bold" : "user-outline";
                    } else if (route.name === t('time_clock')) {
                        iconName = focused ? "clock-bold" : "clock-outline";
                    } else {
                        iconName = focused ? "category-bold" : "category-outline"
                    }
                    let color = focused ? colors.primary : colors.onSurfaceLow;
                    size = 20;

                    // You can return any component that you like here!
                    return <KhiyabunIcons name={iconName} size={size} color={color}/>;
                },
                tabBarActiveTintColor: colors.primary,
                tabBarInactiveTintColor: colors.onSurfaceLow,
                tabBarStyle: {
                    backgroundColor: colors.surfaceContainerLowest,
                    paddingBottom: 2,
                },
                tabBarLabelStyle: {
                    fontSize: 14,
                    fontWeight: "400",
                    lineHeight: 20,
                    marginTop: -8,
                    fontFamily: "dana-regular",
                }
            })}
        >
            <Tab.Screen name={t('home')}
                        component={HomeScreen}
                        initialParams={{
                            name: "meysam"
                        }}
                        options={{
                            header: ({navigation, route, options, back}) => {
                                return (
                                    <PageHeader
                                        title={t('ARAKO_GROUP')}
                                        titleColor={colors.primary}
                                        titleSize={18}
                                        leftIconName="help-outline"
                                        rightIconName="notification-outline"
                                        onLeftIconPress={() => {
                                            navigation.navigate("HelpAndSupport");
                                        }}
                                        onRightIconPress={() => {
                                            navigation.navigate("Notifications");
                                        }}
                                        badgeCount={route.params?.badgeCount ?? 0}
                                    />
                                );
                            }
                        }}
            />
            <Tab.Screen name={t('time_clock')}
                        component={TimeClockScreen}
                        options={{
                            header: ({navigation, route, options, back}) => {
                                return (
                                    <PageHeader
                                        title={t('ARAKO_GROUP')}
                                        titleColor={colors.primary}
                                        titleSize={18}
                                        leftIconName="calender-outline"
                                        rightIconName="direct-notification-outline"
                                        onLeftIconPress={() => {
                                            console.log("left icon pressed!")
                                            navigation.navigate("Timesheet");
                                        }}
                                        onRightIconPress={() => {
                                            console.log("right icon pressed!")
                                            navigation.navigate("Request");
                                        }}
                                    />
                                );
                            }
                        }}
            />

            {/*<Tab.Screen name={t('profile')}*/}
            {/*            component={ProfileScreen}*/}
            {/*            initialParams={{*/}
            {/*                name: "hello"*/}
            {/*            }}*/}
            {/*            options={{*/}
            {/*                title: t('profile'),*/}
            {/*            }}*/}
            {/*/>*/}
            <Tab.Screen name={t('board')}
                        component={BoardScreen}
                        options={{
                            header: ({navigation, route, options, back}) => {
                                return (
                                    <PageHeader
                                        title="Board"
                                        titleColor={colors.primary}
                                    />
                                );
                            }
                        }}
            />
            <Tab.Screen name={t('icons')}
                        component={IconList}
                        options={
                            {
                                headerShown: true
                            }
                        }
            />

        </Tab.Navigator>
    );
};
const CustomHeader = ({leftIcon, rightIcon, middleText}) => {
    return (
        <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 20
        }}>
            <KhiyabunIcons name={leftIcon} size={20}/>
            <Text>{middleText}</Text>
            <KhiyabunIcons name={rightIcon} size={20}/>
        </View>
    );
};
export default BottomTabNavigator;
