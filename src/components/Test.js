// Sheet.js

import React, { useRef, useEffect } from 'react';
import { View, StyleSheet, PanResponder, Animated, TouchableOpacity } from 'react-native';

const BottomSheet = ({ isOpen, onClose, height = 500, children }) => {
    const panY = useRef(new Animated.Value(height)).current;

    useEffect(() => {
        if (isOpen) {
            Animated.spring(panY, {
                toValue: 0,
                useNativeDriver: false,
            }).start();
        } else {
            Animated.timing(panY, {
                toValue: height,
                duration: 300,
                useNativeDriver: false,
            }).start(() => onClose && onClose());
        }
    }, [isOpen, onClose, panY, height]);

    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderMove: Animated.event(
                [null, { dy: panY }],
                { useNativeDriver: false }
            ),
            onPanResponderRelease: (e, gestureState) => {
                if (gestureState.dy > 50) {
                    onClose && onClose();
                } else {
                    Animated.spring(panY, {
                        toValue: 0,
                        useNativeDriver: false,
                    }).start();
                }
            },
        })
    ).current;

    const translateY = panY.interpolate({
        inputRange: [0, height],
        outputRange: [0, height],
        extrapolate: 'clamp',
    });

    return (
        <>
            {isOpen && (
                <TouchableOpacity
                    style={styles.backdrop}
                    activeOpacity={1}
                    onPress={onClose}
                />
            )}
            <Animated.View
                style={[styles.container, { transform: [{ translateY }] }]}
                {...panResponder.panHandlers}
            >
                {children}
            </Animated.View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        padding: 20,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
    },
    backdrop: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
});

export default BottomSheet;