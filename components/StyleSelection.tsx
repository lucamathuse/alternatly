import React, { useState } from 'react';
import { View, StyleSheet, Dimensions, Text, Pressable } from 'react-native';

const { width } = Dimensions.get('window'); // Get the dimensions of the screen

export function StyleSelection() {
    const allStyles = ['Style 1', 'Style 2', 'Style 3', 'Style 4', 'Goth', 'Emo', 'Punk', 'Grunge', 'Cyberpunk', 'Witchy', 'Post-Punk', 'Vampire'];

    const [showAll, setShowAll] = useState(false);

    const handlePress = () => {
        setShowAll(prev => !prev);
    };

    return (
        <View style={styles.container}>
            <View style={styles.headerbox}>
                <Text style={styles.headline}>Categories</Text>
                <Pressable onPress={handlePress}>
                    <Text style={{ color: 'white', fontSize: 24 }}>{showAll ? '–' : '+'}</Text>
                </Pressable>
            </View>

            <View style={styles.grid}>
                {(showAll ? allStyles : allStyles.slice(0, 4)).map((category, index) => (
                    <View
                        key={index}
                        style={[
                            styles.item,
                            showAll && index < 4 ? styles.selectedStyle : null
                        ]}
                    >
                        <Text style={styles.itemText}>{category}</Text>
                    </View>
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    headerbox: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    headline: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: 'white'
    },
    container: {
        paddingLeft: 15,
        paddingRight: 15,
        marginBottom: 50
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    item: {
        width: width * 0.45,
        height: 50,
        backgroundColor: '#1E1F22',
        borderRadius: 10,
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    selectedStyle: {
        borderColor: '#5D1F1F',
        borderStyle: 'solid',
        borderWidth: 2
    },
    selectedText: {
        color: 'black',
    },
    itemText: {
        color: 'white',
    },
});
