import React from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native'
import {useTheme} from "@react-navigation/native";
import {useTranslation} from "react-i18next";

import Chips from "../components/Chips";
import Badge from "../components/Badge";
import Button from "../components/Button";
import Card from "../components/Card";
import Toast from "../components/Toast";

import gStyles from '../global-styles/GlobalStyles';
import Input from "../components/Input";

const AllComponents = () => {
    const {colors} = useTheme();
    const {t} = useTranslation();

    return (
        <ScrollView style={gStyles.container}>
            <View>
                <Text style={{fontSize: 26, marginTop: 15, marginLeft: 5, fontWeight: "bold"}}>Toast</Text>
                <View style={{flex: 1, flexDirection: "row", justifyContent: 'center'}}>
                    <Toast type="success" text={t("welcome")}/>
                </View>
            </View>
            <View>
                <Text style={{fontSize: 26, marginLeft: 5, fontWeight: "bold"}}>Button</Text>
                <View style={styles.container}>
                    <Button
                        onPress={() => console.log('EnterMobile')}
                        label={'sign_in'}
                        sizeButton="small"
                        width={33}
                        typeButton="full"
                    />
                    <Button
                        onPress={() => console.log('EnterMobile')}
                        label={'sign_in'}
                        sizeButton="medium"
                        width={33}
                        typeButton="full"
                    />
                    <Button
                        onPress={() => console.log('EnterMobile')}
                        label={'sign_in'}
                        sizeButton="large"
                        width={33}
                        typeButton="full"
                    />
                </View>
                <View style={styles.container}>
                    <Button
                        onPress={() => console.log('EnterMobile')}
                        label={'+'}
                        sizeButton="small"
                        typeButton="circle"
                    />
                    <Button
                        onPress={() => console.log('EnterMobile')}
                        label={'+'}
                        sizeButton="medium"
                        typeButton="circle"
                    />
                    <Button
                        onPress={() => console.log('EnterMobile')}
                        label={'+'}
                        sizeButton="large"
                        typeButton="circle"
                    />
                </View>
                <View style={styles.container}>
                    <Button
                        onPress={() => console.log('EnterMobile')}
                        label={'sign_in'}
                        sizeButton="small"
                        width={33}
                        typeButton="full"
                        colorButton="dark"
                    />
                    <Button
                        onPress={() => console.log('EnterMobile')}
                        label={'sign_in'}
                        sizeButton="medium"
                        width={33}
                        typeButton="full"
                        colorButton="dark"
                    />
                    <Button
                        onPress={() => console.log('EnterMobile')}
                        label={'sign_in'}
                        sizeButton="large"
                        width={33}
                        typeButton="full"
                        colorButton="dark"
                    />
                </View>
                <View style={styles.container}>
                    <Button
                        onPress={() => console.log('EnterMobile')}
                        label={'+'}
                        sizeButton="small"
                        typeButton="circle"
                        colorButton="dark"
                    />
                    <Button
                        onPress={() => console.log('EnterMobile')}
                        label={'+'}
                        sizeButton="medium"
                        typeButton="circle"
                        colorButton="dark"
                    />
                    <Button
                        onPress={() => console.log('EnterMobile')}
                        label={'+'}
                        sizeButton="large"
                        typeButton="circle"
                        colorButton="dark"
                    />
                </View>
                <View style={styles.container}>

                    <Button
                        onPress={() => console.log('EnterMobile')}
                        label={'sign_in'}
                        sizeButton="small"
                        width={33}
                        typeButton="full"
                        disabled={true}
                    />
                    <Button
                        onPress={() => console.log('EnterMobile')}
                        label={'sign_in'}
                        sizeButton="medium"
                        width={33}
                        typeButton="full"
                        disabled={true}
                    />
                    <Button
                        onPress={() => console.log('EnterMobile')}
                        label={'sign_in'}
                        sizeButton="large"
                        width={33}
                        typeButton="full"
                        disabled={true}
                    />
                </View>
                <View style={styles.container}>

                    <Button
                        onPress={() => console.log('EnterMobile')}
                        label={'+'}
                        sizeButton="small"
                        typeButton="circle"
                        disabled={true}
                    />
                    <Button
                        onPress={() => console.log('EnterMobile')}
                        label={'+'}
                        sizeButton="medium"
                        typeButton="circle"
                        disabled={true}
                    />
                    <Button
                        onPress={() => console.log('EnterMobile')}
                        label={'+'}
                        sizeButton="large"
                        typeButton="circle"
                        disabled={true}
                    />
                </View>
                <View style={styles.container}>

                    <Button
                        onPress={() => console.log('EnterMobile')}
                        label={'sign_in'}
                        sizeButton="small"
                        width={33}
                        typeButton="full"
                        isBorder={true}
                        colorButton="light"
                    />
                    <Button
                        onPress={() => console.log('EnterMobile')}
                        label={'sign_in'}
                        sizeButton="medium"
                        width={33}
                        typeButton="full"
                        isBorder={true}
                        colorButton="light"
                    />
                    <Button
                        onPress={() => console.log('EnterMobile')}
                        label={'sign_in'}
                        sizeButton="large"
                        width={33}
                        typeButton="full"
                        isBorder={true}
                        colorButton="light"
                    />
                </View>
                <View style={styles.container}>

                    <Button
                        onPress={() => console.log('EnterMobile')}
                        label={'+'}
                        sizeButton="small"
                        typeButton="circle"
                        isBorder={true}
                        colorButton="light"
                    />
                    <Button
                        onPress={() => console.log('EnterMobile')}
                        label={'+'}
                        sizeButton="medium"
                        typeButton="circle"
                        isBorder={true}
                        colorButton="light"
                    />
                    <Button
                        onPress={() => console.log('EnterMobile')}
                        label={'+'}
                        sizeButton="large"
                        typeButton="circle"
                        isBorder={true}
                        colorButton="light"
                    />
                </View>
                <View style={styles.container}>

                    <Button
                        onPress={() => console.log('EnterMobile')}
                        label={'sign_in'}
                        sizeButton="small"
                        width={33}
                        typeButton="full"
                        isBorder={true}
                        colorButton="light"
                        borderColor="dark"
                    />
                    <Button
                        onPress={() => console.log('EnterMobile')}
                        label={'sign_in'}
                        sizeButton="medium"
                        width={33}
                        typeButton="full"
                        isBorder={true}
                        colorButton="light"
                        borderColor="dark"
                    />
                    <Button
                        onPress={() => console.log('EnterMobile')}
                        label={'sign_in'}
                        sizeButton="large"
                        width={33}
                        typeButton="full"
                        isBorder={true}
                        colorButton="light"
                        borderColor="dark"
                    />
                </View>
                <View style={styles.container}>

                    <Button
                        onPress={() => console.log('EnterMobile')}
                        label={'+'}
                        sizeButton="small"
                        typeButton="circle"
                        isBorder={true}
                        colorButton="light"
                        borderColor="dark"
                    />
                    <Button
                        onPress={() => console.log('EnterMobile')}
                        label={'+'}
                        sizeButton="medium"
                        typeButton="circle"
                        isBorder={true}
                        colorButton="light"
                        borderColor="dark"
                    />
                    <Button
                        onPress={() => console.log('EnterMobile')}
                        label={'+'}
                        sizeButton="large"
                        typeButton="circle"
                        isBorder={true}
                        colorButton="light"
                        borderColor="dark"
                    />
                </View>
                <View style={styles.container}>

                    <Button
                        onPress={() => console.log('EnterMobile')}
                        label={'sign_in'}
                        sizeButton="small"
                        width={33}
                        typeButton="full"
                        isBorder={true}
                        colorButton="light"
                        disabled={true}
                    />
                    <Button
                        onPress={() => console.log('EnterMobile')}
                        label={'sign_in'}
                        sizeButton="medium"
                        width={33}
                        typeButton="full"
                        isBorder={true}
                        colorButton="light"
                        disabled={true}
                    />
                    <Button
                        onPress={() => console.log('EnterMobile')}
                        label={'sign_in'}
                        sizeButton="large"
                        width={33}
                        typeButton="full"
                        isBorder={true}
                        colorButton="light"
                        disabled={true}
                    />
                </View>
                <View style={styles.container}>

                    <Button
                        onPress={() => console.log('EnterMobile')}
                        label={'+'}
                        sizeButton="small"
                        typeButton="circle"
                        isBorder={true}
                        colorButton="light"
                        disabled={true}
                    />
                    <Button
                        onPress={() => console.log('EnterMobile')}
                        label={'+'}
                        sizeButton="medium"
                        typeButton="circle"
                        isBorder={true}
                        colorButton="light"
                        disabled={true}
                    />
                    <Button
                        onPress={() => console.log('EnterMobile')}
                        label={'+'}
                        sizeButton="large"
                        typeButton="circle"
                        isBorder={true}
                        colorButton="light"
                        disabled={true}
                    />
                </View>
                <View style={styles.container}>

                    <Button
                        onPress={() => console.log('EnterMobile')}
                        label={'sign_in'}
                        sizeButton="small"
                        width={33}
                        typeButton="full"
                        colorButton="transparent"
                    />
                    <Button
                        onPress={() => console.log('EnterMobile')}
                        label={'sign_in'}
                        sizeButton="medium"
                        width={33}
                        typeButton="full"
                        colorButton="transparent"
                    />
                    <Button
                        onPress={() => console.log('EnterMobile')}
                        label={'sign_in'}
                        sizeButton="large"
                        width={33}
                        typeButton="full"
                        colorButton="transparent"
                    />
                </View>
                <View style={styles.container}>

                    <Button
                        onPress={() => console.log('EnterMobile')}
                        label={'+'}
                        sizeButton="small"
                        typeButton="circle"
                        colorButton="transparent"
                    />
                    <Button
                        onPress={() => console.log('EnterMobile')}
                        label={'+'}
                        sizeButton="medium"
                        typeButton="circle"
                        colorButton="transparent"
                    />
                    <Button
                        onPress={() => console.log('EnterMobile')}
                        label={'+'}
                        sizeButton="large"
                        typeButton="circle"
                        colorButton="transparent"
                    />
                </View>
                <View style={styles.container}>

                    <Button
                        onPress={() => console.log('EnterMobile')}
                        label={'sign_in'}
                        sizeButton="small"
                        width={33}
                        typeButton="full"
                        colorButton="light"
                    />
                    <Button
                        onPress={() => console.log('EnterMobile')}
                        label={'sign_in'}
                        sizeButton="medium"
                        width={33}
                        typeButton="full"
                        colorButton="light"
                    />
                    <Button
                        onPress={() => console.log('EnterMobile')}
                        label={'sign_in'}
                        sizeButton="large"
                        width={33}
                        typeButton="full"
                        colorButton="light"
                    />
                </View>
                <View style={styles.container}>

                    <Button
                        onPress={() => console.log('EnterMobile')}
                        label={'+'}
                        sizeButton="small"
                        typeButton="circle"
                        colorButton="light"
                    />
                    <Button
                        onPress={() => console.log('EnterMobile')}
                        label={'+'}
                        sizeButton="medium"
                        typeButton="circle"
                        colorButton="light"
                    />
                    <Button
                        onPress={() => console.log('EnterMobile')}
                        label={'+'}
                        sizeButton="large"
                        typeButton="circle"
                        colorButton="light"
                    />
                </View>
                <View style={styles.container}>

                    <Button
                        onPress={() => console.log('EnterMobile')}
                        label={'sign_in'}
                        sizeButton="small"
                        width={33}
                        typeButton="full"
                        colorButton="transparent"
                        disabled={true}
                    />
                    <Button
                        onPress={() => console.log('EnterMobile')}
                        label={'sign_in'}
                        sizeButton="medium"
                        width={33}
                        typeButton="full"
                        colorButton="transparent"
                        disabled={true}
                    />
                    <Button
                        onPress={() => console.log('EnterMobile')}
                        label={'sign_in'}
                        sizeButton="large"
                        width={33}
                        typeButton="full"
                        colorButton="transparent"
                        disabled={true}
                    />
                </View>
                <View style={styles.container}>

                    <Button
                        onPress={() => console.log('EnterMobile')}
                        label={'+'}
                        sizeButton="small"
                        typeButton="circle"
                        colorButton="transparent"
                        disabled={true}
                    />
                    <Button
                        onPress={() => console.log('EnterMobile')}
                        label={'+'}
                        sizeButton="medium"
                        typeButton="circle"
                        colorButton="transparent"
                        disabled={true}
                    />
                    <Button
                        onPress={() => console.log('EnterMobile')}
                        label={'+'}
                        sizeButton="large"
                        typeButton="circle"
                        colorButton="transparent"
                        disabled={true}
                    />
                </View>
            </View>
            <View>
                <Text style={{fontSize: 26, marginLeft: 5, fontWeight: "bold"}}>chips</Text>
                <ScrollView horizontal={true}>
                    <Chips text="Text" width={87} height={32} type="confirm" transparent={false}/>
                    <Chips text="Text" width={87} height={32} type="error" transparent={false}/>
                    <Chips text="Text" width={87} height={32} type="surface" transparent={false}/>
                    <Chips text="Text" width={87} height={32} type="warning" transparent={false}/>
                    <Chips text="Text" width={87} height={32} type="primary" transparent={false}/>
                </ScrollView>
                <ScrollView horizontal={true}>
                    <Chips text="Text" width={87} height={28} type="confirm" transparent={false}/>
                    <Chips text="Text" width={87} height={28} type="error" transparent={false}/>
                    <Chips text="Text" width={87} height={28} type="surface" transparent={false}/>
                    <Chips text="Text" width={87} height={28} type="warning" transparent={false}/>
                    <Chips text="Text" width={87} height={28} type="primary" transparent={false}/>
                </ScrollView>
                <ScrollView horizontal={true}>
                    <Chips text="Text" width={87} height={32} type="confirm" transparent={true}/>
                    <Chips text="Text" width={87} height={32} type="error" transparent={true}/>
                    <Chips text="Text" width={87} height={32} type="surface" transparent={false}/>
                    <Chips text="Text" width={87} height={32} type="warning" transparent={true}/>
                    <Chips text="Text" width={87} height={32} type="primary" transparent={true}/>
                </ScrollView>
                <ScrollView horizontal={true}>
                    <Chips text="Text" width={87} height={28} type="confirm" transparent={true}/>
                    <Chips text="Text" width={87} height={28} type="error" transparent={true}/>
                    <Chips text="Text" width={87} height={28} type="surface" transparent={false}/>
                    <Chips text="Text" width={87} height={28} type="warning" transparent={true}/>
                    <Chips text="Text" width={87} height={28} type="primary" transparent={true}/>
                </ScrollView>
            </View>
            <View>
                <Text style={{fontSize: 26, marginTop: 15, marginLeft: 5, fontWeight: "bold"}}>badge</Text>
                <View style={{flex: 1, flexDirection: "row"}}>
                    <Badge badgeStyle={{marginRight: 5}}/>
                    <Badge text="3" width={16} height={16} badgeStyle={{marginRight: 5}}/>
                    <Badge text="32" width="min-content" height={16} badgeStyle={{paddingLeft: 6, paddingRight: 6}}/>
                </View>
            </View>
            <View>
                <Text style={{fontSize: 26, marginTop: 15, marginLeft: 5, fontWeight: "bold"}}>Card</Text>
                <Card>
                    <View>
                        <Text>header</Text>
                    </View>
                    <View>
                        <Text>body</Text>
                    </View>
                    <View>
                        <Text>footer</Text>
                    </View>
                </Card>
            </View>
            <View>
                <Text style={{fontSize: 26, marginTop: 15, marginLeft: 5, fontWeight: "bold"}}>Input</Text>
                <View style={{flex: 1, flexDirection: "row", justifyContent: 'center'}}>
                    <Input
                        label="label"
                        type="text"
                        placeholder="first input type text"
                        multiline={false}
                    />
                </View>
            </View>
            <View>
                <Input
                    label="Label"
                    type="text"
                    leftIcon="add-outline"
                    rightIcon="add-outline"
                    placeholder="textarea"
                    // value={textValue}
                    // onChangeText={setTextValue}
                    // error={error}
                    supportText="Supporting text"
                    // disabled={true}
                    multiline={true}
                    // linesNumber={4}
                    customStyles={styles.cus}
                />


                <Input
                    label="Label"
                    type="file"
                    leftIcon="add-outline"
                    // rightIcon="add-outline"
                    placeholder="Placeholder"
                    // value={textValue}
                    // onChangeText={setTextValue}
                    // error={error}
                    supportText="Supporting text"
                    // disabled={true}
                    onFileSelect={() => console.log("hi")}

                />

                <Input
                    label="Label"
                    type="number"
                    leftIcon="add-outline"
                    // rightIcon="add-outline"
                    placeholder="Placeholder"
                    // value={textValue}
                    prefixNumber={'+98'}
                    // onChangeText={setTextValue}
                    // error={error}
                    supportText="Supporting text"
                    // disabled={true}
                />
            </View>
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 5
    }
})
export default AllComponents;
