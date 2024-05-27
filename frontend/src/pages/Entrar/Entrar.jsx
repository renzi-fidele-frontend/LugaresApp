import React, { useRef, useState } from "react";
import { Button, Col, Container, Form, Image, Row } from "react-bootstrap";
import styles from "./Entrar.module.css";
import foto from "../../assets/lugares3.svg";
import axios from "axios";
import LoadingBackdrop from "../../components/LoadingBackdrop/LoadingBackdrop";

const Entrar = () => {
   const [foiValidado, setFoiValido] = useState(false);
   const [loading, setLoading] = useState(false);

   // Refs do formulário
   const emailRef = useRef(null);
   const passwordRef = useRef(null);

   async function fazerLogin(e) {
      e.preventDefault();
      e.stopPropagation();
      setFoiValido(true);
      if (e.currentTarget.checkValidity() === false) {
         // Não conseguiu
      } else {
         setLoading(true);
         try {
            const response = await axios.post("http://localhost:3000/api/usuarios/login", {
               email: emailRef.current.value,
               password: passwordRef.current.value,
            });
            console.log(response.data);
         } catch (error) {
            console.log(error);
         }
         setLoading(false);
      }
   }

   return (
      <Container className="py-5">
         <Row className="mt-4">
            <Col xs={12} lg={6} xl={7}>
               <h2 className="mb-5">Faça login para também poder compartilhar lugares</h2>
               <Form onSubmit={fazerLogin} validated={foiValidado} noValidate>
                  <Form.Group className="mb-3">
                     <Form.Label>Email</Form.Label>
                     <Form.Control ref={emailRef} type="email" required placeholder="nome@exemplo.com" />
                     <Form.Control.Feedback>Parece bom</Form.Control.Feedback>
                     <Form.Control.Feedback type="invalid">Insira um email válido</Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-4">
                     <Form.Label>Palavra-passe</Form.Label>
                     <Form.Control ref={passwordRef} required type="password" placeholder="Insira a sua senha" />
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
         {loading && <LoadingBackdrop />}
      </Container>
   );
};

export default Entrar;
