import styles from "./UserCard.module.css";
import { Button, Card, Col, Image, Placeholder, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import converterData from "../../hooks/useConverterData";

const UserCard = ({ fotoPerfil, nome, uid, aderiuEm }) => {
   return (
      <>
         {fotoPerfil && nome && aderiuEm && uid ? (
            <Card bg="dark" text="light" border="secondary" className="p-3" id={styles.ct}>
               <Row>
                  <Col className="my-md-auto" md={4}>
                     <Image
                        className={`object-fit-cover mb-3 mb-md-0 ${styles.foto}`}
                        roundedCircle
                        thumbnail
                        src={`${import.meta.env.VITE_BACKEND_URL}/${fotoPerfil}`}
                        alt={`Foto de perfil de ${nome}`}
                     />
                  </Col>
                  <Col className="text-md-start text-sm-center ps-4" md={8}>
                     <Card.Title>{nome}</Card.Title>
                     <Card.Text>Aderiu em {converterData(aderiuEm)}</Card.Text>
                     <Link to={`/${uid}/lugares`}>
                        <Button variant="outline-secondary" className="bg-gradient stretched-link">
                           Ver lugares
                        </Button>
                     </Link>
                  </Col>
               </Row>
            </Card>
         ) : (
            <Card bg="dark" text="light" border="secondary" className="p-3" id={styles.ct}>
               <Row>
                  <Col className="my-md-auto mx-auto ratio-1x1" xs={5} md={4}>
                     <Placeholder as={Card} animation="wave">
                        <Placeholder as={Card} className=" p-5 h-100" />
                     </Placeholder>
                  </Col>
                  <Col className="text-md-start text-sm-center ps-md-4 pt-2 pt-md-0" md={8}>
                     <Placeholder as={Card.Title} animation="wave">
                        <Placeholder xs={6} />
                     </Placeholder>
                     <Placeholder as={Card.Text} animation="wave">
                        <Placeholder xs={12} />
                     </Placeholder>
                     <Placeholder.Button animation="wave" variant="outline-secondary" xs={8}>
                        <Placeholder xs={12} />
                     </Placeholder.Button>
                  </Col>
               </Row>
            </Card>
         )}
      </>
   );
};

export default UserCard;
