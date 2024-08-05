import {useTranslation} from "react-i18next";
import {useTheme} from "@react-navigation/native";
import {StyleSheet, View,Text} from "react-native";
import Card from "../../components/Card";
import KhiyabunIcons from "../../components/KhiyabunIcons";

function ProfileCard({headerText,children}){
    const {t, i18n} = useTranslation();
    const {colors} = useTheme();
    const styles = useThemedStyles(colors)
    return(
        <Card>
            <View style={styles.cardWrapper}>
                <View style={styles.cardHeaderWrapper}>
                    <Text style={styles.cardHeader}>
                        {headerText}
                    </Text>
                    <KhiyabunIcons name="edit-outline" size={16} color={colors.onSurface}/>
                </View>

                {children}
            </View>
        </Card>

    )
}
const useThemedStyles = (colors) => {
    return StyleSheet.create({
        cardWrapper:{
            paddingHorizontal:4
        },
        cardHeaderWrapper:{
            marginVertical:10,
            flexDirection:"row",
            justifyContent: "space-between",
            alignItems: "center"
        },
        cardHeader:{
                fontFamily: "dana-bold",
                fontSize: 16,
                color: colors.primary,
                lineHeight: 24,
        },
        dataWrapper:{
            flexDirection:"row",
            justifyContent:"flex-start",
            alignItems:"center",
            gap:6,
            marginVertical:4
        },
        listTitle:{
            color:colors.onSurfaceLow,
            fontSize:14,
            lineHeight:20,
            fontFamily: "dana-regular",
        },
        listData:{
        color:colors.onSurface,
        fontSize:14,
        lineHeight:20,
        fontFamily: "dana-regular",
            fontWeight:"400"
        }

    });
};
export default ProfileCard