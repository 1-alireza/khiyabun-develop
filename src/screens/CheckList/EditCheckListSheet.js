import {useTranslation} from "react-i18next";
import {useTheme} from "@react-navigation/native";
import {Pressable, StyleSheet, Text, View} from "react-native";
import Sheet from "../../components/Sheet";
import Button from "../../components/Button";
import React, {useState, useEffect} from "react";
import Input from "../../components/Input";
import KhiyabunIcons from "../../components/KhiyabunIcons";
import {color} from "react-native-elements/dist/helpers";
import DraggableFlatList from "react-native-draggable-flatlist";
import DraggableCheckbox from "./DraggableCheckbox";
import {putRequest} from "../../utils/sendRequest";
import {errorHandling} from "../../utils/errorHandling";


const EditCheckListSheet = ({isVisible, onClose, onChangeCallback, item}) => {
    const {t, i18n} = useTranslation();
    const {colors} = useTheme();
    const styles = useThemedStyles(colors)
    const [disabled, setDisabled] = useState(true);
    const [isActive, setIsActive] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [isAddingDisabled, setIsAddingDisabled] = useState(true);
    const [checkList, setCheckLists] = useState(item.items);
    const [titleVal, setTitleVal] = useState(item.title);


    useEffect(() => {
        setCheckLists(item.items);
        setTitleVal(item.title);
    }, [item]);
    const handleAddInput = () => {
        setIsActive(true)
    };

    const getTitleInputValue = (value) => {
        setTitleVal(value)
        value === '' ? setDisabled(true) : setDisabled(false)

    }

    const addChecklist = async () => {
        try {
            const body = {
                title: titleVal,
                items: checkList,
            }
            let res = await putRequest(`checklists?id=${item.objectId}`, body)
            console.log("checklist edited", res)
            if (res.statusCode === 200) {
                errorHandling(res, "confirm")
            } else {
                errorHandling(res, "warning")
            }
        } catch (e) {
            errorHandling(res, "error")
        }
        onChangeCallback()
        setIsActive(false)
        setCheckLists([])
        setTitleVal('')
        onClose()
    }

    const handleGetCheckboxData = (value) => {
        setInputValue(value)
        value === '' ? setIsAddingDisabled(true) : setIsAddingDisabled(false)
    }

    const handleAddCheckbox = () => {
        let id = Math.floor(Math.random() * (100000 - 1 + 1)) + 1;
        const newCheckbox = {
            id: id,
            checked: false,
            text: inputValue
        }
        const updatedCheckLists = [...checkList, newCheckbox]
        setCheckLists(updatedCheckLists)
        setIsAddingDisabled(true)
        setInputValue('')
    }

    const handleCancel = () => {
        setInputValue('')
        setTitleVal('')
        setIsAddingDisabled(true)
        setIsActive(false)
        setCheckLists([])
        onClose()
    }


    const handleCheckboxChange = (id) => {
        const updatedCheckboxes = checkList.map((checkboxItem) =>
            checkboxItem.id === id ? {...checkboxItem, done: !checkboxItem.done} : checkboxItem)
        setCheckLists(updatedCheckboxes);
    };


    const deleteItem = (id) => {
        const filteredData = checkList.filter(item => item.id !== id);
        setCheckLists(filteredData)
    }

    const renderCheckBox = ({item, drag, isActive}) => <DraggableCheckbox item={item}
                                                                          checkHandler={handleCheckboxChange}
                                                                          deleteCallback={deleteItem} drag={drag}
                                                                          isActive={isActive}
                                                                          customStyle={styles.checkboxContainer}/>


    return (
        <Sheet isOpen={isVisible} scrollable={true} contentWrapperStyle={styles.wrapper}
               fitContent={true} onClose={onClose}
               snapPoint={500}>
            <View style={styles.sheetHeader}>
                <Text style={styles.sheetHeaderText}>{t("Add checklist")}</Text>
            </View>
            <View style={styles.sheetBody}>
                <Input label={t("checkList_title")} value={titleVal} onChangeText={getTitleInputValue}
                       placeholder={"Attach a title to your checklist"}/>
                {isActive && (
                    <View style={styles.addCheckListWrapper}>
                        <Input
                            onChangeText={handleGetCheckboxData} value={inputValue}
                            customStyles={{backgroundColor: "red", width: "90%"}} onEndEditing={handleAddCheckbox}
                            placeholder={"Attach a title to your checklist"}/>

                        <Pressable disabled={isAddingDisabled} onPress={handleAddCheckbox}>
                            <KhiyabunIcons name={"tick-outline"} size={30}
                                           color={isAddingDisabled ? colors.onSurfaceLowest : colors.info}/>
                        </Pressable>

                    </View>
                )

                }
                {!isActive && (
                    <Pressable style={styles.addCheckList} onPress={handleAddInput}>
                        <Text style={styles.addCheckListText}>
                            {t("add_item")}
                        </Text>
                        <KhiyabunIcons name={"add-outline"} color={color.darkPrimary}/>
                    </Pressable>
                )}
                <DraggableFlatList
                    data={checkList}
                    renderItem={renderCheckBox}
                    dragHitSlop={
                        {
                            top: 0,
                            right: 0,
                            left: 0,
                            bottom: 0,
                        }
                    }
                    keyExtractor={(item) => `draggable-item-${item.id}`}
                    onDragEnd={({data: updatedData}) => setCheckLists(updatedData)}
                />


                <View style={styles.sheetOptions}>
                    <Button label={t("cancel")} sizeButton={"small"} style={styles.cancelButton} width={30}
                            styleText={styles.cancelButtonText} onPress={handleCancel}/>
                    <Button label={t("save")} sizeButton={"medium"}
                            style={styles.selectButton}
                            styleText={styles.selectButtonText} width={70} onPress={addChecklist}
                            isBorder={true} borderColor={colors.primaryOutline}/>
                </View>
            </View>
        </Sheet>


    )

}

