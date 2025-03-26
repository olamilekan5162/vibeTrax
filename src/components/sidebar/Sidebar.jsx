import styles from './sidebar.module.css';
import { NavLink, Link} from 'react-router-dom';
import { SiBluesound } from "react-icons/si";
import profilePic from "/assets/austin.jpg"
import { RiHome9Fill, RiSettings5Line } from "react-icons/ri";
import { MdOutlineLibraryMusic } from "react-icons/md";
import { CgProfile } from "react-icons/cg";

const Sidebar = () => {
  return(
    <div className={styles.stickySidebar}>
      
      <div className={styles.logoContainer}>
        <Link to="/">
          <SiBluesound className={styles.headerIcon} />
          <h1 className={styles.logoText}>SuiTunes</h1>
        </Link>
      </div>
      
      <div className={styles.imgContainer} >
            <img src={profilePic} alt="profilePic" />
        </div>
        
      <div className={styles.barContainer}>
        <NavLink className={({isActive}) => (isActive ? styles.active : styles.inactive)} to='/homepage' end>
          Home <RiHome9Fill className={styles.icons}/>
        </NavLink>
        
        <NavLink className={({isActive}) => (isActive ? styles.active : styles.inactive)} to='marketplace'>
          Library <MdOutlineLibraryMusic className={styles.icons}/>
        </NavLink>
        
        {/* <NavLink className={({isActive}) => (isActive ? styles.active : styles.inactive)} to='my-nfts'>
          My NFTs
        </NavLink> */}
        
        <NavLink className={({isActive}) => (isActive ? styles.active : styles.inactive)} to='profile'>
          Profile <CgProfile className={styles.icons} />
        </NavLink>
      
        <NavLink className={({isActive}) => (isActive ? styles.active : styles.inactive)} to='settings'>
          Settings <RiSettings5Line className={styles.icons}/>
        </NavLink>
        
      </div>
    </div>
    
    )
}
export default Sidebar;