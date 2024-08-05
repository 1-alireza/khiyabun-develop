import React, {useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Alert} from 'react-native';
import {Table, TableWrapper, Row, Cell} from 'react-native-table-component';
import {useTranslation} from "react-i18next";
import {useTheme} from "@react-navigation/native";
import {BarChart} from "react-native-gifted-charts";
import KhiyabunIcons from "../../components/KhiyabunIcons";

const ErrandTableData = () => {
    const {t, i18n} = useTranslation();
    const {colors} = useTheme();
    const styles = useThemedStyles(colors)

    const [tableHead] = useState(['km', 'pace', 'Elev', 'Hr']);
    const [tableData] = useState([
        ['1', '2', '8', '122'],
        ['2', 'b', '1', '133'],
        ['3', '2', '-1', '178'],
        ['4', 'b', '-2', '122'],
        ['5', 'b', '8', '122'],
        ['6', 'b', '-4', '122'],
        ['7', 'b', '-1', '122'],
        ['8', 'b', '0', '122'],
    ]);
    // const data = [
    //     {value: "", label: '1:11', frontColor: colors.primary},
    //
    // ]


    const alertIndex = (index) => {
        Alert.alert(`This is row ${index + 1}`);
    };

    const element = (data, index) => (
        <TouchableOpacity onPress={() => alertIndex(index)}>
            <View style={styles.btn}>
                <Text style={styles.btnText}>button</Text>
            </View>
        </TouchableOpacity>
    );
    const chartExample = (customData, index) => {
        let tempArr=[customData]
        return (
            <View style={{
                backgroundColor: "red",
                justifyContent: "center",
                alignItems: "center",
                height: 40
            }}>

                <BarChart data={tempArr}
                          barWidth={5}
                          horizontal
                          backgroundColor="#000"
                          xAxisLabelTextStyle={{
                              fontSize: 12,
                              lineHeight: 16,
                              color: colors.onSurface
                          }}
                          maxValue={10}
                          hideAxesAndRules={true}
                          barBorderRadius={4}
                          yAxisThickness={0}
                          xAxisThickness={0}/>
            </View>


        )
    }

    return (
        <View style={styles.container}>
            <View style={styles.titleWrapper}>
                <KhiyabunIcons name={"chart-bold"} size={16} color={colors.primary}/>
                <Text style={styles.chartTitle}>
                    {t("splits")}
                </Text>
            </View>

            <Table borderStyle={{borderColor: 'transparent'}}>
                <Row data={tableHead} style={styles.head} textStyle={styles.text}/>
                {
                    tableData.map((rowData, index) => (
                        <TableWrapper key={index} style={styles.row}>
                            {
                                rowData.map((cellData, cellIndex) => (
                                    <Cell key={cellIndex}
                                          data={cellIndex === 1 ? element(cellData, index) : cellData}
                                          textStyle={styles.text}/>
                                ))
                            }
                        </TableWrapper>
                    ))
                }
            </Table>
        </View>
    );
};


const useThemedStyles = (colors) => {
    return StyleSheet.create({
        container: {
            flex: 1,
            padding: 16,
            paddingTop: 30,
            backgroundColor: colors.surfaceContainerLowest,
            borderRadius: 8
        },
        head: {
            height: 40,
            backgroundColor: colors.surfaceContainerLowest,
            borderBottomWidth: 1,
            borderBottomColor: colors.outlineSurface
        },
        text: {
            textAlign: "center",
            fontSize: 12,
            lineHeight: 16,
            color: colors.onSurface,
            backgroundColor: "red"
        },
        row: {
            flexDirection: 'row',
            paddingTop: 8,
        },
        btn: {
            width: 58,
            height: 18,
            backgroundColor: '#78B7BB',
            borderRadius: 2
        },
        btnText: {
            textAlign: 'center',
            color: '#fff'
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


export default ErrandTableData;