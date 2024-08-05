import {View, Text, StyleSheet, Dimensions} from 'react-native';
import {useTheme} from "@react-navigation/native";
import Card from "../../components/Card";

const RestChips = () => {
    const styles = useThemedStyles();

    return (
        <Card customStyle={styles.container}>
            <View style={styles.chips}>
                <Text style={styles.chipsText}>I am in office</Text>
            </View>
            <View style={styles.chips}>
                <Text style={styles.chipsText}>I am having lunch</Text>
            </View>
            <View style={styles.chips}>
                <Text style={styles.chipsText}>Send me SMS</Text>
            </View>
        </Card>
    );
};


const useThemedStyles = () => {
    const {colors} = useTheme();

    return StyleSheet.create({
        container: {
            marginTop: 8,
            width: (Dimensions.get('window').width - 15),
            flexDirection: "row",
            flexWrap: "wrap",
            alignSelf:"center"
        },
        chips: {
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: colors.surface,
            color: colors.onSurface,
            width: "fit-content",
            maxWidth: 150,
            height: 30,
            paddingVertical: 6,
            paddingHorizontal: 16,
            marginBottom: 10,
            marginHorizontal: 6,
            borderRadius: 100,
        },
        chipsText: {
            fontFamily: "dana-bold",
            fontSize: 12,
            fontWeight: '500',
            lineHeight: 16,
            color: colors.onSurface,
        },
    });
};

export default RestChips;