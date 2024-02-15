import React from "react";
import styles from "./UserCard.module.css";
import { Button, Col, Image, Row } from "react-bootstrap";

const UserCard = ({ fotoPerfil, nome, nrLugares }) => {
   return (
      <div id={styles.ct}>
         <Row>
            <Col md={4}>
               <Image roundedCircle thumbnail src={fotoPerfil} alt={`Foto de perfil de ${nome}`} />
            </Col>
            <Col md={8}>
               <h5></h5>
               <p></p>
               <Button>Ver lugares</Button>
            </Col>
         </Row>
      </div>
   );
};

export default UserCard;
