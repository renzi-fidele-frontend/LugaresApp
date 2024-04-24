import React from "react";
import styles from "./Lugares.module.css";
import { Col, Container, Image, Row } from "react-bootstrap";
import foto from "../../assets/lugares.svg";
import { lugares } from "../Home/data";
import CardLugar from "../../components/CardLugar/CardLugar";

const Lugares = () => {
   return (
      <Container>
         <Row>
            <Col className="text-center">
               <h2 id={styles.titulo} className="mx-auto mt-3 mt-md-5 mb-5 fw-semibold fs-2 pt-4">
                  Descubra os lugares que foram partilhados pelos usuários
               </h2>
               <Image className="mb-5" id={styles.foto} src={foto} />

               <Row className="gy-5 g-sm-4">
                  {lugares.map((v, k) => (
                     <Col md={6} xl={4} key={k}>
                        <CardLugar
                           titulo={v.titulo}
                           foto={v.foto}
                           descricao={v.descricao}
                           endereco={v.endereco}
                           criadoEm={v.criadoEm}
                           idCriador={v.idCriador}
                           key={k}
                        />
                     </Col>
                  ))}
               </Row>
            </Col>
         </Row>
      </Container>
   );
};

export default Lugares;
