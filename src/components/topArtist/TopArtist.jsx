import styles from "./topArtist.module.css";
import { FaRegThumbsUp as Followicon } from "react-icons/fa";

const TopArtist = ({ profilePic, name, follower }) => {
  return (
    
      <div className={styles.artistCard}>
        <img src={profilePic} alt="profile-pic" />
        <h3>{name}</h3>
        <span>
          <p>{follower} followers</p>
          <Followicon />
        </span>
      </div>
 
  );
};
export default TopArtist;