import { Spinner } from "react-bootstrap";
import styles from "./LoadingBackdrop.module.css";

const LoadingBackdrop = ({ titulo }) => {
   return (
      <div
         className="position-absolute flex-column z-3 top-0 bottom-0 start-0 end-0 d-flex gap-3 align-items-center justify-content-center"
         id={styles.ct}
      >
         <p className="fs-5">{titulo}</p>
         <Spinner id={styles.load} animation="grow" size="lg" variant="light" />
      </div>
   );
};

export default LoadingBackdrop;
