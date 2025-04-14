import Jazzicon from "react-jazzicon";
import styles from "./topArtist.module.css";
import { FaRegThumbsUp as Followicon } from "react-icons/fa";

const TopArtist = ({ name, follower=200 }) => {
  return (
    
      <div className={styles.artistCard}>
        <Jazzicon diameter={125} slice={name.slice(0,10)} />
        <h3>{`${name.slice(0,6)}...${name.slice(-4)}`}</h3>
        <span>
          <p>{follower} followers</p>
          <Followicon />
        </span>
      </div>
 
  );
};
export default TopArtist;