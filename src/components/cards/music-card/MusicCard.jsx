import styles from "./MusicCard.module.css";

const MusicCard = ({ title, artist, duration, plays, imageSrc, quality }) => {
  const isPremium = quality === "Premium";
  return (
    <div className={styles.musicCard}>
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
        <p className={styles.musicArtist}>{artist}</p>
        <div className={styles.musicMeta}>
          <span>{duration}</span>
          <span>{plays} plays</span>
        </div>
      </div>
    </div>
  );
};

export default MusicCard;
