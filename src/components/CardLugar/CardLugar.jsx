import React from "react";
import styles from "./CardLugar.module.css";
import { Button, Card, Stack } from "react-bootstrap";

const CardLugar = ({ id, titulo, descricao, foto, criadoEm, idCriador, endereco }) => {
   return (
      <Card bg="dark" text="light" border="secondary" id={styles.ct} className="">
         <Card.Img src={foto} />
         <Card.Header>
            <Card.Subtitle className="">{endereco}</Card.Subtitle>
         </Card.Header>
         <Card.Body>
            <Card.Title>{titulo}</Card.Title>
            <Card.Text>{descricao}</Card.Text>
         </Card.Body>
         <Card.Footer>
            <Stack gap={2}>
               <Button variant="secondary">Ver no mapa</Button>
            </Stack>
         </Card.Footer>
      </Card>
   );
};

export default CardLugar;
