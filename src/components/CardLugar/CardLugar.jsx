import React from "react";
import styles from "./CardLugar.module.css";
import { Card } from "react-bootstrap";

const CardLugar = ({ id, titulo, descricao, foto, criadoEm, idCriador, endereco }) => {
   return (
      <Card id={styles.ct} className="">
         <Card.Img src={foto} />
         <Card.Subtitle>{endereco}</Card.Subtitle>
         <Card.Body>
            <Card.Title>{titulo}</Card.Title>
            <Card.Text>{descricao}</Card.Text>
         </Card.Body>
      </Card>
   );
};

export default CardLugar;
