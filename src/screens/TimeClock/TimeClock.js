import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Dimensions, Text, ScrollView} from 'react-native';
import {LinearProgress} from '@rneui/themed';
import {useTheme} from "@react-navigation/native";
import Button from "../../components/Button";
import CustomModal from "../../components/CustomModal";
import CheckList from "./CheckList";
import {useTranslation} from "react-i18next";
import RestChips from "./RestChips";

const TimeClock = ({setSheetVisible, isOnRestMode, setIsOnRestMode}) => {
    const {t} = useTranslation();
    const [progress, setProgress] = useState(0);
    const [finishWork, setFinishWork] = useState(false);
    const [isFinishWorkModalVisible, setIsFinishWorkModalVisible] = useState(false)
    const styles = useThemedStyles();
    const {colors} = useTheme();
    const openContactMeSheet = () => {
        setSheetVisible(true);
    };
    const toggleFinishWorkModal = () => {
        setIsFinishWorkModalVisible(!isFinishWorkModalVisible);
    }
    const startWork = () => {
        setIsOnRestMode(false);
    }
    const confirmFinishWork = () => {
        setFinishWork(true);
        setIsFinishWorkModalVisible(!isFinishWorkModalVisible);
    }

    useEffect(() => {
        let isSubscribed = true;
        if (progress < 1 && progress !== 0) {
            setTimeout(() => {
                if (isSubscribed) {
                    setProgress(progress + 0.1);
                }
            }, 100);
        }
        return () => {
            isSubscribed = false;
        };
    }, [progress]);

    return (
        <ScrollView>
            <View style={styles.container}>

                <View style={styles.firstSection}>
                    <Text style={styles.Text}>09:11 am</Text>
                    <Text style={styles.totalText}>09:11:53</Text>
                    <Text style={styles.Text}>17:25 pm</Text>
                </View>

                <View style={{marginHorizontal: 8}}>
                    <LinearProgress
                        style={{
                            height: 16,
                            borderRadius: 8,
                            backgroundColor: colors.darkConfirm,
                            // color: "blue"
                        }}
                        value={progress}
                        variant="determinate"
                        color={colors.secondary}
                    />
                </View>

                <View style={[styles.reportWrapper, {marginTop: 16}]}>
                    <View style={styles.leftWrapper}>
                        <View style={styles.reportWorkCircle}></View>
                        <Text style={styles.reportText}>Total work</Text>
                    </View>
                    <Text style={styles.reportWorkText}> 07:12:45 </Text>
                </View>

                <View style={styles.reportWrapper}>
                    <View style={styles.leftWrapper}>
                        <View style={styles.reportBreakCircle}></View>
                        <Text style={styles.reportText}>Total work</Text>
                    </View>
                    <Text style={styles.reportBreakText}> 07:12:45 </Text>
                </View>

                <View style={styles.buttonsWrapper}>

                    <Button label="Finish work" sizeButton={"medium"}
                            style={styles.finishButton}
                            styleText={styles.finishButtonText}
                            onPress={toggleFinishWorkModal}
                            isBorder={true}
                        // onPress={() => {
                        //     setProgress(0.00001);
                        // }}
                    />

                    {isOnRestMode ? <Button label="Start work" sizeButton={"medium"}
                                            style={styles.startButton}
                                            styleText={styles.startButtonText}
                                            onPress={startWork}
                                            isBorder={true}
                            // onPress={() => {
                            //     setProgress(0.00001);
                            // }}
                        /> :
                        <Button label="Take a break" sizeButton={"medium"}
                                style={styles.breakButton}
                                styleText={styles.breakButtonText}
                                onPress={openContactMeSheet}
                                isBorder={true}
                            // onPress={() => {
                            //     setProgress(0);
                            // }}
                        />
                    }

                </View>

                <CustomModal isVisible={isFinishWorkModalVisible} width={90} modalStyle={styles.modalStyle}
                             onClose={toggleFinishWorkModal} modalTitle={"Are you sure your work finished?"}
                             actionCallback={confirmFinishWork}
                             cancelCallback={toggleFinishWorkModal}
                             actionButtonText={"Finish work"}
                             cancelButtonText={"cancel"}
                             titleIcon={"info-circle-bold"} type={"info"}/>
            </View>
            {isOnRestMode ? <RestChips/> : <CheckList/>}
        </ScrollView>
    );
};

