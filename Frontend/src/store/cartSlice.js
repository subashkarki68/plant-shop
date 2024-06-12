import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    cart: []
};

export const cartSlice  = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart : (state, action) => {
            state.cart.push(action.payload);
        },
        increaseQuantity : (state, action) => {
            const {itemId} = action.payload;
            const item = state.cart.find((item) => item.id === itemId);
            if(item){
                item.quantity += 1;
            }
        },
        decreaseQuantity : (state, action) => {
            const {itemId} = action.payload;
            const item = state.cart.find((item) => item.id === itemId);
            if(item && item.quantity > 1){
                item.quantity -= 1;
            }
        },

        removeProduct : (state, action) => {
            const {itemId} = action.payload;
            const item = state.cart.find((item) => item.id === itemId);
            if(item){
                state.cart = state.cart.filter((item) => item.id !== itemId);
            }
        }
    }
});

export const { addToCart, increaseQuantity, decreaseQuantity, removeProduct } = cartSlice.actions;
export default cartSlice.reducer;