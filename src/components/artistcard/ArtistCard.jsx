import styles from "./artistCard.module.css";
import image1 from "/assets/daniel.jpg"
import image2 from "/assets/austin.jpg";
import image3 from "/assets/tengu.jpg";
import { FaRegThumbsUp as Followicon } from "react-icons/fa";

const ArtistCard = ({ profilePic, name, follower }) => {
  return (
    <div className={styles.artistGrid}>
      {/* <div className={styles.artistCard}>
        <img src={profilePic} alt="" />
        <h3>{name}</h3>
        <span>
          <p>{follower} followers</p>
          <Followicon />
        </span>
      </div> */}

      <div className={styles.artistCard}>
        <img src={image2} alt="" />
        <h3>Dummy Tanwa</h3>
        <span>
          <p>343 followers</p>
          <Followicon />
        </span>
      </div>

      <div className={styles.artistCard}>
        <img src={image3} alt="" />
        <h3>Dummy Tanwa</h3>
        <span>
          <p>343 followers</p>
          <Followicon />
        </span>
      </div>
    </div>
  );
};
export default ArtistCard;


// <motion.div whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.95 }}>
    //   <img src={profilePic} alt="album cover" />

    //   <h4>{name}</h4>
    //   <a href="#">Buy</a>
    //   <p>{price} SUI</p>
    // </motion.div>