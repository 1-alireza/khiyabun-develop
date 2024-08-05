import {useTranslation} from "react-i18next";
import {useTheme} from "@react-navigation/native";
import {Dimensions, StyleSheet, Text, View} from "react-native";
import React, {useState, useEffect} from "react";
import KhiyabunIcons from "../../components/KhiyabunIcons";
import Card from "../../components/Card";
import {BarChart, LineChart, PieChart, PopulationPyramid} from "react-native-gifted-charts";

// import {
//     LineChart,
//     BarChart,
//     PieChart,
//     ProgressChart,
//     ContributionGraph,
//     StackedBarChart
// } from "react-native-chart-kit";

// ...


const chartConfig = {
    backgroundGradientFrom: "#fff",
    backgroundGradientTo: "#fff",
    color: (opacity = 1) => `rgba(74,117,245, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false // optional
};
const ErrandData = ({changeMode}) => {
    const {t, i18n} = useTranslation();
    const {colors} = useTheme();
    const styles = useThemedStyles(colors)
    const data = [
        {value: 10, label: '1:11', frontColor: colors.primary},
        {value: 50, label: '4:02', frontColor: colors.primary},
        {value: 20, label: '5:35', frontColor: colors.primary},
        {value: 40, label: '7:12', frontColor: colors.primary},
    ]

    // const data = {
    //     labels: ["1:11", "4:02", "5:35", "7:12"],
    //     datasets: [
    //         {
    //             data: [48, 80, 99, 43]
    //         }
    //     ]
    // };

    return (
        <View style={{
            position: "absolute",
            top: 100,
            width: "90%",
            textAlign: "center",
        }}>
            <Card customStyle={styles.cardWrapper}>
                <View style={styles.detailContainer}>
                    <Text style={styles.detailText}>
                        {t("time")}
                    </Text>
                    <Text style={styles.errandTime}>
                        0:16:12
                    </Text>
                </View>
                <View style={styles.detailContainer}>
                    <Text style={styles.detailText}>
                        {t("split_average")}
                    </Text>
                    <Text style={styles.errandTime}>
                        8:14
                    </Text>
                </View>
            </Card>

            <Card customStyle={styles.cardWrapper}>

                <View>
                    <BarChart data={data} adjustToWidth={true} parentWidth={150}
                              barWidth={25}
                              backgroundColor={colors.surfaceContainerLowest}
                              xAxisLabelTextStyle={{
                                  fontSize: 12,
                                  lineHeight: 16,
                                  color: colors.onSurface
                              }}
                              maxValue={100}
                              hideYAxisText
                              height={100}
                              hideRules={true}
                              barBorderRadius={4}
                              yAxisThickness={0}
                              xAxisThickness={0}/>
                </View>
                <View style={{width:"50%",justifyContent:"flex-start",alignItems:"center"}}>
                    <Text style={styles.detailText}>{t("distance")}</Text>
                    <Text style={styles.errandTime}>3.67</Text>
                </View>


            </Card>
        </View>


    )

}

const useThemedStyles = (colors) => {
    return StyleSheet.create({
        cardWrapper: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            padding: 16,
            width: "100%",

        },
        finishButton: {
            backgroundColor: colors.errorContainer,
            borderColor: colors.errorOutline,
            borderRadius: 8,
            justifyContent: "center",
            alignItems: "center",
        },
        finishButtonText: {
            fontFamily: "dana-bold",
            fontWeight: "500",
            fontSize: 14,
            lineHeight: 24,
            textAlign: "center",
            color: colors.darkError,
        },
        detailContainer: {
            alignItems: "flex-start",
            justifyContent: "flex-start",
            gap: 8,
            width: "50%"
        },
        detailText: {
            color: colors.onSurfaceContainer,
            fontSize: 14,
            lineHeight: 20
        },
        details: {
            width: "100%",
            gap: 4
        },
        errandTime: {
            fontSize: 24,
            lineHeight: 40,
            color: colors.onSurface,

        }
    });
};


export default ErrandData;


{/*<BarChart*/
}
{/*    style={{marginLeft:100}}*/
}
{/*    withHorizontalLabels={false}*/
}
{/*    withInnerLines={false}*/
}
{/*    data={data}*/
}
{/*    width={100}*/
}
{/*    showBarTops={false}*/
}
{/*    height={220}*/
}
{/*    chartConfig={chartConfig}*/
}
{/*/>*/
}