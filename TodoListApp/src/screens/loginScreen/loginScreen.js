import React, {Component} from 'react';
import styles from "./loginStyle"
import {
    Text,
    TextInput,
    Button,
    View
} from 'react-native';
import Reactotron from 'reactotron-react-native'


type Props = {};
export default class loginScreen extends Component<Props> {
    render() {
        Reactotron.log('login screen render');
        return (
            <View style={styles.container}>
                <Text style={styles.title}>
                    Login
                </Text>
                <TextInput
                    style={styles.textInput}
                    placeholder="Email"
                    autoFocus = {true}
                    returnKeyType = {"next"}
                    onSubmitEditing={(event) => {
                        this.refs.passwordInput.focus();
                    }}
                />
                <TextInput
                    ref='passwordInput'
                    style={styles.textInput}
                    placeholder="password"
                    returnKeyType = {"done"}
                />
                <View style={styles.login}>
                    <Button
                        title="Login"
                        onPress={this.loginButtonTouched}
                    />
                </View>
            </View>
        );
    }

    loginButtonTouched(){
        Reactotron.log('login button touched');
    }
}

