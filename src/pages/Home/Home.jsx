import { Col, Image, Row } from "react-bootstrap";
import styles from "./Home.module.css";
import dummyPhoto from "../../assets/generic-avatar.png";
import UserCard from "../../components/UserCard/UserCard";
import usersPic from "../../assets/users3.svg";

const users = [
   { nome: "Renzi Fidele", nrLugares: 3, photoURL: dummyPhoto, uid: "u1" },
   { nome: "Renzi Fidele", nrLugares: 3, photoURL: dummyPhoto, uid: "u2" },
   { nome: "Renzi Fidele", nrLugares: 3, photoURL: dummyPhoto, uid: "u3" },
   { nome: "Renzi Fidele", nrLugares: 3, photoURL: dummyPhoto, uid: "u4" },
   { nome: "Renzi Fidele", nrLugares: 3, photoURL: dummyPhoto, uid: "u5" },
   { nome: "Renzi Fidele", nrLugares: 1, photoURL: dummyPhoto, uid: "u6" },
];

const Home = () => {
   return (
      <div className="container-md px-4 px-md-0 pb-5" id={styles.ct}>
         <Row>
            <Col className="text-center">
               <h2 id={styles.titulo} className="mx-auto fw-semibold fs-1 my-5 pt-4">
                  Encontre todos os usuários desta aplicação
               </h2>
               <Image className="mb-5" id={styles.foto} src={usersPic} />
            </Col>
         </Row>
         <Row className="mt-3 g-4">
            {users.length > 0 ? (
               users.map((v, k) => (
                  <Col className="text-center" xs={12} sm={6} xl={4} key={k}>
                     <UserCard uid={v.uid} fotoPerfil={v.photoURL} nome={v.nome} nrLugares={v.nrLugares} />
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
