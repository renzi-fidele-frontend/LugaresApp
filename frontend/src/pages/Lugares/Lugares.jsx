import styles from "./Lugares.module.css";
import { Col, Container, Image, Row } from "react-bootstrap";
import foto from "../../assets/lugares3.svg";
import { lugares } from "../Home/data";
import CardLugar from "../../components/CardLugar/CardLugar";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const Lugares = () => {
   const userId = useParams();
   const userMode = userId.uid ? true : false;
   const [lugares, setLugares] = useState(null);

   async function apanharLugares() {
      try {
         const response = await axios("http://localhost:3000/api/lugares");
         setLugares(response.data.lugares);
         console.log(response.data.lugares);
      } catch (error) {
         console.log(error);
      }
   }

   async function apanharLugaresDoUsuario(uid) {
      try {
         const response = await axios("http://localhost:3000/api/lugares/usuario/" + uid);
         //setLugares(response.data.lugares);
         console.log(response.data);
      } catch (error) {
         console.log(error);
      }
   }

   useEffect(() => {
      if (!lugares && !userMode) {
         apanharLugares();
      } else if (!lugares && userMode) {
         apanharLugaresDoUsuario(userId.uid);
      }
   }, []);

   return (
      <Container id={styles.ct}>
         <Row>
            <Col className="text-center pb-5 ">
               <h2 id={styles.titulo} className="mx-auto mt-3 mt-md-5 mb-5 fw-semibold fs-2 pt-4">
                  {userMode
                     ? `Descubra os lugares que foram compartilhados pelo usuário: ${userId.uid}`
                     : "Descubra os lugares que foram compartilhados pelos usuários"}
               </h2>
               <Image className="mb-5" id={styles.foto} src={foto} />
               {lugares?.length > 0 && (
                  <Row className="mt-4 g-4 justify-content-center">
                     {!userMode
                        ? lugares?.map((v, k) => (
                             <Col md={6} xl={4} key={k}>
                                <CardLugar
                                   titulo={v.titulo}
                                   foto={v.foto}
                                   descricao={v.descricao}
                                   endereco={v.endereco}
                                   criadoEm={v.criadoEm}
                                   idCriador={v.idCriador}
                                   id={v.id}
                                   coordenadas={v.coordenadas}
                                />
                             </Col>
                          ))
                        : lugares?.map((v, k) => (
                             <Col md={6} xl={4} key={k}>
                                <CardLugar
                                   titulo={v.titulo}
                                   foto={v.foto}
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
      </Container>
   );
};

export default Lugares;
