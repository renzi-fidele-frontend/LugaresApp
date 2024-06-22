import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   modoEscuro: true,
};

const temaSlice = createSlice({
   name: "tema",
   initialState,
   reducers: {
      setModoEscuro: (state, action) => {
         state.modoEscuro = action.payload;
      },
   },
});

export const { setModoEscuro } = temaSlice.actions;

export default temaSlice.reducer;
