import React, {memo} from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet, TouchableOpacity, I18nManager, Platform} from 'react-native';
import {useNavigation, useTheme} from "@react-navigation/native";
import KhiyabunIcons from "../../components/KhiyabunIcons";
import {useTranslation} from "react-i18next";
import ExternalLink from "../../components/ExternalLink";
import CustomText from "../../components/CustomText";

const HomeCard = memo(({HeaderIcon, HeaderText, seeMore = true, onMore, externalLink, children}) => {
    const {t} = useTranslation();
    const {colors} = useTheme();
    const styles = useThemedStyles(colors);
    const navigation = useNavigation();

    const handleMorePress = () => {
        navigation.navigate(onMore);
        if (Platform.OS !== 'android') window.history.pushState({}, onMore);
    };

    const renderMoreLink = () => {
        const moreText = t("more");
        const arrowIcon = (I18nManager.isRTL) ? "arrow-left-outline" : "arrow-right-outline";

        return externalLink ? (
            <ExternalLink url={externalLink}>
                <View style={styles.headerTextWrapper}>
                    <CustomText size={13} weight={'bold'} color={colors.darkPrimary} lineHeight={20}
                                customStyle={{marginBottom: 3.5}}>
                        {moreText}
                    </CustomText>
                    <KhiyabunIcons name={arrowIcon} size={18} color={colors.primary}/>
                </View>
            </ExternalLink>
        ) : (
            <TouchableOpacity
                activeOpacity={0.6}
                style={styles.headerTextWrapper}
                onPress={handleMorePress}
                accessibilityLabel={moreText}
            >
                <CustomText size={13} weight={'bold'} color={colors.darkPrimary} lineHeight={20}
                            customStyle={{marginBottom: 3.5}}>
                    {moreText}
                </CustomText>
                <KhiyabunIcons name={arrowIcon} size={18} color={colors.primary}/>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.card}>
            <View style={styles.header}>
                <View style={styles.headerTextWrapper}>
                    <KhiyabunIcons style={{marginBottom: 5}} name={HeaderIcon} size={18} color={colors.primary}/>
                    <CustomText size={15} weight={'bold'} color={colors.onSurface} lineHeight={24}
                                customStyle={{marginBottom: 2}}>
                        {HeaderText}
                    </CustomText>
                </View>
                {seeMore && renderMoreLink()}
            </View>
            {children}
        </View>
    );
});

HomeCard.propTypes = {
    HeaderIcon: PropTypes.string.isRequired,
    HeaderText: PropTypes.string.isRequired,
    seeMore: PropTypes.bool,
    onMore: PropTypes.string,
    externalLink: PropTypes.string,
    children: PropTypes.node,
};

const useThemedStyles = (colors) => {
    return StyleSheet.create({
        card: {
            flexDirection: "column",
            backgroundColor: colors.surfaceContainerLowest,
            padding: 16,
            borderRadius: 6,
            width: "100%",
        },
        header: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
        },
        headerTextWrapper: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 5,
        },
    });
};

export default HomeCard;