import React, { useState } from "react";
import { 
  View, 
  Text, 
  TextInput, 
  StyleSheet, 
  Alert, 
  KeyboardAvoidingView, 
  Platform, 
  Image 
} from "react-native";
import Button from "@/components/Button";
import { useRouter } from "expo-router";

// Función para detectar el tipo de tarjeta
const getCardType = (cardNumber: string) => {
    const visaRegex = /^4[0-9]{0,}$/; // Comienza con 4
    const mastercardRegex = /^5[1-5][0-9]{0,}$/; // Comienza con 51-55
  
    if (visaRegex.test(cardNumber)) return "Visa";
    if (mastercardRegex.test(cardNumber)) return "MasterCard";
  
    return null;
};

export default function CreditCardPaymentScreen() {
  const [cardNumber, setCardNumber] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardType, setCardType] = useState<string | null>(null);

  const router = useRouter();

  const handleCardNumberChange = (text: string) => {
    setCardNumber(text.replace(/\s?/g, "").replace(/(\d{4})/g, "$1 ").trim());
    setCardType(getCardType(text));
  };

  const handlePayment = () => {
    // Validar campos
    if (!cardNumber || !cardHolder || !expiryDate || !cvv) {
      Alert.alert("Error", "Por favor, completa todos los campos.");
      return;
    }

    if (!/^\d{16}$/.test(cardNumber.replace(/\s/g, ""))) {
        Alert.alert("Error", "El número de la tarjeta es inválido.");
        return;
    }

    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiryDate)) {
        Alert.alert("Error", "La fecha de vencimiento es inválida.");
        return;
    }

    if (!/^\d{3}$/.test(cvv)) {
        Alert.alert("Error", "El CVV es inválido.");
        return;
    }
  

    // Simulación de procesamiento de pago
    Alert.alert("Pago Exitoso", "El pago ha sido procesado correctamente.", [
      {
        text: "Ok",
        onPress: () => router.push("/paymentSummaryScreen" as any),
      },
    ]);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <Text style={styles.title}>Pagar con Tarjeta de Crédito</Text>
      
      {cardType && (
        <Image
          source={
            cardType === "Visa"
              ? require("../assets/images/visa.jpg")
              : require("../assets/images/mastercard.png")
          }
          style={styles.cardLogo}
        />
      )}

      <TextInput
        style={styles.input}
        placeholder="Número de tarjeta"
        keyboardType="numeric"
        value={cardNumber}
        onChangeText={handleCardNumberChange}
        maxLength={19}
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
  cardLogo: {
    width: 100,
    height: 50,
    resizeMode: "contain",
    alignSelf: "center",
    marginBottom: 20,
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
