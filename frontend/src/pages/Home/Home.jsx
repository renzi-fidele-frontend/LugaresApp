import { Col, Image, Pagination, Row } from "react-bootstrap";
import styles from "./Home.module.css";
import UserCard from "../../components/UserCard/UserCard";
import usersPic from "../../assets/ill.png";

import axios from "axios";
import { useEffect, useRef, useState } from "react";

const Home = () => {
   const [usuarios, setUsuarios] = useState(null);
   const paginaAtual = useRef(1);
   const totalPaginas = useRef(null);

   async function apanharUsuarios() {
      try {
         const res = await axios(`${import.meta.env.VITE_BACKEND_URL}/api/usuarios?page=${paginaAtual.current}`);
         totalPaginas.current = res.data.totalPaginas;
         setUsuarios(res.data.usuarios);
      } catch (error) {
         console.log(error);
      }
   }

   useEffect(() => {
      if (!usuarios) apanharUsuarios();
   }, []);

   function gerarArray(length) {
      // Gerar um array contendo Integers de 1 até o length
      return Array.from({ length }, (v, i) => i + 1);
   }

   return (
      <div className="container-md px-4 px-md-0 pb-5" id={styles.ct}>
         <Row>
            <Col className="text-center">
               <h2 id={styles.titulo} className="mx-auto mt-3 mt-md-5 mb-5 fw-semibold fs-2 pt-4">
                  Encontre todos os usuários que compartilharam lugares
               </h2>
               <Image className="mb-4 mb-md-5" id={styles.foto} src={usersPic} />
            </Col>
         </Row>
         {/*   Usuarios  */}
         <Row className="mt-3 g-4 justify-content-center">
            {usuarios?.length > 0
               ? usuarios?.map((v, k) => (
                    <Col className="text-center" xs={12} sm={6} xl={4} key={k}>
                       <UserCard uid={v._id} aderiuEm={v.criadoEm} fotoPerfil={v.foto} nome={v.nome} nrLugares={v.nrLugares} />
                    </Col>
                 ))
               : [1, 2, 3, 4, 5].map((v, k) => (
                    <Col className="text-center" xs={12} sm={6} xl={4} key={k}>
                       <UserCard />
                    </Col>
                 ))}
         </Row>

         {/*   Paginação */}
         <Row className="mt-5 mb-1 mb-md-0">
            <Col className="mt-md-5">
               <Pagination size="lg" className="d-none d-md-flex justify-content-center">
                  {gerarArray(totalPaginas.current)?.map((v, k) => (
                     <Pagination.Item
                        onClick={() => {
                           if (v !== paginaAtual.current) {
                              window.scrollTo({ top: 0, behavior: "smooth" });
                              paginaAtual.current = v;
                              setUsuarios(null);
                              apanharUsuarios();
                           }
                        }}
                        active={v === paginaAtual.current}
                        key={k}
                     >
                        {v}
                     </Pagination.Item>
                  ))}
               </Pagination>
               {/*   Paginação do mobile */}
               <Pagination className="d-md-none justify-content-center">
                  {gerarArray(totalPaginas.current)?.map((v, k) => (
                     <Pagination.Item
                        onClick={() => {
                           if (v !== paginaAtual.current) {
                              window.scrollTo({ top: 0, behavior: "smooth" });
                              paginaAtual.current = v;
                              setUsuarios(null);
                              apanharUsuarios();
                           }
                        }}
                        active={v === paginaAtual.current}
                        key={k}
                     >
                        {v}
                     </Pagination.Item>
                  ))}
               </Pagination>
            </Col>
         </Row>

      </div>
   );
};

export default Home;
