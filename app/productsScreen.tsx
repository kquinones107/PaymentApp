import React, {useState} from "react";
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, TextInput, Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../src/redux/store";
import { addProduct, removeProduct } from "../src/redux/slices/productSlice";
import { router, useRouter} from "expo-router";
import Button from "@/components/Button";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

const PRODUCTS = [
  {
    id: "1",
    name: "Nike Air Force 1",
    description: "Calzado para niños grandes",
    price: "$80.00",
    image: require("../assets/images/nike_AF1_black.png"),
  },
  {
    id: "2",
    name: "Nike Air Diamond Varsity Turf",
    description: "Calzado de béisbol para hombre",
    price: "$75.00",
    image: require("../assets/images/AIR_DIAMOND_VARSITY.png"),
  },
  {
    id: "3",
    name: "Air Jordan 1",
    description: "Tenis para hombre",
    price: "$120.00",
    image: require("../assets/images/AIR_JORDAN_1.png"),
  },
  {
    id: "4",
    name: "wmns nike quest",
    description: "Tenis de correr para mujer",
    price: "$70.00",
    image: require("../assets/images/WMNS_NIKE_QUEST.png"),
  },
  {
    id: "5",
    name: "wmns jordan mvp",
    description: "Tenis para mujer",
    price: "$120.00",
    image: require("../assets/images/WMNS_JORDAN_MVP.png"),
  },
];

export default function ProductsScreen() {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const cart = useSelector((state: RootState) => state.product.products);
  const router = useRouter();

  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});

  const handleQuantityChange = (productId: string, value: string) => {
    const numericValue = Number(value);
    if (!isNaN(numericValue)) {
      setQuantities((prevQuantities) => ({
        ...prevQuantities,
        [productId]: numericValue,
      }));
    }
  };

  const handleAddProduct = (product: { id: string; name: string; price: number; description: string; image: string }) => {
    const quantity = quantities[product.id] || 0;
    if (quantity > 0){
      dispatch(addProduct({ ...product, quantity }));
      Alert.alert("Agregado al carrito", `${product.name} agregado exitosamente.`);
    } else {
      alert("La cantidad debe ser mayor a 0");
    }
    
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Productos Disponibles</Text>
        <Ionicons 
          name="cart" 
          size={28}   
          color="black"
          style={styles.cartIcon}
          onPress={() => router.push("/cartScreen")} 
        />
      </View>
      <FlatList
        data={PRODUCTS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.product}>
            <Image source={ item.image  } style={styles.image} />
            <Text style={styles.description}>{item.description}</Text>
            <Text>{item.name} - ${item.price}</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={quantities[item.id]?.toString() || ""}
              onChangeText={(value) => handleQuantityChange(item.id, value)}
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
    </SafeAreaView>
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
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },

});