import React, {useState} from 'react';
import {FlatList, RefreshControl, StyleSheet, View} from 'react-native';
import ChatItem from './ChatItem';
import {useTheme} from "@react-navigation/native";

const ChatList = ({data}) => {
    const {colors} = useTheme();
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = () => {
        setRefreshing(true);

        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    };
    const renderItem = ({item}) => <ChatItem item={item}/>;

    return (
        <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            ItemSeparatorComponent={() => <View style={styles.separator}/>}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}
                                            colors={[colors.primary]}
                                            progressBackgroundColor={colors.surfaceContainerLowest}/>}
        />
    );
};

const styles = StyleSheet.create({
    separator: {
        height: 1,
        backgroundColor: '#ccc',
    },
});

export default ChatList;