// components/MusicPlayer/SongDetails/SongDetails.js 
import React from 'react';

import styles from './SongDetails.module.css';

const SongDetails = ({ songData, isPlaying }) => {
  return (
    <div className={styles.container}>
      <div className={styles.albumArt}>
        <img 
          src={songData.fields.genre} 
          alt="Album Cover" 
          className={styles.albumImg}
        />
        <div className={styles.qualityBadge}>
          {songData.quality}
        </div>
        {isPlaying && (
          <div className={styles.playingIndicator}>
            <div className={styles.playingIcon}></div>
            <span>Now playing</span>
          </div>
        )}
      </div>
      
      <div className={styles.details}>
        <h1 className={styles.title}>{songData.fields.title}</h1>
        <div className={styles.artist}>
          By <a href="#" className={styles.artistLink}>{`${songData.fields.artist.slice(0,5)}...${songData.fields.artist.slice(-5)}`}</a>
          <div className={styles.artistBadge}>Verified Artist</div>
        </div>
        
        <div className={styles.meta}>
          <div className={styles.metaItem}>
            <span className={styles.metaIcon}>♪</span>
            <span>4:15</span>
          </div>
          <div className={styles.metaItem}>
            <span className={styles.metaIcon}>👁️</span>
            <span>{songData.plays} plays</span>
          </div>
          <div className={styles.metaItem}>
            <span className={styles.metaIcon}>❤️</span>
            <span>{songData.likes} likes</span>
          </div>
        </div>
        
        <p className={styles.description}>
          {songData.fields.description}
        </p>
        
        <div className={styles.tags}>
          <span className={styles.tag}>Electronic</span>
          <span className={styles.tag}>Ambient</span>
          <span className={styles.tag}>Cyberpunk</span>
        </div>
        
        <audio/>
      </div>
    </div>
  );
};

export default SongDetails;