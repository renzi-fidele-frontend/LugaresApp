import React from "react";
import styles from "./UserCard.module.css";
import { Button, Card, Col, Image, Row } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const UserCard = ({ fotoPerfil, nome, nrLugares, uid }) => {
   return (
      <Card bg="dark" text="light" border="secondary" className="p-3" id={styles.ct}>
         <Row>
            <Col className="my-md-auto" md={4}>
               <Image className="object-fit-cover" roundedCircle thumbnail src={fotoPerfil} alt={`Foto de perfil de ${nome}`} />
            </Col>
            <Col className="text-md-start text-sm-center ps-4" md={8}>
               <Card.Title>{nome}</Card.Title>
               <Card.Text>{nrLugares === 1 ? `1 lugar` : `${nrLugares} lugares`}</Card.Text>
               <LinkContainer to={`/${uid}/lugares`}>
                  <Button className="bg-gradient">Ver lugares</Button>
               </LinkContainer>
            </Col>
         </Row>
      </Card>
   );
};

export default UserCard;
