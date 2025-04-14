import styles from "./UploadMusic.module.css"

const UploadMusic = () => {
    return (
        <main className={styles['main-content']}>
            <h1 className={styles["page-title"]}>Upload Your Music</h1>
            <p className={styles["page-subtitle"]}>
                Share your music with the world and set up fair revenue distribution for
                all your contributors.
            </p>
            <div className={styles["upload-container"]}>
        <form>
          {/* <Basic Info */}
          <div className={styles["form-group"]}>
            <label className={styles["form-label"]} for="title">Track Title</label>
            <input
              type="text"
              id="title"
              className={styles["form-input"]}
              placeholder="Enter track title"
            />
          </div>

          <div className={styles["form-group"]}>
            <label className={styles["form-label"]} for="description">Description</label>
            <textarea
              id="description"
              className={styles["form-textarea"]}
              placeholder="Tell us about your track..."
            ></textarea>
          </div>

          <div className={styles["form-group"]}>
            <label className={styles["form-label"]} for="genre">Genre</label>
            <select id="genre" className={styles["form-select"]}>
              <option value="" disabled selected>Select a genre</option>
              <option value="pop">Pop</option>
              <option value="hiphop">Hip Hop</option>
              <option value="rnb">R&B</option>
              <option value="rock">Rock</option>
              <option value="electronic">Electronic</option>
              <option value="jazz">Jazz</option>
              <option value="classNameical">classNameical</option>
              <option value="afrobeat">Afrobeat</option>
              <option value="latin">Latin</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* File Uploads */}
          <div className={styles["form-group"]}>
            <label className={styles["form-label"]}>Upload Standard Quality Track</label>
            <div className={styles["file-upload"]}>
              <input type="file" accept="audio/*" />
              <div className={styles["upload-icon"]}>🎵</div>
              <div className={styles["upload-text"]}>
                <strong>Click or drag to upload standard quality track</strong>
                <p>MP3 format, max size 20MB</p>
              </div>
            </div>
          </div>

          <div className={styles["form-group"]}>
            <label className={styles["form-label"]}>Upload Premium Quality Track</label>
            <div className={styles["file-upload"]}>
              <input type="file" accept="audio/*" />
              <div className={styles["upload-icon"]}>🎧</div>
              <div className={styles["upload-text"]}>
                <strong>Click or drag to upload high quality track</strong>
                <p>FLAC or WAV format, max size 50MB</p>
              </div>
            </div>
          </div>

          <div className={styles["form-group"]}>
            <label className={styles["form-label"]}>Upload Artwork</label>
            <div className={styles["file-upload"]}>
              <input type="file" accept="image/*" />
              <div className={styles["upload-icon"]}>🖼️</div>
              <div className={styles["upload-text"]}>
                <strong>Click or drag to upload artwork</strong>
                <p>JPG or PNG format, minimum 1000x1000px</p>
              </div>
            </div>
          </div>

          {/* Contributors */}
          <h3 className={styles["section-title"]}>Revenue Distribution</h3>
          <div className={styles["contributor"]}>
            <div className={styles["contributor-info"]}>
              <div className={styles["contributor-role"]}>You (Artist)</div>
              <div>Your wallet</div>
            </div>
            <input
              type="number"
              className={styles["contributor-input"]}
              value="60"
              min="1"
              max="100"
            />%
          </div>

          <div className={styles["contributor"]}>
            <div className={styles["contributor-info"]}>
              <div className={styles["contributor-role"]}>Producer</div>
              <div>0x71C7...F5E2</div>
            </div>
            <input
              type="number"
              className={styles["contributor-input"]}
              value="20"
              min="1"
              max="100"
            />%
          </div>

          <div className={styles["contributor"]}>
            <div className={styles["contributor-info"]}>
              <div className={styles["contributor-role"]}>Writer</div>
              <div>0x92A3...B7D1</div>
            </div>
            <input
              type="number"
              className={styles["contributor-input"]}
              value="20"
              min="1"
              max="100"
            />%
          </div>

          <div className={styles["add-contributor"]}>
            <div className={styles["add-icon"]}>+</div>
            <div>Add another contributor</div>
          </div>

          <div className={styles["remaining"]}>Remaining allocation: <span>0%</span></div>

          <div className={styles["form-group"]}>
            <label className={styles["form-label"]} for="price"
              >Premium Access Price (SUI)</label
            >
            <input
              type="number"
              id="price"
              className={styles["form-input"]}
              placeholder="Enter price in SUI"
              step="0.01"
              min="0"
            />
          </div>

          <div className={styles["upload-actions"]}>
            <button type="button" className={styles["btn btn-secondary"]}>Preview</button>
            <button type="submit" className={styles["btn"]}>Upload Track</button>
          </div>
        </form>
      </div>

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
        </main>
    );
};

export default UploadMusic;

