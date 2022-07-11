import { createContext, Reducer } from "react";
import { ItemOption, ItemSize, MenuItem } from "../services/menu.service";

export enum CartActionTypes {
  AddToCart = "AddToCart",
}

type CartActions = {
  type: CartActionTypes.AddToCart;
  payload: { item: MenuItem; size: ItemSize; quantity: number };
};

export interface CartEntry {
  quantity: number;
  option: ItemOption;
  name: string;
}

interface CartState {
  cart: Record<string, CartEntry>;
}

export const initialCartState = {
  cart: {},
};

export const cartReducer: Reducer<CartState, CartActions> = (state, action) => {
  switch (action.type) {
    case CartActionTypes.AddToCart: {
      const entry = `${action.payload.item.item}-${action.payload.size}`;

      if (state.cart[entry]) {
        return {
          ...state,
          cart: {
            ...state.cart,
            [entry]: {
              ...state.cart[entry],
              quantity: state.cart[entry].quantity + action.payload.quantity,
            },
          },
        };
      } else {
        const option = action.payload.item.options.find(
          (o) => o.size === action.payload.size
        ) as ItemOption;

        return {
          ...state,
          cart: {
            ...state.cart,
            [entry]: {
              name: action.payload.item.item,
              quantity: action.payload.quantity,
              option,
            },
          },
        };
      }
    }
    default:
      return state;
  }
};

export const CartContext = createContext<{
  cart: Record<string, CartEntry>;
  api: {
    addToCart(item: MenuItem, size: ItemSize, quantity: number): void;
  };
}>({ cart: {}, api: { addToCart: () => {} } });
