import * as React from 'react';
import { useState, useEffect } from 'react';
import { View, Text, Image, ActivityIndicator, ScrollView, StyleSheet } from 'react-native';
import { getPokemonDetail } from '../api/pokeapi';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/MainStack';

type Props = NativeStackScreenProps<RootStackParamList, 'Detail'>;

export default function DetailScreen({ route }: Props) {
  const { name } = route.params;
  const [data, setData] = useState<any | null>(null);

  const load = async () => {
    const res = await getPokemonDetail(name);
    setData(res.data);
  };

  useEffect(() => { load(); }, []);

  if (!data) return <ActivityIndicator size="large" style={{ marginTop: 40 }} />;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{data.name.toUpperCase()}</Text>
      <Image
        source={{ uri: data.sprites.front_default }}
        style={styles.img}
      />
      <Text style={styles.section}>Types:</Text>
      {data.types.map((t: any) => (
        <Text key={t.type.name}>{t.type.name}</Text>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center', padding: 20 },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 10 },
  img: { width: 150, height: 150, marginBottom: 20 },
  section: { fontSize: 20, marginTop: 10 }
});
