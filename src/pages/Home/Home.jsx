import { Col, Container, Row } from "react-bootstrap";
import styles from "./Home.module.css";
import dummyPhoto from "../../assets/generic-avatar.png";
import UserCard from "../../components/UserCard/UserCard";

const users = [
   { nome: "Renzi Fidele", nrLugares: 3, photoURL: dummyPhoto },
   { nome: "Renzi Fidele", nrLugares: 3, photoURL: dummyPhoto },
   { nome: "Renzi Fidele", nrLugares: 3, photoURL: dummyPhoto },
   { nome: "Renzi Fidele", nrLugares: 3, photoURL: dummyPhoto },
   { nome: "Renzi Fidele", nrLugares: 3, photoURL: dummyPhoto },
   { nome: "Renzi Fidele", nrLugares: 3, photoURL: dummyPhoto },
];

const Home = () => {
   return (
      <Container id={styles.ct}>
         <Row>
            <Col className="text-center">
               <h2 id={styles.titulo} className="display-5 mx-auto my-5 fw-bold">
                  Encontre todos os usuários desta aplicação
               </h2>
            </Col>
         </Row>
         <Row>
            {users.length > 0 ? (
               users.map((v, k) => (
                  <Col className="text-center my-5" xs={12} sm={6} md={4} key={k}>
                     <UserCard fotoPerfil={v.photoURL} nome={v.nome} nrLugares={v.nrLugares} />
                  </Col>
               ))
            ) : (
               <Col>
                  <p>Nenhum usuário foi encontrado</p>
               </Col>
            )}
         </Row>
      </Container>
   );
};

export default Home;
