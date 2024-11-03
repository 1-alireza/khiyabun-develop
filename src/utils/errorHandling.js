import CustomToast from "../components/CustomToast";
import i18n from "i18next";

export const errorHandling = (response_json,type_error) => {
    let response = response_json,
    textError;
    console.log(response);
    if(typeof response === "object"){
        textError = response.message
    }
    else {
        textError = response_json;
    }
    CustomToast.show(textError,type_error);
}
