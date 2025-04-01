import styles from './musicPlayer.module.css';
import img1 from "../../assets/sui-bears.png";
import { FaPlay } from "react-icons/fa";
import { FaBackwardStep } from "react-icons/fa6";
import { FaForwardStep } from "react-icons/fa6";
import { FaShuffle } from "react-icons/fa6";
import { FaRepeat } from "react-icons/fa6";

const CompactMusicPlayer = ({nft}) => {
  return (
    <div className={styles.compactContainer}>
      <div className={styles.musicBox}>
        <div className={styles.leftBox}>
          <img src={nft.image}/>
          <div className={styles.titleBox}>
            <p className={styles.title}>{nft.title}</p>
            <p className={styles.artist}>{nft.artist}</p>
          </div>
        </div>
        <div className={styles.rightBox}>
          <FaShuffle className={styles.controls}/>
          <FaBackwardStep className={styles.controls}/>
          <FaPlay className={styles.controls}/>
          <FaForwardStep className={styles.controls}/>
          <FaRepeat className={styles.controls}/>
        </div>
      </div>
      <input type="range"/>
      <div className={styles.musicTime}>
        
      </div>
      <audio 
      src={nft.isOwned ? nft.fullAudio : nft.previewAudio}
      controls
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