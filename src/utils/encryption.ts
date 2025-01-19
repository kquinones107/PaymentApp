import * as Crypto from "expo-crypto";

const SECRET_KEY = "MiClaveSecreta123"; // Cambia esto por una clave segura.

export const encryptData = async (data: string): Promise<string> => {
  const hashedKey = await Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256, SECRET_KEY);
  const encrypted = await Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256, data + hashedKey);
  return encrypted;
};

export const decryptData = (encryptedData: string): string => {
  // Nota: expo-crypto no proporciona desencriptación directa.
  // En un caso real, se necesitaría un backend seguro para manejar claves privadas.
  return encryptedData; // Simulación
};
