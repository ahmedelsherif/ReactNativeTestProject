import React, {Component} from 'react';
import styles from "./homeStyle"
import {Platform, Text, TextInput, Button, View, KeyboardAvoidingView} from 'react-native';
import Reactotron from 'reactotron-react-native'

type Props = {};
export default class homeScreen extends Component<Props> {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Text style={styles.title}>
                Home
            </Text>
        );
    }

};
