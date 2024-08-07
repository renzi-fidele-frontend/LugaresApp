import { useEffect, useRef, useState } from "react";
import styles from "./PerfilUsuario.module.css";
import { Button, Col, Container, Form, Row, Image, Alert, Dropdown, Modal, Stack, Spinner, Toast } from "react-bootstrap";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import LoadingBackdrop from "../../components/LoadingBackdrop/LoadingBackdrop";
import { useDispatch, useSelector } from "react-redux";
import { setUsuario } from "../../state/usuario/usuarioSlice";

const PerfilUsuario = () => {
   const [foiValidado, setFoiValidado] = useState(false);
   const [loading, setLoading] = useState(false);
   const [mostrarErro, setMostrarErro] = useState(false);
   const [erroMsg, setErroMsg] = useState("");
   const [podeAtualizar, setPodeAtualizar] = useState(false);
   const [showRemoveModal, setShowRemoveModal] = useState(false);
   const [mostrarAtualizado, setMostrarAtualizado] = useState(false);

   const { usuario, token } = useSelector((state) => state.usuario);

   const dispatch = useDispatch();
   const navegar = useNavigate();

   // Refs do formulário
   const nome_usuario_ref = useRef(null);
   const password_ref = useRef(null);
   const imgRef = useRef(null);
   const fotoPerfilMobileRef = useRef(null);

   async function atualizarPerfil(e) {
      e.preventDefault();
      e.stopPropagation();
      setFoiValidado(true);
      if (e.currentTarget.checkValidity() === true) {
         setLoading(true);
         let nome = nome_usuario_ref.current.value;
         let password = password_ref.current.value;
         let foto = imgRef?.current?.files[0];
         let dadosAtualizados = { nome, password };

         if (foto) {
            dadosAtualizados.foto = foto;
            dadosAtualizados.fotoRemovida = usuario.foto;
         }

         try {
            const res = await axios.patch(`${import.meta.env.VITE_BACKEND_URL}/api/usuarios/${usuario._id}`, dadosAtualizados, {
               headers: {
                  "Content-Type": "multipart/form-data",
                  Authorization: `Bearer ${token}`,
               },
            });
            dispatch(setUsuario(res.data.usuario));
            localStorage.setItem("userData", JSON.stringify({ ...JSON.parse(localStorage.getItem("userData")), usuario: res.data.usuario }));
            setMostrarAtualizado(true);
            setPodeAtualizar(true);
            setFoiValidado(false);
         } catch (err) {
            console.log(err.response.data.mensagem);
         }

         setLoading(false);
      }
   }

   async function removerFotoUsuario() {
      setLoading(true);
      try {
         const res = await axios.patch(
            `${import.meta.env.VITE_BACKEND_URL}/api/usuarios/remover_foto`,
            { fotoRemovida: usuario.foto },
            {
               headers: { Authorization: `Bearer ${token}` },
            }
         );
         console.log("Foto removida com sucesso!");
         dispatch(setUsuario(res.data.usuario));
         setShowRemoveModal(false);
         setMostrarAtualizado(true);
      } catch (error) {
         console.log(error);
      }
      setLoading(false);
      return;
   }

   function handleImgUpload() {
      setPodeAtualizar(false);
      const reader = new FileReader();
      reader.onloadend = () => {
         fotoPerfilRef.current.src = reader.result;
         fotoPerfilMobileRef.current.src = reader.result;
      };
      reader.readAsDataURL(imgRef.current.files[0]);
   }

   function verificarMudanca() {
      if (imgRef?.current?.files[0]) {
         setPodeAtualizar(false);
      } else {
         setPodeAtualizar(nome_usuario_ref?.current?.value === usuario?.nome && password_ref?.current?.value === usuario?.password);
      }
   }

   // Controlador de mudança dos dados do formlário
   useEffect(() => {
      verificarMudanca();
   }, []);

   const fotoPerfilRef = useRef(null);

   return (
      <Container className="py-md-5 py-4 px-md-5">
         <Row className="mt-lg-4 px-md-5">
            <Col xs={12} lg={6} xl={7}>
               <h2 className="mb-4 mb-md-5">Atualize os dados do seu perfil</h2>
               <div className="d-lg-none position-relative mb-4" style={{ width: "fit-content" }}>
                  <Image
                     ref={fotoPerfilMobileRef}
                     className="ms-auto rounded-2 border object-fit-cover border-2 border-secondary-subtle shadow-lg"
                     id={styles.fotoLado}
                     src={usuario?.foto}
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
                           <input name="foto_perfil" className="d-none" ref={imgRef} onChange={handleImgUpload} accept="image/*" type="file" />
                        </Dropdown.Item>
                        <Dropdown.Item
                           onClick={() => {
                              setShowRemoveModal(true);
                           }}
                           className="text-danger"
                        >
                           Remover
                        </Dropdown.Item>
                     </Dropdown.Menu>
                  </Dropdown>
               </div>
               <Form onChange={verificarMudanca} onSubmit={atualizarPerfil} validated={foiValidado} noValidate>
                  <Form.Group className="mb-3">
                     <Form.Label>Nome do usuário</Form.Label>
                     <Form.Control
                        ref={nome_usuario_ref}
                        required
                        defaultValue={usuario?.nome}
                        type="text"
                        placeholder="Insira um nome ao seu gosto"
                     />
                     <Form.Control.Feedback>Parece bom!</Form.Control.Feedback>
                     <Form.Control.Feedback type="invalid">Preencha este campo</Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-4">
                     <Form.Label>Palavra-passe</Form.Label>
                     <Form.Control ref={password_ref} required defaultValue={usuario?.password} type="text" placeholder="Insira a sua senha" />
                     <Form.Control.Feedback>Parece bom!</Form.Control.Feedback>
                     <Form.Control.Feedback type="invalid">Preencha este campo</Form.Control.Feedback>
                  </Form.Group>

                  <Button type="submit" disabled={podeAtualizar}>
                     Atualizar perfil
                  </Button>

                  {!podeAtualizar && (
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
                  ref={fotoPerfilRef}
                  className="ms-auto rounded-2 border object-fit-cover border-2 border-secondary-subtle shadow-lg"
                  id={styles.fotoLado}
                  src={usuario?.foto}
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
                        <input name="foto_perfil" className="d-none" ref={imgRef} onChange={handleImgUpload} accept="image/*" type="file" />
                     </Dropdown.Item>
                     <Dropdown.Item
                        onClick={() => {
                           setShowRemoveModal(true);
                        }}
                        className="text-danger"
                     >
                        Remover
                     </Dropdown.Item>
                  </Dropdown.Menu>
               </Dropdown>
            </Col>
         </Row>
         {/*   Loading com backdrop  */}
         {loading && <LoadingBackdrop titulo={"Atualizando o perfil..."} />}

         {/*Modal de confirmação de remoção */}
         <Modal backdrop="static" show={showRemoveModal} centered onHide={() => setShowRemoveModal(false)}>
            <Modal.Header closeButton>
               <Modal.Title>Tem a certeza?</Modal.Title>
            </Modal.Header>
            <Modal.Body>
               <div>Você tem a certeza que deseja remover a sua foto de perfil? Esta ação é irreversível</div>
            </Modal.Body>
            <Modal.Footer>
               <Stack gap={3} direction="horizontal">
                  {!loading ? (
                     <>
                        <Button variant="outline-secondary" onClick={() => setShowRemoveModal(false)}>
                           Cancelar
                        </Button>
                        <Button onClick={removerFotoUsuario} variant="danger">
                           Remover
                        </Button>
                     </>
                  ) : (
                     <Button disabled variant="danger">
                        <Spinner />
                     </Button>
                  )}
               </Stack>
            </Modal.Footer>
         </Modal>

         {/* Alerta caso um perfil seja atualizado */}

         <Toast
            className="position-fixed bottom-0 mb-5 me-lg-5 end-0"
            show={mostrarAtualizado}
            onClose={() => setMostrarAtualizado(false)}
            delay={10000}
         >
            <Toast.Header>
               <strong className="me-auto">Notificação</strong>
               <small>Agora mesmo</small>
            </Toast.Header>
            <Toast.Body>O seu perfil foi atualizado com sucesso!</Toast.Body>
         </Toast>
      </Container>
   );
};

export default PerfilUsuario;
