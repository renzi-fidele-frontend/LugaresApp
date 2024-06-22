import React, { useRef, useState } from "react";
import { Alert, Button, Col, Container, Form, Image, Row } from "react-bootstrap";
import styles from "./Entrar.module.css";
import foto from "../../assets/lugares3.png";
import axios from "axios";
import LoadingBackdrop from "../../components/LoadingBackdrop/LoadingBackdrop";
import { useDispatch } from "react-redux";
import { setToken, setUsuario } from "../../state/usuario/usuarioSlice";
import { useNavigate } from "react-router-dom";

const Entrar = () => {
   const [foiValidado, setFoiValido] = useState(false);
   const [loading, setLoading] = useState(false);
   const [mostrarErro, setMostrarErro] = useState(false);
   const [erroMsg, setErroMsg] = useState("");
   const dispatch = useDispatch();
   const navegar = useNavigate();

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
            const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/usuarios/login`, {
               email: emailRef.current.value,
               password: passwordRef.current.value,
            });
            dispatch(setUsuario(res.data.usuario));
            dispatch(setToken(res.data.token));
            localStorage.setItem("userData", JSON.stringify(res.data));
            navegar("/lugares");
         } catch (error) {
            if (error.response.data.mensagem) {
               setErroMsg(error.response.data.mensagem);
               setMostrarErro(true);
               setTimeout(() => {
                  setMostrarErro(false);
               }, 5000);
            }
         }
         setLoading(false);
      }
   }

   return (
      <Container className="py-5 px-xxl-5">
         <Row className="mt-0 mt-md-4 px-xxl-5">
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

                  {/*   Dando o feedback do submit do formulario  */}
                  <Alert transition show={mostrarErro} className="mt-4" variant="warning">
                     {erroMsg}
                  </Alert>
               </Form>
            </Col>
            <Col className="d-lg-flex d-none align-items-start pt-2">
               <Image className="ms-auto" id={styles.fotoLado} src={foto} />
            </Col>
         </Row>
         {/*   Loading com backdrop  */}
         {loading && <LoadingBackdrop titulo={"Fazendo login..."} />}
      </Container>
   );
};

export default Entrar;
