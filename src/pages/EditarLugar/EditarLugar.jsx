import React, { useState } from "react";
import styles from "./EditarLugar.module.css";
import { Button, Col, Container, Form, Row, Image } from "react-bootstrap";
import foto from "../../assets/updateLugar.png";

const EditarLugar = () => {
   const [foiValidado, setFoiValidado] = useState(false);

   function atualizarLugar(e) {
      if (e.currentTarget.checkValidity() === false) {
         e.preventDefault();
         e.stopPropagation();
      }
      setFoiValidado(true);
   }

   return (
      <Container className="py-5">
         <Row className="mt-4">
            <Col xs={12} lg={6} xl={7}>
               <h2 className="mb-5">Atualize os dados deste lugar</h2>
               <Form onSubmit={atualizarLugar} validated={foiValidado} noValidate>
                  <Form.Group className="mb-3">
                     <Form.Label>Nome do lugar</Form.Label>
                     <Form.Control required type="text" placeholder="Insira o nome do lugar" />
                     <Form.Control.Feedback>Parece bom!</Form.Control.Feedback>
                     <Form.Control.Feedback type="invalid">Preencha este campo</Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3">
                     <Form.Label>Descrição</Form.Label>
                     <Form.Control required as="textarea" placeholder="Insira uma descrição para este lugar" />
                     <Form.Control.Feedback type="invalid">Preencha este campo</Form.Control.Feedback>
                  </Form.Group>

                  <Button type="submit">Atualizar lugar</Button>
               </Form>
            </Col>
            <Col className="d-lg-flex d-none align-items-end">
               <Image className="ms-auto" id={styles.fotoLado} src={foto} />
            </Col>
         </Row>
      </Container>
   );
};

export default EditarLugar;
