import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home/Home";
import NewHeader from "./components/Header/Header";

function App() {
   return (
      <>
         <BrowserRouter>
            <NewHeader />
            <Routes>
               <Route exact path="/" element={<Home />} />
            </Routes>
         </BrowserRouter>
      </>
   );
}

export default App;
