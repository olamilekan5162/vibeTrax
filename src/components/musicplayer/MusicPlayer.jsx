import styles from './musicPlayer.module.css';
import img1 from "../../assets/sui-bears.png";
import { FaPlay } from "react-icons/fa";
import { FaBackwardStep } from "react-icons/fa6";
import { FaForwardStep } from "react-icons/fa6";
import { FaShuffle } from "react-icons/fa6";
import { FaRepeat } from "react-icons/fa6";

const CompactMusicPlayer = () => {
  return (
    <div className={styles.compactContainer}>
      <div className={styles.musicBox}>
        <div className={styles.leftBox}>
          <img src={img1}/>
          <div className={styles.titleBox}>
            <p className={styles.title}>Haske (Light)</p>
            <p className={styles.artist}>Kaestrings</p>
          </div>
        </div>
        <div className={styles.rightBox}>
          <FaBackwardStep className={styles.controls}/>
          <FaPlay className={styles.controls}/>
          <FaForwardStep className={styles.controls}/>
        </div>
      </div>
      <input type="range"/>
      <audio />
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