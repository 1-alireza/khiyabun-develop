import { createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_UPLOAD_URL, TOKEN_KEY } from "../../utils/constant";

export const uploadFile = createAsyncThunk(
    'upload/uploadFile',
    async ({ file, onProgress }) => {
        const formData = new FormData();
        formData.append('file', file);
        let token = await AsyncStorage.getItem(TOKEN_KEY);

        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open('POST', BASE_UPLOAD_URL);
            xhr.setRequestHeader('Authorization', `Bearer ${token}`);
            xhr.setRequestHeader('Accept', 'application/json');

            // Track progress events (upload)
            xhr.upload.onprogress = (event) => {
                if (event.lengthComputable) {
                    const progress = Math.round((event.loaded / event.total) * 100);
                    onProgress(progress);
                }
            };

            xhr.onload = () => {
                if (xhr.status === 200) {
                    resolve(JSON.parse(xhr.response));
                } else {
                    reject(new Error('Upload failed: ' + xhr.statusText));
                }
            };

            xhr.onerror = () => {
                reject(new Error('Upload failed: There was a connection error.'));
            };

            xhr.send(formData);
        });
    }
);