import {useTheme} from "@react-navigation/native";
import {FlatList, RefreshControl, StyleSheet, View, Text, I18nManager} from "react-native";
import React, {useEffect, useRef, useState} from "react";
import Request from "./Request";
import Card from "../../components/Card";
import RequestDetailSheet from "./RequestDetailSheet";
import Button from "../../components/Button";
import {useTranslation} from "react-i18next";
import AddRequestSheet from "./AddRequestSheet";
import AddTimeOffRequestSheet from "./AddTimeOffRequestSheet";
import AddBusinessTripRequestSheet from "./AddBusinessTripRequestSheet";
import AddCommutingRequestSheet from "./AddCommutingRequestSheet";
import CustomModal from "../../components/CustomModal";
import {getRequest} from "../../utils/sendRequest";
import {useSelector} from "react-redux";
import EmptyData from "../../components/EmptyData";
import gStyles from "../../global-styles/GlobalStyles";

function RequestScreen() {
    const {t, i18n} = useTranslation();
    const {colors} = useTheme();
    const styles = useThemedStyles(colors)
    const [refreshing, setRefreshing] = useState(false);
    const flatListRef = useRef(null);
    const [item, setItem] = useState(null)
    const [isVisible, setIsVisible] = useState(false)
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [isAddRequestSheetVisible, setIsAddRequestSheetVisible] = useState(false)
    const [isAddTimeOffRequestSheetVisible, setIsAddTimeOffRequestSheetVisible] = useState(false)
    const [isAddCommutingRequestSheetVisible, setIsAddCommutingRequestSheetVisible] = useState(false)
    const [isAddBusinessTripRequestSheetVisible, setIsAddBusinessTripRequestSheetVisible] = useState(false)
    const [data, setData] = useState([])
    const userToken = useSelector(state => state.login.token);


    useEffect(() => {
        getRequests()
    }, []);


    const openSheet = (item) => {
        setItem(item)
        setIsVisible(true);
    };

    const closeSheet = () => {
        setIsVisible(false);
    };

    const openAddSheet = (item) => {
        setIsAddRequestSheetVisible(true)
    }

    const closeAddSheet = (item) => {
        setIsAddRequestSheetVisible(false)
    }

    const closeTimeOffRequestSheet = () => {
        getRequest()
        setIsAddTimeOffRequestSheetVisible(false)
    }

    const closeBusinessRequestSheet = () => {
        getRequest()
        setIsAddBusinessTripRequestSheetVisible(false)
    }

    const closeCommutingRequestSheet = () => {
        setIsAddCommutingRequestSheetVisible(false)

    }

    const getRequests = async () => {
        let body = {
            page: 0,
            size: 10,
            sortOrder: "desc"
        }
        let res = await getRequest("work_request", body, userToken)
        console.log("request", res)
        setData(data => res.data)
        if (data?.length > 0) {
            scrollToLastItem()
        }
        setIsAddBusinessTripRequestSheetVisible(false)
        setIsAddTimeOffRequestSheetVisible(false)
        setIsAddCommutingRequestSheetVisible(false)
    }

    const closeModal = () => {
        setIsModalVisible(false)
    }

    const ConfirmRequest = () => {
        return (
            <Text>
                Your absence request was sent for your managers approval
            </Text>
        )
    }

    const getRequestType = (requestType) => {

        if (requestType === "businessTrip") {
            setIsAddBusinessTripRequestSheetVisible(true)
        }
        if (requestType === "commuting") {
            setIsAddCommutingRequestSheetVisible(true)
        }
        if (requestType === "timeOff") {
            setIsAddTimeOffRequestSheetVisible(true)
        }
        setIsAddRequestSheetVisible(false)
    }

    const scrollToLastItem = () => {
        flatListRef.current.scrollToIndex({
            animated: true,
            index: data.length - 1,
        });
    };

    const onRefresh = () => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    };
    const renderItem = ({item}) => <Request item={item} onPress={openSheet}/>;


    return (
        <>
            {data.length > 0 ? (
                <View style={styles.main}
                >
                    <Card customStyle={styles.flatListWrapper}>
                        <FlatList
                            data={data}
                            renderItem={renderItem}
                            ref={flatListRef}
                            keyExtractor={(item) => item.id}
                            ItemSeparatorComponent={() => <View style={styles.separator}/>}
                            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}
                                                            colors={[colors.primary]}
                                                            progressBackgroundColor={colors.surfaceContainerLowest}/>}
                        />
                    </Card>
                </View>) : <EmptyData/>}
            <Button label={t("add_request")} sizeButton={"medium"} style={styles.selectButton}
                    styleText={styles.selectButtonText} width={95}
                    isBorder={true} borderColor={colors.primaryOutline} onPress={openAddSheet}/>
            <RequestDetailSheet isVisible={isVisible} onClose={closeSheet} item={item} callBack={getRequests}/>
            <AddRequestSheet isVisible={isAddRequestSheetVisible} onClose={closeAddSheet} Callback={getRequestType}/>
            <AddTimeOffRequestSheet isVisible={isAddTimeOffRequestSheetVisible} callBack={getRequests}
                                    onClose={closeTimeOffRequestSheet}/>
            <AddBusinessTripRequestSheet isVisible={isAddBusinessTripRequestSheetVisible}
                                         callBack={getRequests} onClose={closeBusinessRequestSheet}/>
            <AddCommutingRequestSheet isVisible={isAddCommutingRequestSheetVisible}
                                      callBack={getRequests} onClose={closeCommutingRequestSheet}/>
            <CustomModal type={"warning"} isVisible={isModalVisible} titleIcon={"tick-circle-bold"} width={90}
                         hasCloseIcon={true} hasDoubleBtn={false} actionButtonText={t("I'm-done")}
                         modalTitle={t("absence-request")} modalBody={<ConfirmRequest/>} actionCallback={closeModal}
                         onClose={closeModal}/>
        </>
    )
}

const useThemedStyles = (colors) => {
    return StyleSheet.create({
        flatListWrapper: {
            height: "100vh",
            paddingBottom: 75,
        }, main: {
            paddingHorizontal: 16,
            paddingBottom: 16,
        },
        separator: {
            height: 1,
            backgroundColor: colors.outlineSurface,
        },
        selectButton: {
            borderRadius: 8,
            backgroundColor: colors.primaryContainer,
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            bottom: 10,
            left: 0,
            marginLeft: 10
        },
        selectButtonText: {
            fontWeight: "500",
            fontSize: 16,
            lineHeight: 24,
            color: colors.darkPrimary
        },
    });
};


export default RequestScreen





