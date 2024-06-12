import { Col, Container, Image, Row, Toast } from "react-bootstrap";
import CardLugar from "../../components/CardLugar/CardLugar";
import styles from "./MeusLugares.module.css";
import foto from "../../assets/meus_lugares.png";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useLocation } from "react-router-dom";

const MeusLugares = () => {
   const [lugares, setLugares] = useState(null);
   const { usuario } = useSelector((state) => state.usuario);
   const [mostrarRemocao, setMostrarRemocao] = useState(false);
   const [mostrarAtualizado, setMostrarAtualizado] = useState(false);
   const [mostrarNovoCriado, setMostrarNovoCriado] = useState(false);
   const removido = useLocation()?.state?.sucesso;
   const atualizado = useLocation()?.state?.atualizado;
   const novo_criado = useLocation()?.state?.novo_criado;

   async function apanharMeusLugares() {
      try {
         const res = await axios("http://localhost:3000/api/lugares/usuario/" + usuario?._id);
         setLugares(res.data.lugares_do_usuario);
      } catch (error) {
         console.log(error);
      }
   }

   useEffect(() => {
      if (!lugares) apanharMeusLugares();
   }, [usuario]);

   // Controlador das notificações
   useEffect(() => {
      if (removido) setMostrarRemocao(true);
      if (atualizado) setMostrarAtualizado(true);
      if (novo_criado) setMostrarNovoCriado(true);
   }, [removido, atualizado, novo_criado]);

   return (
      <Container id={styles.ct}>
         <Row>
            <Col className="text-center pb-5 ">
               <h2 id={styles.titulo} className="mx-auto mt-3 mt-md-5 mb-5 fw-semibold fs-2 pt-4">
                  Veja todos os lugares que você compartilhou
               </h2>
               <Image className="mb-5" id={styles.foto} src={foto} />
               {lugares?.length > 0 ? (
                  <Row className="mt-4 g-4 justify-content-center">
                     {lugares?.map((v, k) => (
                        <Col md={6} xl={4} key={k}>
                           <CardLugar
                              titulo={v.titulo}
                              foto={v.foto}
                              id={v._id}
                              descricao={v.descricao}
                              endereco={v.endereco}
                              criadoEm={v.criadoEm}
                              idCriador={v.idCriador}
                              coordenadas={v.coordenadas}
                           />
                        </Col>
                     ))}
                  </Row>
               ) : (
                  <Row className="mt-0 mt-md-4 g-4 justify-content-center">
                     {[1, 2, 3, 4, 5].map((v, k) => (
                        <Col md={6} xl={4} key={k}>
                           <CardLugar pertenceAoUsuario key={k} />
                        </Col>
                     ))}
                  </Row>
               )}
            </Col>
         </Row>
         {/*Alerta caso seja removido um lugar */}
         {removido && (
            <Toast
               bg="danger"
               className="position-fixed bottom-0 mb-5 me-5 end-0"
               show={mostrarRemocao}
               onClose={() => setMostrarRemocao(false)}
               delay={10000}
            >
               <Toast.Header>
                  <strong className="me-auto">Notificação</strong>
                  <small>Agora mesmo</small>
               </Toast.Header>
               <Toast.Body>O lugar foi removido com sucesso!</Toast.Body>
            </Toast>
         )}

         {/* Alerta caso um lugar seja atualizado */}
         {atualizado && (
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
               <Toast.Body>O lugar foi atualizado com sucesso!</Toast.Body>
            </Toast>
         )}

         {/* Alerta caso um novo lugar seja adicionado */}
         {novo_criado && (
            <Toast
               bg="success"
               className="position-fixed bottom-0 mb-5 me-lg-5 end-0"
               show={mostrarNovoCriado}
               onClose={() => setMostrarNovoCriado(false)}
               delay={10000}
            >
               <Toast.Header>
                  <strong className="me-auto">Notificação</strong>
                  <small>Agora mesmo</small>
               </Toast.Header>
               <Toast.Body>Um novo lugar foi criado com sucesso!</Toast.Body>
            </Toast>
         )}
      </Container>
   );
};

export default MeusLugares;
