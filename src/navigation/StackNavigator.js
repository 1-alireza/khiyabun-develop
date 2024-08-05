import React, {useState} from "react";
import {createStackNavigator} from "@react-navigation/stack";
import {useTheme} from "@react-navigation/native";
import {I18nManager, StatusBar} from "react-native";
import {useSelector} from "react-redux";
import {useTranslation} from "react-i18next";
import gStyles from "../global-styles/GlobalStyles";

import LoginScreen from "../screens/LoginAndRegister/LoginScreen";
import LoginWithMobileScreen from "../screens/LoginAndRegister/LoginWithMobileScreen";

import BottomTabNavigator from "./BottomTabNavigator";
import AllComponents from "../screens/AllComponents";
import KhiyabunScreen from "../screens/KhiyabunScreen";
import SupportScreen from "../screens/SupportScreen";
import SettingsScreen from "../screens/Settings/SettingScreen";
import BlockedUsersScreen from "../screens/Settings/BlockedUsersScreen";
import ChatScreen from "../screens/Chat/ChatScreen";
import Notifications from "../screens/Notifications/Notifications";
import NotificationsSetting from "../screens/Notifications/NotificationsSetting";
import HelpAndSupportScreen from "../screens/HelpAndSupportScreen";
import PageHeader from "../components/PageHeader";
import ProfileScreen from "../screens/Profile/ProfileScreen";
import NoteScreen from "../screens/Note/NoteScreen";
import FormScreen from "../screens/Form/FormScreen";
import CheckListScreen from "../screens/CheckList/CheckListScreen";
import RequestScreen from "../screens/Request/RequestScreen";
import RegisterScreen from "../screens/LoginAndRegister/RegisterScreen";
import SmsVerifyScreen from "../screens/LoginAndRegister/SmsVerifyScreen";
import SetUsernameScreen from "../screens/LoginAndRegister/SetUsernameScreen";
import SetProfileScreen from "../screens/Profile/SetProfileScreen";
import SetLocationScreen from "../screens/Profile/SetLocationScreen";
import SetWorkingHoursScreen from "../screens/Profile/SetWorkingHoursScreen";
import SetSocialMediaScreen from "../screens/Profile/SetSocialMediaScreen";
import OfficeScreen from "../screens/office/OfficeScreen";
import FilterRequestSheet from "../components/FilterRequestSheet";
import NearByPeopleScreen from "../screens/NearByPeople/NearByPeopleScreen";
import LoginWithUsernameScreen from "../screens/LoginAndRegister/LoginWithUsernameScreen";
import TimesheetScreen from "../screens/Timesheet/TimesheetScreen";
import TimesheetHeader from "../screens/Timesheet/TimesheetHeader";
import SaveErrandScreen from "../screens/SaveErrand/SaveErrandScreen";
import ErrandDetailsScreen from "../screens/ErrandDetails/ErrandDetailsScreen";
import AddFlagScreen from "../screens/AddFlag/AddFlagScreen";
import AddedPlaceScreen from "../screens/AddedPlace/AddedPlaceScreen";
import ForgetPasswordScreen from "../screens/LoginAndRegister/ForgetPasswordScreen";
import NoteScreenHeader from "../screens/Note/NoteScreenHeader";
import CheckListHeader from "../screens/CheckList/CheckListHeader";
import AddFormScreen from "../screens/AddForm/AddFormScreen";
import TeamScreen from "../screens/Team/TeamScreen";
import TeamMemberShipHistory from "../screens/TeamMemberSheepHistory/TeamMemberShipHistory";
import AudioRecorder from "../screens/Note/AudioRecorder";
import ResetPasswordScreen from "../screens/LoginAndRegister/ResetPasswordScreen";


const Stack = createStackNavigator();

