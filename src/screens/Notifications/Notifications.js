import React, {useEffect, useState} from "react";
import {
    SafeAreaView,
    StatusBar,
    ActivityIndicator,
    FlatList,
    StyleSheet,
    View,
} from "react-native";
import {useTheme} from "@react-navigation/native";
import KhiyabunIcons from "../../components/KhiyabunIcons";
import Card from "../../components/Card";
import {getRequest} from "../../utils/sendRequest";
import {useSelector} from "react-redux";
import Loader from "../../components/Loader";
import CustomText from "../../components/CustomText";

const ITEM_HEIGHT = 10;

const Notifications = () => {
    const styles = useThemedStyles();
    const {colors} = useTheme();
    const userToken = useSelector(state => state.login.token);

    const [latestNotifications, setLatestNotifications] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setIsLoading(true);
        const body = {
            page: currentPage,
            size: 20,
        };

        const res = await getRequest("notifications", body, userToken);
        console.log(res);
        if (res.statusCode === 200) {
            setLatestNotifications(prevNotifications => [...prevNotifications, ...res.data]);
            setHasMore(res.data.length > 0);
        }
        setIsLoading(false);
    };

    const loadMoreData = () => {
        if (!isLoading && hasMore) {
            setCurrentPage(prevPage => prevPage + 1);
        }
    };

    useEffect(() => {
        if (currentPage > 0) {
            fetchData();
        }
    }, [currentPage]);

    const renderDataItem = (item) => {
        const iconName = getIconName(item.type);
        return (
            <View style={styles.itemWrapper} key={item.id}>
                <View style={styles.section}>
                    <KhiyabunIcons
                        name={iconName}
                        size={22}
                        color={item.isRead ? colors.onSurfaceLow : colors.secondary}
                    />
                    <View style={styles.titleWrapper}>
                        <CustomText
                            size={15}
                            color={colors.onSurfaceHigh}
                            lineHeight={24}
                            textAlign={'left'}
                        >
                            {item.title}
                        </CustomText>
                        <CustomText
                            size={11}
                            color={colors.onSurfaceLow}
                            lineHeight={16}
                            textAlign={'left'}
                        >
                            {item.text}
                        </CustomText>
                    </View>
                </View>
            </View>
        );
    };

    const renderDataSection = ({item}) => (
        <Card style={{flex: 1}}>
            <FlatList
                data={item.data}
                keyExtractor={(item, index) => item.id.toString() + index}
                renderItem={({item}) => renderDataItem(item)}
                ItemSeparatorComponent={() => <View style={styles.separator}/>}
                getItemLayout={(data, index) => ({
                    length: ITEM_HEIGHT,
                    offset: ITEM_HEIGHT * index,
                    index,
                })}
            />
        </Card>
    );

    const renderDateItem = ({item}) => (
        <View style={{flex: 1}}>
            <View style={styles.dateSection}>
                <CustomText
                    size={11}
                    color={colors.onSurfaceHigh}
                    lineHeight={16}>
                    {item.date}
                </CustomText>
            </View>
            <View style={{flex: 1}}>
                <FlatList
                    data={[item]}
                    keyExtractor={(item, index) => item.date + index}
                    renderItem={renderDataSection}
                />
            </View>
        </View>
    );

    if (isLoading && !currentPage) {
        return <Loader/>;
    }

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                style={styles.flatList}
                data={latestNotifications}
                keyExtractor={(item, index) => item.date + index}
                renderItem={renderDateItem}
                onEndReached={loadMoreData}
                onEndReachedThreshold={0.5}
                ListFooterComponent={isLoading && latestNotifications.length > 0 ?
                    <ActivityIndicator size="large" color={colors.primary}
                                       style={{height: 20, paddingVertical: 16}}/> : null}
                getItemLayout={(data, index) => ({
                    length: ITEM_HEIGHT,
                    offset: ITEM_HEIGHT * index,
                    index,
                })}
            />
        </SafeAreaView>
    );
};

const getIconName = (type) => {
    switch (type) {
        case "TIME_CLOCK":
            return 'clock-bold';
        case "CHAT":
            return 'chat-bold';
        case "MEETING":
            return 'edit-bold';
        case "TASK":
            return 'pie-chart-bold';
        case "REQUEST":
            return 'messages-3-bold';
        case "NEW_ARTICLE":
            return 'radar-2-bold';
        case "BIRTHDAY":
            return 'cake-bold';
        case "ANNOUNCEMENT":
            return 'gift-bold';
        default:
            return 'edit-bold';
    }
};

const useThemedStyles = () => {
    const {colors} = useTheme();
    return StyleSheet.create({
        container: {
            marginTop: StatusBar.currentHeight || 0,
            height: "100vh",
            paddingBottom: 75,
        },
        flatList: {
            marginHorizontal: 8,
        },
        dateSection: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 16,
        },
        itemWrapper: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingVertical: 8,
            paddingHorizontal: 8,
        },
        section: {
            flexDirection: "row",
            alignItems: "center",
        },
        titleWrapper: {
            marginHorizontal: 12
        },
        separator: {
            height: 1,
            backgroundColor: colors.outlineSurface,
            marginVertical: 8,
        },
    });
};

export default Notifications;

