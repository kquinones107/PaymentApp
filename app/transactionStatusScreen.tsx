import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import Button from "@/components/Button";
import { useRouter } from "expo-router";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TransactionStatusScreen() {
  const router = useRouter();
  const { status } = useLocalSearchParams(); // Recibe parámetro "status" (éxito o error)

  const isSuccess = status === "success"; // Determina si fue éxito o error

  return (
    <SafeAreaView style={styles.container}>
      {isSuccess ? (
        <Image
          source={require("../assets/images/success.png")}
          style={styles.image}
        />
      ) : (
        <Image
          source={require("../assets/images/error.jpg")}
          style={styles.image}
        />
      )}

      <Text style={styles.title}>
        {isSuccess ? "¡Transacción Exitosa!" : "Transacción Fallida"}
      </Text>
      <Text style={styles.message}>
        {isSuccess
          ? "Tu pago ha sido procesado correctamente."
          : "Hubo un problema procesando tu pago. Por favor, inténtalo nuevamente."}
      </Text>

      <Button
        title="Volver a Productos"
        onPress={() => router.push("/productsScreen")}
        style={styles.button}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  message: {
    fontSize: 16,
    textAlign: "center",
    color: "#666",
    marginBottom: 20,
  },
  button: {
    marginTop: 20,
    padding: 15,
    borderRadius: 10,
  },
});
