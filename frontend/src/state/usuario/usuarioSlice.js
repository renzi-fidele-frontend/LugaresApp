import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   usuario: null,
};

const usuarioSlice = createSlice({
   name: "usuario",
   initialState,
   reducers: {
      setUsuario: (state, action) => {
         state.usuario = action.payload;
      },
   },
});

export const { setUsuario } = usuarioSlice.actions;

export default usuarioSlice.reducer;
