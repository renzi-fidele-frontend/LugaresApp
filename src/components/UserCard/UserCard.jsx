import React from "react";
import styles from "./UserCard.module.css";
import { Button, Card, Col, Image, Row } from "react-bootstrap";

const UserCard = ({ fotoPerfil, nome, nrLugares }) => {
   return (
      <Card bg="dark" text="light" border="secondary" className="p-3" id={styles.ct}>
         <Row>
            <Col className="my-md-auto" md={4}>
               <Image className="object-fit-cover" roundedCircle thumbnail src={fotoPerfil} alt={`Foto de perfil de ${nome}`} />
            </Col>
            <Col className="text-md-start text-sm-center ps-4" md={8}>
               <Card.Title>{nome}</Card.Title>
               <Card.Text>{nrLugares} lugares</Card.Text>
               <Button>Ver lugares</Button>
            </Col>
         </Row>
      </Card>
   );
};

export default UserCard;
