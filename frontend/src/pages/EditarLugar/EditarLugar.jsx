import React, { useEffect, useMemo, useRef, useState } from "react";
import styles from "./EditarLugar.module.css";
import { Button, Col, Container, Form, Row, Image, Alert } from "react-bootstrap";
import foto from "../../assets/updateLugar.png";
import axios from "axios";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import LoadingBackdrop from "../../components/LoadingBackdrop/LoadingBackdrop";
import inicializarMapa from "../../hooks/useRenderizarMapa";

const EditarLugar = () => {
   const [foiValidado, setFoiValidado] = useState(false);
   const [loading, setLoading] = useState(false);
   const [mostrarErro, setMostrarErro] = useState(false);
   const [erroMsg, setErroMsg] = useState("");
   const [podeEnviar, setPodeEnviar] = useState(false);

   const idLugar = useParams()?.id;

   const dadosLugar = useLocation().state;

   // Refs do formulário
   const nome_lugar_ref = useRef(null);
   const descricao_ref = useRef(null);

   const navegar = useNavigate();

   async function atualizarLugar(e) {
      e.preventDefault();
      e.stopPropagation();
      setFoiValidado(true);
      if (e.currentTarget.checkValidity() === true) {
         setLoading(true);
         try {
            const res = await axios.patch(`http://localhost:3000/api/lugares/${idLugar}`, {
               titulo: nome_lugar_ref.current.value,
               descricao: descricao_ref.current.value,
            });
            console.log(res.data);
            navegar("/lugares");
         } catch (error) {
            console.log(error.message);
            /*if (error.response.data.mensagem) {
               setErroMsg(error.response.data.mensagem);
               setMostrarErro(true);
               setTimeout(() => {
                  setMostrarErro(false);
               }, 5000);
            }*/
         }
         setLoading(false);
      }
   }

   const mapCtRef = useRef(null);

   // Controlador de mudança dos dados do formlário
   useEffect(() => {
      setPodeEnviar(nome_lugar_ref?.current?.value === dadosLugar?.titulo && descricao_ref?.current?.value === dadosLugar?.descricao);
   }, [nome_lugar_ref?.current?.value, descricao_ref?.current?.value, dadosLugar]);

   useMemo(() => {
      console.log(dadosLugar?.coordenadas);
      if (mapCtRef.current) inicializarMapa(mapCtRef?.current, dadosLugar?.coordenadas?.lat, dadosLugar?.coordenadas?.lng);
   }, [mapCtRef?.current, dadosLugar?.coordenadas]);

   return (
      <Container className="py-5">
         <Row className="mt-4">
            <Col xs={12} lg={6} xl={7}>
               <h2 className="mb-5">Atualize os dados deste lugar</h2>
               <Form
                  onChange={() => {
                     setPodeEnviar(
                        nome_lugar_ref?.current?.value === dadosLugar?.titulo && descricao_ref?.current?.value === dadosLugar?.descricao
                     );
                  }}
                  onSubmit={atualizarLugar}
                  validated={foiValidado}
                  noValidate
               >
                  <Form.Group className="mb-3">
                     <Form.Label>Nome do lugar</Form.Label>
                     <Form.Control
                        ref={nome_lugar_ref}
                        required
                        defaultValue={dadosLugar.titulo}
                        type="text"
                        placeholder="Insira o nome do lugar"
                     />
                     <Form.Control.Feedback>Parece bom!</Form.Control.Feedback>
                     <Form.Control.Feedback type="invalid">Preencha este campo</Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3">
                     <Form.Label>Descrição</Form.Label>
                     <Form.Control
                        ref={descricao_ref}
                        defaultValue={dadosLugar.descricao}
                        required
                        as="textarea"
                        placeholder="Insira uma descrição para este lugar"
                     />
                     <Form.Control.Feedback type="invalid">Preencha este campo</Form.Control.Feedback>
                  </Form.Group>

                  <Button type="submit" disabled={podeEnviar}>
                     Atualizar lugar
                  </Button>

                  {/*   Dando o feedback do submit do formulario  */}
                  <Alert transition show={mostrarErro} className="mt-4" variant="warning">
                     {erroMsg}
                  </Alert>
               </Form>
            </Col>
            <Col className="d-lg-flex d-none align-items-start">
               <Image className="ms-auto" id={styles.fotoLado} src={foto} />
            </Col>
         </Row>
         {/*   Loading com backdrop  */}
         {loading && <LoadingBackdrop titulo={"Atualizando o lugar..."} />}

         {/*   TODO: Adicionar separador e Renderizar mapa */}
         <hr className="my-4" />
         <Row>
            <Col>
               <div ref={mapCtRef} style={{ width: "100%", height: "300px" }}></div>
               <p className="mt-2 text-center">
                  <i className="bi bi-geo-alt-fill me-1"></i>
                  {dadosLugar?.endereco}
               </p>
            </Col>
         </Row>
      </Container>
   );
};

export default EditarLugar;
