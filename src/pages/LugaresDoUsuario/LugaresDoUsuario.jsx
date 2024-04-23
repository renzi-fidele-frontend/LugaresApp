import React from "react";
import styles from "./LugaresDoUsuario.module.css";
import { Col, Container, Row } from "react-bootstrap";

const LugaresDoUsuario = () => {
   return (
      <Container id={styles.ct}>
         <Row>
            <Col className="text-center">
               <h2 id={styles.titulo} className="mx-auto mt-3 mt-md-5 mb-5 fw-semibold fs-2 pt-4">
                  Encontre todos os usuários que compartilharam lugares
               </h2>
            </Col>
         </Row>
      </Container>
   );
};

export default LugaresDoUsuario;
