# Enlace de video demostrativo
Este video demuestra que todas la funcionalidades de la app se 
ejecutan adecuadamente, ádemas el flujo del diseño es optimo. 

enlace: https://youtu.be/VD1OG-3wsUs

# PaymentApp

## Descripción
**PaymentApp** es una aplicación móvil desarrollada utilizando **Expo**, **React Native** y **Redux**. Permite a los usuarios gestionar productos, agregarlos al carrito, realizar pagos utilizando tarjetas de crédito y obtener un resumen de sus transacciones. Además, incluye pruebas unitarias para garantizar la funcionalidad y la calidad del código.

---

## Tecnologías Utilizadas

- **Expo**: Para la configuración y despliegue de la aplicación.
- **React Native**: Para la interfaz de usuario.
- **Redux**: Para la gestión del estado global.
- **redux-persist-expo-securestore**: Para el almacenamiento seguro y persistencia de datos.
- **TypeScript**: Para tipado estático.
- **Jest** y **@testing-library/react-native**: Para pruebas unitarias y de componentes.

---

## Características

1. **Productos Disponibles**:
   - Lista de productos con detalles como nombre, descripción y precio.
   - Opción para agregar productos al carrito con una cantidad específica.

2. **Carrito de Compras**:
   - Ver productos agregados.
   - Eliminar productos del carrito uno por uno.
   - Mensaje cuando el carrito está vacío.

3. **Opciones de Pago**:
   - Elección del método de pago: Tarjeta de crédito, débito o efectivo.

4. **Resumen de Transacción**:
   - Resumen del monto total y los productos comprados.
   - Simulación de un backend con rutas felices e infelices.

5. **Estado Final**:
   - Confirmación de transacción exitosa o fallo, con opción para regresar al inicio.

6. **Pruebas Unitarias**:
   - Cobertura de más del 80% del código, incluyendo componentes críticos como `ProductsScreen` y `CartScreen`.

---

## Instalación

### Requisitos
- Node.js v16 o superior
- Expo CLI
- Cuenta de Expo (para EAS Build)

### Pasos
1. Clonar el repositorio:
   ```bash
   git clone https://github.com/kquinones107/PaymentApp.git
   cd PaymentApp
   ```

2. Instalar las dependencias:
   ```bash
   npm install --legacy-peer-deps
   ```

3. Iniciar el servidor de desarrollo:
   ```bash
   expo start
   ```

4. Abrir la aplicación:
   - Usa el escáner de códigos QR de la aplicación Expo Go (iOS/Android).

---

## Generar APK
1. Instalar `eas-cli`:
   ```bash
   npm install -g eas-cli
   ```

2. Configurar EAS Build:
   ```bash
   eas build:configure
   ```

3. Generar APK:
   ```bash
   eas build --platform android --profile preview
   ```

4. Descargar el APK desde el enlace proporcionado.

---

## Pruebas Unitarias

### Ejecución de pruebas
1. Ejecutar las pruebas:
   ```bash
   npm test
   ```

### Cobertura
Las pruebas incluyen:
- Renderización correcta de los componentes.
- Verificación de acciones de Redux.
- Comportamientos como agregar y eliminar productos.

---

## Configuración del Proyecto

### `package.json`
Asegúrate de que el archivo incluya:
```json
"jest": {
  "preset": "jest-expo",
  "transformIgnorePatterns": [
    "node_modules/(?!(react-native|@react-native|expo-router|expo-secure-store|@expo(nent)?|@expo-google-fonts|react-navigation|@react-navigation)/)"
  ],
  "setupFilesAfterEnv": ["@testing-library/jest-native/extend-expect"]
}
```

### `babel.config.js`
Asegúrate de que Babel esté configurado correctamente:
```javascript
module.exports = {
  presets: ["@babel/preset-env", "@babel/preset-react", "@babel/preset-typescript"],
};
```


