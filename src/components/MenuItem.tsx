import {
  Button,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  Stack,
  Text,
} from "@chakra-ui/react";
import { ChangeEventHandler, useContext, useState } from "react";
import { CartContext } from "../store/cart";
import { ItemSize, MenuItem } from "../services/menu.service";
import { formatter } from "../services/currencyFormatter";

interface MenuItemProps {
  item: MenuItem;
}

const MINIMUM_QUANTITY = 1;

/**
 * Utility to capitalize text because you can't style <option></option> on macOS easily.
 * @param text
 * @returns Capitalized string
 */
function capitalize(text: string) {
  return text
    .split(" ")
    .map((t) => t[0].toUpperCase() + t.slice(1))
    .join(" ");
}

export default function MenuItemDisplay({ item }: MenuItemProps) {
  const [quantitySelected, setQuantity] = useState(MINIMUM_QUANTITY);
  const [selectedSize, setSize] = useState<ItemSize>();
  const { api } = useContext(CartContext);

  const handleAddToCart = () => {
    if (selectedSize) {
      api.addToCart(item, selectedSize, quantitySelected);
    }
  };

  const handleQuantityChange = (_: string, value: number) => {
    setQuantity(value);
  };

  const handleSizeChange: ChangeEventHandler<HTMLSelectElement> = (event) => {
    setSize(event.currentTarget.value as ItemSize);
  };
  return (
    <Stack
      direction="column"
      padding="2"
      border="1px"
      borderRadius="base"
      borderColor="gray.200"
      boxShadow="base"
    >
      <Text>{item.item}</Text>
      <NumberInput
        defaultValue={MINIMUM_QUANTITY}
        min={MINIMUM_QUANTITY}
        onChange={handleQuantityChange}
      >
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
      <Select
        data-testid={`${item.item}-select`}
        placeholder="Select a size"
        onChange={handleSizeChange}
      >
        {item.options.map((option) => (
          <option key={option.size} value={option.size}>
            {capitalize(option.size)}-{formatter.format(option.price)}
          </option>
        ))}
      </Select>
      <Button disabled={!selectedSize} onClick={handleAddToCart}>
        Add to cart
      </Button>
    </Stack>
  );
}
