import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home/Home";
import Header from "./components/Header/Header";
import LugaresDoUsuario from "./pages/LugaresDoUsuario/LugaresDoUsuario";

function App() {
   return (
      <>
         <BrowserRouter>
            <Header />
            <Routes>
               <Route exact path="/" element={<Home />} />
               <Route path="/:uid/lugares" element={<LugaresDoUsuario />} />
            </Routes>
         </BrowserRouter>
      </>
   );
}

export default App;
