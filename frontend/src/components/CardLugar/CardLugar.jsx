import { useRef, useState } from "react";
import styles from "./CardLugar.module.css";
import { Button, Card, Modal, Placeholder, Spinner, Stack } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import inicializarMapa from "../../hooks/useRenderizarMapa";

const CardLugar = ({ id, titulo, descricao, foto, criadoEm, idCriador, endereco, coordenadas }) => {
   const { usuario } = useSelector((state) => state.usuario);
   const [showMapModal, setShowMapModal] = useState(false);
   const [showRemoveModal, setShowRemoveModal] = useState(false);
   const [loading, setLoading] = useState(false);
   const mapCtRef = useRef();
   const navegar = useNavigate();

   async function removerLugar() {
      setLoading(true);
      try {
         const res = await axios.delete(`http://localhost:3000/api/lugares/${id}`);
         navegar("/meus_lugares", { state: { sucesso: true } });
         console.log(res.data.mensagem);
      } catch (error) {
         console.log(error.message);
      }
      setLoading(false);
      setShowRemoveModal(false)
   }
   // TODO: Colocar placeholder onde tem a img temporária
   return (
      <>
         {(id, titulo, descricao, foto, idCriador, endereco, coordenadas) ? (
            <Card bg="dark" text="light" border="secondary" id={styles.ct} className="h-100">
               <Card.Img className="p-2 rounded-4 " src={`http://localhost:3000/${foto}`} />
               <Card.Header id={styles.cardHeader}>
                  <Card.Subtitle style={{ color: "#959595" }}>{endereco}</Card.Subtitle>
               </Card.Header>

               <Card.Body className="d-flex flex-column justify-content-evenly">
                  <Card.Title>{titulo}</Card.Title>
                  <Card.Text className="text-truncate">{descricao}</Card.Text>
               </Card.Body>
               <Card.Footer>
                  {usuario?._id === idCriador ? (
                     <>
                        <Stack className="justify-content-center" direction="horizontal" gap={2}>
                           <Button onClick={() => setShowMapModal(true)}>Ver no mapa</Button>

                           <Button
                              onClick={() => navegar(`/lugares/${id}`, { state: { titulo, descricao, coordenadas, endereco } })}
                              variant="outline-secondary"
                           >
                              Editar
                           </Button>
                           <Button variant="outline-danger" onClick={() => setShowRemoveModal(true)}>
                              Remover
                           </Button>
                        </Stack>
                     </>
                  ) : (
                     <>
                        <Stack className="d-grid">
                           <Button onClick={() => setShowMapModal(true)}>Ver no mapa</Button>
                        </Stack>
                     </>
                  )}
               </Card.Footer>
               {/*Modal do mapa */}
               <Modal
                  backdrop="static"
                  show={showMapModal}
                  onShow={() => {
                     inicializarMapa(mapCtRef.current, coordenadas.lat, coordenadas.lng);
                  }}
                  size="lg"
                  centered
                  onHide={() => setShowMapModal(false)}
               >
                  <Modal.Header closeButton>
                     <Modal.Title>{titulo}</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>{descricao}</Modal.Body>
                  <Modal.Footer>
                     <div id={styles.mapaCt} ref={mapCtRef}></div>
                     <p className="">
                        <i className="bi bi-geo-alt-fill me-1"></i>
                        {endereco}
                     </p>
                  </Modal.Footer>
               </Modal>

               {/*Modal de confirmação de remoção */}
               <Modal backdrop="static" show={showRemoveModal} centered onHide={() => setShowRemoveModal(false)}>
                  <Modal.Header closeButton>
                     <Modal.Title>Tem a certeza?</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                     <div>Você tem a certeza que deseja remover este lugar? Esta ação é irreversível</div>
                  </Modal.Body>
                  <Modal.Footer>
                     <Stack gap={3} direction="horizontal">
                        {!loading ? (
                           <>
                              <Button variant="outline-secondary" onClick={() => setShowRemoveModal(false)}>
                                 Cancelar
                              </Button>
                              <Button onClick={removerLugar} variant="danger">
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
            </Card>
         ) : (
            <Card bg="dark" text="light" border="secondary" id={styles.ct} className="h-100">
               <div className="p-5 rounded-1" id={styles.fundoCustom}>
                  <p className="my-5">Carregando imagem...</p>
               </div>
               <Card.Header id={styles.cardHeader}>
                  <Placeholder animation="glow">
                     <Placeholder xs={8} size="sm" />
                  </Placeholder>
               </Card.Header>

               <Card.Body className="d-flex flex-column justify-content-evenly">
                  <Placeholder animation="glow">
                     <Placeholder as={Card.Title} xs={10} size="lg" />
                     <div className=""></div>
                     <Placeholder size="sm" xs={12} />
                  </Placeholder>
               </Card.Body>

               <Card.Footer>
                  <Stack direction="horizontal">
                     <Placeholder.Button animation="glow" variant="primary" xs={12}>
                        <Placeholder xs={12} />
                     </Placeholder.Button>
                  </Stack>
               </Card.Footer>
            </Card>
         )}
      </>
   );
};

export default CardLugar;
