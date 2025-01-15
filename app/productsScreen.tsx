import React from "react";
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from "react-native";

const products = [
  {
    id: "1",
    name: "Producto A",
    description: "Descripción del producto A",
    price: "$10.00",
    image: "https://via.placeholder.com/100",
  },
  {
    id: "2",
    name: "Producto B",
    description: "Descripción del producto B",
    price: "$15.00",
    image: "https://via.placeholder.com/100",
  },
  {
    id: "3",
    name: "Producto C",
    description: "Descripción del producto C",
    price: "$20.00",
    image: "https://via.placeholder.com/100",
  },
];

export default function ProductsScreen() {
  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.productContainer}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.description}>{item.description}</Text>
        <Text style={styles.price}>{item.price}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  list: {
    padding: 10,
  },
  productContainer: {
    flexDirection: "row",
    backgroundColor: "#fff",
    marginBottom: 10,
    borderRadius: 8,
    overflow: "hidden",
    elevation: 2,
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 10,
  },
  details: {
    flex: 1,
    padding: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  description: {
    fontSize: 14,
    color: "#666",
    marginVertical: 5,
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#28a745",
  },
});
