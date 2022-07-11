import menuData from "./data.json";

export interface Menu<Item> {
  menu: Array<Item>;
}

export type ItemSize = "small" | "regular" | "large" | "too large";

export interface ItemOption {
  size: ItemSize;
  price: number;
}

export interface MenuItem {
  item: string;
  options: Array<ItemOption>;
}

export default function fetchMenu(): Promise<Menu<MenuItem>> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(menuData as Menu<MenuItem>);
    }, 1000);
  });
}
