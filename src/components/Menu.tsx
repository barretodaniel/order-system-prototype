import { CircularProgress, Stack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import fetchMenu, { Menu, MenuItem } from "../services/menu.service";

import MenuItemDisplay from "./MenuItem";

export default function MenuDisplay() {
  const [menu, setMenu] = useState<Menu<MenuItem>>();

  useEffect(() => {
    fetchMenu().then((menuData) => setMenu(menuData));
  }, []);

  return (
    <Stack direction="column">
      {menu ? (
        menu.menu.map((item) => <MenuItemDisplay key={item.item} item={item} />)
      ) : (
        <CircularProgress isIndeterminate />
      )}
    </Stack>
  );
}
