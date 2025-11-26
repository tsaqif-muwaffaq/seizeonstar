import * as React from 'react';
import { useState, useEffect } from 'react';
import { View, FlatList, ActivityIndicator } from 'react-native';
import PokemonCard from '../components/PokemonCard';
import { getPokemonList } from '../api/pokeapi';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/MainStack';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function HomeScreen({ navigation }: Props) {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    try {
      const res = await getPokemonList(20, 0);
      setData(res.data.results);
    } catch (e) {}
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  if (loading) return <ActivityIndicator size="large" style={{ marginTop: 40 }} />;

  return (
    <FlatList
      data={data}
      keyExtractor={(i) => i.name}
      renderItem={({ item }) => (
        <PokemonCard
          name={item.name}
          image={`https://img.pokemondb.net/sprites/black-white/normal/${item.name}.png`}
          onPress={() => navigation.navigate('Detail', { name: item.name })}
        />
      )}
    />
  );
}
