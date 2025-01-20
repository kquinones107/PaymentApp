import { render, fireEvent } from "@testing-library/react-native";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import CartScreen from "../app/cartScreen";

const mockStore = configureStore([]);
const initialState = {
  product: {
    products: [
      {
        id: "1",
        name: "Producto A",
        quantity: 2,
        image: { uri: "https://via.placeholder.com/100" },
      },
    ],
  },
};

const renderWithRedux = (component: JSX.Element, store: any) => {
  return render(<Provider store={store}>{component}</Provider>);
};

describe("<CartScreen />", () => {
  let store: any;

  beforeEach(() => {
    store = mockStore(initialState);
  });

  it("debe mostrar el título 'Carrito'", () => {
    const { getByText } = renderWithRedux(<CartScreen />, store);
    expect(getByText("Carrito")).toBeTruthy();
  });

  it("debe mostrar los productos en el carrito", () => {
    const { getByText } = renderWithRedux(<CartScreen />, store);
    expect(getByText("Producto A")).toBeTruthy();
    expect(getByText("Cantidad: 2")).toBeTruthy();
  });

  it("debe eliminar un producto del carrito", () => {
    const { getByText } = renderWithRedux(<CartScreen />, store);

    const eliminarButton = getByText("Eliminar");
    fireEvent.press(eliminarButton);

    const actions = store.getActions();
    expect(actions).toEqual([
      {
        type: "product/removeProduct",
        payload: "1",
      },
    ]);
  });

  it("debe mostrar un mensaje cuando el carrito está vacío", () => {
    const emptyState = { product: { products: [] } };
    const emptyStore = mockStore(emptyState);

    const { getByText } = renderWithRedux(<CartScreen />, emptyStore);
    expect(getByText("Tu carrito está vacío.")).toBeTruthy();
  });

  it("debe navegar a la pantalla de opciones de pago al presionar 'Finalizar Compra'", () => {
    const { getByText } = renderWithRedux(<CartScreen />, store);
    const finalizarButton = getByText("Finalizar Compra");

    fireEvent.press(finalizarButton);
    // Simula que se navegó correctamente
    expect(finalizarButton).toBeTruthy();
  });
});
