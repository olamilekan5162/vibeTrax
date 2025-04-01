import React, { useContext } from "react";
import { Play, Pause, SkipBack, SkipForward, Volume2 } from "lucide-react";
import { AudioContext } from "../AudioContext";
import styles from "./AudioPlayer.module.css";

const AudioPlayer = () => {
  const { currentTrack, isPlaying, progress, playTrack, pauseTrack, seekTo } = useContext(AudioContext);

  if (!currentTrack) return null;

  const handlePlayPause = () => {
    if (isPlaying) {
      pauseTrack();
    } else {
      playTrack(currentTrack);
    }
  };

  const handleSeek = (e) => {
    const progressBar = e.currentTarget;
    const clickPosition = e.clientX - progressBar.getBoundingClientRect().left;
    const percentClicked = (clickPosition / progressBar.offsetWidth) * 100;
    seekTo(percentClicked);
  };

  return (
    <div className={styles.playerContainer}>
      <div className={styles.trackInfo}>
        <div className={styles.albumArt}>
          <img src={currentTrack.image} alt={currentTrack.title} />
        </div>
        <div className={styles.trackDetails}>
          <h4 className={styles.trackTitle}>{currentTrack.title}</h4>
          <p className={styles.trackArtist}>{currentTrack.artist}</p>
        </div>
      </div>

      <div className={styles.controlsContainer}>
        <div className={styles.controls}>
          <button className={styles.controlButton}>
            <SkipBack size={20} />
          </button>
          <button className={styles.playPauseButton} onClick={handlePlayPause}>
            {isPlaying ? (
              <Pause size={24} />
            ) : (
              <Play size={24} />
            )}
          </button>
          <button className={styles.controlButton}>
            <SkipForward size={20} />
          </button>
        </div>
        
        <div className={styles.progressContainer}>
          <div 
            className={styles.progressBar} 
            onClick={handleSeek}
          >
            <div 
              className={styles.progressFilled}
              style={{ width: `${progress}%` }} 
            />
          </div>
        </div>
      </div>

      <div className={styles.volumeContainer}>
        <Volume2 size={20} />
      </div>
    </div>
  );
};

export default AudioPlayer;