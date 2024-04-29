import React, { useRef, useState } from "react";
import { Button, Col, Container, Form, Image, Row } from "react-bootstrap";
import styles from "./Entrar.module.css";
import foto from "../../assets/lugares3.svg";

const Entrar = () => {
   const [foiValidado, setFoiValido] = useState(false);

   // Refs do formulário
   const nome_lugar_ref = useRef(null);
   const descricao_ref = useRef(null);
   const endereco_ref = useRef(null);

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

export default Entrar;
