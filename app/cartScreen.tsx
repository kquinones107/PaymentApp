import React from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../src/redux/store";
import { removeProduct } from "../src/redux/slices/productSlice";
import Button from "@/components/Button";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";




export default function CartScreen() {
  const cart = useSelector((state: RootState) => state.product.products);
  const dispatch = useDispatch();
    const router = useRouter();

    const handleCheckout = () => {
        // Placeholder for checkout functionality
        alert("Procesando el pago...");
      }; 

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons
          name="arrow-back"
          size={28}
          color="#007BFF"
          style={styles.backIcon}
          onPress={() => router.push("/productsScreen")}
        />
        <Text style={styles.title}>Carrito</Text>
      </View>
      <FlatList
        data={cart}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.cartItem}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.info}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemDetails}>
                Cantidad: {item.quantity}
              </Text>
              <Button
                title="Eliminar"
                onPress={() => dispatch(removeProduct(item.id))}
              />
            </View>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Tu carrito está vacío.</Text>
        }
      />
      {cart.length > 0 && (
        <Button
          title="Pagar"
          onPress={handleCheckout}
          style={styles.checkoutButton}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: 10,
  },
  backIcon: {
    marginRight: 10,
  },
  cartItem: {
    flexDirection: "row",
    marginBottom: 15,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 10,
  },
  info: {
    flex: 1,
    justifyContent: "space-between",
  },
  itemName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  itemDetails: {
    fontSize: 14,
    color: "#666",
  },
  emptyText: {
    fontSize: 18,
    color: "#666",
    textAlign: "center",
    marginTop: 50,
  },
  checkoutButton: {
    marginTop: 20,
    padding: 15,
    backgroundColor: "#007BFF",
    borderRadius: 10,
  },
});
    