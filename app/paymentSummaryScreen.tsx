import React, { useState } from "react";
import { 
    View, 
    Text, 
    StyleSheet, 
    Alert,
    ActivityIndicator,
    FlatList 
} from "react-native";
import Button from "@/components/Button";
import { router, useRouter } from "expo-router";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";



export default function PaymentSummaryScreen() {

    const [isLoading, setIsLoading] = useState(false);

    // Obtener los productos del carrito desde el estado global
    const cart = useSelector((state: RootState) => state.product.products);
  
    // Calcular el total del carrito
    const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  
    const simulateApiCall = () => {
      return new Promise<{ success: boolean }>((resolve) => {
        // Simula una llamada a la API con un retraso de 2 segundos
        setTimeout(() => {
          const isSuccessful = Math.random() > 0.5; // Simula éxito o fallo (50/50)
          resolve({ success: isSuccessful });
        }, 2000);
      });
    };
  
    const handleConfirmPayment = async () => {
      setIsLoading(true); // Muestra el indicador de carga mientras se simula la API
      try {
        const response = await simulateApiCall();
  
        if (response.success) {
          Alert.alert("Transacción Exitosa", "Tu pago se procesó correctamente.", [
            { text: "OK", 
                onPress: () => { router.push("/transactionStatusScreen?status=success" as any); console.log("Ruta feliz manejada"); } },
          ]);
        } else {
          Alert.alert(
            "Transacción Fallida",
            "Hubo un error procesando tu pago. Por favor, intenta nuevamente.",
            [{ text: "OK", onPress: () => { router.push("/transactionStatusScreen?status=error" as any); console.log("Ruta triste manejada") } }]
          );
        }
      } catch (error) {
        Alert.alert(
          "Error",
          "Ocurrió un error inesperado. Por favor, intenta nuevamente."
        );
        console.error("Error al procesar el pago:", error);
      } finally {
        setIsLoading(false); // Oculta el indicador de carga al finalizar
      }
    };
  
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Resumen de Pago</Text>
  
        {/* Lista de productos en el carrito */}
        <FlatList
          data={cart}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.product}>
              <Text style={styles.productText}>
                {item.name} x {item.quantity}: ${item.price * item.quantity}
              </Text>
            </View>
          )}
        />
  
        {/* Total */}
        <Text style={styles.total}>Total a pagar: ${total.toFixed(2)}</Text>
  
        {/* Indicador de carga o botón */}
        {isLoading ? (
          <ActivityIndicator size="large" color="#007BFF" style={styles.loader} />
        ) : (
          <Button
            title="Confirmar Pago"
            onPress={handleConfirmPayment}
            style={styles.button}
          />
        )}
      </View>
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
  summary: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: "center",
  },
  button: {
    marginTop: 20,
    padding: 15,
    borderRadius: 10,
  },
  product: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "#ccc",
    marginBottom: 10,
  },
    productText: {
        fontSize: 16,
    },
    total: {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "right",
        marginTop: 20,
    },
    loader: {
        marginTop: 20,
    },
});