const useThemedStyles = () => {
    const {colors} = useTheme();
    return StyleSheet.create({
        container: {
            marginTop: 16,
            marginHorizontal: 6,
            flexDirection: "column",
            backgroundColor: colors.surfaceContainerLowest,
            padding: 16,
            borderRadius: 6,
        },
        firstSection: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginHorizontal: 8,
            marginBottom: -12
        },
        Text: {
            fontFamily: "dana-bold",
            fontWeight: "500",
            fontSize: 14,
            lineHeight: 20,
            textAlign: "left",
            color: colors.onSurface,
        },
        totalText: {
            fontFamily: "dana-bold",
            fontWeight: "500",
            fontSize: 32,
            lineHeight: 54,
            textAlign: "center",
            color: colors.darkPrimary
        },
        reportWrapper: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginVertical: 3,
            marginHorizontal: 8,
        },
        leftWrapper: {
            flexDirection: "row",
            alignItems: "center",
        },
        reportText: {
            fontFamily: "dana-regular",
            fontWeight: "400",
            fontSize: 16,
            lineHeight: 24,
            textAlign: "left",
            color: colors.onSurface,
        },
        reportWorkCircle: {
            width: 12,
            height: 12,
            marginRight: 6,
            backgroundColor: colors.darkConfirm,
            borderRadius: 20
        },
        reportWorkText: {
            fontFamily: "dana-bold",
            fontWeight: "500",
            fontSize: 16,
            lineHeight: 24,
            textAlign: "center",
            color: colors.darkConfirm

        },
        reportBreakText: {
            fontFamily: "dana-bold",
            fontWeight: "500",
            fontSize: 16,
            lineHeight: 24,
            textAlign: "center",
            color: colors.secondary,
        },
        reportBreakCircle: {
            width: 12,
            height: 12,
            marginRight: 6,
            backgroundColor: colors.secondary,
            borderRadius: 20
        },
        buttonsWrapper: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-around",
            width: "100%",
            marginTop: 6,
        },
        finishButton: {
            width: Dimensions.get('window').width / 2 - 35,
            backgroundColor: colors.errorContainer,
            borderColor: colors.errorOutline,
            borderRadius: 8,
            justifyContent: "center",
            alignItems: "center",
        },
        startButton: {
            width: Dimensions.get('window').width / 2 - 35,
            backgroundColor: colors.confirmContainer,
            borderColor: colors.confirmOutline,
            borderRadius: 8,
            justifyContent: "center",
            alignItems: "center",
        },
        breakButton: {
            width: Dimensions.get('window').width / 2 - 35,
            backgroundColor: colors.secondaryContainer,
            borderColor: colors.secondaryOutline,
            borderRadius: 8,
            justifyContent: "center",
            alignItems: "center",

        },
        finishButtonText: {
            fontFamily: "dana-bold",
            fontWeight: "500",
            fontSize: 14,
            lineHeight: 24,
            textAlign: "center",
            color: colors.darkError,
        },
        startButtonText: {
            fontFamily: "dana-bold",
            fontWeight: "500",
            fontSize: 14,
            lineHeight: 24,
            textAlign: "center",
            color: colors.darkConfirm,
        },
        breakButtonText: {
            fontFamily: "dana-bold",
            fontWeight: "500",
            fontSize: 14,
            lineHeight: 24,
            textAlign: "center",
            color: colors.darkSecondary
        },
        logoutModalText: {
            fontSize: 16,
            lineHeight: 24,
            fontFamily: "dana-bold",
            color: colors.onSurfaceHigh
        },
    });
};

export default TimeClock;