const useThemedStyles = (colors) => {
    return StyleSheet.create({
        sheetBody: {
            paddingBottom: 16,
            gap: 8,
            width: "100%",
            height: 350,
            marginBottom: 40,
        },
        sheetOptions: {
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
            position: "absolute",
            bottom: -65,
            paddingVertical: 10,
            marginBottom: 20,
            width: "100%",
            backgroundColor: colors.surfaceContainerLowest
        },
        wrapper: {
            padding: 0,
            paddingHorizontal: 10,
            paddingVertical: 5
        },
        selectButton: {
            borderRadius: 8,
            backgroundColor: colors.primaryContainer,
            justifyContent: "center",
            alignItems: "center"
        },
        selectButtonText: {
            fontWeight: "500",
            fontSize: 16,
            lineHeight: 24,
            fontFamily: "dana-regular",
            color: colors.darkPrimary
        },
        cancelButton: {
            borderRadius: 8,
            backgroundColor: colors.surfaceContainerLowest,
            justifyContent: "center",
            alignItems: "center"
        },
        cancelButtonText: {
            fontWeight: "500",
            fontSize: 16,
            lineHeight: 24,
            fontFamily: "dana-regular",
            color: colors.darkPrimary
        },
        sheetHeader: {
            backgroundColor: colors.surfaceContainerLowest,
            marginHorizontal: 16,
            marginVertical: 8,
            justifyContent: "center",
            alignItems: "center"
        },
        sheetHeaderText: {
            paddingHorizontal: 16,
            color: colors.onSurface,
            fontFamily: "dana-bold",
            lineHeight: 24
        },
        addCheckListText: {
            fontSize: 14,
            lineHeight: 20,
            fontFamily: 'dana-regular',
            color: colors.darkPrimary
        },
        addCheckList: {
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
            gap: 8,
            paddingLeft: 8
        },
        addCheckListWrapper: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center"
        },
        addIcons: {
            flexDirection: "row",
            justifyContent: "flex-end",
            alignItems: "center",
            width: "15%"
        },
        checkboxContainer: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingRight: 10,
            paddingLeft: 0
        },
        deleteIcon: {
            justifyContent: "center",
            alignItems: "center"
        }
    });
};


export default EditCheckListSheet;