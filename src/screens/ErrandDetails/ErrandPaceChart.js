import {LineChart} from "react-native-gifted-charts";
import {StyleSheet, View, Text} from "react-native";
import {useTranslation} from "react-i18next";
import {useTheme} from "@react-navigation/native";
import KhiyabunIcons from "../../components/KhiyabunIcons";

export default function ErrandPaceChart() {
    const {t, i18n} = useTranslation();
    const {colors} = useTheme();
    const styles = useThemedStyles(colors)


    const customDataPoint = () => {
        return (
            <View
                style={{
                    width: 10,
                    height: 10,
                    backgroundColor: colors.primary,
                    borderRadius: 100,
                }}
            />
        );
    };
    const customLabel = val => {
        return (
            <View>
                <Text style={{color: colors.onSurfaceLow, fontSize: 10, lineHeight: 16}}>{val}</Text>
            </View>
        );
    };
    const data = [
        {
            value: 100,
            labelComponent: () => customLabel('22 Nov'),
            customDataPoint: customDataPoint,
        },
        {
            labelComponent: () => customLabel('22 Nov'),
            value: 140,
            hideDataPoint: true,
        },
        {
            labelComponent: () => customLabel('22 Nov'),
            value: 250,
            customDataPoint: customDataPoint,
        },
        {
            labelComponent: () => customLabel('22 Nov'),
            value: 290,
            hideDataPoint: true,
        },
        {
            value: 410,
            labelComponent: () => customLabel('24 Nov'),
            customDataPoint: customDataPoint,
            showStrip: true,
            stripHeight: 190,
            stripColor: 'black',
            dataPointLabelComponent: () => {
                return (
                    <View
                        style={{
                            backgroundColor: colors.primary,
                            color: colors.primary,
                            paddingHorizontal: 8,
                            paddingVertical: 5,
                            borderRadius: 16
                        }}>
                        <Text style={{color: colors.textOn}}>6
                            7 km</Text>
                    </View>
                );
            },
            dataPointLabelShiftY: -70,
            dataPointLabelShiftX: -4,
        },
        {
            labelComponent: () => customLabel('22 Nov'),
            value: 440,
            hideDataPoint: true,
        },
        {
            labelComponent: () => customLabel('22 Nov'),
            value: 300,
            customDataPoint: customDataPoint,
        },
        {
            labelComponent: () => customLabel('22 Nov'),
            value: 280,
            hideDataPoint: true,
        },
        {
            value: 180,
            labelComponent: () => customLabel('26 Nov'),
            customDataPoint: customDataPoint,
        },
        {
            labelComponent: () => customLabel('22 Nov'),

            value: 150,
            hideDataPoint: true,
        },
        {
            value: 150,
            customDataPoint: customDataPoint,
        },
    ];


    return (
        <View style={styles.chartWrapper}>
            <View style={styles.titleWrapper}>
                <KhiyabunIcons name={"chart-bold"} size={16} color={colors.primary}/>
                <Text style={styles.chartTitle}>
                    {t("pace")}
                </Text>
            </View>
            <LineChart
                thickness={2}
                color={colors.primary}
                maxValue={1200}
                noOfSections={7}
                data={data}
                curved
                startFillColor={'rgb(84,219,234)'}
                endFillColor={'rgb(84,219,234)'}
                hideYAxisText
                backgroundColor={colors.surfaceContainerLowest}
                initialSpacing={25}
                height={120}
                yAxisColor="lightgray"
                yAxisThickness={0}
                xAxisThickness={0}
            />
        </View>

    )
}
const useThemedStyles = (colors) => {
    return StyleSheet.create({
        chartWrapper: {
            width: "100%",
            backgroundColor: colors.surfaceContainerLowest,
            marginVertical: 10,
            paddingTop: 10,
            borderRadius: 8
        },
        chartTitle:{
            fontSize:16,
            lineHeight:24,
            color:colors.onSurface
        },
        titleWrapper:{
            padding:8,
            flexDirection:"row",
            alignItems:"center",
            gap:4
        }
    });
};
