import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    FlatList,
    ActivityIndicator
} from 'react-native';

import colors from '../styles/colors';
import fonts from '../styles/fonts';
import { Header } from '../components/Header';
import { EnvironmentButton } from '../components/environmentButton';
import { PlantCardPrimary } from '../components/PlantCardPrimary';
import { Load } from '../components/Load';

import { useNavigation } from '@react-navigation/core';
import api from '../services/api';
import { Inter_500Medium } from '@expo-google-fonts/inter';
import { PlantProps } from '../libs/storage';

/*INTERFACES TO STATE*/

interface EnvironmentProps {
    key: string;
    title: string;
};



export function PlantSelect() {
    /*STATE CONFIG*/
    const [environments, setEnvironments] = useState<EnvironmentProps[]>();
    const [Plants, setPlants] = useState<PlantProps[]>();
    const [FilteredPlants, setFilteredPlants] = useState<PlantProps[]>();

    const [environmentSelected, setEnvironmentSelected] = useState('all');

    const [loading, setLoading] = useState(true);

    const navigation = useNavigation();

    /*Paginação states*/
    const [page, setPage] = useState(1);
    const [loadingMore, setLoadingMore] = useState(true);
    /*Paginação end */

    function handleEnvironmentSelected(Environment: string) {
        setEnvironmentSelected(Environment);

        if (Environment === 'all')
            return setFilteredPlants(Plants);

        const filtered = Plants.filter(plant =>
            plant.environments.includes(Environment)
        );

        setFilteredPlants(filtered);
    };

    async function fetchPlants() {
        const { data } = await api.get(`plants?_sort=name&_order=asc&_page=${page}&_limit=8`);

        if (!data)
            return setLoading(true)

        if (page > 1) {
            setPlants(oldValues => [...oldValues, ...data])
            setFilteredPlants(oldValues => [...oldValues, ...data])

        } else {
            setPlants(data);
            setFilteredPlants(data);
        }

        setLoading(false);
        setLoadingMore(false);
    }

    function handleFetchMore(distance: number) {
        if (distance < 1)
            return;

        setLoadingMore(true);
        setPage(oldValue => oldValue + 1);

        fetchPlants();
    };

    function handlePlantSelect(plant: PlantProps) {
        navigation.navigate('PlantSave', { plant })
    };

    useEffect(() => {
        async function fetchEnvironment() {
            const { data } = await api.get('plants_environments?_sort=title&_order=asc');
            setEnvironments([
                {
                    key: 'all',
                    title: 'Todos'
                },
                ...data
            ]);
        }
        fetchEnvironment();
    }, [])

    useEffect(() => {
        fetchPlants();
    }, [])


    if (loading)
        return <Load />


    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Header />
                <Text style={styles.title}>
                    Em qual ambiente
                </Text>
                <Text style={styles.subtitle}>
                    você quer colocar sua planta?
                </Text>
            </View>

            <View>
                <FlatList
                    data={environments}
                    keyExtractor={(item) => String(item.key)}
                    renderItem={({ item }) => (
                        <EnvironmentButton
                            title={item.title}
                            active={item.key === environmentSelected}
                            onPress={() => handleEnvironmentSelected(item.key)}
                        />
                    )}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.environmentList}
                />
            </View>

            <View style={styles.plants}>
                <FlatList
                    data={FilteredPlants}
                    keyExtractor={(item) => String(item.id)}
                    renderItem={({ item }) => (
                        <PlantCardPrimary
                            data={item}
                            onPress={() => { handlePlantSelect(item) }}
                        />
                    )}
                    showsVerticalScrollIndicator={false}
                    numColumns={2}
                    onEndReachedThreshold={0.1}
                    onEndReached={({ distanceFromEnd }) => handleFetchMore(distanceFromEnd)}
                    ListFooterComponent={
                        loadingMore ?
                            <ActivityIndicator color={colors.green} />
                            : <></>
                    }
                />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background
    },
    header: {
        paddingHorizontal: 30
    },
    title: {
        fontSize: 17,
        color: colors.heading,
        fontFamily: fonts.heading,
        lineHeight: 20,
        marginTop: 15
    },
    subtitle: {
        fontFamily: fonts.text,
        fontSize: 17,
        lineHeight: 20,
        color: colors.heading
    },
    environmentList: {
        height: 40,
        justifyContent: 'center',
        paddingBottom: 5,
        paddingHorizontal: 32,
        marginVertical: 32,
    },
    plants: {
        flex: 1,
        paddingHorizontal: 32,
        justifyContent: 'center'
    }
});