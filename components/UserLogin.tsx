import React, { useState } from 'react';
import {View, StyleSheet, Dimensions, Text, Pressable, TextInput, Button} from 'react-native';

const { width, height } = Dimensions.get('window');

export function UserLogin() {
    return (
        <View style={styles.container}>
            <View style={styles.containerInner}>
                <View style={styles.customLogin}>
                    <View>
                        <Text style={styles.text}>Log In</Text>
                        <Text style={styles.text}>Don't have an account? Create one</Text>
                    </View>
                    <View>
                        <TextInput autoComplete={'email'} placeholder="E-Mail"></TextInput>
                        <TextInput autoComplete={'password'} placeholder="Password"></TextInput>
                        <Button title={'Continue'}></Button>
                    </View>
                </View>
                <View style={styles.serviceLogin}></View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#1E1F22',
        borderColor: 'white',
        borderWidth: .2,
        height: height * 0.65,
        width: width * 0.85,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        color: 'white',
        fontSize: 10,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    containerInner: {},
    customLogin: {},
    serviceLogin: {},

})