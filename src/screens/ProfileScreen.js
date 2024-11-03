import React, {useLayoutEffect,useState} from "react";
import {View ,Text,StyleSheet} from "react-native";
import ChangeThemeSwitcher from "../components/ChangeThemeSwitcher";
import Button from "../components/Button";
import {useTranslation} from "react-i18next";
import Sheet from "../components/Sheet";
import CustomToast from "../components/CustomToast";


const ProfileScreen = ({ route , navigation}) =>{
const [isSheetOpen, setIsSheetOpen] = useState(false);
const openModal=()=>{
    setIsSheetOpen(true);
    }
    const closeModal=()=>{
        setIsSheetOpen(false);
    }

    const showToastHandler = () => {
        CustomToast.show(t("welcome"),"warning");
    }
    // const {name} = route.params;
    const {t} = useTranslation();

    // useLayoutEffect(() =>{
    //     navigation.setOptions({
    //         title: name
    //     })
    // },[navigation, name])
    return(
        <View style={{height:"100%"}}>
            <Text>
                Profile screen
            </Text>
            <ChangeThemeSwitcher/>

            <View style={styles.container}>
                <Button style={{marginBottom:10}} label="show toast" onPress={showToastHandler} sizeButton="medium" width={30}/>
                <Button label={"open"} onPress={openModal} sizeButton="medium" width={30}/>
                <Sheet isOpen={isSheetOpen} onClose={closeModal} modalHeight={220} >
                    <Text>parsa</Text>
                    <Text>parsa</Text>
                    <Text>parsa</Text>
                    <Text>parsa</Text>
                    <Text>parsa</Text>
                    <Text>parsa</Text>
                    <Text>parsa</Text>
                    <Text>parsa</Text>
                    <Text>parsa</Text>
                    <Text>parsa</Text>
                    <Text>parsa</Text>
                    <Text>parsa</Text>
                    <Text>parsa</Text>
                    <Text>parsa</Text>
                    <Text>parsa</Text>
                    <Text>parsa</Text>
                    <Text>parsa</Text>
                    <Text>parsa</Text>
                    <Text>parsa</Text>
                    <Text>parsa</Text>
                    <Text>parsa</Text>
                    <Text>parsa</Text>
                    <Text>parsa</Text>
                    <Text>parsa</Text>
                    <Text>parsa</Text>
                    <Text>parsa</Text>
                    <Text>parsa</Text>
                    <Text>parsa</Text>
                    <Text>parsa</Text>
                    <Text>parsa</Text>
                    <Text>parsa</Text>
                    <Text>parsa</Text>
                    <Text>parsa</Text>
                    <Text>parsa</Text>
                    <Text>parsa</Text>
                    <Text>parsa</Text>
                    <Text>parsa</Text>
                    <Text>parsa</Text>
                    <Text>parsa</Text>
                </Sheet>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    bottomSheetContent: {
        alignItems: 'center',
        padding: 20,
        backgroundColor:"blue"
    },
});

export default ProfileScreen;
