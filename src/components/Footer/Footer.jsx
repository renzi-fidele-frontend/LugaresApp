import React from "react";
import { Col, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const Footer = () => {
   return (
      <footer className="py-3 mt-4 bg-bg-dark  ">
         <Container className="d-flex justify-content-between align-items-center pt-2 text-white border-top border-secondary ">
            <Col className="d-flex flex-row  align-items-center  ">
               <Link to="/" className="fw-semibold fs-4 mb-0 link-underline-opacity-0 link-underline-opacity-75-hover link-light">
                  LugaresApp
               </Link>
               <p className="mb-0 ms-2">© Todos os direitos reservados</p>
            </Col>
            <Col className="nav justify-content-end">
               <p className="mb-0">
                  Desenvolvedor:{" "}
                  <a className="link-underline-opacity-0 link-underline-opacity-75-hover link-light" href="https://portfolio-renzi.vercel.app">
                     Renzi Fidele
                  </a>
               </p>
            </Col>
         </Container>
      </footer>
   );
};

export default Footer;
