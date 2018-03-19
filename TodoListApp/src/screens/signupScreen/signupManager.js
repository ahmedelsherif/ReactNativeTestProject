import Reactotron from 'reactotron-react-native'
import {createRequest} from "./../../model/connectionManager"
import {AsyncStorage} from "react-native";

export const createAccount = (name, email, password, success, failure) => {
    let params = JSON.stringify({
        user: {
            name: name,
            email: email,
            password: password,
            password_confirmation: password,
        }
    });
    createRequest(
        "signup",
        false,
        "POST",
        params,
        (response) => {
            let user = response["user"];
            cacheUserSession(
                user,
                () => {
                    success();
                },
                () => {
                    failure();
                }
            )
        },
        () => {
            failure();
        }
    );
};

const cacheUserSession = async (user, success, failure) => {
    try {
        await AsyncStorage.setItem('userToken', user["auth_token"]);
        success();
    } catch (error) {
        // Error saving data
        failure();
    }
};
