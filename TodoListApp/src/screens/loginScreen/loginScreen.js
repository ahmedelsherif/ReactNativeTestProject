import React, {Component} from 'react';
import styles from "./loginStyle"
import {Platform, Text, TextInput, Button, View, KeyboardAvoidingView} from 'react-native';
import Reactotron from 'reactotron-react-native'


type Props = {};
export default class loginScreen extends Component<Props> {

    constructor(props) {
        super(props);
        this.state = { email: '', password: '' };
        this.loginButtonTouched = this.loginButtonTouched.bind(this);
    }

    render() {
        Reactotron.log('login screen render');
        return (
            <KeyboardAvoidingView behavior={'padding'} style={styles.container}
                 keyboardVerticalOffset={
                     Platform.select({
                        ios: () => 0,
                         android: () => -60
                     })()
                 }>
                <Text style={styles.title}>
                    Login
                </Text>
                <TextInput
                    ref='emailInput'
                    style={styles.textInput}
                    placeholder="Email"
                    keyboardType= 'email-address'
                    // autoFocus = {true}
                    returnKeyType = {"next"}
                    onChangeText={(val) => {this.setState({email: val})}}
                    onSubmitEditing={(event) => {
                        this.refs.passwordInput.focus();
                    }}
                />
                <TextInput
                    ref='passwordInput'
                    style={styles.textInput}
                    placeholder="password"
                    returnKeyType = {"done"}
                    secureTextEntry
                    onChangeText={(val) => {this.setState({password: val})}}
                />
                <View style={styles.login}>
                    <Button
                        title="Login"
                        onPress={this.loginButtonTouched}
                    />
                </View>
            </KeyboardAvoidingView>
        );
    }

    loginButtonTouched(){
        Reactotron.log('login button touched, email: '+this.state.email+'  password: '+this.state.password);
    }
}

