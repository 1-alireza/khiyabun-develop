import React from 'react';
import {RefreshControl} from 'react-native';
import {useTheme} from "@react-navigation/native";

const PullToRefresh = ({refreshing, onRefresh}) => {
    const {colors} = useTheme();

    return (
        <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[colors.primary]}
            progressBackgroundColor={colors.surfaceContainerLowest}
        />
    );
};

export default PullToRefresh;