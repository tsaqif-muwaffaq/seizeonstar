// import React, { useState } from 'react';
import * as React from 'react';
import { useState } from 'react';

import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { Product } from '../types/Product';
import { globalStyles } from '../styles/globalStyles';

interface AddProductModalProps {
  onAdd: (product: Product) => void;
  onClose: () => void;
}

export const AddProductModal: React.FC<AddProductModalProps> = ({ onAdd, onClose }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [description, setDescription] = useState('');

  const validateImageUrl = (url: string) => {
    const pattern = /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif))$/i;
    return pattern.test(url);
  };

  const handleSubmit = () => {
    if (!name.trim() || !price.trim() || !imageUrl.trim()) {
      Alert.alert('Error', 'Nama, harga, dan URL gambar wajib diisi!');
      return;
    }

    const priceValue = parseFloat(price);
    if (isNaN(priceValue) || priceValue <= 0) {
      Alert.alert('Error', 'Harga harus berupa angka yang valid!');
      return;
    }

    if (!validateImageUrl(imageUrl)) {
      Alert.alert('Error', 'URL gambar tidak valid. Harus diawali http/https dan berekstensi .jpg/.png/.jpeg/.gif');
      return;
    }

    const newProduct: Product = {
      id: Date.now().toString(),
      name: name.trim(),
      price: priceValue,
      imageUrl: imageUrl.trim(),
      description: description.trim(),
    };

    onAdd(newProduct);
    Alert.alert('Sukses', 'Produk berhasil ditambahkan!');
    resetForm();
  };

  const resetForm = () => {
    setName('');
    setPrice('');
    setImageUrl('');
    setDescription('');
  };

  return (
    <View style={styles.overlay}>
      <View style={styles.modalContainer}>
        <ScrollView>
          <Text style={styles.title}>Tambah Produk</Text>

          <TextInput
            placeholder="Nama Produk"
            placeholderTextColor="#888"
            style={globalStyles.input}
            value={name}
            onChangeText={setName}
          />

          <TextInput
            placeholder="Harga (angka)"
            placeholderTextColor="#888"
            style={styles.input}
            value={price}
            onChangeText={setPrice}
            keyboardType="numeric"
          />

          <TextInput
            placeholder="URL Gambar (https://...)"
            placeholderTextColor="#888"
            style={styles.input}
            value={imageUrl}
            onChangeText={setImageUrl}
            autoCapitalize="none"
          />

          <TextInput
            placeholder="Deskripsi (opsional)"
            placeholderTextColor="#888"
            style={[styles.input, styles.textArea]}
            value={description}
            onChangeText={setDescription}
            multiline
          />

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={[globalStyles.button, globalStyles.buttonPrimary]} onPress={handleSubmit}>
  <Text style={globalStyles.buttonText}>Tambah</Text>
</TouchableOpacity>


            <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={onClose}>
              <Text style={styles.buttonText}>Batal</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  modalContainer: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    maxHeight: '80%',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
    fontSize: 16,
    color: '#333',
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  addButton: {
    backgroundColor: '#2196F3',
  },
  cancelButton: {
    backgroundColor: '#E53935',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
