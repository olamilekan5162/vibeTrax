import styles from "./navbar.module.css";
import { FaSearch as Searchicon } from "react-icons/fa";

const Navbar = () => {
  return (
    <div className={styles.navbarContainer} >
        <div className={styles.Navbar}>
          <Searchicon className={styles.navIcon} />
          <input type="text" placeholder="Search songs, albums, artists ..." />
        </div>
    </div>
  );
};
export default Navbar;
