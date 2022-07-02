import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    //Actions
    addToBasket: (state, action) => {
      state.items = [...state.items, action.payload];
    },
    removeFromBasket: (state, action) => {
      // state.items = state.items.filter(item => (item.id!==action.payload.id))
      const index = state.items.findIndex(
        (basketItem) => basketItem.id === action.payload.id
      );
      let newBasket = [...state.items];
      if (index >= 0) {
        // The item exist in the basket. And remove it.
        newBasket.splice(index, 1);
      } else {
        //items does not exist
        console.warn(
          `Cant remove product (id: ${action.payload.id} as its not in the basket`
        );
      }
      state.items = newBasket;
    },
  },
});

export const { addToBasket, removeFromBasket } = basketSlice.actions;

// Selectors - This is how we pull information from the Global store slice
export const selectItems = (state) => state.basket.items;

export const selectTotal = (state) => {
  const total = state.basket.items.reduce(
    (total, item) => total + item.price,
    0
  );
  return total;
};

export default basketSlice.reducer;
