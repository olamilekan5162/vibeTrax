// import React, { useState, useRef, useEffect } from "react";
import styles from "./PlayerControls.module.css";
import { useCurrentAccount } from "@mysten/dapp-kit";

const PlayerControls = ({ songData }) => {
  const currentAccount = useCurrentAccount();
  // const [isPlaying, setIsPlaying] = useState(false);
  // const [currentTime, setCurrentTime] = useState(0);
  // const [progress, setProgress] = useState(35);
  // const [duration, setDuration] = useState(0);

  // const audioref = useRef();
  // const progressBar = useRef();
  // const animationRef = useRef();

  // useEffect(() => {
  //   const seconds = Math.floor(audioref.current.duration);
  //   setDuration(seconds);
  //   progressBar.current.max = seconds;
  // }, [audioref?.current?.loadedmetadata, audioref?.current?.readyState]);

  // const togglePlayPause = () => {
  //   const prevValue = isPlaying;
  //   setIsPlaying(!prevValue);

  //   if (!prevValue) {
  //     audioref.current.play();
  //     animationRef.current = requestAnimationFrame(updateProgressBar);
  //   } else {
  //     audioref.current.pause();
  //     cancelAnimationFrame(animationRef.current);
  //   }
  // };

  // const updateProgressBar = () => {
  //   progressBar.current.value = audioref.current.currentTime;
  //   changePlayerCurrentTime();
  //   animationRef.current = requestAnimationFrame(updateProgressBar);
  // };

  // const changePlayerCurrentTime = () => {
  //   progressBar.current.style.setProperty(
  //     "--seek-before-width",
  //     `${(progressBar.current.value / duration) * 100}%`
  //   );
  //   setCurrentTime(audioref.current.currentTime);
  // };

  // const handleTimeUpdate = (secs) => {
  //   const minutes = Math.floor(secs / 60);
  //   const returnedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  //   const seconds = Math.floor(secs % 60);
  //   const returnedSeconds = seconds < 10 ? `0${seconds}` : seconds;
  //   return `${returnedMinutes}:${returnedSeconds}`;
  // };

  // const changeRange = () => {
  //   audioref.current.currentTime = progressBar.current.value;
  //   changePlayerCurrentTime();
  // };

  // const backThirty = () => {
  //   progressBar.current.value = Number(progressBar.current.value) - 30;
  //   changeRange();
  // }

  // const forwardThirty = () => {
  //   progressBar.current.value = Number(progressBar.current.value) + 30;
  //   changeRange();
  // }

  return (
    <div className={styles.container}>
      <audio
        className={styles.audio}
        controls
        src={
          currentAccount?.address === songData.fields.artist ||
          currentAccount?.address === songData.fields.current_owner ||
          songData.fields.collaborators.includes(currentAccount?.address)
            ? songData.fields.high_quality_ipfs
            : songData.fields.low_quality_ipfs
        }
      ></audio>
      {/* progressbar
      <div className={styles.progressWrapper}>
        <input
          className={styles.progress}
          type="range"
          defaultValue="0"
          ref={progressBar}
          onChange={changeRange}
        />
      </div>
      
      <div className={styles.controlsSection}>
        player controls
        <div className={styles.audioPlayer}>
          <audio ref={audioref} src={songData.fields.high_quality_ipfs}></audio>
          
          time display
          <div className={styles.duration}>
            {duration && !isNaN(duration) && handleTimeUpdate(duration)}
          </div>
          <div className={styles.buttons}>

          <button className={styles.forwardBackward} onClick={backThirty}>
            ⏮️
          </button>
          <button className={styles.playPause} onClick={togglePlayPause}>
            {isPlaying ? "⏸️" : "▶️"}
          </button>
          <button className={styles.forwardBackward} onClick={forwardThirty}>
            ⏭️
          </button>
          </div>
        </div>
        
        current time
        <div className={styles.currentTime}>{handleTimeUpdate(currentTime)}</div>
      </div> */}
    </div>
  );
};

export default PlayerControls;
