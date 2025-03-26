import React, { useRef } from "react";
import styles from "./NftCard.module.css";

// Global audio management
const globalAudio = {
  currentAudio: null
};

const NFTCard = ({ image, title, artist, previewAudio, fullAudio, isOwned, onClick }) => {
  const audioRef = useRef(null);

  const handlePlay = () => {
    // Pause any currently playing audio
    if (globalAudio.currentAudio && globalAudio.currentAudio !== audioRef.current) {
      globalAudio.currentAudio.pause();
    }
    // Set current audio
    globalAudio.currentAudio = audioRef.current;
  };

  const audioSrc = isOwned ? fullAudio : previewAudio;

  return (
    <div className={styles.nftCard} onClick={onClick}>
      <div 
        className={styles.cardBackground} 
        style={{ backgroundImage: `url(${image})` }}
      >
        <div className={styles.cardContent}>
          <div className={styles.cardHeader}>
            <h3 className={styles.nftTitle}>{title}</h3>
            <p className={styles.artist}>By {artist}</p>
          </div>

          <div className={styles.audioPlayerContainer}>
            <audio 
              ref={audioRef}
              src={audioSrc} 
              controls
              onPlay={handlePlay}
              className={styles.audioPlayer}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NFTCard;