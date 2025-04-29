import { Link } from "react-router-dom";
import styles from "./MusicCard.module.css";

const MusicCard = ({
  title,
  artist,
  duration,
  plays,
  imageSrc,
  quality,
  objectId,
}) => {
  const isPremium = quality === "Premium";
  return (
    <Link to={`/discover/${objectId}`} className={styles.musicCard}>
      <img src={imageSrc} alt="Music Artwork" className={styles.musicImg} />
      <div
        className={`${styles.qualityBadge} ${
          isPremium ? styles.premiumBadge : ""
        }`}
      >
        {quality}
      </div>
      <div className={styles.musicDetails}>
        <h3 className={styles.musicTitle}>{title}</h3>
        <p className={styles.musicArtist}>{`${artist.slice(
          0,
          5
        )}...${artist.slice(-5)}`}</p>
        <div className={styles.musicMeta}>
          <span>{duration}</span>
          <span>{plays} plays</span>
        </div>
      </div>
    </Link>
  );
};

export default MusicCard;
