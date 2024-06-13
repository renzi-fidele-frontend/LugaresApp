import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   usuario: null,
   token: null,
};

const usuarioSlice = createSlice({
   name: "usuario",
   initialState,
   reducers: {
      setUsuario: (state, action) => {
         state.usuario = action.payload;
      },
      setToken: (state, action) => {
         state.token = action.payload;
      },
   },
});

export const { setUsuario, setToken } = usuarioSlice.actions;

export default usuarioSlice.reducer;
