import React from "react";
import styles from "./AdicionarLugar.module.css";
import { Col, Container, Form, Image, Row } from "react-bootstrap";
import foto from "../../assets/addLugarIco2.png";

const AdicionarLugar = () => {
   return (
      <Container className="py-5">
         <Row className="mt-4">
            <Col xs={7}>
               <h2 className="mb-5">Adicione um novo lugar a plataforma</h2>
               <Form>
                  <Form.Group className="mb-3">
                     <Form.Label>Nome do lugar</Form.Label>
                     <Form.Control type="text" placeholder="Insira o nome do lugar" />
                  </Form.Group>
                  <Form.Group className="mb-3">
                     <Form.Label>Descrição</Form.Label>
                     <Form.Control as="textarea" placeholder="Insira uma descrição para este lugar" />
                  </Form.Group>
                  <Form.Group >
                     <Form.Label>Endereço</Form.Label>
                     <Form.Control type="text" placeholder="Insira o endereço para este lugar" />
                  </Form.Group>
               </Form>
            </Col>
            <Col className="d-flex align-items-end">
               <Image className="ms-auto" id={styles.fotoLado} src={foto} />
            </Col>
         </Row>
      </Container>
   );
};

export default AdicionarLugar;
