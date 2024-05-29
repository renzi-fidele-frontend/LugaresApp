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
   const removido = useLocation()?.state?.sucesso;

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

   useEffect(() => {
      if (removido) setMostrarRemocao(true);
   }, [removido]);

   return (
      <Container id={styles.ct}>
         <Row>
            <Col className="text-center pb-5 ">
               <h2 id={styles.titulo} className="mx-auto mt-3 mt-md-5 mb-5 fw-semibold fs-2 pt-4">
                  Veja todos os lugares que você compartilhou
               </h2>
               <Image className="mb-5" id={styles.foto} src={foto} />
               {lugares?.length > 0 && (
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
               )}
            </Col>
         </Row>
         {removido && (
            <Toast
               bg="danger"
               className="position-fixed bottom-0 mb-5 me-5 end-0"
               show={mostrarRemocao}
               onClose={() => setMostrarRemocao(false)}
            >
               <Toast.Header>
                  <strong className="me-auto">Notificação</strong>
                  <small>Agora mesmo</small>
               </Toast.Header>
               <Toast.Body>O lugar foi removido com sucesso!</Toast.Body>
            </Toast>
         )}
         {/*Alerta caso seja removido um lugar */}
      </Container>
   );
};

export default MeusLugares;
