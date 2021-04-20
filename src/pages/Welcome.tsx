import React, { useState } from 'react';
import { Text, SafeAreaView, Image, StyleSheet } from 'react-native';

import wateringImg from '../assets/watering.png'
import colors from '../styles/colors';
import { Button } from '../components/Button';

export function Welcome() {

    const [visible, setVisible] = useState(false);

    function handleVisibility() {
        setVisible(true);
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>
                Gerencie {'\n'}
                suas plantas{'\n'}
                de forma fácil
            </Text>

            {
                visible &&
                <Image source={wateringImg} style={styles.image} />
            }

            <Text style={styles.subtitle}>
                Não esqueça mais de regar suas plantas.
                Nós cuidamos de lembrar você sempre que precisar.
            </Text>

            <Button title="Avançar" onPress={handleVisibility} />

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        marginTop: 38,
        marginHorizontal: 24,
        textAlign: 'center',
        color: colors.heading
    },
    subtitle: {
        fontSize: 18,
        textAlign: 'center',
        paddingHorizontal: 20,
        color: colors.heading
    },
    button: {
        backgroundColor: colors.green,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 16,
        height: 56,
        width: 56
    },
    image: {
        width: 292,
        height: 284
    },
    buttonText: {
        color: colors.white,
        fontSize: 24
    }
});
