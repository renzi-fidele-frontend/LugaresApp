import React, { useState } from "react";
import styles from "./AdicionarLugar.module.css";
import { Button, Col, Container, Form, FormGroup, Image, Row } from "react-bootstrap";
import foto from "../../assets/addLugarIco2.png";
import Feedback from "react-bootstrap/esm/Feedback";

const AdicionarLugar = () => {
   const [foiValidado, setFoiValido] = useState(false);

   function adicionarLugar(e) {
      if (e.currentTarget.checkValidity() === false) {
         e.preventDefault();
         e.stopPropagation();
      }
      setFoiValido(true);
   }

   return (
      <Container className="py-5">
         <Row className="mt-4">
            <Col xs={12} lg={6} xl={7}>
               <h2 className="mb-5">Adicione um novo lugar a plataforma</h2>
               <Form onSubmit={adicionarLugar} validated={foiValidado} noValidate>
                  <Form.Group className="mb-3">
                     <Form.Label>Nome do lugar</Form.Label>
                     <Form.Control required type="text" placeholder="Insira o nome do lugar" />
                     <Form.Control.Feedback type="invalid">Preencha este campo</Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3">
                     <Form.Label>Descrição</Form.Label>
                     <Form.Control required as="textarea" placeholder="Insira uma descrição para este lugar" />
                     <Form.Control.Feedback type="invalid">Preencha este campo</Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-4">
                     <Form.Label>Endereço</Form.Label>
                     <Form.Control required type="text" placeholder="Insira o endereço para este lugar" />
                     <Form.Control.Feedback type="invalid">Preencha este campo</Form.Control.Feedback>
                  </Form.Group>

                  <Button type="submit">Adicionar lugar</Button>
               </Form>
            </Col>
            <Col className="d-lg-flex d-none align-items-end">
               <Image className="ms-auto" id={styles.fotoLado} src={foto} />
            </Col>
         </Row>
      </Container>
   );
};

export default AdicionarLugar;
