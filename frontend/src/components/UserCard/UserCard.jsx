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
                        src={`http://localhost:3000/${fotoPerfil}`}
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
            // TODO: Colocar placeholder onde tem a div com p-5

            <Card bg="dark" text="light" border="secondary" className="p-3" id={styles.ct}>
               <Row>
                  <Col className="my-md-auto" md={4}>
                     <div className="p-5 rounded-1" style={{ background: "#8c8f91" }}></div>
                  </Col>
                  <Col className="text-md-start text-sm-center ps-md-4 pt-2 pt-md-0" md={8}>
                     <Placeholder as={Card.Title} animation="glow">
                        <Placeholder xs={6} />
                     </Placeholder>
                     <Placeholder as={Card.Text} animation="glow">
                        <Placeholder xs={12} />
                     </Placeholder>
                     <Placeholder.Button animation="glow" variant="outline-secondary" xs={8}>
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
