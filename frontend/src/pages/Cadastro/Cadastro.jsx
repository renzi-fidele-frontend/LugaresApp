import { useRef, useState } from "react";
import styles from "./Cadastro.module.css";
import { Alert, Button, Col, Container, Form, Image, Row } from "react-bootstrap";
import foto from "../../assets/cadastro.png";
import axios from "axios";
import LoadingBackdrop from "../../components/LoadingBackdrop/LoadingBackdrop";
import { useDispatch } from "react-redux";
import { setToken, setUsuario } from "../../state/usuario/usuarioSlice";
import { useNavigate } from "react-router-dom";

const Cadastro = () => {
   const [foiValidado, setFoiValido] = useState(false);
   const [loading, setLoading] = useState(false);
   const [mostrarErro, setMostrarErro] = useState(false);
   const [erroMsg, setErroMsg] = useState("");
   const dispatch = useDispatch();
   const navegar = useNavigate();

   // Refs do formulário
   const nomeRef = useRef(null);
   const emailRef = useRef(null);
   const passwordRef = useRef(null);
   const fotoRef = useRef(null);

   async function criarConta(e) {
      e.preventDefault();
      setFoiValido(true);
      e.stopPropagation();

      if (e.currentTarget.checkValidity() === false) {
         // Não conseguiu
      } else {
         setLoading(true);

         try {
            const res = await axios.post(
               "http://localhost:3000/api/usuarios/cadastro",
               {
                  nome: nomeRef.current.value,
                  email: emailRef.current.value,
                  password: passwordRef.current.value,
                  foto: fotoRef.current.files[0],
               },
               {
                  headers: {
                     "Content-Type": "multipart/form-data",
                  },
               }
            );
            dispatch(setUsuario(res.data.usuario));
            dispatch(setToken(res.data.token));
            localStorage.setItem("userData", JSON.stringify(res.data));
            navegar("/adicionar_lugar");
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
      <Container className="py-5">
         <Row className="mt-4">
            <Col xs={12} lg={6}>
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

                  <Form.Group className="mb-4">
                     <Form.Label>Foto de perfil</Form.Label>
                     <Form.Control ref={fotoRef} accept="image/*" required type="file" />
                     <Form.Control.Feedback>Parece bom!</Form.Control.Feedback>
                     <Form.Control.Feedback type="invalid">Preencha este campo</Form.Control.Feedback>
                  </Form.Group>

                  <Button type="submit">Cadastrar</Button>

                  {/*   Dando o feedback do submit do formulario  */}
                  <Alert transition show={mostrarErro} className="mt-4" variant="warning">
                     {erroMsg}
                  </Alert>
               </Form>
            </Col>
            <Col className="d-lg-flex d-none align-items-start pt-0">
               <Image className="ms-auto" id={styles.fotoLado} src={foto} />
            </Col>
         </Row>
         {/*   Loading com backdrop  */}
         {loading && <LoadingBackdrop titulo={"Criando a conta..."} />}
      </Container>
   );
};

export default Cadastro;
