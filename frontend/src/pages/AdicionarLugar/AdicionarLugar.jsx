import React, { useRef, useState } from "react";
import styles from "./AdicionarLugar.module.css";
import { Alert, Button, Col, Container, Form, Image, Row } from "react-bootstrap";
import foto from "../../assets/addLugarIco2.png";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import LoadingBackdrop from "../../components/LoadingBackdrop/LoadingBackdrop";
import { useNavigate } from "react-router-dom";

const AdicionarLugar = () => {
   const [foiValidado, setFoiValido] = useState(false);
   const dispatch = useDispatch();
   const { usuario, token } = useSelector((state) => state.usuario);
   const [loading, setLoading] = useState(false);
   const [mostrarErro, setMostrarErro] = useState(false);
   const [erroMsg, setErroMsg] = useState("");

   const navegar = useNavigate();

   // Refs do formulário
   const nome_lugar_ref = useRef(null);
   const descricao_ref = useRef(null);
   const endereco_ref = useRef(null);
   const file_ref = useRef(null);

   async function adicionarLugar(e) {
      e.preventDefault();
      e.stopPropagation();
      setFoiValido(true);

      if (e.currentTarget.checkValidity() === false) {
         // Não conseguiu
      } else {
         setLoading(true);
         try {
            const res = await axios.post(
               "http://localhost:3000/api/lugares",
               {
                  titulo: nome_lugar_ref.current.value,
                  descricao: descricao_ref.current.value,
                  endereco: endereco_ref.current.value,
                  idCriador: usuario._id,
                  foto: file_ref.current.files[0],
               },
               {
                  headers: {
                     "Content-Type": "multipart/form-data",
                     Authorization: `Bearer ${token}`,
                  },
               }
            );

            navegar("/meus_lugares", { state: { novo_criado: true } });
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
               <h2 className="mb-5">Adicione um novo lugar a plataforma</h2>
               <Form onSubmit={adicionarLugar} validated={foiValidado} noValidate>
                  <Form.Group className="mb-3">
                     <Form.Label>Nome do lugar</Form.Label>
                     <Form.Control ref={nome_lugar_ref} required type="text" placeholder="Insira o nome do lugar" />
                     <Form.Control.Feedback>Parece bom!</Form.Control.Feedback>
                     <Form.Control.Feedback type="invalid">Preencha este campo</Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3">
                     <Form.Label>Descrição</Form.Label>
                     <Form.Control ref={descricao_ref} required as="textarea" placeholder="Insira uma descrição para este lugar" />
                     <Form.Control.Feedback>Parece bom!</Form.Control.Feedback>
                     <Form.Control.Feedback type="invalid">Preencha este campo</Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-4">
                     <Form.Label>Endereço</Form.Label>
                     <Form.Control ref={endereco_ref} required type="text" placeholder="Insira o endereço para este lugar" />
                     <Form.Control.Feedback>Parece bom!</Form.Control.Feedback>
                     <Form.Control.Feedback type="invalid">Preencha este campo</Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-4">
                     <Form.Label>Imagem do lugar</Form.Label>
                     <Form.Control ref={file_ref} accept="image/*" required type="file" placeholder="Insira o endereço para este lugar" />
                     <Form.Control.Feedback>Parece bom!</Form.Control.Feedback>
                     <Form.Control.Feedback type="invalid">Preencha este campo</Form.Control.Feedback>
                  </Form.Group>

                  <Button type="submit">Adicionar lugar</Button>

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
         {loading && <LoadingBackdrop titulo={"Adicionando o lugar..."} />}
      </Container>
   );
};

export default AdicionarLugar;
