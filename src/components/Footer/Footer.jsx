import React from "react";
import { Col, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const Footer = () => {
   return (
      <footer className="py-3 mt-auto">
         <Container
            fluid="lg"
            className="d-flex flex-column flex-md-row justify-content-between align-items-center pt-2 text-white border-top border-secondary "
         >
            <Col md={8} xs={12} className="d-flex flex-column flex-sm-row align-items-center justify-content-center  justify-content-md-start">
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
