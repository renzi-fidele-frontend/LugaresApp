import { Image, Spinner } from "react-bootstrap";
import loadFoto from "../../assets/loadIco.svg";

const LoadingBackdrop = () => {
   return (
      <div
         className="position-absolute flex-column z-3 top-0 bottom-0 start-0 end-0 d-flex align-items-center justify-content-center"
         style={{ backgroundColor: "red", width: "100%", height: "100%" }}
      >
         <p>Criando a conta...</p>
         <Spinner animation="grow" size="lg" variant="light" />
      </div>
   );
};

export default LoadingBackdrop;
