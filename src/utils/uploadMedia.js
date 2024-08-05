import {useDispatch} from 'react-redux';
import {uploadFile as uploadFileAction} from "../redux/actions/uploadFileAction";
import * as DocumentPicker from 'expo-document-picker';
import * as ImagePicker from "expo-image-picker"

// Updated useUploadFile hook
export const useUploadFile = () => {
    const dispatch = useDispatch();

    const uploadFile = async (onProgress, type = "file") => {
        let result;
        result = await ImagePicker.launchCameraAsync();
        if (type === "gallery") {
            result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 1,
                cameraType: "front"
            });
        }
        if (type === "camera") {
            result = await ImagePicker.launchCameraAsync();
        }
        if (type === "file") {
            result = await DocumentPicker.getDocumentAsync({
                type: '*/*',
                copyToCacheDirectory: true,
            });
        }

        if (result.canceled) {
            return {success: false, error: 'File selection was canceled or failed.'};
        }

        const filename = result.assets[0].uri.split('/').pop();
        const file = {
            uri: result.assets[0].uri,
            name: filename,
            type: result.assets[0].mimeType || 'application/octet-stream',
        };

        try {
            const response = await dispatch(uploadFileAction({file, onProgress})).unwrap();
            return {success: true, data: response};
        } catch (error) {
            return {success: false, error: error.message};
        }
    };

    return {uploadFile};
};