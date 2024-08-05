import {useTheme} from "@react-navigation/native";
import {FlatList, RefreshControl, Platform, StyleSheet, View, Text, Dimensions} from "react-native";
import Input from "../../components/Input";
import Card from "../../components/Card";
import TextNote from "./TextNote";
import React, {useState, useRef, useEffect} from "react";
import KhiyabunIcons from "../../components/KhiyabunIcons";
import AddNoteSheet from "./AddNoteSheet";
import EditNoteSheet from "./EditNoteSheet";
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
} from 'react-native-popup-menu';
import {useTranslation} from "react-i18next";
import {getRequest, putRequest} from "../../utils/sendRequest";
import {errorHandling} from "../../utils/errorHandling";
import EmptyData from "../../components/EmptyData";

function NoteScreen() {
    const {colors} = useTheme();
    const styles = useThemedStyles(colors)
    const [isVisible, setIsVisible] = useState(false)
    const [status, setStatus] = useState(true)
    const [header, setHeader] = useState('')
    const {t, i18n} = useTranslation();
    const [content, setContent] = useState('')
    const [searchedNote, setSearchedNote] = useState('')
    const [debouncedValue, setDebouncedValue] = useState(searchedNote);
    const [notFoundError, setNotFoundError] = useState(false)
    const [Id, setId] = useState(null)
    const [isEditSheetVisible, setIsEditSheetVisible] = useState(false)
    const [editType, setEditType] = useState("")
    const [refreshing, setRefreshing] = useState(false);
    const flatListRef = useRef(null);
    const [data, setData] = useState([])


    useEffect(() => {
        debouncedValue ? getSearchedNotes() : getNotes()
    }, [debouncedValue]);


    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(searchedNote)
        }, 500); // Delay in milliseconds (500ms in this case)

        // Cleanup function to clear the timeout
        return () => {
            clearTimeout(handler);
        };
    }, [searchedNote]);


    const searchNote = (searchedVal) => {
        setSearchedNote(searchedNote => searchedVal)
    }

    const openNoteSheet = (currentStatus) => {
        setStatus(currentStatus)
        setIsVisible(true);
    };


    const closeNoteSheet = () => {
        setIsVisible(false);
    };


    const openEditSheet = (item) => {
        setEditType(item.type)
        setContent(item.text)
        setStatus(item.isPrivate)
        setHeader(item.title)
        setId(item.id)
        setIsEditSheetVisible(true);
    };


    const closeEditSheet = () => {
        setIsEditSheetVisible(false);
    };


    const getNotes = async () => {
        let res = await getRequest("notes")
        console.log("notes", res)
        setData(data => res.data)
        if (data.length > 0) {
            scrollToLastItem()
        }
        closeNoteSheet()
    }


    const getSearchedNotes = async () => {
        const body = {searchWord: debouncedValue}
        let res = await getRequest("notes", body)
        console.log("searched notes", res)
        setData(data => res.data)
        if (res.data.length <= 0) {
            setNotFoundError(true)
            console.log("not",notFoundError)
        }
        closeNoteSheet()
    }

    const editNote = async (headerValue, contentValue, id) => {
        try {
            const body = {
                title: headerValue,
                text: contentValue,
            }
            let res = await putRequest(`notes?id=${id}`, body)
            console.log("activeTeam", res)
            if (res.statusCode === 200) {
                errorHandling(res, "confirm")
            } else {
                errorHandling(res, "warning")
            }
        } catch (e) {
            errorHandling(res, "error")
        }
        getNotes()
        closeEditSheet()

    }

    const scrollToLastItem = () => {
        flatListRef.current.scrollToIndex({
            animated: true,
            index: data.length - 1,
        });
    };

    const renderItem = ({item}) => <TextNote item={item} onDeleteCallBack={getNotes} openEditSheet={openEditSheet}/>;

    const onRefresh = () => {
        setRefreshing(true);
        setTimeout(() => {
            getNotes()
            setRefreshing(false);
        }, 2000);
    };

    return (
        <>
            <Input placeholder={t("Search")} onChangeText={searchNote} rightIcon={"search-normal-outline"}
                   customStyles={styles.input}/>
            {data.length > 0 ?
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
                </View> :
                <EmptyData notFoundError={notFoundError} />

            }

            <View style={styles.addNote}>
                <Menu>
                    <MenuTrigger>
                        <KhiyabunIcons name={"add-outline"}
                                       size={24}
                                       color={colors.primary}/>
                    </MenuTrigger>
                    <MenuOptions optionsContainerStyle={styles.popUp}>
                        <MenuOption style={styles.popUpOption}
                                    onSelect={() => openNoteSheet(true)}
                        >
                            <KhiyabunIcons name={"lock-outline"}
                                           size={20}
                                           color={colors.onSurfaceHigh}
                            />
                            <Text style={styles.popUpOptionText}>{
                                t("Private")}
                            </Text>
                        </MenuOption>
                        <MenuOption style={styles.popUpOption}
                                    onSelect={() => openNoteSheet(false)}>
                            <KhiyabunIcons name={"unlock-outline"}
                                           size={20}
                                           color={colors.onSurfaceHigh}/>
                            <Text style={styles.popUpOptionText}>
                                {t("Public")}
                            </Text>
                        </MenuOption>
                    </MenuOptions>
                </Menu>
            </View>
            <AddNoteSheet onClose={closeNoteSheet}
                          onChangeCallback={getNotes}
                          isVisible={isVisible}
                          status={status}/>
            <EditNoteSheet
                onClose={closeEditSheet}
                onChangeCallback={editNote}
                headerValue={header}
                id={Id}
                contentValue={content}
                type={editType}
                isVisible={isEditSheetVisible}/>
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
        popUp: {
            borderRadius: 8,
            backgroundColor: colors.surfaceContainerLowest,
            width: "65%"

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

            fontFamily: 'dana-regular',
            color: colors.onSurfaceHigh
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
        emptyData: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            gap: 8
        },
        emptyDataText: {
            color: colors.onSurfaceLow,
            fontSize: 18,
            lineHeight: 26,
        }


    });
};


export default NoteScreen