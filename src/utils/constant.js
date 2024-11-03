import Toast from "../components/Toast";

export const BASE_URL = 'https://server.khiyabun.ir/api/';
export const BASE_UPLOAD_URL = 'https://server.khiyabun.ir/api/upload';
// export const BASE_URL = 'https://jsonplaceholder.typicode.com/posts/1/comments';
export const LANGUAGE_KEY = 'lang';
export const TOKEN_KEY = 'user_token';
export const USER_TIME_ZONE = Intl.DateTimeFormat().resolvedOptions().timeZone;
export const DIGIT_REGEX = /\d/;
export const MOBILE_START_REGEX = /^(09|9)/;
export const MOBILE_REGEX_09 = /^(09)/;
export const UPPERCASE_REGEX =  /[A-Z]/;

export const toastConfig = {
    myToast: ({ text1, props }) => (<Toast text={text1} type={props.toastType}/>)
};
