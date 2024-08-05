import React from "react";
import {SignInWithPhoneNumber} from "./LoginWithUsernameScreen";
import BaseLogin from "../../components/BaseLogin";
import {useTranslation} from "react-i18next";
import EnterMobileSection from "./EnterMobileSection";


const ForgetPasswordScreen = ({navigation})=>{
    const {t} = useTranslation();

    return(
        <BaseLogin
            title={t("forget_password")}
            description={t("forget_password_description")}
        >
            <EnterMobileSection navigation={navigation} typeSend="forget-password"/>

        </BaseLogin>
    )
}


export default ForgetPasswordScreen;
