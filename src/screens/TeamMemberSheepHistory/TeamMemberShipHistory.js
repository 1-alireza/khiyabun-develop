import { useTranslation } from "react-i18next";
import { useTheme } from "@react-navigation/native";
import { StyleSheet, FlatList, View, RefreshControl, Pressable } from "react-native";
import Card from "../../components/Card";
import React, { useEffect, useState } from "react";
import Team from "./Team";
import NoTeam from "../Team/NoTeam";
import { getRequest } from "../../utils/sendRequest";
import { useSelector } from "react-redux";


function TeamsScreen() {
    const { t, i18n } = useTranslation();
    const { colors } = useTheme()
    const userToken = useSelector(state => state.login.token);
    const styles = useThemedStyles(colors)
    const [memberShipHistory, setMemberShipHistory] = useState([])
    useEffect(() => {
        getMemberShipHistory()
    }, []);

    const getMemberShipHistory = async () => {
        let res = await getRequest("profile/membership_history", {}, userToken)
        console.log("parssaaaa", res.data)
        setMemberShipHistory(memberShipHistory => res.data)
        console.log(memberShipHistory)
    }

    const [refreshing, setRefreshing] = useState(false);


    const onRefresh = () => {
        setRefreshing(true);
        setTimeout(() => {
            getMemberShipHistory()
            setRefreshing(false);
        }, 2000);
    };
    const renderItem = ({ item }) => <Team item={item} />;

    const isEmpty = memberShipHistory.length === 0;
    return (
        <>
            <View style={styles.main}
            >
                <Card>
                    <FlatList
                        data={memberShipHistory}
                        renderItem={renderItem}
                        keyExtractor={(item, i) => i}
                        contentContainerStyle={isEmpty ? styles.emptyFlatList : styles.flatList}
                        ItemSeparatorComponent={() => <View style={styles.separator} />}
                        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}
                            colors={[colors.primary]}
                            progressBackgroundColor={colors.surfaceContainerLowest} />}
                        ListEmptyComponent={NoTeam}
                    />
                </Card>
            </View>

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
        addTeam: {
            height: 56,
            width: 56,
            position: "absolute",
            bottom: 10,
            left: 10,
            backgroundColor: colors.surfaceContainerLowest,
            borderRadius: 100,
            justifyContent: "center",
            alignItems: "center"

        },
        emptyFlatList: {
            minHeight: 600,
            justifyContent: "center",
            alignItems: "center"
        },

    });
};

export default TeamsScreen