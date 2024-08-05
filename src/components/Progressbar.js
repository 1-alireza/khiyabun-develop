// CustomProgressBar.js

import React from 'react';
import { StyleSheet } from 'react-native';
import * as Progress from 'react-native-progress';

const CustomProgressBar = ({ progress, width = 300, height = 20, color = "#3b5998", borderColor = "#3b5998" }) => {
    return (
        <Progress.Bar
            progress={progress}
            width={width}
            height={height}
            color={color}
            unfilledColor="#e0e0e0"
            borderColor={borderColor}
            style={styles.progressBar}
        />
    );
};

const styles = StyleSheet.create({
    progressBar: {
        marginTop: 20,
    },
});

export default CustomProgressBar;