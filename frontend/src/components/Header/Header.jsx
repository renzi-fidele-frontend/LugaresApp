import { Container, Dropdown, Image, Nav, Navbar } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import styles from "./Header.module.css";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setToken, setUsuario } from "../../state/usuario/usuarioSlice";

const Header = () => {
   const location = useLocation();
   const { usuario } = useSelector((state) => state.usuario);
   const dispatch = useDispatch();

   function deslogar() {
      dispatch(setUsuario(null));
      dispatch(setToken(null));
      localStorage.clear();
   }

   return (
      <Navbar expand="lg" className="bg-black bg-gradient">
         <Container className="d-flex flex-row align-items-center">
            <LinkContainer to={"/"}>
               <Navbar.Brand className="p-0" style={{ cursor: "pointer" }}>
                  LugaresApp
               </Navbar.Brand>
            </LinkContainer>
            <div className="d-flex gap-3 flex-row-reverse">
               <Navbar.Toggle aria-controls="basic-navbar-nav" />
               {/*   DropDown Mobile */}
               {usuario && (
                  <Dropdown drop="start" className="d-lg-none d-flex align-items-center">
                     <Dropdown.Toggle id={styles.seta} variant="dark" as="a">
                        <Image
                           className="rounded-circle object-fit-cover ms-3"
                           id={styles.fotoUsuario}
                           src={`http://localhost:3000/${usuario?.foto}`}
                        />
                     </Dropdown.Toggle>

                     <Dropdown.Menu>
                        <LinkContainer to="editar_perfil">
                           <Dropdown.Item>Editar perfil</Dropdown.Item>
                        </LinkContainer>

                        <Dropdown.Item onClick={deslogar} className="text-danger">
                           Deslogar
                        </Dropdown.Item>
                     </Dropdown.Menu>
                  </Dropdown>
               )}
            </div>

            <Navbar.Collapse id="basic-navbar-nav">
               <Nav activeKey={location.pathname} className="ms-auto">
                  <LinkContainer to="/">
                     <Nav.Link>Todos usuários</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/lugares">
                     <Nav.Link>Lugares</Nav.Link>
                  </LinkContainer>
                  {usuario ? (
                     <>
                        <LinkContainer to="/meus_lugares">
                           <Nav.Link>Meus lugares</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/adicionar_lugar">
                           <Nav.Link>Adicionar novo</Nav.Link>
                        </LinkContainer>
                        {/*   Dropdown Desktop */}
                        <Dropdown drop="start" className="d-lg-flex d-none align-items-center">
                           <Dropdown.Toggle id={styles.seta} variant="dark" as="a">
                              <Image
                                 className="rounded-circle object-fit-cover ms-3"
                                 id={styles.fotoUsuario}
                                 src={`http://localhost:3000/${usuario?.foto}`}
                              />
                           </Dropdown.Toggle>

                           <Dropdown.Menu>
                              <LinkContainer to="editar_perfil">
                                 <Dropdown.Item>Editar perfil</Dropdown.Item>
                              </LinkContainer>

                              <Dropdown.Item onClick={deslogar} className="text-danger">
                                 Deslogar
                              </Dropdown.Item>
                           </Dropdown.Menu>
                        </Dropdown>
                     </>
                  ) : (
                     <>
                        <LinkContainer to="/login">
                           <Nav.Link>Entrar</Nav.Link>
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
