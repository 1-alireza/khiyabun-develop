// Sheet.js
import React, {useRef, useEffect} from 'react';
import {View, StyleSheet, Text, Platform} from 'react-native';
import {Modalize} from 'react-native-modalize';
import {useTheme} from "@react-navigation/native";
import Button from "./Button";

const Sheet = ({
                   isOpen,
                   onClose,
                   modalStyle,
                   modalHeight = 220,
                   snapPoint,
                   isWithOverlay = true,
                   isWithHandle = true,
                   handleStyle,
                   onCloseCallBack,
                   contentWrapperStyle,
                   scrollable = false,
                   onOpenCallBack,
                   children,
                   fitContent = false,
                   footerComponent,
                   onBackButtonPress
               }) => {

    const modalRef = useRef(null);
    const {colors} = useTheme();
    const styles = useThemedStyles(colors);
    const openModal = async () => {
        await modalRef.current?.open();
    };

    const closeModal = () => {
        modalRef.current?.close();
    };

    // Effect to handle open/close based on isOpen prop
    useEffect(() => {
        if (isOpen) {
            openModal();
        } else {
            closeModal();
        }
    }, [isOpen]); // Only re-run effect if isOpen changes

    return (
        <>
            {fitContent ?
                <Modalize
                    ref={modalRef}
                    onClosed={onClose}
                    avoidKeyboard={true}
                    modalStyle={modalStyle ? modalStyle : styles.modal}
                    snapPoint={snapPoint}
                    withOverlay={isWithOverlay}
                    handleStyle={handleStyle ? handleStyle : styles.handle}
                    withHandle={isWithHandle}
                    onClose={onCloseCallBack ? onCloseCallBack : ""}
                    onOpen={onOpenCallBack ? onOpenCallBack : ""}
                    onLayout={() => console.log(123)}
                    avoidKeyboardLikeIOS={true}
                    onBackButtonPress={onBackButtonPress}
                    disableScrollIfPossible={scrollable}
                    adjustToContentHeight={fitContent}
                    FooterComponent={footerComponent}
                >
                    <View style={contentWrapperStyle ? contentWrapperStyle : styles.content}>
                        {children}
                    </View>

                </Modalize> :
                (<Modalize
                    ref={modalRef}
                    onClosed={onClose}
                    avoidKeyboard={true}
                    keyboardAvoidingBehavior={Platform.OS === "ios" ? "padding" : "height"}
                    modalStyle={modalStyle ? modalStyle : styles.modal}
                    snapPoint={snapPoint}
                    modalHeight={modalHeight}
                    withOverlay={isWithOverlay}
                    handleStyle={handleStyle ? handleStyle : styles.handle}
                    withHandle={isWithHandle}
                    onClose={onCloseCallBack ? onCloseCallBack : ""}
                    onOpen={onOpenCallBack ? onOpenCallBack : ""}
                    onLayout={() => console.log(123)}
                    avoidKeyboardLikeIOS={true}
                    onBackButtonPress={onBackButtonPress}
                    disableScrollIfPossible={scrollable}
                    FooterComponent={footerComponent}
                >
                    <View style={contentWrapperStyle ? contentWrapperStyle : styles.content}>
                        {children}
                    </View>
                </Modalize>)
            }
        </>

    );
};
const useThemedStyles = (colors) => {
    return StyleSheet.create({
        modal: {
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: colors.surfaceContainerLowest,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
        },
        handle: {
            backgroundColor: '#ccc',
            height: 6,
            width: 50,
            borderRadius: 6,
            marginBottom: 10,
        },
        overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
        },
        content: {
            padding: 22,
            alignItems: 'center',
        },
        title: {
            fontSize: 20,
            fontWeight: 'bold',
            marginBottom: 10,
        },
    });

};
export default Sheet;

