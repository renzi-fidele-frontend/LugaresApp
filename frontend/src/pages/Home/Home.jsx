import { Col, Image, Row } from "react-bootstrap";
import styles from "./Home.module.css";
import UserCard from "../../components/UserCard/UserCard";
import usersPic from "../../assets/users3.svg";
import axios from "axios";
import { useEffect, useState } from "react";

const Home = () => {
   const [usuarios, setUsuarios] = useState(null);

   async function apanharUsuarios() {
      try {
         const response = await axios("http://localhost:3000/api/usuarios/");
         setUsuarios(response.data.usuarios);
      } catch (error) {
         console.log(error);
      }
   }

   useEffect(() => {
      if (!usuarios) apanharUsuarios();
   }, []);

   return (
      <div className="container-md px-4 px-md-0 pb-5" id={styles.ct}>
         <Row>
            <Col className="text-center">
               <h2 id={styles.titulo} className="mx-auto mt-3 mt-md-5 mb-5 fw-semibold fs-2 pt-4">
                  Encontre todos os usuários que compartilharam lugares
               </h2>
               <Image className="mb-5" id={styles.foto} src={usersPic} />
            </Col>
         </Row>
         <Row className="mt-3 g-4 justify-content-center">
            {usuarios?.length > 0 ? (
               usuarios.map((v, k) => (
                  <Col className="text-center" xs={12} sm={6} xl={4} key={k}>
                     <UserCard uid={v.uid} aderiuEm={v.criadoEm} fotoPerfil={v.foto} nome={v.nome} nrLugares={v.nrLugares} />
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
