import {useTheme} from "@react-navigation/native";
import {FlatList, RefreshControl, StyleSheet, View,Text} from "react-native";
import React, {useRef, useState} from "react";
import Request from "./Request";
import Card from "../../components/Card";
import RequestDetailSheet from "./RequestDetailSheet";
import Button from "../../components/Button";
import {useTranslation} from "react-i18next";
import AddRequestSheet from "./AddRequestSheet";
import AddTimeOffRequestSheet from "./AddTimeOffRequestSheet";
import AddBusinessTripRequestSheet from "./AddBusinessTripRequestSheet";
import AddCommutingRequestSheet from "./AddCommutingRequestSheet";
import CustomDropdown from "../../components/CustomDropdown";
import CustomModal from "../../components/CustomModal";

function RequestScreen() {
    const {t, i18n} = useTranslation();
    const {colors} = useTheme();
    const styles = useThemedStyles(colors)
    const [refreshing, setRefreshing] = useState(false);
    const flatListRef = useRef(null);
    const [item, setItem] = useState({})
    const [isVisible, setIsVisible] = useState(false)
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [isAddRequestSheetVisible, setIsAddRequestSheetVisible] = useState(false)
    const [isAddTimeOffRequestSheetVisible, setIsAddTimeOffRequestSheetVisible] = useState(false)
    const [isAddCommutingRequestSheetVisible, setIsAddCommutingRequestSheetVisible] = useState(false)
    const [isAddBusinessTripRequestSheetVisible, setIsAddBusinessTripRequestSheetVisible] = useState(false)
    const [data, setData] = useState([
        {
            id: 1,
            type: "Time off",
            content: "Sick leave",
            status: "pending",
            date: "10/13/2023 ",
            totalTimeRequested: "4 hours",
            time: "Full day (8 hrs)",
            ApprovedBy: "Maryam naeimi"
        },
        {
            id: 2,
            content: "Added errand ",
            type: "Commuting",
            status: "pending",
            date: "15/10 ",
            totalTimeRequested: "6 hours",
            time: "from 08:39 am - 09:39 pm - 11:30 AM (2:30 hrs)",
            ApprovedBy: "meysam naeimi"
        },
        {
            id: 3,
            type: "Time off",
            content: "unpaid leave",
            status: "approved",
            date: "10/13/2023",
            totalTimeRequested: "4 days",
            time: "Full day (8 hrs)",
            ApprovedBy: "parsa nazemi"

        },
        {
            id: 4,
            type: "Business trip",
            content: "foreign",
            status: "declined",
            date: "10/13/2023",
            totalTimeRequested: "1:30 hours",
            time: " sep 30 at 10:07 am",
            locations: ["Kish", "Tehran"]
        },
        {
            id: 5,
            content: " Edited errand ",
            type: "Commuting",
            status: "pending",
            date: "10/13/2023",
            totalTimeRequested: "0:30 hours",
            time: "3 days",
            ApprovedBy: "hashem"

        }
    ])

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
        setIsAddTimeOffRequestSheetVisible(false)
    }
    const closeBusinessRequestSheet = () => {
        setIsAddBusinessTripRequestSheetVisible(false)
    }
    const closeCommutingRequestSheet = () => {
        setIsAddCommutingRequestSheetVisible(false)
    }
    const sheetCallback=(requestType)=>{
        setIsModalVisible(true)
        if (requestType === "businessTrip") {
            setIsAddBusinessTripRequestSheetVisible(false)
        }
        if (requestType === "commuting") {
            setIsAddCommutingRequestSheetVisible(false)
        }
        if (requestType === "timeOff") {
            setIsAddTimeOffRequestSheetVisible(false)
        }
        const item={
            id: 6,
            content: "Added errand",
            type: requestType,
            status: "pending",
            date: "15/11 ",
            totalTimeRequested: "6 hours",
            time: "from 08:39 am - 09:39 pm - 11:30 AM (2:30 hrs)",
            ApprovedBy: "meysam naeimi"
        }
        setData([...data, item])
    }
    const closeModal=()=>{
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
            <View style={styles.main}
            >

                <Card>
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
            </View>
            <Button label={t("add_request")} sizeButton={"medium"} style={styles.selectButton}
                    styleText={styles.selectButtonText} width={95}
                    isBorder={true} borderColor={colors.primaryOutline} onPress={openAddSheet}/>
            <RequestDetailSheet isVisible={isVisible} onClose={closeSheet} item={item}/>
            <AddRequestSheet isVisible={isAddRequestSheetVisible} onClose={closeAddSheet} Callback={getRequestType}/>
            <AddTimeOffRequestSheet isVisible={isAddTimeOffRequestSheetVisible} callBack={sheetCallback} onClose={closeTimeOffRequestSheet}/>
            <AddBusinessTripRequestSheet isVisible={isAddBusinessTripRequestSheetVisible}
                                        callBack={sheetCallback} onClose={closeBusinessRequestSheet}/>
            <AddCommutingRequestSheet isVisible={isAddCommutingRequestSheetVisible}
                                     callBack={sheetCallback} onClose={closeCommutingRequestSheet}/>
            <CustomModal type={"warning"} isVisible={isModalVisible} titleIcon={"tick-circle-bold"} width={90}
                         hasCloseIcon={true} hasDoubleBtn={false} actionButtonText={t("I'm-done")}
                         modalTitle={t("absence-request")} modalBody={<ConfirmRequest/>} actionCallback={closeModal} onClose={closeModal}/>
        </>
    )
}

const useThemedStyles = (colors) => {
    return StyleSheet.create({
        main: {
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
            fontFamily: "dana-regular",
            color: colors.darkPrimary
        },
    });
};


export default RequestScreen