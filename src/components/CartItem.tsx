import { Heading, Stack, Text } from "@chakra-ui/react";
import { ItemOption } from "../services/menu.service";
import { formatter } from "../services/currencyFormatter";

interface CartItemProps {
  item: {
    name: string;
    option: ItemOption;
    quantity: number;
  };
}
export default function CartItem({ item }: CartItemProps) {
  return (
    <Stack>
      <Stack direction="row">
        <Heading size="md">{item.name}</Heading>
        <Text casing="capitalize">{item.option.size}</Text>
      </Stack>
      <Stack direction="row">
        <Text>Qty. {item.quantity}</Text>
        <Text>{formatter.format(item.quantity * item.option.price)}</Text>
      </Stack>
    </Stack>
  );
}
