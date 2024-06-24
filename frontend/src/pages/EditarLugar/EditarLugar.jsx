import React, { useEffect, useMemo, useRef, useState } from "react";
import styles from "./EditarLugar.module.css";
import { Button, Col, Container, Form, Row, Image, Alert, Dropdown } from "react-bootstrap";
import foto from "../../assets/updateLugar.png";
import axios from "axios";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import LoadingBackdrop from "../../components/LoadingBackdrop/LoadingBackdrop";
import inicializarMapa from "../../hooks/useRenderizarMapa";
import { useSelector } from "react-redux";

const EditarLugar = () => {
   const [foiValidado, setFoiValidado] = useState(false);
   const [loading, setLoading] = useState(false);
   const [mostrarErro, setMostrarErro] = useState(false);
   const [erroMsg, setErroMsg] = useState("");
   const [podeEnviar, setPodeEnviar] = useState(false);

   const { token, usuario } = useSelector((state) => state.usuario);

   const idLugar = useParams()?.id;

   const dadosLugar = useLocation().state;

   // Refs do formulário
   const nome_lugar_ref = useRef(null);
   const descricao_ref = useRef(null);
   const fotoLugarRef = useRef(null);
   const fotoLugarMobileRef = useRef(null);

   const inputFileRef = useRef(null);

   const navegar = useNavigate();

   async function atualizarLugar(e) {
      e.preventDefault();
      e.stopPropagation();
      setFoiValidado(true);
      if (e.currentTarget.checkValidity() === true) {
         setLoading(true);
         try {
            const res = await axios.patch(
               `${import.meta.env.VITE_BACKEND_URL}/api/lugares/${idLugar}`,
               {
                  titulo: nome_lugar_ref.current.value,
                  descricao: descricao_ref.current.value,
                  idCriador: usuario._id,
                  foto: inputFileRef.current.files[0],
               },
               { headers: { Authorization: `Bearer ${token}` } }
            );
            console.log(res.data);
            navegar("/meus_lugares", { state: { atualizado: true } });
         } catch (error) {
            console.log(error.message);
         }
         setLoading(false);
      }
   }

   function mostrarPreviaFoto() {
      // TODO: Resolver prévia de imagem no mobile
      setPodeEnviar(false);
      const reader = new FileReader();
      reader.onloadend = () => {
         fotoLugarRef.current.src = reader.result;
         fotoLugarMobileRef.current.src = reader.result;
      };
      reader.readAsDataURL(inputFileRef.current.files[0]);
   }

   const mapCtRef = useRef(null);

   // Controlador de mudança dos dados do formlário
   useEffect(() => {
      setPodeEnviar(nome_lugar_ref?.current?.value === dadosLugar?.titulo && descricao_ref?.current?.value === dadosLugar?.descricao);
   }, [nome_lugar_ref?.current?.value, descricao_ref?.current?.value, dadosLugar]);

   useMemo(() => {
      console.log(dadosLugar?.coordenadas);
      inicializarMapa(mapCtRef.current, dadosLugar?.coordenadas?.lat, dadosLugar?.coordenadas?.lng);
   }, [mapCtRef?.current, dadosLugar?.coordenadas]);

   return (
      <Container className="py-5">
         <Row className="mt-0 mt-md-4">
            <Col xs={12} lg={6} xl={7}>
               <h2 className="mb-3 mb-lg-5">Atualize os dados deste lugar</h2>
               {/*  Foto do Mobile */}
               <div className="d-lg-none position-relative mt-3 mb-4" style={{ width: "fit-content" }}>
                  <Image
                     ref={fotoLugarMobileRef}
                     className="ms-auto rounded-2 border object-fit-cover border-2 border-secondary-subtle shadow-lg"
                     id={styles.fotoLado}
                     src={`${import.meta.env.VITE_BACKEND_URL}/${dadosLugar?.foto}`}
                  />
                  <Dropdown drop="end" className="position-absolute start-0 bottom-0">
                     <Dropdown.Toggle id={styles.toogle} as="a">
                        <i
                           style={{ cursor: "pointer" }}
                           className="bi bi-three-dots border border-1 border-secondary-subtle px-2 py-1 fs-3 bg-light shadow-sm text-dark rounded-circle  "
                        ></i>
                     </Dropdown.Toggle>
                     <Dropdown.Menu>
                        <Dropdown.Item as="label" style={{ cursor: "pointer" }}>
                           <i className="bi bi-upload me-1"></i> Carregar nova
                           <input
                              name="foto_perfil"
                              className="d-none"
                              ref={inputFileRef}
                              onChange={mostrarPreviaFoto}
                              accept="image/*"
                              type="file"
                           />
                        </Dropdown.Item>
                     </Dropdown.Menu>
                  </Dropdown>
               </div>
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

                  {!podeEnviar && (
                     <Button
                        className="ms-3"
                        variant="danger"
                        onClick={(e) => {
                           e.preventDefault();
                           navegar("/lugares");
                        }}
                     >
                        Cancelar
                     </Button>
                  )}

                  {/*   Dando o feedback do submit do formulario  */}
                  <Alert transition show={mostrarErro} className="mt-4" variant="warning">
                     {erroMsg}
                  </Alert>
               </Form>
            </Col>
            <Col className="d-lg-flex d-none align-items-start position-relative">
               <Image
                  ref={fotoLugarRef}
                  className="ms-auto rounded-2 border object-fit-cover border-2 border-secondary-subtle shadow-lg"
                  id={styles.fotoLado}
                  src={`${import.meta.env.VITE_BACKEND_URL}/${dadosLugar?.foto}`}
               />
               <Dropdown drop="start" className="position-absolute end-0 bottom-0">
                  <Dropdown.Toggle id={styles.toogle} as="a">
                     <i
                        style={{ cursor: "pointer" }}
                        className="bi bi-three-dots border border-1 border-secondary-subtle  px-2 py-1 fs-3 bg-light shadow-sm text-dark rounded-circle  "
                     ></i>
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                     <Dropdown.Item as="label" style={{ cursor: "pointer" }}>
                        <i className="bi bi-upload me-1"></i> Carregar nova
                        <input
                           name="foto_perfil"
                           className="d-none"
                           ref={inputFileRef}
                           onChange={mostrarPreviaFoto}
                           accept="image/*"
                           type="file"
                        />
                     </Dropdown.Item>
                  </Dropdown.Menu>
               </Dropdown>
            </Col>
         </Row>
         {/*   Loading com backdrop  */}
         {loading && <LoadingBackdrop titulo={"Atualizando o lugar..."} />}

         <hr className="my-4" />
         <Row>
            <Col>
               <div ref={mapCtRef} id={styles.mapaCt}></div>
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
