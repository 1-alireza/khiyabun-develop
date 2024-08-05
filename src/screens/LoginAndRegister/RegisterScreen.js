import React from "react";
import {useTranslation} from "react-i18next";
import BaseLogin from "../../components/BaseLogin";
import EnteredMobileSection from "./EnterMobileSection";

const RegisterScreen = ({navigation}) => {
    const {t} = useTranslation();

    return (
        <BaseLogin
            title={t("enter_mobile_title")}
            description={t("enter_mobile_description")}
        >
            <EnteredMobileSection navigation={navigation} typeSend="register"/>
        </BaseLogin>
    );
}

export default RegisterScreen;
