import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveFavorite = async (name: string) => {
  const existing = await AsyncStorage.getItem('fav');
  const arr = existing ? JSON.parse(existing) : [];
  if (!arr.includes(name)) arr.push(name);
  await AsyncStorage.setItem('fav', JSON.stringify(arr));
};
