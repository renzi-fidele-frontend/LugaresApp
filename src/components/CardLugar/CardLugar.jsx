import React, { useRef, useState } from "react";
import styles from "./CardLugar.module.css";
import { Button, Card, Modal, Stack } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const CardLugar = ({ id, titulo, descricao, foto, criadoEm, idCriador, endereco, coordenadas }) => {
   const currentUserId = useRef("u1");
   const [showMapModal, setShowMapModal] = useState(false);
   const [showRemoveModal, setShowRemoveModal] = useState(false);
   const mapCtRef = useRef();
   const navegar = useNavigate();

   async function inicializarMapa() {
      const { Map } = await google.maps.importLibrary("maps");

      let map = new Map(mapCtRef.current, {
         center: { lat: coordenadas.lat, lng: coordenadas.long },
         zoom: 16,
      });
   }

   return (
      <Card bg="dark" text="light" border="secondary" id={styles.ct} className="">
         <Card.Img className="p-2 rounded-4 " src={foto} />
         <Card.Header id={styles.cardHeader}>
            <Card.Subtitle style={{ color: "#959595" }}>{endereco}</Card.Subtitle>
         </Card.Header>

         <Card.Body>
            <Card.Title>{titulo}</Card.Title>
            <Card.Text>{descricao}</Card.Text>
         </Card.Body>
         <Card.Footer>
            {currentUserId.current === idCriador ? (
               <>
                  <Stack className="justify-content-center" direction="horizontal" gap={2}>
                     <Button onClick={() => setShowMapModal(true)}>Ver no mapa</Button>

                     <Button onClick={() => navegar(`/lugares/${id}`)} variant="outline-secondary">
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
         <Modal backdrop="static" show={showMapModal} onShow={inicializarMapa} size="lg" centered onHide={() => setShowMapModal(false)}>
            <Modal.Header closeButton>
               <Modal.Title>{titulo}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
               <div id={styles.mapaCt} ref={mapCtRef}></div>
            </Modal.Body>
         </Modal>

         {/*Modal de confirmação de remoção */}
         <Modal backdrop="static" show={showRemoveModal} centered onHide={() => setShowRemoveModal(false)}>
            <Modal.Header closeButton>
               <Modal.Title>Tem a certeza?</Modal.Title>
            </Modal.Header>
            <Modal.Body>Você tem a certeza que deseja remover este lugar? Esta ação é irreversível</Modal.Body>
            <Modal.Footer>
               <Stack gap={3} direction="horizontal">
                  <Button variant="outline-secondary" onClick={() => setShowRemoveModal(false)}>
                     Cancelar
                  </Button>
                  <Button variant="danger">Remover</Button>
               </Stack>
            </Modal.Footer>
         </Modal>
      </Card>
   );
};

export default CardLugar;
