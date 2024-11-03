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
import {useSelector} from "react-redux";
import gStyles from "../../global-styles/GlobalStyles";
import CustomText from "../../components/CustomText";
import CustomModal from "../../components/CustomModal";
import {CheckBox} from "@rneui/themed";

const addNoteSheet = ({isVisible, onClose, onChangeCallback, status}) => {
    const userToken = useSelector(state => state.login.token);
    const {t, i18n} = useTranslation();
    const [checked, setChecked] = useState(false);
    const {colors} = useTheme();
    const styles = useThemedStyles(colors)
    const [index, setIndex] = useState(0);
    const [val, setVal] = useState('');
    const [voiceData, setVoiceData] = useState({});
    const [titleVal, setTitleVal] = useState('');
    const [noteType, setNoteType] = useState('text');
    const [isWarningModal, setIsWarningModal] = useState(false)
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
                return <AudioRecorder onChangeCallback={onChangeCallback} type={"add"}
                                      onClose={onClose} status={status} />;
            default:
                return null;
        }
    };

    const toggleWarningModal = () => setIsWarningModal(!isWarningModal);

    const handleTabChange = (index) => {
        setIndex(index);

        if (index === 1) {
            setNoteType("voice")
        } else {
            // console.log("DFf")
            setNoteType("text")
        }
        // console.log('Current tab index:', index);
        // console.log('Current type:', noteType);
        // You can add any additional logic you wish to execute when the tab changes
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

    const addNote = async (type) => {
        let body = {
            title: titleValRef.current,
            text: valRef.current,
            type: "TEXT",
            isPrivate: status
        }
        try {
            console.log(body)
            let res = await postRequest("notes", body, userToken)
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
        toggleWarningModal()
    }

    const getInputValue = (value) => {
        valRef.current = value;
    }
    const getTitleInputValue = (value) => {
        titleValRef.current = value;
    }

    const toggleCheckbox = () => setChecked(!checked);


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
                       placeholder={t("note_request")}
                />
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
                            onPress={() => addNote("")}
                            isBorder={true}
                            borderColor={colors.primaryOutline}/>
                </View>
            </View>
        )
    }


    return (

        <>
            <Sheet isOpen={isVisible}
                   contentWrapperStyle={styles.wrapper}
                   onCloseCallBack={() => setIndex(0)}
                   fitContent={true} onClose={onClose}
                   snapPoint={500}>
                <View style={styles.sheetHeader}>
                    <CustomText lineHeight={16} weight={"bold"} color={colors.onSurface}>{t("new_note")}</CustomText>
                </View>
                <TabView
                    navigationState={{index, routes}}
                    renderScene={renderScene}
                    onIndexChange={handleTabChange}
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
            <CustomModal type={"warning"}
                         isVisible={isWarningModal}
                         hasDoubleBtn={false}
                         onClose={toggleWarningModal}
                         width={80}
                         disabled={!checked}
                         actionButtonText={t("confirm")}
                         modalBody={<PrivateModal toggleCheckbox={toggleCheckbox} checked={checked}/>}
                         modalTitle={t("status_warning")}
                         actionCallback={toggleWarningModal}
            />
        </>

    )

}
const PrivateModal = ({toggleCheckbox, checked}) => {
    const {t, i18n} = useTranslation();
    const {colors} = useTheme();
    const styles = useThemedStyles(colors)


    return (
        <View>
            <CustomText size={14} lineHeight={20} textAlign={"justify"} color={colors.onSurfaceLow}>
                {t("status_warning")}
            </CustomText>
            <View style={styles.deleteWrapper}>
                <CheckBox
                    iconRight={false}
                    size={20}
                    checked={checked}
                    onPress={toggleCheckbox}
                    iconType="material-community"
                    checkedIcon="checkbox-marked"
                    uncheckedIcon="checkbox-blank-outline"
                    title={t("do_not_show")}
                    checkedColor={colors.primary}
                    containerStyle={styles.checkBox}
                    labelStyle={styles.deleteText}
                    fontFamily={gStyles.fontMain.fontFamily}
                />

            </View>
        </View>
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
            fontFamily: gStyles.fontMain.fontFamily,
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
            fontFamily: gStyles.fontMain.fontFamily,
            color: colors.darkPrimary
        },
        sheetHeader: {
            backgroundColor: colors.surfaceContainerLowest,
            marginHorizontal: 16,
            paddingTop:20,
            marginVertical: 8,
            justifyContent: "center",
            alignItems: "center"
        },
        sheetHeaderText: {
            paddingHorizontal: 16,
            color: colors.onSurface,
            fontFamily: gStyles.fontBold.fontFamily,
            lineHeight: 24
        },
        textNoteWrapper: {
            paddingVertical: 16,
            paddingHorizontal: 8,
            width: "100%",
            height: "100%",
            backgroundColor: colors.surfaceContainerLowest
        },
        secondaryText: {
            fontSize: 14,
            lineHeight: 20,
            color: colors.onSurfaceLow,
            fontFamily: gStyles.fontMain.fontFamily,
            textAlign: "justify"
        },
        checkBox: {
            flex: 1,
            backgroundColor: "transparent",
            borderWidth: 0,
            padding: 0,
            margin: 0,
            marginRight: 0,
            marginLeft: 0,
            marginBottom: 0
        },
        deleteText: {
            fontSize: 14,
            lineHeight: 24,
            width: "90%",
            color: colors.onSurfaceHigh,
            fontFamily: gStyles.fontMain.fontFamily,
            textAlign: "justify"
        },
        deleteWrapper: {
            flexDirection: "row",
            alignItems: "stretch",
            justifyContent: "flex-end",
            marginVertical: 10,
            paddingRight: 10
        },

    });

};


export default addNoteSheet;