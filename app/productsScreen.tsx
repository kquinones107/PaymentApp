import React, {useState} from "react";
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../src/redux/store";
import { addProduct, removeProduct } from "../src/redux/slices/productSlice";
import { router, useRouter} from "expo-router";
import Button from "@/components/Button";
import { Ionicons } from "@expo/vector-icons";

const PRODUCTS = [
  {
    id: "1",
    name: "Producto A",
    description: "Descripción del producto A",
    price: "$10.00",
    image: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/0c6cbabf-99c6-4dbd-b848-959d5ae7695f/NIKE+AIR+FORCE+1+GS.png",
  },
  {
    id: "2",
    name: "Producto B",
    description: "Descripción del producto B",
    price: "$15.00",
    image: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/743aa180-7faf-4386-9286-6cf49d4cd394/AIR+FORCE+1+%2707.png",
  },
  {
    id: "3",
    name: "Producto C",
    description: "Descripción del producto C",
    price: "$20.00",
    image: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/f4220f77-cc51-4b4c-9acb-9fcd283b0ca3/AIR+FORCE+1+%28GS%29.png",
  },
];

export default function ProductsScreen() {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const cart = useSelector((state: RootState) => state.product.products);
  const router = useRouter();

  const handleAddProduct = (product: { id: string; name: string; price: number; description: string; image: string }) => {
    dispatch(addProduct({ ...product, quantity }));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Productos Disponibles</Text>
      <Ionicons 
        name="cart" 
        size={28}   
        color="black"
        style={styles.cartIcon}
        onPress={() => router.push("/cartScreen")} 
      />
      <FlatList
        data={PRODUCTS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.product}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <Text style={styles.description}>{item.description}</Text>
            <Text>{item.name} - ${item.price}</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={String(quantity)}
              onChangeText={(value) => setQuantity(Number(value))}
            />
            <Button
              title="Agregar"
              onPress={() => handleAddProduct({ ...item, price: parseFloat(item.price.replace('$', '')), description: item.description, image: item.image })}
              style={styles.button}
              textStyle={styles.buttonText}
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
  image: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    color: "#666",
  },
  button: {
    marginTop: 20,
    backgroundColor: "#007BFF",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  cartIcon: {
    position: "absolute",
    top: 10,
    right: 10,
  },
});