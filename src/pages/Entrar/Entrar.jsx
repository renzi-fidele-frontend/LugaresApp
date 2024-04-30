import React, { useRef, useState } from "react";
import { Button, Col, Container, Form, Image, Row } from "react-bootstrap";
import styles from "./Entrar.module.css";
import foto from "../../assets/lugares3.svg";

const Entrar = () => {
   const [foiValidado, setFoiValido] = useState(false);

   // Refs do formulário

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
               <h2 className="mb-5">Faça login para também poder compartilhar lugares</h2>
               <Form onSubmit={adicionarLugar} validated={foiValidado} noValidate>
                  <Form.Group className="mb-3">
                     <Form.Label>Email</Form.Label>
                     <Form.Control type="email" required placeholder="nome@exemplo.com" />
                     <Form.Control.Feedback>Parece bom</Form.Control.Feedback>
                     <Form.Control.Feedback type="invalid">Insira um email válido</Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-4">
                     <Form.Label>Palavra-passe</Form.Label>
                     <Form.Control required type="password" placeholder="Insira a sua senha" />
                     <Form.Control.Feedback>Parece bom</Form.Control.Feedback>
                     <Form.Control.Feedback type="invalid">Preencha este campo</Form.Control.Feedback>
                  </Form.Group>

                  <Button type="submit">Fazer Login</Button>
               </Form>
            </Col>
            <Col className="d-lg-flex d-none align-items-end">
               <Image className="ms-auto" id={styles.fotoLado} src={foto} />
            </Col>
         </Row>
      </Container>
   );
};

export default Entrar;