const StackNavigator = () => {
    const {t} = useTranslation();
    const {colors} = useTheme();
    const [isVisible, setIsVisible] = useState(false)
    const isDarkMode = useSelector(state => state.theme.darkTheme);
    // const isUserLogin = useSelector(state => state.login.is_login);
    const isUserLogin = true;
    const isRTL = I18nManager.isRTL;
    const icon = isRTL ? "arrow-right-outline" : "arrow-left-outline"

    const closeSheet = () => {
        setIsVisible(false)
    }


    return (
        <>

            <StatusBar style="auto" barStyle={isDarkMode ? "light-content" : "dark-content"}
                // backgroundColor={isDarkMode ?colors.surfaceContainerLowest : colors.white}
                       backgroundColor={colors.surfaceContainerLowest}/>
            <Stack.Navigator
                initialRouteName="Main"
                screenOptions={{
                    // header: () => null
                    headerTitleAlign: 'center',
                    headerStyle: {
                        backgroundColor: colors.surfaceContainerLowest
                    },
                    headerTintColor: colors.onSurfaceHigh,
                    headerTitleStyle: {
                        ...gStyles.fontBold,
                        fontSize: 16,
                    },
                }}
            >
                {isUserLogin ? (
                    <>
                        <Stack.Screen name="Main" component={BottomTabNavigator} options={{headerShown: false}}/>
                        <Stack.Screen name="Audio" component={AudioRecorder} options={{headerShown: false}}/>
                        <Stack.Screen name="SetProfile" component={SetProfileScreen} options={(route) => {
                                          const {is_edit} = route.route.params;
                                          if (is_edit) {
                                              return {
                                                  headerShown: true,
                                                  title: t("set_profile"),
                                                  titleColor: colors.onSurfaceHigh,
                                                  headerTintColor: colors.onSurface,
                                              }
                                          } else {
                                              return {
                                                  header: ({navigation, route, options, back}) => {
                                                      return (
                                                          <PageHeader
                                                              title={t("set_profile")}
                                                              titleColor={colors.onSurfaceHigh}
                                                              titleSize={16}
                                                              leftIconName="close-outline"
                                                              rightIconName=""
                                                              onLeftIconPress={() => {
                                                                  navigation.navigate("Main");
                                                              }}
                                                          />
                                                      );
                                                  }
                                              }
                                          }
                                      }}/>
                        <Stack.Screen name="SetLocation" component={SetLocationScreen} options={{
                                          headerShown: true,
                                          title: t("set_location_title")
                                      }}/>
                        <Stack.Screen name="SetWorkingHours" component={SetWorkingHoursScreen} options={{
                                          headerShown: true,
                                          title: t("set_hours_title")
                                      }}/>
                        <Stack.Screen name="SetSocialMedia" component={SetSocialMediaScreen} options={{
                                          headerShown: true,
                                          title: t("social_media_title")
                                      }}/>
                        <Stack.Screen name="SaveErrand" component={SaveErrandScreen} options={{
                                          headerShown: true,
                                          title: t("save-errand")
                                      }}/>
                        <Stack.Screen name="AddFlag" component={AddFlagScreen} options={{
                                          headerShown: true,
                                          title: t("add-flag")
                                      }}/>
                        <Stack.Screen name="ErrandDetails" component={ErrandDetailsScreen} options={{
                                          headerShown: true,
                                          title: t("errand-details")
                                      }}/>
                        <Stack.Screen name="Support" component={SupportScreen} options={{headerShown: true}}/>
                        <Stack.Screen name="Khiyabun" component={KhiyabunScreen} options={{headerShown: true}}/>
                        <Stack.Screen name="BlockedUsers" component={BlockedUsersScreen} options={{headerShown: true}}/>
                        <Stack.Screen name="Setting" component={SettingsScreen} options={{headerShown: true}}/>
                        <Stack.Screen name="chats" component={ChatScreen} options={{
                                          header: ({navigation, route, options, back}) => {
                                              return (
                                                  <PageHeader
                                                      title="Chat & Notifications"
                                                      leftIconName={icon}
                                                      rightIconName="search-normal-outline"
                                                      onLeftIconPress={() => {
                                                          navigation.goBack();
                                                      }}
                                                      onRightIconPress={() => {
                                                          alert("right icon pressed baby!")
                                                      }}
                                                  />
                                              );
                                          }
                                      }}/>
                        <Stack.Screen name="Notifications" component={Notifications} options={{
                                          header: ({navigation, route, options, back}) => {
                                              return (
                                                  <PageHeader
                                                      title="Notifications"
                                                      leftIconName={icon}
                                                      rightIconName="setting-outline"
                                                      onLeftIconPress={() => {
                                                          navigation.goBack();
                                                      }}
                                                      onRightIconPress={() => {
                                                          navigation.navigate("NotificationsSetting");
                                                      }}
                                                  />
                                              );
                                          }
                                      }}/>
                        <Stack.Screen name="NotificationsSetting" component={NotificationsSetting} options={{
                                          header: ({navigation, route, options, back}) => {
                                              return (
                                                  <PageHeader
                                                      title="Notifications"
                                                      leftIconName={icon}
                                                      rightIconName="setting-outline"
                                                      onLeftIconPress={() => {
                                                          navigation.goBack();
                                                      }}
                                                      onRightIconPress={() => {
                                                          alert("right icon pressed baby!")
                                                      }}
                                                  />
                                              );
                                          }
                                      }}/>
                        <Stack.Screen name="office" component={OfficeScreen} options={{
                                          header: ({navigation, route, options, back}) => {
                                              return (
                                                  <PageHeader
                                                      title={t('ARAKO_GROUP')}
                                                      titleColor={colors.primary}
                                                      titleSize={18}
                                                      leftIconName="tag-user-outline"
                                                      rightIconName="direct-notification-outline"
                                                      onLeftIconPress={() => {
                                                          console.log("left icon pressed!")
                                                      }}
                                                      onRightIconPress={() => {
                                                          // navigation.navigate("chats");
                                                          console.log("right icon pressed!")
                                                      }}
                                                  />
                                              );
                                          }
                                      }}/>
                        <Stack.Screen name="Timesheet" component={TimesheetScreen} options={{
                                          header: ({navigation, route, options, back}) => {
                                              return (
                                                  <TimesheetHeader
                                                      onLeftIconPress={() => {
                                                          navigation.goBack();
                                                      }}

                                                  />
                                              );
                                          }
                                      }}/>
                        <Stack.Screen name="HelpAndSupport" component={HelpAndSupportScreen} options={{headerShown: true, title: 'Help & Support'}}/>
                        <Stack.Screen name="ProfileS" component={ProfileScreen} options={{
                                          header: ({navigation, route, options, back}) => {
                                              return (
                                                  <PageHeader
                                                      title=""
                                                      leftIconName={icon}
                                                      rightIconName="calender-outline"
                                                      onLeftIconPress={() => {
                                                          navigation.goBack();
                                                      }}
                                                      onRightIconPress={() => {
                                                          alert("right icon pressed baby!")
                                                      }}
                                                  />
                                              );
                                          }
                                      }}/>
                        <Stack.Screen name="AddedPlace" component={AddedPlaceScreen} options={{
                                          header: ({navigation, route, options, back}) => {
                                              return (
                                                  <PageHeader
                                                      title=""
                                                      leftIconName={icon}
                                                      rightIconName="more-bold"
                                                      onLeftIconPress={() => {
                                                          navigation.goBack();
                                                      }}
                                                      onRightIconPress={() => {
                                                          alert("right icon pressed baby!")
                                                      }}
                                                  />
                                              );
                                          }
                                      }}/>
                        <Stack.Screen name="Note" component={NoteScreen} options={{
                                          header: ({navigation, route, options, back}) => {
                                              return (
                                                  <PageHeader
                                                      title="Note"
                                                      leftIconName={icon}
                                                      onLeftIconPress={() => {
                                                          navigation.goBack();
                                                      }}

                                                  >
                                                      <NoteScreenHeader/>
                                                  </PageHeader>
                                              );
                                          }
                                      }}/>
                        <Stack.Screen name="Form" component={FormScreen} options={{header: ({navigation, route, options, back}) => {
                                return (
                                    <PageHeader
                                        title="Form"
                                        leftIconName={icon}
                                        rightIconName="sort-descending-outline"
                                        onLeftIconPress={() => {
                                            navigation.goBack();
                                        }}
                                        onRightIconPress={() => {
                                            alert("right icon pressed baby!")
                                        }}
                                    />
                                );
                            }}}/>
                        <Stack.Screen name="Request" component={RequestScreen} options={{header: ({navigation, route, options, back}) => {
                                return (
                                    <PageHeader
                                        title="Request"
                                        leftIconName={icon}
                                        rightIconName="sort-descending-outline"
                                        onLeftIconPress={() => {
                                            navigation.goBack();
                                        }}
                                        onRightIconPress={() => {
                                            setIsVisible(true)
                                        }}
                                    />
                                );
                            }}}/>
                        <Stack.Screen name="Team" component={TeamScreen} options={{header: ({navigation, route, options, back}) => {
                                return (
                                    <PageHeader
                                        title={t("team")}
                                        leftIconName={icon}
                                        rightIconName="clock-outline"
                                        onLeftIconPress={() => {
                                            navigation.goBack();
                                        }}
                                        onRightIconPress={() => {
                                            navigation.navigate("TeamMemberShip");

                                        }}
                                    />
                                );
                            }}}/>
                        <Stack.Screen name="CheckList" component={CheckListScreen} options={{header: ({navigation, route, options, back}) => {
                                return (
                                    <PageHeader
                                        title="CheckList"
                                        leftIconName={icon}
                                        onLeftIconPress={() => {
                                            navigation.goBack();
                                        }}
                                    >
                                        <CheckListHeader/>
                                    </PageHeader>
                                );
                            }}}/>
                        <Stack.Screen name="AddForm" component={AddFormScreen} options={{headerShown: true, title: 'AddFormScreen'}}/>
                        <Stack.Screen name="TeamMemberShip" component={TeamMemberShipHistory} options={{headerShown: true, title: 'TeamMemberShipHistory'}}/>
                        <Stack.Screen name="AllComponents" component={AllComponents} options={{headerShown: true}}/>
                        <Stack.Screen name="NearByPeople" component={NearByPeopleScreen} options={{headerShown: true}}/>
                    </>
                ) : (
                    <>
                        <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false}}/>
                        <Stack.Screen name="LoginWithMobile" component={LoginWithMobileScreen} options={{headerShown: false}}/>
                        <Stack.Screen name="LoginWithUsername" component={LoginWithUsernameScreen} options={{headerShown: false}}/>
                        <Stack.Screen name="Register" component={RegisterScreen} options={{headerShown: false}}/>
                        <Stack.Screen name="SmsVerify" component={SmsVerifyScreen} options={{headerShown: false}}/>
                        <Stack.Screen name="SetUsername" component={SetUsernameScreen} options={{headerShown: false}}/>
                        <Stack.Screen name="ForgetPassword" component={ForgetPasswordScreen} options={{headerShown: false}}/>
                        <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} options={{headerShown: false}}/>
                    </>
                )}


            </Stack.Navigator>
            <FilterRequestSheet isVisible={isVisible} onClose={closeSheet}/>
        </>
    );
};

export default StackNavigator;
