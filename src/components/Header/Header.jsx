import { useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import styles from "./Header.module.css";
import { NavLink, useNavigate } from "react-router-dom";

const Header = () => {
   const [userLogado, setUserLogado] = useState(true);
   const navegar = useNavigate();

   return (
      <Navbar expand="lg" className="bg-black bg-gradient  ">
         <Container>
            <Navbar.Brand style={{ cursor: "pointer" }}>LugaresApp</Navbar.Brand>

            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
               <Nav className="ms-auto">
                  <LinkContainer to="/">
                     <Nav.Link>Todos usuários</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/lugares">
                     <Nav.Link>Lugares</Nav.Link>
                  </LinkContainer>
                  {userLogado ? (
                     <>
                        <LinkContainer to="/meus_lugares">
                           <Nav.Link>Meus lugares</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/adicionar_lugar">
                           <Nav.Link>Adicionar Lugar</Nav.Link>
                        </LinkContainer>
                        <Nav.Link
                           id={styles.removerBtn}
                           onClick={(e) => {
                              e.preventDefault();
                           }}
                        >
                           Deslogar
                        </Nav.Link>
                     </>
                  ) : (
                     <>
                        <LinkContainer to="/login">
                           <Nav.Link>Login</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/cadastrar">
                           <Nav.Link>Criar conta</Nav.Link>
                        </LinkContainer>
                     </>
                  )}
               </Nav>
            </Navbar.Collapse>
         </Container>
      </Navbar>
   );
};

export default Header;
