import {useTranslation} from "react-i18next";
import {useTheme} from "@react-navigation/native";
import {Dimensions, StyleSheet, Text, View} from "react-native";
import Sheet from "../../components/Sheet";
import Button from "../../components/Button";
import React, {useRef, useState} from "react";
import Input from "../../components/Input";
import {AudioRecorder} from "./AudioRecorder";
import {TabView, TabBar} from 'react-native-tab-view';
import {postRequest} from "../../utils/sendRequest";
import {errorHandling} from "../../utils/errorHandling";

const addNoteSheet = ({isVisible, onClose, onChangeCallback,status}) => {
    const {t, i18n} = useTranslation();
    const {colors} = useTheme();
    const styles = useThemedStyles(colors)
    const [index, setIndex] = useState(0);
    const valRef = useRef('');
    const titleValRef = useRef('');
    const [routes] = useState([
        {key: 'text', title: t("note_tab")}, // Localize as needed
        {key: 'voice', title: t("voice_tab")},
    ]);
    const renderScene = ({route}) => {
        switch (route.key) {
            case 'text':
                return <TextTab/>;
            case 'voice':
                return <AudioRecorder onChangeCallback={getVoiceNoteData} type={"add"}
                                      onClose={onClose}/>;
            default:
                return null;
        }
    };


    const renderTabBar = props => (
        <TabBar
            {...props}
            style={{backgroundColor: colors.surfaceContainerLowest}}
            indicatorStyle={{backgroundColor: colors.primary}}
            labelStyle={{color: colors.onSurface}}
            renderLabel={({route, focused}) => (
                <Text style={{
                    color: focused ? colors.primary : colors.onSurface// Active/inactive label color
                }}>
                    {route.title}
                </Text>
            )}
        />
    );

    const addNote = async () => {

        try {
            const body = {
                title: titleValRef.current,
                text: valRef.current,
                type: "TEXT",
                isPrivate:status
            }
            console.log(body)
            let res = await postRequest("notes", body)
            console.log("added Text Note", res)
            if (res.statusCode === 200) {
                errorHandling(res, "confirm")

            } else {
                console.log("warning")
                errorHandling(res, "warning")
            }
        } catch (e) {
            errorHandling(res, "error")
        }
        onChangeCallback()
    }

    const getInputValue = (value) => {
        valRef.current = value;
    }
    const getTitleInputValue = (value) => {
        titleValRef.current = value;
    }

    const getVoiceNoteData = (uri, title) => {
        setVal(uri)
        setTitleVal(title)
        onChangeCallback(uri, title, "audio")
    }


    function TextTab() {
        return (
            <View style={styles.textNoteWrapper}>
                <Input label={t("note_title")}
                       onChangeText={getTitleInputValue}
                       customStyles={{marginBottom: 20}}
                       placeholder={t("attach_note")}
                />
                <Input label={t("note_body")}
                       onChangeText={getInputValue}
                       multiline={true}
                       linesNumber={20}
                       customStyles={{height: 150}}
                       placeholder={t("note_request")}/>
                <View style={styles.sheetOptions}>
                    <Button label={t("cancel")}
                            sizeButton={"small"}
                            style={styles.cancelButton}
                            width={30}
                            styleText={styles.cancelButtonText}
                            onPress={onClose}/>
                    <Button label={t("save")}
                            disabled={false}
                            sizeButton={"medium"}
                            style={styles.selectButton}
                            styleText={styles.selectButtonText}
                            width={65}
                            onPress={addNote}
                            isBorder={true}
                            borderColor={colors.primaryOutline}/>
                </View>
            </View>
        )
    }


    return (
        <Sheet isOpen={isVisible}
               contentWrapperStyle={styles.wrapper}
               onCloseCallBack={() => setIndex(0)}
               fitContent={true} onClose={onClose}
               snapPoint={500}>
            <View style={styles.sheetHeader}>
                <Text style={styles.sheetHeaderText}>{t("new_note")}</Text>
            </View>
            <TabView
                navigationState={{index, routes}}
                renderScene={renderScene}
                onIndexChange={setIndex}
                style={{
                    height: 400,
                }}
                sceneContainerStyle={{
                    height: "100%"
                }}
                initialLayout={{width: Dimensions.get('window').width}} // Use the full screen width
                renderTabBar={renderTabBar}
            />
        </Sheet>


    )

}

const useThemedStyles = (colors) => {
    return StyleSheet.create({
        sheetOptions: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            bottom: -10,
            width: "100%",
            backgroundColor: colors.surfaceContainerLowest,

        },
        wrapper: {
            padding: 0,
            paddingLeft: 10
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
        textNoteWrapper: {
            paddingVertical: 16,
            paddingHorizontal: 8,
            width: "100%",
            height: "100%",
            backgroundColor: colors.surfaceContainerLowest
        }

    });

};


export default addNoteSheet;