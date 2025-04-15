// PlayerControls.jsx
import React, { useState } from 'react';
import styles from './PlayerControls.module.css';

const PlayerControls = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState("1:36");
  const [totalTime, setTotalTime] = useState("4:35");
  const [progress, setProgress] = useState(35);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

//   const handleProgressBarClick = (e) => {
//     const progressContainer = e.currentTarget;
//     const clickPosition = e.clientX - progressContainer.getBoundingClientRect().left;
//     const newProgress = (clickPosition / progressContainer.offsetWidth) * 100;
//     setProgress(Math.min(Math.max(newProgress, 0), 100));
    
    
//   };

  return (
    <div className={styles.playerControls}>
      <div 
        className={styles.progressContainer}
        // onClick={handleProgressBarCLick}
      >
        <div 
          className={styles.progressBar} 
          style={{ width: `${progress}%` }}
        >
          <div className={styles.progressThumb}></div>
        </div>
      </div>
      
      <div className={styles.timeDisplay}>
        <span>{currentTime}</span>
        <span>{totalTime}</span>
      </div>
      
      <div className={styles.controlButtons}>
        <button className={styles.controlBtn}>⏮️</button>
        <button className={styles.controlBtn}>⏪</button>
        <button 
          className={`${styles.controlBtn} ${styles.playBtn}`}
          onClick={togglePlayPause}
        >
          {isPlaying ? '⏸️' : '▶️'}
        </button>
        <button className={styles.controlBtn}>⏩</button>
        <button className={styles.controlBtn}>⏭️</button>
      </div>
    </div>
  );
};

export default PlayerControls;