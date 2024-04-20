import { useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import styles from "./Header.module.css";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";

const Header = () => {
   const [userLogado, setUserLogado] = useState(true);
   const location = useLocation();

   return (
      <Navbar expand="lg" className="bg-black bg-gradient  ">
         <Container>
            <LinkContainer to={"/"}>
               <Navbar.Brand style={{ cursor: "pointer" }}>LugaresApp</Navbar.Brand>
            </LinkContainer>

            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
               <Nav activeKey={location.pathname} className="ms-auto">
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
                           <Nav.Link>Adicionar novo</Nav.Link>
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
