import React from "react";
import {View, Text, ScrollView, StyleSheet} from "react-native";
import CustomIcon from "../components/KhiyabunIcons";

export default function IconList() {
    return (
        <ScrollView style={styles.container}>
            <View>
                <View style={styles.row}>
                    <View style={styles.item}>
                        <Text>
                            <CustomIcon name="like-bold" size={20}/>
                        </Text>
                        <Text style={[styles.title]}>
                            like-bold
                        </Text>
                    </View>
                    <View style={styles.item}>
                        <Text>
                            <CustomIcon name="dislike-bold" size={20}/>
                        </Text>
                        <Text style={[styles.title]}>
                            dislike-bold
                        </Text>
                    </View>
                    <View style={styles.item}>
                        <Text>
                            <CustomIcon name="add-outline" size={20}/>
                        </Text>
                        <Text style={styles.title}>add-outline</Text>
                    </View>
                    <View style={styles.item}>
                        <Text>
                            <CustomIcon name="arrow-right-outline" size={20}/>
                        </Text>
                        <Text style={styles.title}>arrow-right-outline</Text>
                    </View>
                </View>
                <View style={styles.row}>
                    <View style={styles.item}>
                        <Text>
                            <CustomIcon name="cake-bold" size={20}/>
                        </Text>
                        <Text style={styles.title}>cake-bold</Text>
                    </View>
                    <View style={styles.item}>
                        <Text>
                            <CustomIcon name="arrow-left-outline" size={20}/>
                        </Text>
                        <Text style={styles.title}>arrow-left-outline</Text>
                    </View>
                    <View style={styles.item}>
                        <Text>
                            <CustomIcon name="music-bold" size={20}/>
                        </Text>
                        <Text style={[styles.title]}>
                            music-bold
                        </Text>
                    </View>
                    <View style={styles.item}>
                        <Text>
                            <CustomIcon name="bio-bold" size={20}/>
                        </Text>
                        <Text style={[styles.title]}>
                            bio-bold
                        </Text>
                    </View>
                </View>
                <View style={styles.row}>
                    <View style={styles.item}>
                        <Text>
                            <CustomIcon name="camera-bold" size={20}/>
                        </Text>
                        <Text style={styles.title}>camera-bold</Text>
                    </View>
                    <View style={styles.item}>
                        <Text>
                            <CustomIcon name="image-bold" size={20}/>
                        </Text>
                        <Text style={[styles.title]}>
                            image-bold
                        </Text>
                    </View>
                    <View style={styles.item}>
                        <Text>
                            <CustomIcon name="play-arrow-bold" size={20}/>
                        </Text>
                        <Text style={[styles.title]}>
                            play-arrow-bold
                        </Text>
                    </View>
                    <View style={styles.item}>
                        <Text>
                            <CustomIcon name="pause-bold" size={20}/>
                        </Text>
                        <Text style={styles.title}>pause-bold</Text>
                    </View>
                </View>
                <View style={styles.row}>
                    <View style={styles.item}>
                        <Text>
                            <CustomIcon name="radar-2-bold" size={20}/>
                        </Text>
                        <Text style={[styles.title]}>
                            radar-2-bold
                        </Text>
                    </View>
                    <View style={styles.item}>
                        <Text>
                            <CustomIcon name="search-normal-outline" size={20}/>
                        </Text>
                        <Text style={[styles.title, {fontSize: 12}]}>
                            search-normal-outline
                        </Text>
                    </View>
                    <View style={styles.item}>
                        <Text>
                            <CustomIcon name="eraser-outline" size={20}/>
                        </Text>
                        <Text style={styles.title}>
                            eraser-outline
                        </Text>
                    </View>
                    <View style={styles.item}>
                        <Text>
                            <CustomIcon name="volume-off-outline" size={20}/>
                        </Text>
                        <Text style={[styles.title, {fontSize: 12}]}>
                            volume-off-outline
                        </Text>
                    </View>
                </View>
                <View style={styles.row}>
                    <View style={styles.item}>
                        <Text>
                            <CustomIcon name="arrow-forward-outline" size={20}/>
                        </Text>
                        <Text style={[styles.title, {fontSize: 12}]}>arrow-forward-outline</Text>
                    </View>
                    <View style={styles.item}>
                        <Text>
                            <CustomIcon name="edit-1-outline" size={20}/>
                        </Text>
                        <Text style={[styles.title]}>
                            edit-1-outline
                        </Text>
                    </View>
                    <View style={styles.item}>
                        <Text>
                            <CustomIcon name="revers-time-outline" size={20}/>
                        </Text>
                        <Text style={[styles.title]}>revers-time-outline</Text>
                    </View>
                    <View style={[styles.item]}>
                        <Text>
                            <CustomIcon name="more-bold" size={20}/>
                        </Text>
                        <Text style={styles.title}>more-bold</Text>
                    </View>
                </View>
                <View style={styles.row}>
                    <View style={styles.item}>
                        <Text>
                            <CustomIcon name="smile-outline" size={20}/>
                        </Text>
                        <Text style={styles.title}>smile-outline</Text>
                    </View>
                    <View style={styles.item}>
                        <Text>
                            <CustomIcon name="copy-outline" size={20}/>
                        </Text>
                        <Text style={styles.title}>copy-outline</Text>
                    </View>
                    <View style={styles.item}>
                        <Text>
                            <CustomIcon name="quote-outline" size={20}/>
                        </Text>
                        <Text style={styles.title}>quote-outline</Text>
                    </View>
                    <View style={styles.item}>
                        <Text>
                            <CustomIcon name="attach-outline" size={20}/>
                        </Text>
                        <Text style={styles.title}>attach-outline</Text>
                    </View>
                </View>
                <View style={styles.row}>
                    <View style={styles.item}>
                        <Text>
                            <CustomIcon name="microphone-outline" size={20}/>
                        </Text>
                        <Text style={[styles.title, {fontSize: 12}]}>microphone-outline</Text>
                    </View>
                    <View style={styles.item}>
                        <Text>
                            <CustomIcon name="download-outline" size={20}/>
                        </Text>
                        <Text style={styles.title}>download-outline</Text>
                    </View>
                    <View style={styles.item}>
                        <Text>
                            <CustomIcon name="close-outline" size={20}/>
                        </Text>
                        <Text style={styles.title}>close-outline</Text>
                    </View>
                    <View style={styles.item}></View>
                </View>
                <View style={styles.row}>
                    <View style={styles.item}>
                        <Text>
                            <CustomIcon name="direction-down-outline" size={20}/>
                        </Text>
                        <Text style={[styles.title, {fontSize: 12}]}>direction-down-outline</Text>
                    </View>
                    <View style={[styles.item]}>
                        <Text>
                            <CustomIcon name="direction-down-bold" size={20}/>
                        </Text>
                        <Text style={[styles.title, {fontSize: 12}]}>direction-down-bold</Text>
                    </View>

                    <View style={styles.item}>
                        <Text>
                            <CustomIcon name="direction-up-outline" size={20}/>
                        </Text>
                        <Text style={[styles.title, {fontSize: 12}]}>direction-up-outline</Text>
                    </View>
                    <View style={[styles.item]}>
                        <Text>
                            <CustomIcon name="direction-up-bold" size={20}/>
                        </Text>
                        <Text style={styles.title}>direction-up-bold</Text>
                    </View>
                </View>
                <View style={styles.row}>
                    <View style={styles.item}>
                        <Text>
                            <CustomIcon name="direction-left-outline" size={20}/>
                        </Text>
                        <Text style={[styles.title, {fontSize: 12}]}>
                            direction-left-outline
                        </Text>
                    </View>
                    <View style={styles.item}>
                        <Text>
                            <CustomIcon name="direction-left-bold" size={20}/>
                        </Text>
                        <Text style={[styles.title]}>
                            direction-left-bold
                        </Text>
                    </View>
                    <View style={styles.item}>
                        <Text>
                            <CustomIcon name="direction-right-outline" size={20}/>
                        </Text>
                        <Text style={[styles.title, {fontSize: 12}]}>direction-right-outline</Text>
                    </View>
                    <View style={styles.item}>
                        <Text>
                            <CustomIcon name="direction-right-bold" size={20}/>
                        </Text>
                        <Text style={[styles.title, {fontSize: 12}]}>
                            direction-right-bold
                        </Text>
                    </View>
                </View>
                <View style={styles.row}>
                    <View style={styles.item}>
                        <Text>
                            <CustomIcon name="share-outline" size={20}/>
                        </Text>
                        <Text style={styles.title}>share-outline</Text>
                    </View>
                    <View style={styles.item}>
                        <Text>
                            <CustomIcon name="share-bold" size={20}/>
                        </Text>
                        <Text style={[styles.title]}>
                            share-bold
                        </Text>
                    </View>

                    <View style={styles.item}>
                        <Text>
                            <CustomIcon name="setting-outline" size={20}/>
                        </Text>
                        <Text style={styles.title}>
                            setting-outline
                        </Text>
                    </View>
                    <View style={styles.item}>
                        <Text>
                            <CustomIcon name="setting-bold" size={20}/>
                        </Text>
                        <Text style={[styles.title]}>
                            setting-bold
                        </Text>
                    </View>
                </View>
                <View style={styles.row}>
                    <View style={styles.item}>
                        <Text>
                            <CustomIcon name="pie-chart-outline" size={20}/>
                        </Text>
                        <Text style={styles.title}>
                            pie-chart-outline
                        </Text>
                    </View>
                    <View style={styles.item}>
                        <Text>
                            <CustomIcon name="pie-chart-bold" size={20}/>
                        </Text>
                        <Text style={[styles.title]}>
                            pie-chart-bold
                        </Text>
                    </View>
                    <View style={styles.item}>
                        <Text>
                            <CustomIcon name="edit-outline" size={20}/>
                        </Text>
                        <Text style={[styles.title]}>
                            edit-outline
                        </Text>
                    </View>
                    <View style={[styles.item]}>
                        <Text>
                            <CustomIcon name="edit-bold" size={20}/>
                        </Text>
                        <Text style={styles.title}>edit-bold</Text>
                    </View>
                </View>
                <View style={styles.row}>
                    <View style={styles.item}>
                        <Text>
                            <CustomIcon name="gift-outline" size={20}/>
                        </Text>
                        <Text style={[styles.title]}>
                            gift-outline
                        </Text>
                    </View>
                    <View style={[styles.item]}>
                        <Text>
                            <CustomIcon name="gift-bold" size={20}/>
                        </Text>
                        <Text style={styles.title}>gift-bold</Text>
                    </View>
                    <View style={styles.item}>
                        <Text>
                            <CustomIcon name="chat-outline" size={20}/>
                        </Text>
                        <Text style={styles.title}>chat-outline</Text>
                    </View>
                    <View style={styles.item}>
                        <Text>
                            <CustomIcon name="chat-bold" size={20}/>
                        </Text>
                        <Text style={styles.title}>chat-bold</Text>
                    </View>
                </View>
                <View style={styles.row}>
                    <View style={styles.item}>
                        <Text>
                            <CustomIcon name="guard-outline" size={20}/>
                        </Text>
                        <Text style={styles.title}>
                            guard-outline
                        </Text>
                    </View>
                    <View style={styles.item}>
                        <Text>
                            <CustomIcon name="guard-bold" size={20}/>
                        </Text>
                        <Text style={[styles.title]}>
                            guard-bold
                        </Text>
                    </View>
                    <View style={styles.item}>
                        <Text>
                            <CustomIcon name="sun-outline" size={20}/>
                        </Text>
                        <Text style={styles.title}>
                            sun-outline
                        </Text>
                    </View>
                    <View style={[styles.item]}>
                        <Text>
                            <CustomIcon name="sun-bold" size={20}/>
                        </Text>
                        <Text style={styles.title}>sun-bold</Text>
                    </View>
                </View>
                <View style={styles.row}>
                    <View style={styles.item}>
                        <Text>
                            <CustomIcon name="circle-pin-outline" size={20}/>
                        </Text>
                        <Text style={styles.title}>circle-pin-outline</Text>
                    </View>
                    <View style={styles.item}>
                        <Text>
                            <CustomIcon name="circle-pin-bold" size={20}/>
                        </Text>
                        <Text style={styles.title}>circle-pin-bold</Text>
                    </View>
                    <View style={styles.item}>
                        <Text>
                            <CustomIcon name="message-outline" size={20}/>
                        </Text>
                        <Text style={styles.title}>
                            message-outline
                        </Text>
                    </View>
                    <View style={styles.item}>
                        <Text>
                            <CustomIcon name="message-bold" size={20}/>
                        </Text>
                        <Text style={[styles.title]}>
                            message-bold
                        </Text>
                    </View>
                </View>
                <View style={styles.row}>
                    <View style={styles.item}>
                        <Text>
                            <CustomIcon name="calender-outline" size={20}/>
                        </Text>
                        <Text style={styles.title}>calender-outline</Text>
                    </View>
                    <View style={styles.item}>
                        <Text>
                            <CustomIcon name="calender-bold" size={20}/>
                        </Text>
                        <Text style={[styles.title]}>
                            calender-bold
                        </Text>
                    </View>
                    <View style={styles.item}>
                        <Text>
                            <CustomIcon name="headphone-outline" size={20}/>
                        </Text>
                        <Text style={styles.title}>headphone-outline</Text>
                    </View>
                    <View style={styles.item}>
                        <Text>
                            <CustomIcon name="headphone-bold" size={20}/>
                        </Text>
                        <Text style={[styles.title]}>
                            headphone-bold
                        </Text>
                    </View>
                </View>
                <View style={styles.row}>
                    <View style={styles.item}>
                        <Text>
                            <CustomIcon name="help-outline" size={20}/>
                        </Text>
                        <Text style={[styles.title]}>
                            help-outline
                        </Text>
                    </View>
                    <View style={[styles.item]}>
                        <Text>
                            <CustomIcon name="help-bold" size={20}/>
                        </Text>
                        <Text style={styles.title}>help-bold</Text>
                    </View>
                    <View style={styles.item}>
                        <Text>
                            <CustomIcon name="teacher-outline" size={20}/>
                        </Text>
                        <Text style={styles.title}>teacher-outline</Text>
                    </View>
                    <View style={styles.item}>
                        <Text>
                            <CustomIcon name="teacher-bold" size={20}/>
                        </Text>
                        <Text style={[styles.title]}>
                            teacher-bold
                        </Text>
                    </View>
                </View>
                <View style={styles.row}>
                    <View style={styles.item}>
                        <Text>
                            <CustomIcon name="call-outline" size={20}/>
                        </Text>
                        <Text style={styles.title}>call-outline</Text>
                    </View>
                    <View style={styles.item}>
                        <Text>
                            <CustomIcon name="call-bold" size={20}/>
                        </Text>
                        <Text style={[styles.title]}>
                            call-bold
                        </Text>
                    </View>
                    <View style={styles.item}>
                        <Text>
                            <CustomIcon name="checked-circle-outline" size={20}/>
                        </Text>
                        <Text style={[styles.title, {fontSize: 12}]}>checked-circle-outline</Text>
                    </View>
                    <View style={styles.item}>
                        <Text>
                            <CustomIcon name="checked-circle-bold" size={20}/>
                        </Text>
                        <Text style={[styles.title, {fontSize: 12}]}>
                            checked-circle-bold
                        </Text>
                    </View>
                </View>
                <View style={styles.row}>
                    <View style={styles.item}>
                        <Text>
                            <CustomIcon name="building-outline" size={20}/>
                        </Text>
                        <Text style={styles.title}>building-outline</Text>
                    </View>
                    <View style={styles.item}>
                        <Text>
                            <CustomIcon name="buildings-bold" size={20}/>
                        </Text>
                        <Text style={[styles.title]}>
                            buildings-bold
                        </Text>
                    </View>
                    <View style={styles.item}>
                        <Text>
                            <CustomIcon name="car-outline" size={20}/>
                        </Text>
                        <Text style={styles.title}>car-outline</Text>
                    </View>
                    <View style={styles.item}>
                        <Text>
                            <CustomIcon name="car-bold" size={20}/>
                        </Text>
                        <Text style={[styles.title]}>
                            car-bold
                        </Text>
                    </View>
                </View>
                <View style={styles.row}>
                    <View style={styles.item}>
                        <Text>
                            <CustomIcon name="clock-outline" size={20}/>
                        </Text>
                        <Text style={styles.title}>clock-outline</Text>
                    </View>
                    <View style={styles.item}>
                        <Text>
                            <CustomIcon name="clock-bold" size={20}/>
                        </Text>
                        <Text style={[styles.title]}>
                            clock-bold
                        </Text>
                    </View>
                    <View style={styles.item}>
                        <Text>
                            <CustomIcon name="home-outline" size={20}/>
                        </Text>
                        <Text style={styles.title}>
                            home-outline
                        </Text>
                    </View>
                    <View style={styles.item}>
                        <Text>
                            <CustomIcon name="home-bold" size={20}/>
                        </Text>
                        <Text style={[styles.title]}>
                            home-bold
                        </Text>
                    </View>
                </View>
                <View style={styles.row}>
                    <View style={styles.item}>
                        <Text>
                            <CustomIcon name="category-outline" size={20}/>
                        </Text>
                        <Text style={styles.title}>category-outline</Text>
                    </View>
                    <View style={styles.item}>
                        <Text>
                            <CustomIcon name="category-bold" size={20}/>
                        </Text>
                        <Text style={[styles.title]}>
                            category-bold
                        </Text>
                    </View>
                    <View style={styles.item}>
                        <Text>
                            <CustomIcon name="user-outline" size={20}/>
                        </Text>
                        <Text style={[styles.title]}>
                            user-outline
                        </Text>
                    </View>
                    <View style={styles.item}>
                        <Text>
                            <CustomIcon name="user-bold" size={20}/>
                        </Text>
                        <Text style={[styles.title]}>
                            user-bold
                        </Text>
                    </View>
                </View>
                <View style={styles.row}>
                    <View style={styles.item}>
                        <Text>
                            <CustomIcon name="tick-outline" size={20}/>
                        </Text>
                        <Text style={styles.title}>
                            tick-outline
                        </Text>
                    </View>
                    <View style={styles.item}>
                        <Text>
                            <CustomIcon name="double-tick-outline" size={20}/>
                        </Text>
                        <Text style={[styles.title, {fontSize: 12}]}>
                            double-tick-outline
                        </Text>
                    </View>
                    <View style={styles.item}>
                        <Text>
                            <CustomIcon name="loading-outline" size={20}/>
                        </Text>
                        <Text style={[styles.title]}>
                            loading-outline
                        </Text>
                    </View>
                    <View style={styles.item}>
                        <Text>
                            <CustomIcon name="loading-bold" size={20}/>
                        </Text>
                        <Text style={[styles.title]}>
                            loading-bold
                        </Text>
                    </View>
                </View>
                <View style={styles.row}>
                    <View style={styles.item}>
                        <Text>
                            <CustomIcon name="close-circle-outline" size={20}/>
                        </Text>
                        <Text style={[styles.title, {fontSize: 12}]}>close-circle-outline</Text>
                    </View>
                    <View style={styles.item}>
                        <Text>
                            <CustomIcon name="close-circle-bold" size={20}/>
                        </Text>
                        <Text style={[styles.title]}>
                            close-circle-bold
                        </Text>
                    </View>
                    <View style={styles.item}>
                        <Text>
                            <CustomIcon name="tick-circle-outline" size={20}/>
                        </Text>
                        <Text style={[styles.title]}>
                            tick-circle-outline
                        </Text>
                    </View>
                    <View style={styles.item}>
                        <Text>
                            <CustomIcon name="tick-circle-bold" size={20}/>
                        </Text>
                        <Text style={[styles.title]}>
                            tick-circle-bold
                        </Text>
                    </View>
                </View>
                <View style={styles.row}>
                    <View style={styles.item}>
                        <Text>
                            <CustomIcon name="info-circle-outline" size={20}/>
                        </Text>
                        <Text style={styles.title}>info-circle-outline</Text>
                    </View>
                    <View style={[styles.item]}>
                        <Text>
                            <CustomIcon name="info-circle-bold" size={20}/>
                        </Text>
                        <Text style={styles.title}>info-circle-bold</Text>
                    </View>
                    <View style={styles.item}>
                        <Text>
                            <CustomIcon name="warning-outline" size={20}/>
                        </Text>
                        <Text style={[styles.title]}>
                            warning-outline
                        </Text>
                    </View>
                    <View style={styles.item}>
                        <Text>
                            <CustomIcon name="warning-bold" size={20}/>
                        </Text>
                        <Text style={[styles.title]}>
                            warning-bold
                        </Text>
                    </View>
                </View>
                <View style={styles.row}>
                    <View style={styles.item}>
                        <Text>
                            <CustomIcon name="notification-outline" size={20}/>
                        </Text>
                        <Text style={[styles.title, {fontSize: 12}]}>
                            notification-outline
                        </Text>
                    </View>
                    <View style={styles.item}>
                        <Text>
                            <CustomIcon name="notification-bold" size={20}/>
                        </Text>
                        <Text style={[styles.title]}>
                            notification-bold
                        </Text>
                    </View>
                    <View style={styles.item}>
                        <Text>
                            <CustomIcon name="pin-location-outline" size={20}/>
                        </Text>
                        <Text style={[styles.title, {fontSize: 12}]}>pin-location-outline</Text>
                    </View>
                    <View style={[styles.item]}>
                        <Text>
                            <CustomIcon name="pin-location-bold" size={20}/>
                        </Text>
                        <Text style={styles.title}>pin-location-bold</Text>
                    </View>
                </View>
                <View style={styles.row}>
                    <View style={styles.item}>
                        <Text>
                            <CustomIcon name="circle-outline" size={20}/>
                        </Text>
                        <Text style={styles.title}>circle-outline</Text>
                    </View>
                    <View style={styles.item}>
                        <Text>
                            <CustomIcon name="circle-bold" size={20}/>
                        </Text>
                        <Text style={[styles.title]}>
                            circle-bold
                        </Text>
                    </View>
                    <View style={styles.item}>
                        <Text>
                            <CustomIcon name="export-outline" size={20}/>
                        </Text>
                        <Text style={styles.title}>export-outline</Text>
                    </View>
                    <View style={styles.item}>
                        <Text>
                            <CustomIcon name="export-bold" size={20}/>
                        </Text>
                        <Text style={[styles.title]}>
                            export-bold
                        </Text>
                    </View>
                </View>
                <View style={styles.row}>
                    <View style={styles.item}>
                        <Text>
                            <CustomIcon name="trash-outline" size={20}/>
                        </Text>
                        <Text style={styles.title}>trash-outline</Text>
                    </View>
                    <View style={styles.item}>
                        <Text>
                            <CustomIcon name="trash-bold" size={20}/>
                        </Text>
                        <Text style={styles.title}>trash-bold</Text>
                    </View>
                    <View style={styles.item}>
                        <Text>
                            <CustomIcon name="visibility-outline" size={20}/>
                        </Text>
                        <Text style={styles.title}>visibility-outline</Text>
                    </View>
                    <View style={styles.item}>
                        <Text>
                            <CustomIcon name="visibility-bold" size={20}/>
                        </Text>
                        <Text style={[styles.title]}>
                            visibility-bold
                        </Text>
                    </View>
                </View>
                <View style={styles.row}>
                    <View style={styles.item}>
                        <Text>
                            <CustomIcon name="visibility-off-outline" size={20}/>
                        </Text>
                        <Text style={[styles.title, {fontSize: 12}]}>
                            visibility-off-outline
                        </Text>
                    </View>
                    <View style={styles.item}>
                        <Text>
                            <CustomIcon name="visibility-off-bold" size={20}/>
                        </Text>
                        <Text style={styles.title}>visibility-off-bold</Text>
                    </View>
                    <View style={styles.item}>
                        <Text>
                            <CustomIcon name="filter-outline" size={20}/>
                        </Text>
                        <Text style={[styles.title, {fontSize: 12}]}>
                            filter-outline
                        </Text>
                    </View>
                    <View style={styles.item}>
                        <Text>
                            <CustomIcon name="filter-bold" size={20}/>
                        </Text>
                        <Text style={styles.title}>filter-bold</Text>
                    </View>
                </View>
                <View style={styles.row}>
                    <View style={styles.item}>
                        <Text>
                            <CustomIcon name="location-on-outline" size={20}/>
                        </Text>
                        <Text style={styles.title}>location-on-outline</Text>
                    </View>
                    <View style={styles.item}>
                        <Text>
                            <CustomIcon name="location-on-bold" size={20}/>
                        </Text>
                        <Text style={styles.title}>location-on-bold</Text>
                    </View>
                    <View style={styles.item}>
                        <Text>
                            <CustomIcon name="pin-drop-outline" size={20}/>
                        </Text>
                        <Text style={[styles.title]}>
                            pin-drop-outline
                        </Text>
                    </View>
                    <View style={styles.item}>
                        <Text>
                            <CustomIcon name="pin-drop-bold" size={20}/>
                        </Text>
                        <Text style={[styles.title]}>
                            pin-drop-bold
                        </Text>
                    </View>
                </View>
                <View style={styles.row}>
                    <View style={styles.item}>
                        <Text>
                            <CustomIcon name="layer-outline" size={20}/>
                        </Text>
                        <Text style={styles.title}>layer-outline</Text>
                    </View>
                    <View style={styles.item}>
                        <Text>
                            <CustomIcon name="layer-bold" size={20}/>
                        </Text>
                        <Text style={styles.title}>layer-bold</Text>
                    </View>
                    <View style={styles.item}>
                        <Text>
                            <CustomIcon name="coffee-outline" size={20}/>
                        </Text>
                        <Text style={styles.title}>coffee-outline</Text>
                    </View>
                    <View style={styles.item}>
                        <Text>
                            <CustomIcon name="coffee-bold" size={20}/>
                        </Text>
                        <Text style={styles.title}>coffee-bold</Text>
                    </View>
                </View>
                <View style={styles.row}>
                    <View style={styles.item}>
                        <Text>
                            <CustomIcon name="flag-outline" size={20}/>
                        </Text>
                        <Text style={[styles.title]}>
                            flag-outline
                        </Text>
                    </View>
                    <View style={styles.item}>
                        <Text>
                            <CustomIcon name="flag-bold" size={20}/>
                        </Text>
                        <Text style={[styles.title]}>
                            flag-bold
                        </Text>
                    </View>
                    <View style={styles.item}>
                        <Text>
                            <CustomIcon name="tag-user-outline" size={20}/>
                        </Text>
                        <Text style={styles.title}>
                            tag-user-outline
                        </Text>
                    </View>
                    <View style={styles.item}>
                        <Text>
                            <CustomIcon name="tag-user-bold" size={20}/>
                        </Text>
                        <Text style={styles.title}>
                            tag-user-bold
                        </Text>
                    </View>
                </View>
                <View style={styles.row}>
                    <View style={styles.item}>
                        <Text>
                            <CustomIcon name="more-2-outline" size={20}/>
                        </Text>
                        <Text style={styles.title}>more-2-outline</Text>
                    </View>
                    <View style={styles.item}>
                        <Text>
                            <CustomIcon name="more-2-bold" size={20}/>
                        </Text>
                        <Text style={styles.title}>more-2-bold</Text>
                    </View>
                    <View style={styles.item}>
                        <Text>
                            <CustomIcon name="chart-outline" size={20}/>
                        </Text>
                        <Text style={styles.title}>
                            chart-outline
                        </Text>
                    </View>
                    <View style={styles.item}>
                        <Text>
                            <CustomIcon name="chart-bold" size={20}/>
                        </Text>
                        <Text style={styles.title}>
                            chart-bold
                        </Text>
                    </View>
                </View>
                <View style={styles.row}>
                    <View style={styles.item}>
                        <Text>
                            <CustomIcon name="stop-outline" size={20}/>
                        </Text>
                        <Text style={styles.title}>stop-outline</Text>
                    </View>
                    <View style={styles.item}>
                        <Text>
                            <CustomIcon name="stop-bold" size={20}/>
                        </Text>
                        <Text style={styles.title}>stop-bold</Text>
                    </View>
                    <View style={styles.item}>
                        <Text>
                            <CustomIcon name="document-text-outline" size={20}/>
                        </Text>
                        <Text style={styles.title}>document-text-outline</Text>
                    </View>
                    <View style={styles.item}>
                        <Text>
                            <CustomIcon name="document-text-bold" size={20}/>
                        </Text>
                        <Text style={styles.title}>document-text-bold</Text>
                    </View>
                </View>
                <View style={styles.row}>
                    <View style={styles.item}>
                        <Text>
                            <CustomIcon name="messages-3-outline" size={20}/>
                        </Text>
                        <Text style={[styles.title]}>messages-3-outline</Text>
                    </View>
                    <View style={styles.item}>
                        <Text>
                            <CustomIcon name="messages-3-bold" size={20}/>
                        </Text>
                        <Text style={[styles.title]}>messages-3-bold</Text>
                    </View>
                    <View style={styles.item}>
                        <Text>
                            <CustomIcon name="logout-outline" size={20}/>
                        </Text>
                        <Text style={[styles.title]}>logout-outline</Text>
                    </View>
                    <View style={styles.item}>
                        <Text>
                            <CustomIcon name="logout-bold" size={20}/>
                        </Text>
                        <Text style={[styles.title]}>logout-bold</Text>
                    </View>
                </View>
                <View style={styles.row}>
                    <View style={styles.item}>
                        <Text>
                            <CustomIcon name="sort-descending-outline" size={20}/>
                        </Text>
                        <Text style={[styles.title]}>sort-descending-outline</Text>
                    </View>
                    <View style={styles.item}>
                        <Text>
                            <CustomIcon name="sort-descending-bold" size={20}/>
                        </Text>
                        <Text style={[styles.title]}>sort-descending-bold</Text>
                    </View>
                    <View style={styles.item}>
                        <Text>
                            <CustomIcon name="sort-ascending-outline" size={20}/>
                        </Text>
                        <Text style={[styles.title]}>sort-ascending-outline</Text>
                    </View>
                    <View style={styles.item}>
                        <Text>
                            <CustomIcon name="sort-ascending-bold" size={20}/>
                        </Text>
                        <Text style={[styles.title]}>sort-ascending-bold</Text>
                    </View>
                </View>
                <View style={styles.row}>
                    <View style={styles.item}>
                        <Text>
                            <CustomIcon name="lock-outline" size={20}/>
                        </Text>
                        <Text style={[styles.title]}>lock-outline</Text>
                    </View>
                    <View style={styles.item}>
                        <Text>
                            <CustomIcon name="lock-bold" size={20}/>
                        </Text>
                        <Text style={[styles.title]}>lock-bold</Text>
                    </View>
                    <View style={styles.item}>
                        <Text>
                            <CustomIcon name="unlock-outline" size={20}/>
                        </Text>
                        <Text style={[styles.title]}>unlock-outline</Text>
                    </View>
                    <View style={styles.item}>
                        <Text>
                            <CustomIcon name="unlock-bold" size={20}/>
                        </Text>
                        <Text style={[styles.title]}>unlock-bold</Text>
                    </View>
                </View>
                <View style={styles.row}>
                    <View style={styles.item}>
                        <Text>
                            <CustomIcon name="small-caps-outline" size={20}/>
                        </Text>
                        <Text style={[styles.title]}>small-caps-outline</Text>
                    </View>
                    <View style={styles.item}>
                        <Text>
                            <CustomIcon name="small-caps-bold" size={20}/>
                        </Text>
                        <Text style={[styles.title]}>small-caps-bold</Text>
                    </View>
                    <View style={styles.item}>
                        <Text>
                            <CustomIcon name="direct-notification-outline" size={20}/>
                        </Text>
                        <Text style={[styles.title]}>direct-notification-outline</Text>
                    </View>
                    <View style={styles.item}>
                        <Text>
                            <CustomIcon name="direct-notification-bold" size={20}/>
                        </Text>
                        <Text style={[styles.title]}>direct-notification-bold</Text>
                    </View>
                </View>
            </View>
        </ScrollView>
    )
}


const styles = StyleSheet.create({
    container: {
        flexGrow: 1
    },
    row: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-around"
    },
    item: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        margin: 10
    },
    title: {
        fontSize: 15,
        fontWeight: "bold",
    }
})