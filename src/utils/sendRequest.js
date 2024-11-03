import {BASE_URL, USER_TIME_ZONE} from "./constant";
import i18n from "i18next";


export const sendRequest = async (url, body, method, token, status = '') => {
    const locale = i18n.language;
    let full_url = BASE_URL + url + (['GET'].includes(method) && Object.keys(body).length ? ('?' + (new URLSearchParams(body)).toString()) : '');
    let headers = {
        locale: locale,
        timezone: USER_TIME_ZONE
    };

    if (token?.length) headers['Authorization'] = "Bearer " + token;
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
        ...(['POST', 'PUT', 'DELETE'].includes(method) ? {body: (status === 'upload' ? body : JSON.stringify(body))} : {}),
    }
    return await fetch(full_url, options).then(response => {
        return response.json();
    }).then(response => {
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
export const getRequest = async (url, params = {}, token = "") => await sendRequest(url, params, 'GET', token);
export const postRequest = async (url, params = {}, token = "") => await sendRequest(url, params, 'POST', token);
export const deleteRequest = async (url, params = {}, token = "") => await sendRequest(url, params, 'DELETE', token);
export const putRequest = async (url, params = {}, token = "") => await sendRequest(url, params, 'PUT', token);
export const uploadRequest = async (url, params = {}, token = "") => await sendRequest(url, params, 'POST', token, 'upload');


export const getFullAddress = async (lat,long) =>{
    const locale = i18n.language;
    // let full_url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${long}&format=json&accept-language=${locale}`;
    let full_url = `https://api.neshan.org/v5/reverse?lat=${lat}&lng=${long}&format=json&accept-language=${locale}`;
    // console.log(full_url);
    return await fetch(full_url,{
        method: 'GET',
        headers:{
            "Api-Key":"service.4c7af31b20c44b16920cce89483caa15"
        }
    }).then(response => {
        return response.json();
    }).then(response => {
        return response
    }).catch(error => {
        console.error(
            'error:', error, '\n'
        );
    });
}
