import React from 'react';
import { Image } from 'expo-image';
import { BlurView } from 'expo-blur';
import { View, TextInput, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export function SearchBar(){
    const insets = useSafeAreaInsets();
    return (
        <View style={[styles.container, { marginBottom: 10 }]}>
            <BlurView
                intensity={90}
                tint="systemMaterialDark"
                style={styles.textInputContainer}
            >
                <TextInput
                    style={styles.textInput}
                    placeholder="Search for..."
                    placeholderTextColor="#888"
                />
            </BlurView>
            <View style={styles.bottomContainer}>
                <BlurView
                    intensity={90}
                    tint="systemMaterialDark"
                    style={styles.navBarContainer}
                >
                    <Image style={{
                        width: 25,
                        height: 25,
                    }} source={require('../assets/icons/home.svg')} />
                    <Image style={{
                        width: 25,
                        height: 25,
                    }} source={require('../assets/icons/heart.svg')} />
                    <Image style={{
                        width: 25,
                        height: 25,
                    }} source={require('../assets/icons/user.svg')} />
                    <Image style={{
                        width: 25,
                        height: 25,
                    }} source={require('../assets/icons/message.svg')} />
                </BlurView>
                <BlurView
                    intensity={90}
                    tint="systemMaterialDark"
                    style={styles.profileContainer}
                >
                    <Image style={{
                        width: 25,
                        height: 25,
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        marginLeft: -13, // half of width
                        marginTop: -13,  // half of height
                    }} source={require('../assets/icons/plus.svg')} />
                </BlurView>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        flex: 1,
        bottom: 0,
        width: '100%',
        paddingHorizontal: 20,
        backgroundColor: 'transparent'
    },
    textInputContainer: {
        borderRadius: 25,
        overflow: 'hidden',
        width: '100%',
        marginBottom: 10,
        position: 'relative',
    },
    textInput: {
        height: 45,
        borderRadius: 25,
        paddingHorizontal: 15,
        color: 'white',
    },
    bottomContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
        marginBottom: 10,
    },

    profileContainer: {
        height: 65,
        width: 65,
        borderRadius: 65 / 2,
        overflow: 'hidden',
        position: 'relative',
    },

    navBarContainer: {
        flex: 1,
        height: 65,
        borderRadius: 35,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
    },

    navBar: {
        height: 50,
    },
});

