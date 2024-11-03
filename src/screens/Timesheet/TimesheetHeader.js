import React, {useEffect} from 'react';
import {useTheme} from "@react-navigation/native";
import {View, StyleSheet, TouchableOpacity, I18nManager} from 'react-native';
import {Menu, MenuOption, MenuOptions, MenuTrigger} from "react-native-popup-menu";
import KhiyabunIcons from "../../components/KhiyabunIcons";
import * as Print from 'expo-print';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import XLSX from 'xlsx';
import CustomText from "../../components/CustomText";
import {useTranslation} from "react-i18next";
import {useSelector} from "react-redux";

const TimesheetHeader = ({onLeftIconPress}) => {
    const {colors} = useTheme();
    const {t} = useTranslation();
    const styles = useThemedStyles();
    const exportData = useSelector(state => state.exportData.exportData);

    useEffect(() => {
        console.log("exportData", exportData)
    }, [exportData]);

    const exportToExcel = async (apiResponse) => {
        console.log(apiResponse[0].data);
        try {
            let excelData = [];

            // Prepare data for Excel report
            apiResponse.forEach(period => {
                excelData.push({Date: period.date, Total: period.total, Absence: period.absence});
                period.data.forEach(entry => {
                    excelData.push({
                        Title: entry.title,
                        Date: entry.date,
                        State: entry.state ? 'Checked' : 'Unchecked',
                        ID: entry.id
                    });
                });
            });

            const ws = XLSX.utils.json_to_sheet(excelData);
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, 'Report');

            // Write to a binary string
            const wbout = XLSX.write(wb, {bookType: 'xlsx', type: 'binary'});

            // Convert binary string to a Base64 string
            const b64 = btoa(
                new Uint8Array(wbout.split('').map(c => c.charCodeAt(0))).reduce((acc, val) => acc + String.fromCharCode(val), '')
            );

            // Define the file path
            const fileUri = `${FileSystem.documentDirectory}Report.xlsx`;

            // Write the Excel file to the filesystem
            await FileSystem.writeAsStringAsync(fileUri, b64, {encoding: FileSystem.EncodingType.Base64});

            // Share the file
            await Sharing.shareAsync(fileUri);
        } catch (error) {
            console.error(error);
        }
    };
    const exportToPDF = async (apiResponse) => {
        try {
            let htmlContent = `  
            <html>  
                <head>  
                    <style>  
                        body { font-family: Arial, sans-serif; margin: 20px; }  
                        h1 { text-align: center; }  
                        table { width: 100%; border-collapse: collapse; margin-top: 20px; }  
                        th, td { border: 1px solid black; padding: 8px; text-align: left; }  
                        th { background-color: #f2f2f2; }  
                        .total { font-weight: bold; }  
                    </style>  
                </head>  
                <body>  
                    <h1>Work Hours Report</h1>  
        `;

            apiResponse.forEach(period => {
                htmlContent += `<h2>${period.date}</h2>`;
                htmlContent += `<p>Total: ${period.total}</p>`;
                htmlContent += `<p>Absence: ${period.absence}</p>`;
                if (period.data && Array.isArray(period.data)) {
                    htmlContent += `<table><tr><th>Date</th><th>Hours Worked</th><th>State</th></tr>`;
                    period.data.forEach(entry => {
                        htmlContent += `  
                        <tr>  
                            <td>${entry.date}</td>  
                            <td>${entry.title}</td>  
                            <td>${entry.state ? 'Checked' : 'Unchecked'}</td>  
                        </tr>  
                    `;
                    });
                    htmlContent += `</table>`;
                } else {
                    console.warn(`No data entries found for period: ${period.date}`);
                }
            });

            htmlContent += `</body></html>`;

            // Create PDF
            const {uri} = await Print.printToFileAsync({html: htmlContent});

            // Define the desired file name and extension
            const fileName = "Work_Hours_Report.pdf";
            const fileUri = `${FileSystem.documentDirectory}${fileName}`;

            // Move the PDF to the new location with the desired file name
            await FileSystem.moveAsync({
                from: uri,
                to: fileUri,
            });

            // Share the PDF
            await Sharing.shareAsync(fileUri);
        } catch (error) {
            console.error("PDF Export Error:", error);
        }
    };


    return (
        <View style={styles.header}>

            <TouchableOpacity activeOpacity={0.7} onPress={onLeftIconPress}>
                <KhiyabunIcons name={I18nManager.isRTL ? "arrow-right-outline" : "arrow-left-outline"}
                               size={24} color={colors.onSurface}/>
            </TouchableOpacity>
            <CustomText size={16} color={colors.onSurfaceHigh} weight={'bold'} lineHeight={24}
                        textAlign={'center'}>
                {t("timesheet")}
            </CustomText>
            <Menu style={styles.ripple}>
                <MenuTrigger>
                    <KhiyabunIcons style={styles.rippleIcon} name={"more-bold"} size={24} color={colors.onSurface}/>
                </MenuTrigger>
                <MenuOptions optionsContainerStyle={styles.popUp}>
                    <MenuOption style={styles.popUpOption} onSelect={() => exportToExcel(exportData)}>
                        <KhiyabunIcons name={"export-outline"} size={20} color={colors.onSurfaceHigh}/>
                        <CustomText size={16} color={colors.onSurfaceHigh} lineHeight={24}
                                    textAlign={'center'}>
                            {t("export_to_excel")}
                        </CustomText>
                    </MenuOption>
                    <MenuOption style={styles.popUpOption} onSelect={() => exportToPDF(exportData)}>
                        <KhiyabunIcons name={"export-outline"} size={20} color={colors.onSurfaceHigh}/>
                        <CustomText size={16} color={colors.onSurfaceHigh} lineHeight={24}
                                    textAlign={'center'}>
                            {t("export_to_pdf")}
                        </CustomText>
                    </MenuOption>
                </MenuOptions>
            </Menu>

        </View>
    );
};

const useThemedStyles = () => {
    const {colors} = useTheme();

    return StyleSheet.create({
        header: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingLeft: 15,
            paddingRight: 10,
            height: 60,
            backgroundColor: colors.surfaceContainerLowest,
        },
        ripple: {
            borderRadius: 20,
            overflow: "hidden",
        },
        rippleIcon: {
            padding: 5,
        },
        popUp: {
            borderRadius: 8,
            backgroundColor: colors.surfaceContainerLowest,
        },
        popUpOption: {
            flexDirection: "row",
            alignItems: 'center',
            justifyContent: "flex-start",
            height: 50,
            gap: 8,
            paddingHorizontal: 12
        },
    });
};

export default TimesheetHeader;
