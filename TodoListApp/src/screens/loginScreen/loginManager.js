import Reactotron from 'reactotron-react-native'
import {createRequest} from "./../../model/connectionManager"
import {AsyncStorage} from "react-native";

export const loginManager = (email, password, success, failure)=>{
    let params = JSON.stringify({
        email: email,
        password: password,
    });
    createRequest(
      "login",
      false,
      "POST",
      params,
      (response) => {
          let user = response["user"];
          cacheUserSession(
              user,
              ()=> {
                  success();
              },
              ()=> {
                  failure();
              }
          )
       } ,
       () => {
           failure();
        }
    );
};

const cacheUserSession =  async (user, success, failure) => {
    try {
        await AsyncStorage.setItem('userToken', user["auth_token"]);
        success();
    } catch (error) {
        // Error saving data
        failure();
    }
};