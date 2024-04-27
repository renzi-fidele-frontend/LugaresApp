import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home/Home";
import Header from "./components/Header/Header";
import Lugares from "./pages/Lugares/Lugares";
import AdicionarLugar from "./pages/AdicionarLugar/AdicionarLugar";
import Footer from "./components/Footer/Footer";

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
            </Routes>
            <Footer />
         </BrowserRouter>
      </>
   );
}

export default App;
