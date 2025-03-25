import styles from "./navbar.module.css";
import { FaSearch as Searchicon } from "react-icons/fa";
import profilePic from "/assets/austin.jpg"

const Navbar = () => {
  return (
    <div className={styles.navbarContainer} >
        <div className={styles.Navbar}>
          <Searchicon />
          <input type="text" placeholder="Search songs, albulms, artists..." />
        </div>

        <div className={styles.imgContainer} >
            <img src={profilePic} alt="profilePic" />
        </div>
    </div>
  );
};
export default Navbar;
