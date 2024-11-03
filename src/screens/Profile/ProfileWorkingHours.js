import ProfileCardData from "./ProfileCardData";
import React from "react";
import ProfileCard from "./ProfileCard";
import {useTranslation} from "react-i18next";
import {I18nManager} from "react-native";
import {log} from "expo/build/devtools/logger";

export default function ProfileWorkingHours({workingHours}) {
    const {t} = useTranslation();
    const isRTL = I18nManager.isRTL;
    const startTimeStamp = isRTL ? "ق.ظ" : "AM"
    const endTimeStamp = isRTL ? "ب.ظ" : "PM"

    function convertTo12HourFormat(time) {
        const [hours, minutes, seconds] = time.split(':');
        const hourIn24HourFormat = parseInt(hours, 10);
        const amPm = hourIn24HourFormat < 12 ? startTimeStamp : endTimeStamp;
        const adjustedHour = hourIn24HourFormat % 24;


        const formattedHour = String(adjustedHour).padStart(2, '0');
        return `${formattedHour}:${minutes} ${amPm}`;
    }

    const saturdayStartDate = workingHours.Saturday
    const sundayStartDate = workingHours.Sunday
    const mondayStartDate = workingHours.Monday
    const tuesdayStartDate = workingHours.Tuesday
    const wednesdayStartDate = workingHours.Wednesday
    const thursdayStartDate = workingHours.Thursday
    const fridayStartDate = workingHours.Friday

    return (
        <ProfileCard headerText={t("work_hours")}>
            {workingHours && (
                <>
                    <ProfileCardData title={"Saturday"}
                                     data={
                                         `${saturdayStartDate.startHour ? convertTo12HourFormat(saturdayStartDate.startHour) - convertTo12HourFormat(saturdayStartDate.endHour) : "-"}} `
                                     }/>

                    <ProfileCardData title={"Sunday"}
                                     data={
                                         `${saturdayStartDate.startHour ? convertTo12HourFormat(saturdayStartDate.startHour) - convertTo12HourFormat(saturdayStartDate.endHour) : "-"}} `
                                     }/>

                    <ProfileCardData title={"Monday"}
                                     data={
                                         `${saturdayStartDate.startHour ? convertTo12HourFormat(saturdayStartDate.startHour) - convertTo12HourFormat(saturdayStartDate.endHour) : "-"}} `
                                     }/>

                    <ProfileCardData title={"Tuesday"}
                                     data={
                                         `${saturdayStartDate.startHour ? convertTo12HourFormat(saturdayStartDate.startHour) - convertTo12HourFormat(saturdayStartDate.endHour) : "-"}} `
                                     }/>

                    <ProfileCardData title={"Wednesday"}
                                     data={
                                         `${saturdayStartDate.startHour ? convertTo12HourFormat(saturdayStartDate.startHour) - convertTo12HourFormat(saturdayStartDate.endHour) : "-"}} `
                                     }/>


                    <ProfileCardData title={"Thursday"}
                                     data={
                                         `${saturdayStartDate.startHour ? convertTo12HourFormat(saturdayStartDate.startHour) - convertTo12HourFormat(saturdayStartDate.endHour) : "-"}} `
                                     }/>

                    <ProfileCardData title={"Thursday"}
                                     data={
                                         `${saturdayStartDate.startHour ? convertTo12HourFormat(saturdayStartDate.startHour) - convertTo12HourFormat(saturdayStartDate.endHour) : "-"}} `
                                     }/>

                </>
            )}

        </ProfileCard>

    )
}










