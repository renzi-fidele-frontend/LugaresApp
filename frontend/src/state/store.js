import { configureStore } from "@reduxjs/toolkit";
import usuarioReducer from "./usuario/usuarioSlice";
import temaReducer from "./tema/temaSlice";

export default configureStore({
   reducer: { usuario: usuarioReducer, tema: temaReducer },
});
