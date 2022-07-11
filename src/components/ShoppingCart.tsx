import { Heading, Stack, Text } from "@chakra-ui/react";
import { useContext } from "react";
import { CartContext } from "../store/cart";
import CartItem from "./CartItem";
import { formatter } from "../services/currencyFormatter";

export default function ShoppingCart() {
  const { cart } = useContext(CartContext);

  const total = Object.values(cart).reduce(
    (total, entry) => total + entry.option.price * entry.quantity,
    0
  );

  return (
    <Stack direction="column">
      <Heading>Order summary</Heading>
      {Object.entries(cart).map(([item, value]) => (
        <CartItem key={item} item={value} />
      ))}
      <Text>Order Total: {formatter.format(total)}</Text>
    </Stack>
  );
}
