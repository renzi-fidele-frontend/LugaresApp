import { Col, Container, Image, Row } from "react-bootstrap";
import CardLugar from "../../components/CardLugar/CardLugar";
import styles from "./MeusLugares.module.css";
import foto from "../../assets/meus_lugares.png";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

const MeusLugares = () => {
   const [lugares, setLugares] = useState(null);
   const { usuario } = useSelector((state) => state.usuario);

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
      </Container>
   );
};

export default MeusLugares;
