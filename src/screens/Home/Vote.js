import React, {useState} from "react";
import {View, StyleSheet, FlatList} from 'react-native';
import {useTheme} from "@react-navigation/native";
import HomeCard from "./HomeCard";
import {CheckBox} from '@rneui/themed';
import Button from "../../components/Button";
import {useTranslation} from "react-i18next";


function Vote() {
    const {t} = useTranslation();
    const styles = useThemedStyles();
    const {colors} = useTheme();
    const [selectedItem, setSelectedItem] = useState(null);
    const [data, setData] = useState([
        {title: 'Maplak', checked: false},
        {title: 'Kashano', checked: false},
        {title: 'Iranfile', checked: false},
        {title: 'Melkradar', checked: false},
        {title: 'Eskanfile', checked: false}
    ]);
    const handleCheckboxChange = (index) => {
        const newData = data.map((item, i) => ({
            ...item,
            checked: index === i
        }));
        setSelectedItem(index);
        setData(newData);
    };

    const SubmitVote = () => {
        alert("vote submited");
    };

    const VoteItem = ({item, index}) => (
        <CheckBox
            size={24}
            checked={item.checked}
            onPress={() => handleCheckboxChange(index)}
            iconType="material-community"
            checkedIcon="checkbox-marked"
            uncheckedIcon="checkbox-blank-outline"
            checkedColor={colors.primary}
            containerStyle={styles.checkBox}
            uncheckedColor={colors.primaryOutline}
            title={item.title}
        />
    );

    return (
        <View style={styles.container}>
            <HomeCard HeaderIcon={"messages-3-bold"} HeaderText={"which filing has the most data sent?"}
                      seeMore={false}>
                <FlatList
                    data={data}
                    renderItem={({item, index}) => <VoteItem item={item} index={index}/>}
                    keyExtractor={(item, index) => index.toString()}
                />
                <Button
                    style={{marginTop: 10}}
                    onPress={SubmitVote}
                    label="Submit vote"
                    sizeButton="small"
                    typeButton="full"
                    styleText={styles.buttonTextStyle}
                    disabled={selectedItem === null}
                />
            </HomeCard>
        </View>
    );
}

const useThemedStyles = () => {
    const {colors} = useTheme();
    return StyleSheet.create({
        container: {
            marginBottom: 20,
        },
        checkBox: {
            padding: 0,
            paddingLeft: 15,
            marginLeft: 0,
        },
        voteText: {
            fontFamily: "dana-bold",
            fontSize: 16,
            lineHeight: 24,
            fontWeight: '500',
            width: '80%',
            color: colors.onSurfaceHigh,
            textAlign: 'left',
        }
    });
};

export default Vote;