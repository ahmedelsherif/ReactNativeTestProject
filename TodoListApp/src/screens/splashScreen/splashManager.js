import Reactotron from 'reactotron-react-native'
import {createRequest} from "./../../model/connectionManager"
import {AsyncStorage} from "react-native";

export const checkUserSession = (sessionExists, sessionNotExists) => {
    checkCachedAuthToken(
        tokenCached = () => {
            Reactotron.log('session cached');
            getProfile(sessionExists, sessionNotExists)
        },
        tokenNotCached = () => {
            sessionNotExists();
        }
    );

};

const getProfile = (validProfile, invalidProfile) => {
    Reactotron.log('get profile');
    createRequest(
        "show_profile",
        true,
        "GET",
        null,
        success = (response) => {
            let user = response["user"];
            Reactotron.log('profile success' + user["name"]);
            validProfile();
        },
        failure = () => {
            invalidProfile()
        }
    );
};

const checkCachedAuthToken = async (tokenCached, tokenNotCached) => {
    Reactotron.log('Check user session');
    const userToken = await AsyncStorage.getItem('userToken');
    if (userToken)
        tokenCached();
    else {
        tokenNotCached();
    }
};