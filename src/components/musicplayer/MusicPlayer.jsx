import styles from './musicPlayer.module.css';
import { FaPlay } from "react-icons/fa";
import { FaPause } from "react-icons/fa";
import { FaBackwardStep } from "react-icons/fa6";
import { FaForwardStep } from "react-icons/fa6";
import { FaShuffle } from "react-icons/fa6";
import { FaRepeat } from "react-icons/fa6";
import { useState, useRef } from 'react';

const CompactMusicPlayer = ({nft}) => {
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);
  
  const formatTime = (time) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};

  const handlePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e) => {
    const seekTime = (e.target.value / 100) * duration;
    audioRef.current.currentTime = seekTime;
  };
  
  return (
    <div className={styles.compactContainer}>
      <div className={styles.musicBox}>
        <div className={styles.leftBox}>
          <img src={nft.genre}/>
          <div className={styles.titleBox}>
            <p className={styles.title}>{nft.title}</p>
            <p className={styles.artist}>{nft.artist}</p>
          </div>
        </div>
        <div className={styles.rightBox}>
          <FaShuffle className={styles.controls}/>
          <FaBackwardStep className={styles.controls}/>
          {isPlaying ?
          <FaPause className={styles.controls} onClick={handlePlayPause}/>
          :
          <FaPlay className={styles.controls} onClick={handlePlayPause}/>
          }
          <FaForwardStep className={styles.controls}/>
          <FaRepeat className={styles.controls}/>
        </div>
      </div>
      
      <input 
      type="range" 
      onChange={handleSeek}
      min="0"
      max="100"
      value={(currentTime / duration) * 100}
      />
      
      <div className={styles.musicTime}>
        <p> {formatTime(currentTime)}
        </p>
        <p>{formatTime(duration)}</p>
      </div>
      
      <audio
      ref={audioRef}
      src={nft.isOwned ? nft.high_quality_ipfs : nft.low_quality_ipfs}
      onTimeUpdate={(e) => {
        setCurrentTime(e.target.currentTime);
        setDuration(e.target.duration);
        }}
      onEnded={() => {
        setIsPlaying(false);
        }}
      />
    </div>
  );
};

const ExpandedMusicPlayer = () => {
  return (
    <div className={styles.expandedContainer}>
      <img src={img1}/>
      <div className={styles.titleBox}>
        <p className={styles.title}>Haske (Light)</p>
        <p className={styles.artist}>Kaestrings</p>
      </div>
      <input type="range"/>
      
      <div className={styles.expandedControls}>
        <FaShuffle className={styles.controls}/>
        <FaBackwardStep className={styles.controls}/>
        <FaPlay className={styles.controls}/>
        <FaForwardStep className={styles.controls}/>
        <FaRepeat className={styles.controls}/>
      </div>
      <audio />
    </div>
  );
};

export { CompactMusicPlayer, ExpandedMusicPlayer };