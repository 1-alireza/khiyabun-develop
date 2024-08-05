import {useTranslation} from "react-i18next";
import {useTheme} from "@react-navigation/native";
import {StyleSheet, FlatList, View, RefreshControl, Pressable, Text} from "react-native";
import Card from "../../components/Card";
import React, {useEffect, useState} from "react";
import TeamUser from "./TeamUser";
import KhiyabunIcons from "../../components/KhiyabunIcons";
import AddTeamSheet from "./AddTeamSheet";
import {getRequest} from "../../utils/sendRequest";
import EmptyData from "../../components/EmptyData";

const avatar = require("../../../assets/img/3d_avatar_21.png");


function TeamsScreen() {
    const {t, i18n} = useTranslation();
    const {colors} = useTheme();
    const styles = useThemedStyles(colors)
    const [isVisible, setIsVisible] = useState(false)
    const [teamsData, setTeamData] = useState([])
    const [refreshing, setRefreshing] = useState(false);


    useEffect(() => {
        getTeams()
    }, []);

    const getTeams = async () => {
        let res = await getRequest("profile/current_teams")
        console.log("user Teams", res.data)
        setTeamData(teamsData => res.data)
        closeSheet()
    }

    const openSheet = () => setIsVisible(true)
    const closeSheet = () => setIsVisible(false)
    const onRefresh = () => {
        setRefreshing(true);
        getTeams()
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    };
    const renderItem = ({item}) => <TeamUser onDeleteCallBack={getTeams} item={item}/>;

    return (
        <>
            {teamsData.length > 0 ?
                <View style={styles.main}
                >
                    <Card>
                        <FlatList
                            data={teamsData}
                            renderItem={renderItem}
                            keyExtractor={(item) => item.id}
                            contentContainerStyle={styles.flatList}
                            // style={styles.flatList}
                            ItemSeparatorComponent={() => <View style={styles.separator}/>}
                            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}
                                                            colors={[colors.primary]}
                                                            progressBackgroundColor={colors.surfaceContainerLowest}/>}
                        />
                    </Card>
                </View> :
               <EmptyData hasSearch={false}/>

            }

            <Pressable style={styles.addTeam} onPress={openSheet}>
                <KhiyabunIcons name={"add-outline"} size={24} color={colors.primary}/>
            </Pressable>
            <AddTeamSheet isVisible={isVisible} onClose={getTeams}/>
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

export default TeamsScreen