import React, {Component} from 'react';
import styles from "./splashStyle"
import {
    Text,
    View
} from 'react-native';
import Reactotron from 'reactotron-react-native'


type Props = {};
export default class splashScreen extends Component<Props> {

    componentDidMount() {
        Reactotron.log('splash screen did mount');
        setTimeout(() => {
            Reactotron.log('splash screen timer finished');
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
}

