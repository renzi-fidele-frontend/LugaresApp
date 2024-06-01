import { useEffect, useRef, useState } from "react";
import styles from "./PerfilUsuario.module.css";
import { Button, Col, Container, Form, Row, Image, Alert, Figure, Dropdown } from "react-bootstrap";
import axios from "axios";
import { useLocation } from "react-router-dom";
import LoadingBackdrop from "../../components/LoadingBackdrop/LoadingBackdrop";
import { useSelector } from "react-redux";

const PerfilUsuario = () => {
   const [foiValidado, setFoiValidado] = useState(false);
   const [loading, setLoading] = useState(false);
   const [mostrarErro, setMostrarErro] = useState(false);
   const [erroMsg, setErroMsg] = useState("");
   const [podeAtualizar, setPodeAtualizar] = useState(false);

   const dadosLugar = useLocation().state;

   const { usuario } = useSelector((state) => state.usuario);

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
      <Container className="py-5 px-md-5">
         <Row className="mt-4 px-md-5">
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

                  <Form.Group className="mb-4">
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
            <Col className="d-lg-flex d-none align-items-start position-relative">
               <Image className="ms-auto rounded-2 border border-2 border-secondary-subtle shadow-lg" id={styles.fotoLado} src={usuario?.foto} />
               <Dropdown className="position-absolute end-0 bottom-0">
                  <Dropdown.Toggle id={styles.toogle} as="a">
                     <i
                        style={{ cursor: "pointer" }}
                        className="bi bi-three-dots border border-1 border-secondary-subtle  px-2 py-1 fs-3 bg-light shadow-sm text-dark rounded-circle  "
                     ></i>
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                     <Dropdown.Item>
                        <i className="bi bi-upload me-1"></i> Carregar nova
                     </Dropdown.Item>
                     <Dropdown.Item className="text-danger">Remover</Dropdown.Item>
                  </Dropdown.Menu>
               </Dropdown>
            </Col>
         </Row>
         {/*   Loading com backdrop  */}
         {loading && <LoadingBackdrop titulo={"Atualizando o perfil..."} />}
      </Container>
   );
};

export default PerfilUsuario;
