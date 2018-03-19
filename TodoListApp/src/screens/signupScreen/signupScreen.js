import React, {Component} from 'react';
import styles from "./signupStyle"
import {Platform, Text, TextInput, Button, View, KeyboardAvoidingView} from 'react-native';
import Reactotron from 'reactotron-react-native'
import {createAccount} from "./signupManager"


type Props = {};
export default class signupScreen extends Component<Props> {

    constructor(props) {
        super(props);
        this.state = { name: '', email: '', password: '' };
        this.submitButtonTouched = this.submitButtonTouched.bind(this);
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
                    Create new account
                </Text>
                <TextInput
                    ref='nameInput'
                    style={styles.textInput}
                    placeholder="Name"
                    returnKeyType = {"next"}
                    onChangeText={(val) => {this.setState({name: val})}}
                    onSubmitEditing={(event) => {this.refs.emailInput.focus();}}
                />
                <TextInput
                    ref='emailInput'
                    style={styles.textInput}
                    placeholder="Email"
                    keyboardType= 'email-address'
                    returnKeyType = {"next"}
                    onChangeText={(val) => {this.setState({email: val})}}
                    onSubmitEditing={(event) => {this.refs.passwordInput.focus();}}
                />
                <TextInput
                    ref='passwordInput'
                    style={styles.textInput}
                    placeholder="password"
                    returnKeyType = {"done"}
                    secureTextEntry
                    onChangeText={(val) => {this.setState({password: val})}}
                />
                <View style={styles.submit}>
                    <Button
                        title="Submit"
                        onPress={this.submitButtonTouched}
                    />
                </View>
            </KeyboardAvoidingView>
        );
    }

    submitButtonTouched(){
        Reactotron.log('submit button touched, name: '+this.state.name+' email: '+this.state.email+'  password: '+this.state.password);
        createAccount(
            this.state.name,
            this.state.email,
            this.state.password,
            () => {
                Reactotron.log("signup succeeded");
                this.props.navigation.navigate('App');
            },
            () => {
                Reactotron.log("signup failed");
            }
        );
    }
}

