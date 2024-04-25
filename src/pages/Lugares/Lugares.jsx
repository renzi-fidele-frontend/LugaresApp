import styles from "./Lugares.module.css";
import { Col, Container, Image, Row } from "react-bootstrap";
import foto from "../../assets/lugares3.svg";
import { lugares } from "../Home/data";
import CardLugar from "../../components/CardLugar/CardLugar";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

const Lugares = () => {
   const userId = useParams();
   const userMode = userId.uid ? true : false;

   useEffect(() => {
      console.log(`O uid do usuário é: ${userId.uid}`);
      console.log(userMode);
   }, [userId]);

   return (
      <Container>
         <Row>
            <Col className="text-center pb-5 ">
               <h2 id={styles.titulo} className="mx-auto mt-3 mt-md-5 mb-5 fw-semibold fs-2 pt-4">
                  {userMode
                     ? `Descubra os lugares que foram compartilhados pelo usuário: ${userId.uid}`
                     : "Descubra os lugares que foram compartilhados pelos usuários"}
               </h2>
               <Image className="mb-5" id={styles.foto} src={foto} />

               <Row className="mt-4 g-5">
                  {!userMode
                     ? lugares.map((v, k) => (
                          <Col md={6} xl={4} key={k}>
                             <CardLugar
                                titulo={v.titulo}
                                foto={v.foto}
                                descricao={v.descricao}
                                endereco={v.endereco}
                                criadoEm={v.criadoEm}
                                idCriador={v.idCriador}
                                key={k}
                             />
                          </Col>
                       ))
                     : lugares
                          .filter((v) => v.idCriador === userId.uid)
                          .map((v, k) => (
                             <Col md={6} xl={4} key={k}>
                                <CardLugar
                                   titulo={v.titulo}
                                   foto={v.foto}
                                   descricao={v.descricao}
                                   endereco={v.endereco}
                                   criadoEm={v.criadoEm}
                                   idCriador={v.idCriador}
                                   key={k}
                                />
                             </Col>
                          ))}
               </Row>
            </Col>
         </Row>
      </Container>
   );
};

export default Lugares;
