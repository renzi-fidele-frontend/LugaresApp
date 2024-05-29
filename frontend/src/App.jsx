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

function App() {
   return (
      <>
         <BrowserRouter>
            <Header />
            <Routes>
               <Route exact path="/" element={<Home />} />
               <Route path="/lugares" element={<Lugares />} />
               <Route path="/:uid/lugares" element={<Lugares />} />
               <Route path="/adicionar_lugar" element={<AdicionarLugar />} />
               <Route path="/lugares/:id" element={<EditarLugar />} />
               <Route path="/login" element={<Entrar />} />
               <Route path="/cadastrar" element={<Cadastro />} />
               <Route path="/meus_lugares" element={<MeusLugares />} />
            </Routes>
            <Footer />
         </BrowserRouter>
      </>
   );
}

export default App;
