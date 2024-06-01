import { useEffect, useRef, useState } from "react";
import styles from "./PerfilUsuario.module.css";
import { Button, Col, Container, Form, Row, Image, Alert } from "react-bootstrap";
import axios from "axios";
import { useLocation } from "react-router-dom";
import LoadingBackdrop from "../../components/LoadingBackdrop/LoadingBackdrop";

const PerfilUsuario = () => {
   const [foiValidado, setFoiValidado] = useState(false);
   const [loading, setLoading] = useState(false);
   const [mostrarErro, setMostrarErro] = useState(false);
   const [erroMsg, setErroMsg] = useState("");
   const [podeAtualizar, setPodeAtualizar] = useState(false);

   const dadosLugar = useLocation().state;

   // Refs do formulário
   const nome_lugar_ref = useRef(null);
   const descricao_ref = useRef(null);

   async function atualizarPerfil(e) {
      e.preventDefault();
      e.stopPropagation();
      setFoiValidado(true);
      if (e.currentTarget.checkValidity() === true) {
         setLoading(true);

         setLoading(false);
      }
   }
   /*
   // Controlador de mudança dos dados do formlário
   useEffect(() => {
      setPodeAtualizar(nome_lugar_ref?.current?.value === dadosLugar?.titulo && descricao_ref?.current?.value === dadosLugar?.descricao);
   }, [nome_lugar_ref?.current?.value, descricao_ref?.current?.value, dadosLugar]);
*/
   return (
      <Container className="py-5">
         <Row className="mt-4">
            <Col xs={12} lg={6} xl={7}>
               <h2 className="mb-5">Atualize os dados do seu perfil</h2>
               <Form
                  onChange={() => {
                     setPodeAtualizar(
                        nome_lugar_ref?.current?.value === dadosLugar?.titulo && descricao_ref?.current?.value === dadosLugar?.descricao
                     );
                  }}
                  onSubmit={atualizarPerfil}
                  validated={foiValidado}
                  noValidate
               >
                  <Form.Group className="mb-3">
                     <Form.Label>Nome do usuário</Form.Label>
                     <Form.Control ref={nome_lugar_ref} required defaultValue="" type="text" placeholder="Insira um nome ao seu gosto" />
                     <Form.Control.Feedback>Parece bom!</Form.Control.Feedback>
                     <Form.Control.Feedback type="invalid">Preencha este campo</Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3">
                     <Form.Label>Palavra-passe</Form.Label>
                     <Form.Control ref={descricao_ref} required defaultValue="" type="text" placeholder="Insira a sua senha" />
                     <Form.Control.Feedback>Parece bom!</Form.Control.Feedback>
                     <Form.Control.Feedback type="invalid">Preencha este campo</Form.Control.Feedback>
                  </Form.Group>

                  <Button type="submit" disabled={podeAtualizar}>
                     Atualizar perfil
                  </Button>

                  {/*   Dando o feedback do submit do formulario  */}
                  <Alert transition show={mostrarErro} className="mt-4" variant="warning">
                     {erroMsg}
                  </Alert>
               </Form>
            </Col>
            <Col className="d-lg-flex d-none align-items-start">
               <Image className="ms-auto" id={styles.fotoLado} src="" />
            </Col>
         </Row>
         {/*   Loading com backdrop  */}
         {loading && <LoadingBackdrop titulo={"Atualizando o perfil..."} />}
      </Container>
   );
};

export default PerfilUsuario;
