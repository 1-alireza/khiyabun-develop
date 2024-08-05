import React from "react";
import * as Network from 'expo-network';
import Constants from 'expo-constants';
import NetInfo from '@react-native-community/netinfo';


export const getUserDeviceInfo = () => {
    NetInfo.fetch().then(state => {
        console.log("*****netInfo-111*****");
        console.log("state-111",state);
        console.log('Connection type-111', state.type);
        console.log('Is connected?-111', state.isConnected);
        console.log("*****netInfo-111*****");
    });

    const unsubscribe = NetInfo.addEventListener(state => {
        console.log("*****netInfo-22*****");
        console.log("state-22", state);
        console.log('Connection type-22', state.type);
        console.log('Is connected?-22', state.isConnected);
        console.log("*****netInfo-22*****");
    });

    // To unsubscribe to these update, just use:
    unsubscribe();


    const deviceId = Constants;
    console.log("*********************");
    console.log(deviceId);
    console.log("*********************");
    console.log("Network in app js", Network);
    console.log("Network.NetworkStateType in app js", Network.NetworkStateType);
    Network.getIpAddressAsync()
        .then(ipAddress => {
            console.log("ipAddress in app js", ipAddress)
        })
        .catch(error => console.log("ipAddress error in app js", error))
    Network.getNetworkStateAsync()
        .then(networkState => {
            console.log("networkState in app js", networkState)
        })
        .catch(error => console.log("networkState error in app js", error))
    Network.isAirplaneModeEnabledAsync()
        .then(airplaneModeEnabled => {
            console.log("airplaneModeEnabled in app js", airplaneModeEnabled)
        })
        .catch(error => console.log("airplaneModeEnabled error in app js", error))


}
