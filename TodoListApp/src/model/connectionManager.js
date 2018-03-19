import Reactotron from 'reactotron-react-native'
import {AsyncStorage} from "react-native";


export const createRequest = (url, passAuthToken = false, method, params, success, failure) => {
    let headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'API-VERSION': 'v1',
    };
    if(passAuthToken){
        getAuthToken(
            (authToken) => {
                headers['Authorization'] = authToken;
                bindRequest(url, method, headers, params, success, failure);
            },
             ()=> {
                failure();
            }
        );
    }else {
        bindRequest(url, method, headers, params, success, failure);
    }
};

const getAuthToken = async (success, failure) => {
    const authToken = await AsyncStorage.getItem('userToken');
    authToken ? success(authToken) : failure();
};

const bindRequest = (url, method, headers, params, success, failure) => {
    fetch('http://192.168.88.252:3000/' + url, {
        method: method,
        headers: headers,
        body: params,
    })
        .then(response => response.json())
        .then((responseJson) => {
            Reactotron.log("Connection Manager success: " + responseJson["meta"]["code"]);
            success(responseJson)
        }).catch((error) => {
        failure();
        Reactotron.log("login failed:  " + error);
    });
};



