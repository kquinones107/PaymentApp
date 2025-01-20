import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import Button from "@/components/Button";
import { SafeAreaView } from "react-native-safe-area-context";

export default function PaymentOptionsScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Selecciona el tipo de pago</Text>

      <Button
        title="Efectivo"
        onPress={() => alert("Pago en efectivo seleccionado")}
        style={styles.button}
      />
      <Button
        title="Tarjeta de Crédito"
        onPress={() => router.push("/creditCardPaymentScreen")}
        style={styles.button}
      />
      <Button
        title="Tarjeta de Débito"
        onPress={() => alert("Pago con tarjeta de débito seleccionado")}
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
    backgroundColor: "#fff",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  button: {
    marginVertical: 10,
    padding: 15,
    width: "80%",
  },
});
