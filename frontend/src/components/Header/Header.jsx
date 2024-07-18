import { Button, Container, Dropdown, Image, Nav, Navbar } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import styles from "./Header.module.css";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setToken, setUsuario } from "../../state/usuario/usuarioSlice";
import logo from "../../assets/logo.png";
import { setModoEscuro } from "../../state/tema/temaSlice";

const Header = () => {
   const location = useLocation();
   const { usuario } = useSelector((state) => state.usuario);
   const dispatch = useDispatch();
   const { modoEscuro } = useSelector((state) => state.tema);

   function deslogar() {
      dispatch(setUsuario(null));
      dispatch(setToken(null));
      localStorage.clear();
   }

   function alternarTema() {
      dispatch(setModoEscuro(!modoEscuro));
      let tema = modoEscuro ? "light" : "dark";
      document.documentElement.setAttribute("data-bs-theme", tema);
   }

   return (
      <Navbar expand="lg" className={`${modoEscuro ? "bg-black" : "border-bottom"} bg-gradient `}>
         <Container className="d-flex flex-row align-items-center">
            <LinkContainer to={"/"}>
               <Navbar.Brand as={Image} id={styles.logo} src={logo} className="p-0" />
            </LinkContainer>
            <div className="d-flex gap-3 flex-row-reverse">
               <Navbar.Toggle aria-controls="basic-navbar-nav" />
               {/*   DropDown Mobile */}
               {usuario && (
                  <Dropdown drop="start" className="d-lg-none d-flex align-items-center">
                     <Dropdown.Toggle id={styles.seta} as="a">
                        <Image className="rounded-circle object-fit-cover ms-3" id={styles.fotoUsuario} src={usuario?.foto} />
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
                           <Dropdown.Toggle id={styles.seta} as="a">
                              <Image className="rounded-circle object-fit-cover ms-3" id={styles.fotoUsuario} src={usuario?.foto} />
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
                  <div className="vr d-none d-lg-inline-block mx-lg-3"></div>
                  {/*   Botão para alterar tema  */}
                  <Button
                     onClick={alternarTema}
                     variant="outline-secondary"
                     className="rounded-circle d-none d-lg-inline-block"
                     style={{ width: "fit-content" }}
                  >
                     {modoEscuro ? <i className="bi bi-moon-stars-fill"></i> : <i className="bi bi-brightness-high-fill"></i>}
                  </Button>
                  {/*   Botão mobile  */}
                  <Button onClick={alternarTema} variant="outline-secondary" className="mt-2 d-lg-none" style={{ width: "fit-content" }}>
                     {modoEscuro ? <i className="bi bi-moon-stars-fill"></i> : <i className="bi bi-brightness-high-fill"></i>}
                     {modoEscuro ? " Escuro" : " Claro"}
                  </Button>
               </Nav>
            </Navbar.Collapse>
         </Container>
      </Navbar>
   );
};

export default Header;
