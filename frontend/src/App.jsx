import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home/Home";
import Header from "./components/Header/Header";
import Lugares from "./pages/Lugares/Lugares";
import AdicionarLugar from "./pages/AdicionarLugar/AdicionarLugar";
import Footer from "./components/Footer/Footer";
import EditarLugar from "./pages/EditarLugar/EditarLugar";
import Entrar from "./pages/Entrar/Entrar";
import Cadastro from "./pages/Cadastro/Cadastro";
import MeusLugares from "./pages/MeusLugares/MeusLugares";
import PerfilUsuario from "./pages/PerfilUsuario/PerfilUsuario";
import { useDispatch, useSelector } from "react-redux";
import { setToken, setUsuario } from "./state/usuario/usuarioSlice";
import { useEffect } from "react";

const userData = JSON.parse(localStorage.getItem("userData"));

function App() {
   const dispatch = useDispatch();
   const { usuario } = useSelector((state) => state.usuario);

   useEffect(() => {
      if (userData) {
         dispatch(setUsuario(userData.usuario));
         dispatch(setToken(userData.token));
      }
   }, []);

   return (
      <>
         <BrowserRouter>
            <Header />
            <Routes>
               <Route exact path="/" element={<Home />} />
               <Route path="/lugares" element={<Lugares />} />
               <Route path="/:uid/lugares" element={<Lugares />} />
               <Route path="/adicionar_lugar" element={usuario ? <AdicionarLugar /> : <Entrar />} />
               <Route path="/lugares/:id" element={usuario ? <EditarLugar /> : <Entrar />} />
               <Route path="/login" element={!usuario ? <Entrar /> : <Home />} />
               <Route path="/cadastrar" element={!usuario ? <Cadastro /> : <Home />} />
               <Route path="/meus_lugares" element={usuario ? <MeusLugares /> : <Entrar />} />
               <Route path="/editar_perfil" element={usuario ? <PerfilUsuario /> : <Entrar />} />
            </Routes>
            <Footer />
         </BrowserRouter>
      </>
   );
}

export default App;
