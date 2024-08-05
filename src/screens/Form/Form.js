import KhiyabunIcons from "../../components/KhiyabunIcons";
import {
    Text,
    View,
    StyleSheet,
    Pressable,
    I18nManager,
    FlatList,
    Dimensions,
    ImageBackground
} from "react-native";
import {useTheme} from "@react-navigation/native";
import React, {useRef, useState} from "react";
import CustomModal from "../../components/CustomModal";
import gStyles from '../../global-styles/GlobalStyles';
import {useTranslation} from "react-i18next";
import {CheckBox} from "@rneui/themed";


function FormItem({item}) {
    const {t, i18n} = useTranslation();
    const {colors} = useTheme();
    const [checked, setChecked] = useState(false);
    const isRTL = I18nManager.isRTL;
    const styles = useThemedStyles(colors, isRTL)
    const [isPrivate, setIsPrivate] = useState(item.isPrivate)
    const [isPrivateModalVisible, setIsPrivateModalVisible] = useState(false)
    const [currentIndex, setCurrentIndex] = useState(0);
    const ref = useRef(null);
    const ITEM_WIDTH = Dimensions.get('window').width / 2 - 15;

    console.log(item)
    const togglePrivateModal=()=>setIsPrivateModalVisible(!isPrivateModalVisible)

    const toggleLock=()=>setIsPrivate(!isPrivateModalVisible)

    const toggleCheckbox = () => setChecked(!checked);


    const renderSlide = ({item, index}) => {
        return (
            <Text style={styles.aminitiesText}>{item}</Text>

        );
    };

    const PrivateModal = () => {
        return (
            <View>
                <Text style={styles.secondaryText}>
                    {t("status_warning")}
                </Text>
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
                        textStyle={styles.deleteText}
                    />

                </View>
            </View>
        )
    }




    return (
      <>
        <View style={styles.formWrapper}>
            <ImageBackground
                source={item.type === "map" ? require('../../../assets/img/Rectangle855.png')
                    : require('../../../assets/img/formPhoto.png')}
                resizeMode="cover"
                style={styles.formPhoto}>

                <Pressable style={styles.privateStatus} onPress={togglePrivateModal}>
                    {
                        isPrivate ? (
                            <KhiyabunIcons name={"lock-outline"} size={16} color={colors.onSurfaceLowest}/>

                        ) : (
                            <KhiyabunIcons name={"unlock-outline"} size={16} color={colors.onSurfaceLowest}/>

                        )
                    }
                </Pressable>
            </ImageBackground>
            <View style={styles.formTitle}>
                <Text style={styles.formTitleText}>{item.previewSettings.title}</Text>
                <Text style={styles.formTitlePrice}>{item.price}</Text>
            </View>

            <FlatList
                ref={ref}
                data={item.amenities}
                keyExtractor={() => Math.random()}
                renderItem={renderSlide}
                horizontal
                showsHorizontalScrollIndicator={false}
                pagingEnabled
                snapToInterval={ITEM_WIDTH}
                decelerationRate="fast"
                scrollEnabled={currentIndex < item.amenities.length - 1}
            />
            <View style={styles.formFooter}>
                <Text style={styles.formFooterText}>
                    {"House" + " for " + item.realStateType}
                </Text>
                <KhiyabunIcons name={"location-on-outline"} size={16} color={colors.onSurfaceHigh}/>
            </View>
        </View>
          <CustomModal
              type={"warning"}
              isVisible={isPrivateModalVisible}
              onClose={togglePrivateModal}
              width={80}
              disabled={!checked}
              cancelButtonText={t("cancel")}
              actionButtonText={t("confirm")}
              hasCloseIcon={true}
              modalBody={<PrivateModal/>}
              modalTitle={t("form_status")}
              actionCallback={toggleLock}/>
      </>


    )

}

const useThemedStyles = (colors, isRTl) => {
    return StyleSheet.create({
        formTitle: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: 4,
            marginVertical: 4
        },
        formPhoto: {
            width: "100%",
            height: 175,
            borderRadius: 8,
            overflow: "hidden",
            justifyContent: 'center',
            alignItems: 'center',
            position: "relative"

        },
        formWrapper: {
            gap: 8,
            paddingVertical: 8
        },
        formFooter: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: isRTl ? "flex-end" : "flex-start",
            gap: 4,
            paddingHorizontal: 4,
            marginVertical:4

        },
        aminitiesText: {
            marginHorizontal: 3,
            backgroundColor: colors.surface,
            paddingHorizontal: 12,
            paddingVertical: 6,
            borderRadius: 100,
            fontSize: 12,
            lineHeight: 16,
            color: colors.onSurface
        },
        privateStatus: {
            position: "absolute",
            top: 10,
            right: 10,
            width: 32,
            height: 32,
            backgroundColor: "#ffffff99",
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 100
        },
        formTitleText: {
            fontSize: 12,
            lineHeight: 16,
            color: colors.onSurfaceHigh
        },
        formTitlePrice: {
            fontSize: 16,
            lineHeight: 24,
            color: colors.onSurfaceHigh
        },
        formFooterText: {
            fontSize: 12,
            lineHeight: 16,
            color: colors.onSurfaceHigh
        },
        secondaryText: {
            fontSize: 14,
            lineHeight: 20,
            color: colors.onSurfaceLow,
            fontFamily: "dana-regular",
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
            marginBottom:0
        },
        deleteText: {
            fontSize: 14,
            lineHeight: 24,
            width: "90%",
            color: colors.onSurfaceHigh,
            fontFamily: "dana-regular",
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

export default FormItem;
