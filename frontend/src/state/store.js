import { configureStore } from "@reduxjs/toolkit";
import usuarioReducer from "./usuario/usuarioSlice";

export default configureStore({
   reducer: { usuario: usuarioReducer },
});
