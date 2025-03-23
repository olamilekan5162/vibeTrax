import styles from './sidebar.module.css';
import {NavLink} from 'react-router-dom'

const Sidebar = () => {
  return(
    <div className={styles.stickySidebar}>
      <div className={styles.barContainer}>
        <NavLink to='dashboard'>
          Dashboard
        </NavLink>
        
        <NavLink to='dashboard'>
          Dashboard
        </NavLink>
        
        <NavLink to='dashboard'>
          Dashboard
        </NavLink>
        
      </div>
    </div>
    
    )
}
export default Sidebar;