import React, { useRef, useState } from "react";
import styles from "./Cadastro.module.css";
import { Button, Col, Container, Form, Image, Row } from "react-bootstrap";
import foto from "../../assets/cadastro.png";

const Cadastro = () => {
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
               <h2 className="mb-5">Crie uma conta para também poder compartilhar lugares</h2>
               <Form onSubmit={adicionarLugar} validated={foiValidado} noValidate>
                  <Form.Group className="mb-3">
                     <Form.Label>Nome de usuário</Form.Label>
                     <Form.Control type="text" required placeholder="Insira um nome ao seu gosto" />
                     <Form.Control.Feedback>Parece bom</Form.Control.Feedback>
                     <Form.Control.Feedback type="invalid">Preencha este campo</Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3">
                     <Form.Label>Email</Form.Label>
                     <Form.Control type="email" required placeholder="seunome@gmail.com" />
                     <Form.Control.Feedback>Parece bom</Form.Control.Feedback>
                     <Form.Control.Feedback type="invalid">Insira um email válido</Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-4">
                     <Form.Label>Palavra-passe</Form.Label>
                     <Form.Control required type="password" placeholder="Insira a sua senha" />
                     <Form.Control.Feedback>Parece bom</Form.Control.Feedback>
                     <Form.Control.Feedback type="invalid">Preencha este campo</Form.Control.Feedback>
                  </Form.Group>

                  <Button type="submit">Cadastrar</Button>
               </Form>
            </Col>
            <Col className="d-lg-flex d-none align-items-end">
               <Image className="ms-auto" id={styles.fotoLado} src={foto} />
            </Col>
         </Row>
      </Container>
   );
};

export default Cadastro;
