import React from "react";
import styles from "./Lugares.module.css";
import { Col, Container, Image, Row } from "react-bootstrap";
import foto from "../../assets/lugares.svg";

const Lugares = () => {
   return (
      <Container>
         <Row>
            <Col className="text-center">
               <h2 id={styles.titulo} className="mx-auto mt-3 mt-md-5 mb-5 fw-semibold fs-2 pt-4">
                  Descubra os lugares que foram partilhados pelos usuários
               </h2>
               <Image className="mb-5" id={styles.foto} src={foto} />
            </Col>
         </Row>
      </Container>
   );
};

export default Lugares;
