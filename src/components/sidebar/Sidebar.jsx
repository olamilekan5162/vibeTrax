import styles from './sidebar.module.css';
import { NavLink, Link} from 'react-router-dom';
import { SiBluesound } from "react-icons/si";
import profilePic from "/assets/austin.jpg"

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
          Home
        </NavLink>
        
        <NavLink className={({isActive}) => (isActive ? styles.active : styles.inactive)} to='marketplace'>
          Marketplace
        </NavLink>
        
        <NavLink className={({isActive}) => (isActive ? styles.active : styles.inactive)} to='my-nfts'>
          My NFTs
        </NavLink>
        
        <NavLink className={({isActive}) => (isActive ? styles.active : styles.inactive)} to='profile'>
          Profile
        </NavLink>
      
        <NavLink className={({isActive}) => (isActive ? styles.active : styles.inactive)} to='settings'>
          Settings
        </NavLink>
        
      </div>
    </div>
    
    )
}
export default Sidebar;