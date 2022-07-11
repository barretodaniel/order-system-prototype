import { Container, Heading, Stack, StackDivider } from "@chakra-ui/react";
import { useReducer } from "react";
import {
  cartReducer,
  initialCartState,
  CartActionTypes,
  CartContext,
} from "./store/cart";
import Menu from "./components/Menu";
import ShoppingCart from "./components/ShoppingCart";
import { ItemSize, MenuItem } from "./services/menu.service";

function App() {
  const [cartState, dispatch] = useReducer(cartReducer, initialCartState);

  const handleAddToCart = (
    item: MenuItem,
    size: ItemSize,
    quantity: number
  ) => {
    dispatch({
      type: CartActionTypes.AddToCart,
      payload: {
        item,
        size,
        quantity,
      },
    });
  };

  return (
    <Container maxWidth="62em">
      <Heading marginBottom="4">Opal Menu</Heading>
      <CartContext.Provider
        value={{ cart: cartState.cart, api: { addToCart: handleAddToCart } }}
      >
        <Stack direction="row" divider={<StackDivider />}>
          <Menu />
          <ShoppingCart />
        </Stack>
      </CartContext.Provider>
    </Container>
  );
}

export default App;
