import styles from './Preview.module.css'
const Preview = () => {
    return ( 
        <>
        {/* Preview Section */}
      <div className={styles["preview-section"]}>
        <div className={styles["preview-header"]}>
          <h3 className={styles["preview-title"]}>Track Preview</h3>
          <div className={styles["preview-tabs"]}>
            <div className={styles["preview-tab active"]}>Standard</div>
            <div className={styles["preview-tab"]}>Premium</div>
          </div>
        </div>
        <div className={styles["preview-content"]}>
          <div className={styles["preview-artwork"]}>Artwork Preview</div>
          <div className={styles["preview-info"]}>
            <div className={styles["preview-metadata"]}>
              <div className={styles["preview-metadata-item"]}>
                <div className={styles["preview-metadata-label"]}>Title</div>
                <div className={styles["preview-metadata-value"]}>Midnight Dreams</div>
              </div>
              <div className={styles["preview-metadata-item"]}>
                <div className={styles["preview-metadata-label"]}>Artist</div>
                <div className={styles["preview-metadata-value"]}>Your Artist Name</div>
              </div>
              <div className={styles["preview-metadata-item"]}>
                <div className={styles["preview-metadata-label"]}>Genre</div>
                <div className={styles["preview-metadata-value"]}>Electronic</div>
              </div>
            </div>
            <div className={styles["preview-audio"]}>
              <div className={styles["preview-audio-controls"]}>
                <div className={styles["preview-audio-progress"]}></div>
              </div>
              <div className={styles["preview-audio-times"]}>
                <span>0:58</span>
                <span>3:24</span>
              </div>
            </div>
          </div>
        </div>
      </div>
        </>
     );
}
 
export default Preview;