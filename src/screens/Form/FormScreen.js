import {useTheme} from "@react-navigation/native";
import {FlatList, Platform, Pressable, RefreshControl, ScrollView, StyleSheet, Text, View} from "react-native";
import Input from "../../components/Input";
import Card from "../../components/Card";
import React, {useEffect, useRef, useState} from "react";
import FormItem from "./Form";
import {useTranslation} from "react-i18next";
import {getRequest} from "../../utils/sendRequest";
import {Menu, MenuOption, MenuOptions, MenuTrigger} from "react-native-popup-menu";
import KhiyabunIcons from "../../components/KhiyabunIcons";
import EmptyData from "../../components/EmptyData";

function FormScreen({navigation}) {
    const {t, i18n} = useTranslation();
    const {colors} = useTheme();
    const styles = useThemedStyles(colors)
    const [refreshing, setRefreshing] = useState(false);
    const [searchedForm, setSearchedForm] = useState('')
    const [debouncedValue, setDebouncedValue] = useState(searchedForm);
    const [notFoundError, setNotFoundError] = useState(false)
    const flatListRef = useRef(null);
    const [data, setData] = useState([])


    useEffect(() => {
        debouncedValue ? getSearchedForms() : getForms()
    }, [debouncedValue]);


    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(searchedForm)
        }, 500); // Delay in milliseconds (500ms in this case)

        // Cleanup function to clear the timeout
        return () => {
            clearTimeout(handler);
        };
    }, [searchedForm]);


    const searchForm = (searchedVal) => {
        setSearchedForm(searchedNote => searchedVal)
    }

    const scrollToLastItem = () => {
        flatListRef.current.scrollToIndex({
            animated: true,
            index: data.length - 1,
        });
    };


    const getForms = async () => {
        let res = await getRequest("forms")
        console.log("forms", res)
        setData(data => res.data)
        if (data.length > 0) {
            scrollToLastItem()
        }
    }


    const getSearchedForms = async () => {
        const body={
            searchedForm:debouncedValue
        }
        let res = await getRequest("forms",body)
        console.log("searched forms", res)
        setData(data => res.data)
        if (!res.data.length > 0) {
            setNotFoundError(true)
        }
    }


    const renderItem = ({item}) => <FormItem item={item}/>;
    const onRefresh = () => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    };


    return (
        <>
            <Input placeholder={"search"} onChangeText={searchForm} rightIcon={"search-normal-outline"}
                   customStyles={styles.input}/>
            {data.length ? (
                <View style={styles.mainView}>
                    <Card customStyle={styles.wrapperStyle}
                    >
                        <FlatList
                            data={data}
                            renderItem={renderItem}
                            style={styles.flatList}
                            ref={flatListRef}
                            keyExtractor={(item) => item.id}
                            ItemSeparatorComponent={() => <View style={styles.separator}/>}
                            refreshControl={<RefreshControl
                                refreshing={refreshing}
                                onRefresh={onRefresh}
                                colors={[colors.primary]}
                                progressBackgroundColor={colors.surfaceContainerLowest}/>}
                        />
                    </Card>
                </View>

            ) : <EmptyData notFoundError={notFoundError}/>

            }
            <Pressable style={styles.addNote} onPress={() => navigation.navigate("AddForm")}>
                <KhiyabunIcons name={"add-outline"}
                               size={24}
                               color={colors.primary}/>
            </Pressable>
        </>
    )
}


const useThemedStyles = (colors) => {
    return StyleSheet.create({
        mainView: {
            paddingHorizontal: 16,
            marginBottom: 16,
        },
        input: {
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


    });
};

export default FormScreen