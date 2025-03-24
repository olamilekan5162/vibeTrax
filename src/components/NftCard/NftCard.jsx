import React, { useState, useRef } from "react";
import styles from "./NftCard.module.css";

const NFTCard = ({ image, title, artist, price, isOwned, previewAudio, fullAudio, onBuy, onClick }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  // Determine which audio to play based on ownership
  const audioSrc = isOwned ? fullAudio : previewAudio;

  const togglePlay = (e) => {
    e.stopPropagation(); // Prevent accidental navigation
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className={styles.nftCard} onClick={onClick}>
      <img src={image} alt={title} className={styles.nftImage} />
      <div className={styles.cardContent}>
        <h3 className={styles.nftTitle}>{title}</h3>
        <p className={styles.artist}>By {artist}</p>

        {/* Audio Player */}
        <div className={styles.audioPlayer}>
          <audio ref={audioRef} src={audioSrc} />
          <button className={styles.playButton} onClick={togglePlay}>
            {isPlaying ? "Pause" : "Play"}
          </button>
          <span className={styles.audioQuality}>
            {isOwned ? "HQ Audio" : "Low-Quality Preview"}
          </span>
        </div>

        {/* Footer Section */}
        <div className={styles.footer}>
          <span className={styles.price}>{price} SUI</span>
          {isOwned ? (
            <span className={styles.ownedLabel}>Owned</span>
          ) : (
            <button className={styles.buyButton} onClick={(e) => { e.stopPropagation(); onBuy(); }}>
              Buy
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default NFTCard;
