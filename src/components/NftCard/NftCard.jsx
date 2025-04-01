import React, { useContext } from "react";
import { Play, Pause } from "lucide-react";
import styles from "./NftCard.module.css";
import { AudioContext } from "../AudioContext";

const NFTCard = ({
  id,
  image,
  title,
  artist,
  previewAudio,
  fullAudio,
  isOwned,
  onClick,
}) => {
  const { currentTrack, isPlaying, playTrack } = useContext(AudioContext);

  const audioSrc = isOwned ? fullAudio : previewAudio;

  const isCurrentTrack = currentTrack && currentTrack.id === id;
  const isCurrentlyPlaying = isCurrentTrack && isPlaying;

  const handlePlayClick = (e) => {
    e.stopPropagation(); // Prevent card onClick from firing
    playTrack({
      id,
      title,
      artist,
      audioSrc,
      image,
    });
  };

  return (
    <div className={styles.nftCard} onClick={onClick}>
      <div
        className={styles.cardBackground}
        style={{ backgroundImage: `url(${image})` }}
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
