import Toast from "../components/Toast";

export const BASE_URL = 'https://server.khiyabun.ir/api/';

export const BASE_UPLOAD_URL = 'https://server.khiyabun.ir/api/upload';
// export const BASE_URL = 'https://jsonplaceholder.typicode.com/posts/1/comments';
export const LANGUAGE_KEY = 'lang';
export const TOKEN_KEY = 'user_token';
export const DIGIT_REGEX = /\d/;
export const UPPERCASE_REGEX =  /[A-Z]/;
export const COUNTRY_CODE = [
    { label: 'Iran', value: '98' },
    { label: 'Iraq', value: '2' },
    { label: 'USA', value: '1' },
    { label: 'UEA', value: '4' },
    { label: 'Yemen', value: '5' },
    { label: 'England', value: '6' },
    { label: 'Switzerland', value: '7' },
    { label: 'Sweden', value: '8' },
    { label: 'Egypt', value: '9' },
    { label: 'Palestine', value: '10' },
    { label: 'Algeria', value: '11' },
    { label: 'North Africa', value: '12' },
    { label: 'China', value: '13' },
    { label: 'China', value: '14' },
];

export const toastConfig = {
    myToast: ({ text1, props }) => (<Toast text={text1} type={props.toastType}/>)
};
