import Jazzicon from "react-jazzicon";
import styles from "./ArtistCard.module.css";

const ArtistCard = ({ name }) => {
  return (
    <div className={styles.artistCard}>
      <Jazzicon diameter={85} seed={name}/>
      <h3 className={styles.artistName}>{`${name.slice(0,5)}...${name.slice(-5)}`}</h3>
      <span className={styles.artistFollowers}>{"45"} followers</span>
    </div>
  );
};

export default ArtistCard;
