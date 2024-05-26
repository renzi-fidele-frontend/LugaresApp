import React, { useRef, useState } from "react";
import styles from "./Cadastro.module.css";
import { Button, Col, Container, Form, Image, Row } from "react-bootstrap";
import foto from "../../assets/cadastro.png";
import axios from "axios";
import LoadingBackdrop from "../../components/LoadingBackdrop/LoadingBackdrop";

const Cadastro = () => {
   const [foiValidado, setFoiValido] = useState(false);
   const [loading, setLoading] = useState(false);

   // Refs do formulário
   const nomeRef = useRef(null);
   const emailRef = useRef(null);
   const passwordRef = useRef(null);

   async function criarConta(e) {
      e.preventDefault();
      setFoiValido(true);
      e.stopPropagation();

      if (e.currentTarget.checkValidity() === false) {
         // Não conseguiu
      } else {
         setLoading(true);
         // TODO: Adicionar feature de foto de perfil para cada usuário
         try {
            const response = await axios.post("http://localhost:3000/api/usuarios/cadastro", {
               nome: nomeRef.current.value,
               email: emailRef.current.value,
               password: passwordRef.current.value,
               foto: "https://firebasestorage.googleapis.com/v0/b/miniblog-c5fa5.appspot.com/o/fotosPerfil%2Fff7db268-a753-464e-b420-b9e859ec6ab9281224678_2115790858626371_7861766981112604163_n.jpg?alt=media&token=02d8c35e-5262-4f67-9970-7edac0216a8e",
            });
            console.log(response.data);
            console.log("Post feito com sucesso");
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
               <h2 className="mb-5">Crie uma conta para também poder compartilhar lugares</h2>
               <Form onSubmit={criarConta} validated={foiValidado} noValidate>
                  <Form.Group className="mb-3">
                     <Form.Label>Nome de usuário</Form.Label>
                     <Form.Control ref={nomeRef} type="text" required placeholder="Insira um nome ao seu gosto" />
                     <Form.Control.Feedback>Parece bom</Form.Control.Feedback>
                     <Form.Control.Feedback type="invalid">Preencha este campo</Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3">
                     <Form.Label>Email</Form.Label>
                     <Form.Control ref={emailRef} type="email" required placeholder="seunome@gmail.com" />
                     <Form.Control.Feedback>Parece bom</Form.Control.Feedback>
                     <Form.Control.Feedback type="invalid">Insira um email válido</Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-4">
                     <Form.Label>Palavra-passe</Form.Label>
                     <Form.Control ref={passwordRef} required type="password" placeholder="Insira a sua senha" />
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
         {loading && <LoadingBackdrop />}
      </Container>
   );
};

export default Cadastro;
