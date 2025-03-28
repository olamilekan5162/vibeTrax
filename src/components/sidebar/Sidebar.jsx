import styles from "./sidebar.module.css";
import { NavLink, Link } from "react-router-dom";
import { SiBluesound } from "react-icons/si";
import profilePic from "/assets/austin.jpg";
import { RiHome9Fill, RiSettings5Line } from "react-icons/ri";
import { MdOutlineLibraryMusic } from "react-icons/md";
import { CgProfile } from "react-icons/cg";

const Sidebar = () => {
  return (
    <div className={styles.stickySidebar}>
      <div className={styles.logoContainer}>
        <Link to="/">
          <SiBluesound className={styles.headerIcon} />
          <h1 className={styles.logoText}>SuiTunes</h1>
        </Link>
      </div>

      <div className={styles.imgContainer}>
        <img src={profilePic} alt="profilePic" />
      </div>

      <div className={styles.barContainer}>
        <NavLink
          className={({ isActive }) =>
            isActive ? styles.active : styles.inactive
          }
          to="/homepage"
          end
        >
          <RiHome9Fill className={styles.icons} /> Home
        </NavLink>

        <NavLink
          className={({ isActive }) =>
            isActive ? styles.active : styles.inactive
          }
          to="library"
        >
          <MdOutlineLibraryMusic className={styles.icons} /> Library
        </NavLink>

        {/* <NavLink className={({isActive}) => (isActive ? styles.active : styles.inactive)} to='my-nfts'>
          My NFTs
        </NavLink> */}

        <NavLink
          className={({ isActive }) =>
            isActive ? styles.active : styles.inactive
          }
          to="profile"
        >
          <CgProfile className={styles.icons} /> Profile
        </NavLink>

        <NavLink
          className={({ isActive }) =>
            isActive ? styles.active : styles.inactive
          }
          to="settings"
        >
          <RiSettings5Line className={styles.icons} /> Settings
        </NavLink>
      </div>
    </div>
  );
};
export default Sidebar;
