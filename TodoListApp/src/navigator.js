import React from 'react';
import {View} from 'react-native';
import { StackNavigator, SwitchNavigator } from 'react-navigation';
import splashScreen from "./screens/splashScreen/splashScreen"
import loginScreen from "./screens/loginScreen/loginScreen"
import signupScreen from "./screens/signupScreen/signupScreen"
import homeScreen from "./screens/homeScreen/homeScreen"


const AuthStack = StackNavigator(
    {
        loginScreen: {
            screen: loginScreen,
        },
        signupScreen: {
            screen: signupScreen,
        },
    },
    {
        headerMode: 'none',
        initialRouteName: 'loginScreen',
    }
);

const AppStack = StackNavigator(
    {
        homeScreen: {
            screen: homeScreen,
        },
    },
    {
        headerMode: 'none',
        initialRouteName: 'homeScreen',
    }
);

const MainNavigator = SwitchNavigator(
    {
        AuthLoading: splashScreen,
        App: AppStack,
        Auth: AuthStack,
    },
    {
        initialRouteName: 'AuthLoading',
    }
);

export const App = () => (
    <View style={{ flex: 1 }}>
        <MainNavigator/>
    </View>
);