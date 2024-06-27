import styles from "./Lugares.module.css";
import { Alert, Col, Container, Image, Pagination, Row } from "react-bootstrap";
import foto from "../../assets/lugares3.png";
import CardLugar from "../../components/CardLugar/CardLugar";
import { useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import axios from "axios";

const Lugares = () => {
   const userId = useParams();
   const userMode = userId.uid ? true : false;
   const [lugares, setLugares] = useState(null);
   const [usuario, setUsuario] = useState(null);
   const paginaAtual = useRef(1);
   const totalPaginas = useRef(null);

   async function apanharUsuario(uid) {
      try {
         const res = await axios(`${import.meta.env.VITE_BACKEND_URL}/api/usuarios/${uid}`);
         setUsuario(res.data.usuario);
      } catch (error) {
         console.log(error);
      }
   }

   async function apanharLugares() {
      try {
         const res = await axios(`${import.meta.env.VITE_BACKEND_URL}/api/lugares?page=${paginaAtual.current}`);
         totalPaginas.current = res.data.totalPaginas;
         setLugares(res.data.lugares);
      } catch (error) {
         console.log(error);
      }
   }

   async function apanharLugaresDoUsuario(uid) {
      try {
         const res = await axios(`${import.meta.env.VITE_BACKEND_URL}/api/lugares/usuario/${uid}`);
         setLugares(res.data.lugares_do_usuario);
      } catch (error) {
         console.log(error);
      }
   }

   function gerarArray(length) {
      // Gerar um array contendo Integers de 1 até o length
      return Array.from({ length }, (v, i) => i + 1);
   }

   useEffect(() => {
      if (!lugares && !userMode) {
         apanharLugares();
      } else if (!lugares && userMode) {
         apanharLugaresDoUsuario(userId.uid);
      }

      if (!usuario && userMode) apanharUsuario(userId.uid);
   }, []);

   // TODO: Resolver bug ao mudar de página o componente não atualiza
   return (
      <Container id={styles.ct}>
         <Row>
            <Col className="text-center pb-5 ">
               <h2 id={styles.titulo} className="mx-auto mt-3 mt-md-5 mb-4 mb-md-5 fw-semibold fs-2 pt-4">
                  {userMode
                     ? `Descubra os lugares que foram compartilhados pelo usuário: ${usuario?.nome}`
                     : "Descubra os lugares que foram compartilhados pelos usuários"}
               </h2>
               <Image className="mb-sm-5 mb-1" id={styles.foto} src={foto} />
               {lugares?.length > 0 && (
                  <>
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
                                      id={v._id}
                                      coordenadas={v.coordenadas}
                                   />
                                </Col>
                             ))
                           : lugares?.map((v, k) => (
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
                     {/*   Paginação */}
                     <Row className="mt-5 mb-1 mb-md-0">
                        <Col>
                           <Pagination size="lg" className="d-none d-md-flex justify-content-center">
                              {gerarArray(totalPaginas.current)?.map((v, k) => (
                                 <Pagination.Item
                                    onClick={() => {
                                       if (v !== paginaAtual.current) {
                                          window.scrollTo({ top: 0, behavior: "smooth" });
                                          paginaAtual.current = v;
                                          setLugares(null);
                                          apanharLugares();
                                       }
                                    }}
                                    active={v === paginaAtual.current}
                                    key={k}
                                 >
                                    {v}
                                 </Pagination.Item>
                              ))}
                           </Pagination>
                           {/*   Paginação do mobile */}
                           <Pagination className="d-md-none justify-content-center">
                              {gerarArray(totalPaginas.current)?.map((v, k) => (
                                 <Pagination.Item
                                    onClick={() => {
                                       if (v !== paginaAtual.current) {
                                          window.scrollTo({ top: 0, behavior: "smooth" });
                                          paginaAtual.current = v;
                                          setLugares(null);
                                          apanharLugares();
                                       }
                                    }}
                                    active={v === paginaAtual.current}
                                    key={k}
                                 >
                                    {v}
                                 </Pagination.Item>
                              ))}
                           </Pagination>
                        </Col>
                     </Row>
                  </>
               )}
               {!lugares && (
                  <Row className="mt-4 g-4 justify-content-center">
                     {[1, 2, 3, 4, 5].map((v, k) => (
                        <Col md={6} xl={4} key={k}>
                           <CardLugar />
                        </Col>
                     ))}
                  </Row>
               )}
               {lugares?.length === 0 && (
                  <Row className="mt-4 g-4 justify-content-center">
                     <Col>
                        <Alert variant="dark">Este usuário ainda não adicionou nehum lugar</Alert>
                     </Col>
                  </Row>
               )}
            </Col>
         </Row>
      </Container>
   );
};

export default Lugares;
