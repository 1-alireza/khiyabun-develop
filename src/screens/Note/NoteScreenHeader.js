import {useTranslation} from "react-i18next";
import {useTheme} from "@react-navigation/native";
import {StyleSheet} from "react-native";
import React from "react";
import CustomMenu from "../../components/customMenu";
import {changeNoteSortByState} from "../../redux/slices/NoteSortBy";
import {useDispatch, useSelector} from "react-redux";

export default function NoteScreenHeader({test}) {

    const {t, i18n} = useTranslation();
    const {colors} = useTheme();
    const dispatch = useDispatch();
    const changeSort=(sortBy)=>{
        dispatch(changeNoteSortByState(sortBy));
    }

    const menuItems = [
        {
            text: "sort_by_date",
            onSelect: ()=>changeSort("createDate"),
            icon: "calender-outline"
        },
        {
            text: "sort_by_title",
            onSelect: ()=>changeSort("title"),
            icon: "small-caps-outline"
        },
    ];


    const triggerIcon={
        name:"sort-descending-outline",
        size:20
    }

    return (
        <CustomMenu items={menuItems} triggerIcon={triggerIcon}/>
    )
}

