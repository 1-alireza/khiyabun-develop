import { useTheme } from "@react-navigation/native";
import {
    FlatList,
    Platform,
    RefreshControl,
    StyleSheet,
    Text,
    View
} from "react-native";
import Input from "../../components/Input";
import Card from "../../components/Card";
import KhiyabunIcons from "../../components/KhiyabunIcons";
import React, { useEffect, useRef, useState } from "react";
import CheckListItem from "./CheckListItem";
import AddCheckListSheet from "./AddCheckListSheet";
import EditCheckListSheet from "./EditCheckListSheet";
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
} from 'react-native-popup-menu';
import { useTranslation } from "react-i18next";
import { getRequest } from "../../utils/sendRequest";
import EmptyData from "../../components/EmptyData";
import { useSelector } from "react-redux";
import globalStyles from "../../global-styles/GlobalStyles";
import CustomMenu from "../../components/customMenu";


function CheckListScreen() {
    const userToken = useSelector(state => state.login.token);
    const { colors } = useTheme();
    const { t, i18n } = useTranslation();
    const [isSheetVisible, setIsSheetVisible] = useState(false)
    const [isEditSheetVisible, setIsEditSheetVisible] = useState(false)
    const [refreshing, setRefreshing] = useState(false);
    const styles = useThemedStyles(colors)
    const [status, setStatus] = useState(true)
    const [searchedCheckList, setSearchedCheckList] = useState('')
    const [notFoundError, setNotFoundError] = useState(false)
    const [targetCheckList, setTargetCheckList] = useState({})
    const [requestValue, setRequestValue] = useState(searchedCheckList);
    const flatListRef = useRef(null);
    const [data, setData] = useState([]
    )


    useEffect(() => {
        requestValue ? getSearchedCheckLists() : getCheckLists()
    }, [requestValue]);

    useEffect(() => {
        const handler = setTimeout(() => {
            setRequestValue(searchedCheckList)
        }, 500); // Delay in milliseconds (500ms in this case)

        // Cleanup function to clear the timeout
        return () => {
            clearTimeout(handler);
        };
    }, [searchedCheckList]);

    const searchCheckList = (searchedVal) => {
        setSearchedCheckList(searchedNote => searchedVal)
    }

    const getCheckLists = async () => {
        let res = await getRequest("checklists", {}, userToken)
        console.log("checklists", res)
        setData(data => res.data)
        if (data.length > 0) {
            scrollToLastItem()
        }
        closeSheet()
    }

    const getSearchedCheckLists = async () => {
        const body = {
            searchWord: requestValue
        }
        let res = await getRequest("checklists", body, userToken)
        console.log("serached check", res)
        setData(data => res.data)
        if (res.data.length <= 0) {
            setNotFoundError(true)
        }
    }


    const openSheet = (currentStatus) => {
        setStatus(currentStatus)
        setIsSheetVisible(true)
    }

    const openEditSheet = (item) => {
        setTargetCheckList(item)
        setIsEditSheetVisible(true)
    }

    const closeEditSheet = (item) => {
        setIsEditSheetVisible(false)
    }

    const closeSheet = () => setIsSheetVisible(false)

    const renderItem = ({ item }) => <CheckListItem item={item}
        editCallback={openEditSheet} onEditCallback={getCheckLists} />;

    const onRefresh = () => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    };

    const scrollToLastItem = () => {
        flatListRef.current.scrollToIndex({
            animated: true,
            index: data.length - 1,
        });
    }


    const menuItems = [
        {
            text: "Private",
            onSelect: () => openSheet(true),
            icon: "lock-outline"
        },
        {
            text: "Public",
            onSelect: () => openSheet(false),
            icon: "unlock-outline"
        },
    ];

    const triggerIcon = {
        name: "add-outline",
        size: 20
    }

    return (
        <>
            <Input placeholder={"Search ..."} onChangeText={searchCheckList} rightIcon={"search-normal-outline"}
                customStyles={styles.input} />
            {data.length > 0 ? <View style={styles.mainView}>
                <Card customStyle={styles.wrapperStyle}
                >
                    <FlatList
                        data={data}
                        renderItem={renderItem}
                        style={styles.flatList}
                        ref={flatListRef}
                        keyExtractor={(item) => item.objectId}
                        ItemSeparatorComponent={() => <View style={styles.separator} />}
                        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}
                            colors={[colors.primary]}
                            progressBackgroundColor={colors.surfaceContainerLowest} />}
                    />
                </Card>
            </View> : <EmptyData notFoundError={notFoundError} />

            }

            <View style={styles.addNote}>
                <CustomMenu items={menuItems} triggerIcon={triggerIcon} />

                {/* <Menu>
                    <MenuTrigger>
                        <KhiyabunIcons name={"add-outline"} size={24} color={colors.primary}/>
                    </MenuTrigger>
                    <MenuOptions optionsContainerStyle={styles.popUp}>
                        <MenuOption style={styles.popUpOption}
                                    onSelect={() => openSheet(true)}
                        >
                            <KhiyabunIcons name={"lock-outline"}
                                           size={20}
                                           color={colors.onSurfaceHigh}/>
                            <Text style={styles.popUpOptionText}>{t("Private")}</Text>
                        </MenuOption>
                        <MenuOption style={styles.popUpOption}
                                    onSelect={() => openSheet(false)}
                        >
                            <KhiyabunIcons name={"unlock-outline"}
                                           size={20}
                                           color={colors.onSurfaceHigh}
                            />
                            <Text style={styles.popUpOptionText}>{t("Public")}</Text>
                        </MenuOption>
                    </MenuOptions>
                </Menu> */}
            </View>
            <AddCheckListSheet isVisible={isSheetVisible}
                onChangeCallback={getCheckLists}
                status={status}
                onClose={closeSheet} />
            <EditCheckListSheet isVisible={isEditSheetVisible}
                onChangeCallback={getCheckLists}
                item={targetCheckList}
                onClose={closeEditSheet} />
        </>
    )
}


const useThemedStyles = (colors) => {
    return StyleSheet.create({
        mainView: {
            paddingHorizontal: 16,
            marginBottom: 16,

        }, input: {
            marginTop: 20,
            marginBottom: 10,
            marginHorizontal: 16,

        },
        separator: {
            height: 1,
            backgroundColor: colors.outlineSurface,
        },
        addNote: {
            position: "absolute",
            bottom: 20,
            right: 20,
            backgroundColor: colors.surfaceContainerLowest,
            height: 56,
            width: 56,
            borderRadius: 100,
            justifyContent: "center",
            alignItems: "center",
            // Other styles for your container view
            ...Platform.select({
                ios: {
                    shadowColor: '#000',
                    shadowOffset: {
                        width: 0,
                        height: 4,
                    },
                    shadowOpacity: 0.2,
                    shadowRadius: 3,
                },
                android: {
                    elevation: 4,
                },
            }),
        },
        wrapperStyle: {
            marginBottom: 70
        },
        popUp: {
            borderRadius: 8,
            backgroundColor: colors.surfaceContainerLowest,
        },
        popUpOption: {
            flexDirection: "row",
            alignItems: 'center',
            justifyContent: "flex-start",
            height: 57,
            gap: 8,
            borderBottomColor: colors.outlineSurface,
            borderBottomWidth: 1,
            paddingVertical: 8,
            paddingHorizontal: 12

        },
        popUpOptionText: {
            fontSize: 16,
            lineHeight: 24,
            fontFamily: globalStyles.fontMain.fontFamily,
            color: colors.onSurfaceHigh
        },


    });
};


export default CheckListScreen









