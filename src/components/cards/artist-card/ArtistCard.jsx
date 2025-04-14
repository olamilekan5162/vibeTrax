import styles from "./ArtistCard.module.css";

const ArtistCard = ({ name, followers, imageSrc }) => {
  return (
    <div className={styles.artistCard}>
      <img src={imageSrc} alt={name} className={styles.artistAvatar} />
      <h3 className={styles.artistName}>{name}</h3>
      <span className={styles.artistFollowers}>{followers} followers</span>
    </div>
  );
};

export default ArtistCard;
