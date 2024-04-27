import React, { useRef, useState } from "react";
import styles from "./CardLugar.module.css";
import { Button, Card, Modal, Stack } from "react-bootstrap";

const CardLugar = ({ id, titulo, descricao, foto, criadoEm, idCriador, endereco, coordenadas }) => {
   const currentUserId = useRef("");
   const [show, setShow] = useState(false);
   const mapCtRef = useRef();

   async function inicializarMapa() {
      const { Map } = await google.maps.importLibrary("maps");

      let map = new Map(mapCtRef.current, {
         center: { lat: coordenadas.lat, lng: coordenadas.long },
         zoom: 8,
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
            <Stack className="justify-content-center " direction="horizontal" gap={2}>
               <Button variant="outline-primary" onClick={() => setShow(true)}>
                  Ver no mapa
               </Button>
               {currentUserId.current === "" && (
                  <>
                     <Button variant="outline-secondary">Editar</Button>
                     <Button variant="outline-danger">Remover</Button>
                  </>
               )}
            </Stack>
         </Card.Footer>
         {/*Modal do mapa */}
         <Modal backdrop="static" show={show} onShow={inicializarMapa} size="lg" centered onHide={() => setShow(false)}>
            <Modal.Header closeButton>
               <Modal.Title>{titulo}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
               <div id={styles.mapaCt} ref={mapCtRef}></div>
            </Modal.Body>
         </Modal>
      </Card>
   );
};

export default CardLugar;
