import React, {useState} from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import {useTheme} from "@react-navigation/native";
import gStyles from "../global-styles/GlobalStyles";
import CustomText from "./CustomText";
import KhiyabunIcons from "./KhiyabunIcons";



const TagInput = ({placeholderText,getData}) => {
    const{colors} = useTheme();
    const styles = useThemedStyles();
    const [tags, setTags] = useState([]);
    const [text, setText] = useState('');
    const [editIndex, setEditIndex] = useState(null);

    const onChangeHandler = (value) => {
        if(!value.trim().length && editIndex !== null){
            setEditIndex(null);
        }
        setText(value);
    }

    const addTag = () => {
        if (text.trim() !== '') {
            let newTags;
            if (editIndex !== null) {
                // If editing an existing tag
                newTags = [...tags];
                newTags[editIndex] = text.trim();
                setEditIndex(null);
            } else {
                // If adding a new tag
                newTags = [...tags, text.trim()];
            }
            setTags(newTags);
            getData(newTags)
            setText('');
        }
    };

    const removeTag = (index) => {
        const newTags = [...tags];
        newTags.splice(index, 1);
        setTags(newTags);
    };

    const editTag = (index) => {
        const tagToEdit = tags[index];
        setText(tagToEdit);
        setEditIndex(index);
    };

    return (
        <View style={styles.container}>
            <View style={[styles.inputContainer,gStyles.inputContainer]}>
                <TextInput
                    style={[styles.input,gStyles.input]}
                    placeholderTextColor={colors.onSurfaceLowest}
                    placeholder={placeholderText}
                    value={text}
                    onChangeText={onChangeHandler}
                    onSubmitEditing={addTag}
                />
                {/*<TouchableOpacity onPress={addTag} style={styles.addButton}>*/}
                {/*    <Text style={styles.buttonText}>*/}
                {/*        {editIndex !== null ? 'Update' : 'Add'}*/}
                {/*    </Text>*/}
                {/*</TouchableOpacity>*/}
            </View>
            <View style={styles.tagContainer}>
                {tags.map((tag, index) => (
                    <View key={index} style={styles.tagWrapper}>
                        <TouchableOpacity
                            onPress={() => editTag(index)}
                            style={styles.tag}>
                            <CustomText size={12}>
                                {tag}
                            </CustomText>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => removeTag(index)}
                            style={styles.removeButton}>
                            <KhiyabunIcons name="close-outline" size={16} color={colors.onSurfaceLow}/>
                        </TouchableOpacity>
                    </View>
                ))}
            </View>
        </View>
    );
};

const useThemedStyles = () => {
    const {colors} = useTheme();

    return StyleSheet.create({
        container: {
            width: '100%',
        },
        inputContainer: {
            borderColor: colors.outlineSurface,
        },
        input: {
            color: colors.onSurface
        },
        tagContainer: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            paddingVertical: 7,
            gap:5,
        },
        tagWrapper: {
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 8,
            backgroundColor: colors.surfaceContainerLow,
            borderRadius: 20,
            gap:5
        },
        tag: {
            paddingVertical: 5,
        },
        removeButton: {
            paddingVertical: 5,
        },
        addButton: {
            backgroundColor: '#4CAF50',
            paddingHorizontal: 15,
            paddingVertical: 10,
            borderRadius: 5,
        },
        buttonText: {
            color: '#FFFFFF',
            fontSize: 16,
            fontWeight: 'bold',
        },
    });
}


export default TagInput;
