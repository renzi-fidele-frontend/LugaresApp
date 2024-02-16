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
      <div className="container-md px-4 px-md-0" id={styles.ct}>
         <Row>
            <Col className="text-center">
               <h2 id={styles.titulo} className="mx-auto my-5 pt-4">
                  Encontre todos os usuários desta aplicação
               </h2>
            </Col>
         </Row>
         <Row className="mt-3 g-4">
            {users.length > 0 ? (
               users.map((v, k) => (
                  <Col className="text-center" xs={12} sm={6} xl={4} key={k}>
                     <UserCard fotoPerfil={v.photoURL} nome={v.nome} nrLugares={v.nrLugares} />
                  </Col>
               ))
            ) : (
               <Col>
                  <p>Nenhum usuário foi encontrado</p>
               </Col>
            )}
         </Row>
      </div>
   );
};

export default Home;
