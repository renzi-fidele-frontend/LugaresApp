import styles from "./Header.module.css";
import { Link } from "react-router-dom";

const Header = () => {
   return (
      <header id={styles.ct}>
         <div id={styles.left}>
            <h1>LugaresApp</h1>
         </div>
         <div id={styles.right}>
            <Link>Todos usuários</Link>
            <Link>Meus Lugares</Link>
            <Link>Adicionar Lugar</Link>
            <Link>Login</Link>
         </div>
      </header>
   );
};

export default Header;
