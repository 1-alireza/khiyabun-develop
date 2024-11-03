import { useTheme } from "@react-navigation/native";
import {View, StyleSheet, Image} from "react-native"
import ExternalLink from "../../components/ExternalLink";
import {useSelector} from "react-redux";

const socialMediaIconsLogo={
    Instagram:require("../../../assets/img/Instagram.png"),
    linkedin:require("../../../assets/img/linkedin.png"),
    X:require("../../../assets/img/X.png"),
    Youtube:require("../../../assets/img/Youtube.png"),
    facebook:require("../../../assets/img/facebook.png"),
}
const unSupportedURL = 'slack://open?team=123456';


function SocialMediaIcons(){
    const profileData = useSelector((state) => state.profile.profileData);
    const { colors } = useTheme();
    const styles = useThemedStyles(colors);

    console.log(profileData)


    return  <View style={styles.socialMediaIconsWrapper}>
        <ExternalLink url={profileData?.socialMedias?.Instagram||"unSupportedURL"}>
            <Image source={socialMediaIconsLogo.Instagram}  style={styles.socialMediaIcons}  />
        </ExternalLink>
        <ExternalLink url={profileData?.socialMedias?.website||"unSupportedURL"} >
            <Image source={socialMediaIconsLogo.facebook}  style={styles.socialMediaIcons} />
        </ExternalLink>
        <ExternalLink url={profileData?.socialMedias?.LinkedIn||"unSupportedURL"} >
            <Image source={socialMediaIconsLogo.linkedin}  style={styles.socialMediaIcons} />
        </ExternalLink>
        <ExternalLink url={profileData?.socialMedias?.X||"unSupportedURL"} >
            <Image source={socialMediaIconsLogo.X}  style={styles.socialMediaIcons} />
        </ExternalLink>
        <ExternalLink url={profileData?.socialMedias?.YouTube||"unSupportedURL"} >
            <Image source={socialMediaIconsLogo.Youtube}  style={styles.socialMediaIcons} />
        </ExternalLink>
     </View>
}

const useThemedStyles = (colors) => {
    return StyleSheet.create({
        socialMediaIconsWrapper:{
                flexDirection: "row",
                justifyContent: "space-evenly",
                alignItems: "center",
                marginTop: 5,
                gap: 25,
                paddingBottom:10
        },
        socialMediaIcons: {
            width: 48,
            height: 48,
            borderRadius: 50,
            overflow: "hidden",
        },
    });
};

export default SocialMediaIcons