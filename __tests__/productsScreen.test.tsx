import { render, fireEvent } from "@testing-library/react-native";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import ProductsScreen from "../app/productsScreen";
import { Alert } from "react-native";

const mockStore = configureStore([]);
const initialState = {
  product: { products: [] },
};

const renderWithRedux = (component: JSX.Element, store: any) => {
  return render(<Provider store={store}>{component}</Provider>);
};

describe("<ProductsScreen />", () => {
  let store: any;

  beforeEach(() => {
    store = mockStore(initialState);
  });

  it("debe renderizar el título 'Productos Disponibles'", () => {
    const { getByText } = renderWithRedux(<ProductsScreen />, store);
    expect(getByText("Productos Disponibles")).toBeTruthy();
  });

  it("debe mostrar una lista de productos", () => {
    const { getByText } = renderWithRedux(<ProductsScreen />, store);
    expect(getByText("Nike Air Force 1")).toBeTruthy();
    expect(getByText("Calzado para niños grandes")).toBeTruthy();
    expect(getByText("$80.00")).toBeTruthy();
  });

  it("debe agregar un producto al carrito", () => {
    const { getByText, getByPlaceholderText } = renderWithRedux(<ProductsScreen />, store);

    // Introducir cantidad y presionar el botón de agregar
    const quantityInput = getByPlaceholderText("");
    fireEvent.changeText(quantityInput, "2");

    const addButton = getByText("Agregar");
    fireEvent.press(addButton);

    // Simula que el producto se agregó al carrito
    expect(store.getActions()).toEqual([
      expect.objectContaining({
        type: "product/addProduct",
        payload: expect.objectContaining({ id: "1", quantity: 2 }),
      }),
    ]);
  });

  it("muestra una alerta si la cantidad es 0 o inválida", () => {
    const { getByText, getByPlaceholderText } = renderWithRedux(<ProductsScreen />, store);

    // No introducir cantidad
    const quantityInput = getByPlaceholderText("");
    fireEvent.changeText(quantityInput, "0");

    const addButton = getByText("Agregar");
    fireEvent.press(addButton);

    // Verificar que se muestra una alerta
    expect(Alert.alert).toHaveBeenCalledWith(
      "La cantidad debe ser mayor a 0"
    );
  });
});
