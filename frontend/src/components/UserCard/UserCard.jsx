import React from "react";
import styles from "./UserCard.module.css";
import { Button, Card, Col, Image, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import useConverterData from "../../hooks/useConverterData";

const UserCard = ({ fotoPerfil, nome, uid, aderiuEm }) => {
   return (
      <Card bg="dark" text="light" border="secondary" className="p-3" id={styles.ct}>
         <Row>
            <Col className="my-md-auto" md={4}>
               <Image
                  className={`object-fit-cover mb-3 mb-md-0 ${styles.foto}`}
                  roundedCircle
                  thumbnail
                  src={fotoPerfil}
                  alt={`Foto de perfil de ${nome}`}
               />
            </Col>
            <Col className="text-md-start text-sm-center ps-4" md={8}>
               <Card.Title>{nome}</Card.Title>
               <Card.Text>Aderiu em {useConverterData(aderiuEm)}</Card.Text>
               <Link to={`/${uid}/lugares`}>
                  <Button variant="outline-secondary" className="bg-gradient stretched-link">
                     Ver lugares
                  </Button>
               </Link>
            </Col>
         </Row>
      </Card>
   );
};

export default UserCard;
