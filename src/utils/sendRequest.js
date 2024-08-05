import {BASE_URL, TOKEN_KEY} from "./constant";
import AsyncStorage from "@react-native-async-storage/async-storage";
import i18n from "i18next";


export const sendRequest = async (url, body, method, need_token, status = '') => {
    // console.log("body in send request", body.length);
    const locale = i18n.language;
    let full_url = BASE_URL + url + (['GET'].includes(method) && Object.keys(body).length ? ('?' + (new URLSearchParams(body)).toString()) : '');
    let token = await AsyncStorage.getItem(TOKEN_KEY);
    let headers = {
        locale: locale
    };

    if (need_token) headers['Authorization'] = "Bearer " + token;
    if (status !== 'upload') headers['Content-Type'] = 'application/json';

    // console.log("full_url in send request", full_url);
    // console.log("url in send request", url);
    // console.log("body in send request", body);
    // console.log("method in send request", method);
    // console.log("need_token in send request", need_token);
    // console.log("status in send request", status);
    // console.log("headers", headers);

    let options = {
        method,
        headers,
        ...(['POST', 'PUT'].includes(method) ? {body: (status === 'upload' ? body : JSON.stringify(body))} : {}),
        // ...(['POST', 'PUT', 'DELETE'].includes(method) ? {body: (status === 'upload' ? body : JSON.stringify(body))} : {}),
    }
    return await fetch(full_url, options).then(response => {
        return response.json();
    }).then(response => {
        // console.log("1",method, url);
        return response
    }).catch(error => {
        console.log("2", method, url);
        console.error(
            'request:', body, '\n',
            'error:', error, '\n'
        );
    });
};

// separate different method requests
export const getRequest = async (url, params = {}, token = true) => await sendRequest(url, params, 'GET', token);
export const postRequest = async (url, params = {}, token = true) => await sendRequest(url, params, 'POST', token);
export const uploadRequest = async (url, params = {}, token = true) => await sendRequest(url, params, 'POST', token, 'upload');
export const deleteRequest = async (url, params = {}, token = true) => await sendRequest(url, params, 'DELETE', token);
export const putRequest = async (url, params = {}, token = true) => await sendRequest(url, params, 'PUT', token);
