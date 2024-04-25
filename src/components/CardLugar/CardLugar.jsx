import React, { useRef } from "react";
import styles from "./CardLugar.module.css";
import { Button, Card, Stack } from "react-bootstrap";

const CardLugar = ({ id, titulo, descricao, foto, criadoEm, idCriador, endereco }) => {
   const currentUserId = useRef("");

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
               <Button variant="outline-primary">Ver no mapa</Button>
               {currentUserId.current === "" && (
                  <>
                     <Button variant="outline-secondary">Editar</Button>
                     <Button variant="outline-danger">Remover</Button>
                  </>
               )}
            </Stack>
         </Card.Footer>
      </Card>
   );
};

export default CardLugar;
