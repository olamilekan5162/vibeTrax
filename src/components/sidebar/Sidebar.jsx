import styles from './sidebar.module.css';
import { NavLink, Link} from 'react-router-dom';
import { SiBluesound } from "react-icons/si";

const Sidebar = () => {
  return(
    <div className={styles.stickySidebar}>
      
      <div className={styles.logoContainer}>
        <Link to="/">
          <SiBluesound className={styles.headerIcon} />
          <h1 className={styles.logoText}>SuiTunes</h1>
        </Link>
      </div>
      
      <div className={styles.barContainer}>
        <NavLink className={({isActive}) => (isActive ? styles.active : styles.inactive)} to='/'>
          Home
        </NavLink>
        
        <NavLink className={({isActive}) => (isActive ? styles.active : styles.inactive)} to='marketplace'>
          Marketplace
        </NavLink>
        
        <NavLink className={({isActive}) => (isActive ? styles.active : styles.inactive)} to='nft'>
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