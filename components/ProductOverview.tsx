import React from 'react';
import { Image } from 'expo-image';
import { BlurView } from 'expo-blur';
import { View, ScrollView, StyleSheet, Dimensions, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window'); // Get the dimensions of the screen

export function ProductOverview() {
    const mockProducts = [1,2,3,4,5,6,7,8,9,10];
    const randomLikes = () => {
        return Math.floor(Math.random() * (50 - 250) + 250);
    }
    return (
        <View style={{ paddingLeft: 15, paddingRight: 15 }}>
            <Text style={styles.headline}>Selected for you</Text>
            <View style={styles.grid}>
                {mockProducts.map((product, index) => (
                    <View key={index} style={styles.item}>
                        <BlurView
                            intensity={90}
                            tint="systemMaterialDark"
                            style={styles.likes}>
                            <Image style={{
                                width: 12,
                                height: 12,
                            }} source={require('../assets/icons/heart.svg')} />
                                <Text style={{color: 'white', fontSize: 12}}>{randomLikes()}</Text>
                        </BlurView>
                        <Image style={styles.image} source={{ uri: `https://placehold.co/2000x2000` }} />
                        <LinearGradient colors={[
                            'transparent',
                            'rgba(0,0,0,0.1)',
                            'rgba(0,0,0,0.4)',
                            'rgba(0,0,0,0.6)'
                        ]}
                                        locations={[0, 0.1, 0.35, 0.8]} style={{height: '25%', width: '100%', position: 'absolute', bottom: -1, borderBottomLeftRadius: 10, borderBottomRightRadius: 10, overflow: 'hidden', display: 'flex', flexDirection: 'column', paddingHorizontal: 10, justifyContent: 'flex-end', paddingBottom: 15, gap: 5}}>
                            <View style={{display: 'flex', flexDirection: 'row', gap: 5}}>
                                <Text style={{color: 'white'}}>Brand</Text>
                                <Text style={{color: 'white'}}>|</Text>
                                <Text style={{color: 'white'}}>Size</Text>
                            </View>
                            <Text style={{color: 'white', fontWeight: 'bold'}}>$12.34</Text>
                        </LinearGradient>
                    </View>
                ))}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    headline: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: 'white'
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    image: {
      height: "100%",
      width: '100%',
        borderRadius: 10,
    },
    item: {
        width: width * 0.45,
        height: height * 0.35,
        backgroundColor: '#1E1F22',
        borderRadius: 10,
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    likes: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
        overflow: 'hidden',
        position: 'absolute',
        top: 10,
        right: 10,
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 10,
        zIndex: 10, // ensure it’s on top
    },
});