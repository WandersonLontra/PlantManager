import React from 'react';
import {
    Text,
    SafeAreaView,
    Image, StyleSheet,
    TouchableOpacity,
    Dimensions,
    View
} from 'react-native';

import wateringImg from '../assets/watering.png'
import colors from '../styles/colors';
import fonts from '../styles/fonts'

import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core';

export function Welcome() {
    const navigation = useNavigation();

    function handleStart() {
        navigation.navigate('UserIdentification');
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.wraper}>
                <Text style={styles.title}>
                    Gerencie {'\n'}
                    suas plantas de{'\n'}
                    forma fácil
                </Text>

                <Image
                    source={wateringImg}
                    style={styles.image}
                    resizeMode='contain'
                />

                <Text style={styles.subtitle}>
                    Não esqueça mais de regar suas plantas.
                    Nós cuidamos de lembrar você sempre que precisar.
                </Text>

                <TouchableOpacity
                    style={styles.button}
                    activeOpacity={0.7}
                    onPress={handleStart}
                >
                    <Feather
                        name='chevron-right'
                        style={styles.buttonIcon}
                    />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    wraper: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingHorizontal: 20
    },
    title: {
        fontFamily: fonts.heading,
        lineHeight: 34,
        fontSize: 28,
        marginTop: 38,
        textAlign: 'center',
        color: colors.heading
    },
    subtitle: {
        fontFamily: fonts.text,
        fontSize: 18,
        textAlign: 'center',
        paddingHorizontal: 20,
        color: colors.heading
    },
    image: {
        height: Dimensions.get('window').width * 0.7
    },
    button: {
        backgroundColor: colors.green,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 16,
        height: 56,
        width: 56
    },
    buttonIcon: {
        fontSize: 32,
        color: colors.white
    }
});
