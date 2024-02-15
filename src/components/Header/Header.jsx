import styles from "./Header.module.css";
import { Link } from "react-router-dom";

const Header = () => {
   const userLogado = true;

   return (
      <header id={styles.ct}>
         <div id={styles.left}>
            <Link>
               <h1>LugaresApp</h1>
            </Link>
         </div>
         <div id={styles.right}>
            <Link to={"/"}>Todos usuários</Link>
            <Link to={"/lugares"}>Lugares</Link>
            {userLogado ? (
               <>
                  <Link to={"/meus_lugares"}>Meus Lugares</Link>
                  <Link to={"/adicionar_lugar"}>Adicionar Lugar</Link>
                  <a
                     id={styles.deslogar}
                     href="#"
                     onClick={(e) => {
                        e.preventDefault;
                     }}
                  >
                     Deslogar
                  </a>
               </>
            ) : (
               <>
                  <Link to={"/login"}>Login</Link>
                  <Link to={"/cadastrar"}>Criar conta</Link>
               </>
            )}
         </div>
            

      </header>
   );
};

export default Header;
