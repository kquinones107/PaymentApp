import React, {useState} from "react";
import { View, Text, Button, FlatList, Image, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../src/redux/store";
import { addProduct, removeProduct } from "../src/redux/slices/productSlice";

const PRODUCTS = [
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
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const cart = useSelector((state: RootState) => state.product.products);

  const handleAddProduct = (product: { id: string; name: string; price: number }) => {
    dispatch(addProduct({ ...product, quantity }));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Productos Disponibles</Text>
      <FlatList
        data={PRODUCTS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.product}>
            <Text>{item.name} - ${item.price}</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={String(quantity)}
              onChangeText={(value) => setQuantity(Number(value))}
            />
            <Button
              title="Agregar"
              onPress={() => handleAddProduct({ ...item, price: parseFloat(item.price.replace('$', '')) })}
            />
          </View>
        )}
      />
      <Text style={styles.title}>Carrito:</Text>
      <FlatList
        data={cart}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.product}>
            <Text>
              {item.name} - {item.quantity} unidad(es)
            </Text>
            <Button
              title="Eliminar"
              onPress={() => dispatch(removeProduct(item.id))}
            />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  product: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 5,
    marginVertical: 5,
    width: 50,
    textAlign: "center",
  },
});