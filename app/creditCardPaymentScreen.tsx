import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Alert, KeyboardAvoidingView, Platform } from "react-native";
import Button from "@/components/Button";

export default function CreditCardPaymentScreen() {
  const [cardNumber, setCardNumber] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");

  const handlePayment = () => {
    // Validar campos
    if (!cardNumber || !cardHolder || !expiryDate || !cvv) {
      Alert.alert("Error", "Por favor, completa todos los campos.");
      return;
    }

    // Simulación de procesamiento de pago
    Alert.alert("Pago Exitoso", "El pago ha sido procesado correctamente.");
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <Text style={styles.title}>Pagar con Tarjeta de Crédito</Text>

      <TextInput
        style={styles.input}
        placeholder="Número de tarjeta"
        keyboardType="numeric"
        value={cardNumber}
        onChangeText={setCardNumber}
        maxLength={16}
      />
      <TextInput
        style={styles.input}
        placeholder="Nombre del titular"
        value={cardHolder}
        onChangeText={setCardHolder}
      />
      <TextInput
        style={styles.input}
        placeholder="Fecha de vencimiento (MM/AA)"
        value={expiryDate}
        onChangeText={setExpiryDate}
        maxLength={5}
      />
      <TextInput
        style={styles.input}
        placeholder="CVV"
        keyboardType="numeric"
        value={cvv}
        onChangeText={setCvv}
        maxLength={3}
      />

      <Button title="Procesar Pago" onPress={handlePayment} style={styles.button} />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: "#f9f9f9",
  },
  button: {
    marginTop: 20,
    padding: 15,
    borderRadius: 10,
  },
});
