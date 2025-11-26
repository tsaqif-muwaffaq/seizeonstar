import * as React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

interface Props {
  name: string;
  image: string;
  onPress: () => void;
}

const PokemonCard: React.FC<Props> = ({ name, image, onPress }) => (
  <TouchableOpacity style={styles.card} onPress={onPress}>
    <Image source={{ uri: image }} style={styles.img} />
    <Text style={styles.txt}>{name}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  card: { padding: 12, margin: 8, backgroundColor: '#fff', borderRadius: 8, alignItems: 'center' },
  img: { width: 90, height: 90 },
  txt: { marginTop: 8, fontSize: 16, fontWeight: 'bold' }
});

export default PokemonCard;
