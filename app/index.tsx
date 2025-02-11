import React, { useEffect } from "react";
import { Text, View, Image, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {

  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/welcome");
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require("../assets/images/logo.jpg")}
        style={styles.logo}
        resizeMode="contain"
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    color: "#666",
  },
});
