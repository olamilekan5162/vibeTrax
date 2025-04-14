import React, { useContext } from "react";
import { Play, Pause } from "lucide-react";
import styles from "./NftCard.module.css";
import { AudioContext } from "../AudioContext";

const NFTCard = ({
  id,
  genre,
  title,
  artist,
  low_quality_ipfs,
  high_quality_ipfs,
  isOwned,
  onClick,
}) => {
  const { currentTrack, isPlaying, playTrack } = useContext(AudioContext);

  const audioSrc = isOwned ? high_quality_ipfs : low_quality_ipfs;

  const isCurrentTrack = currentTrack && currentTrack.id === id;
  const isCurrentlyPlaying = isCurrentTrack && isPlaying;

  const handlePlayClick = (e) => {
    e.stopPropagation(); // Prevent card onClick from firing
    playTrack({
      id,
      title,
      artist,
      audioSrc,
      genre,
    });
  };

  return (
    <div className={styles.nftCard} onClick={onClick}>
      <div
        className={styles.cardBackground}
        style={{ backgroundImage: `url(${genre})` }}
      >
        <div className={styles.cardContent}>
          <div className={styles.playButton} onClick={handlePlayClick}>
            {isCurrentlyPlaying ? (
              <Pause className={styles.playIcon} />
            ) : (
              <Play className={styles.playIcon} />
            )}
          </div>

          <div className={styles.cardHeader}>
            <h3 className={styles.nftTitle}>{title}</h3>
            <p className={styles.artist}>By {artist}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NFTCard;
