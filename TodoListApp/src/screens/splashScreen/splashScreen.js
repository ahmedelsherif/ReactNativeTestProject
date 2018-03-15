import React, {Component} from 'react';
import styles from "./splashStyle"
import {
    Text,
    View,
    AsyncStorage
} from 'react-native';
import Reactotron from 'reactotron-react-native'

type Props = {};
export default class splashScreen extends Component<Props> {

    componentDidMount() {
        Reactotron.log('splash screen did mount');
        setTimeout(() => {
            Reactotron.log('splash screen timer finished');
            this.checkUserSession();
        }, 3000);
    }

    render() {
        Reactotron.log('splash screen render');
        return (
            <View style={styles.container}>
                <Text style={styles.title}>
                   To Do Lists
                </Text>
                <Text style={styles.description}>
                    React Native Academy
                </Text>
            </View>
        );
    }

    // Check user session in the local storage
    checkUserSession = async () => {
        Reactotron.log('Check user session');
        const userToken = await AsyncStorage.getItem('userToken');
        this.props.navigation.navigate(userToken ? 'App' : 'Auth');
    };

}

