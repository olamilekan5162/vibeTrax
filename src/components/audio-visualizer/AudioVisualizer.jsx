import React from 'react'
import styles from './AudioVisualizer.module.css';

const AudioVisualizer = () => {
const bars = Array(20).fill(null);

  return (
    <div className={styles.visualizer}>
    {bars.map((_, index) => (
        <div key={index} className={styles.visualizerBar}></div>
    ))}

    </div>
  )
}

export default AudioVisualizer