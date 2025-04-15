import { useCurrentAccount } from '@mysten/dapp-kit';
import Button from '../button/Button';
import styles from './Form.module.css'
import { useState } from 'react';

const Form = ({showPreview}) => {
  
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [genre, setGenre] = useState("")
  const [producerAddress, setProducerAddress] = useState("")
  const [writerAddress, setWriterAddress] = useState("")
  const [ownerRevenue, setOwnerRevenue] = useState(0)
  const [producerRevenue, setProducerRevenue] = useState(0)
  const [writerRevenue, setWriterRevenue] = useState(0)
  const [price, setPrice] = useState("")

  const currentAccount = useCurrentAccount()


  const handleUpload = (e) => {
    e.preventDefault()

  }
    return ( 
        <form action={handleUpload}>
          {/* <Basic Info */}
          <div className={styles["form-group"]}>
            <label className={styles["form-label"]} for="title">Track Title</label>
            <input
              type="text"
              id="title"
              className={styles["form-input"]}
              placeholder="Enter track title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className={styles["form-group"]}>
            <label className={styles["form-label"]} for="description">Description</label>
            <textarea
              id="description"
              className={styles["form-textarea"]}
              placeholder="Tell us about your track..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>

          <div className={styles["form-group"]}>
            <label className={styles["form-label"]} for="genre">Genre</label>
            <select id="genre" className={styles["form-select"]} value={genre} onChange={(e) => setGenre(e.target.value)}>
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
            {/* <div className={styles["contributor-info"]}> */}
              <div className={styles["contributor-role"]}>You (Artist)</div>
              <input 
                type="text"
                value={currentAccount?.address}
                className={styles["contributor-input-address"]}
                />
              
            {/* </div> */}
            <div className={styles["contributor-input-container"]}>
              <input
                type="number"
                className={styles["contributor-input"]}
                value={ownerRevenue}
                onChange={(e) => setOwnerRevenue(e.target.value)}
                min="1"
                max="100"
              />
              <span>%</span>
            </div>
          </div>

          <div className={styles["contributor"]}>
            {/* <div className={styles["contributor-info"]}> */}
              <div className={styles["contributor-role"]}>Producer</div>
              <input 
                type="text"
                value={producerAddress}
                onChange={(e) => setProducerAddress(e.target.value)}
                className={styles["contributor-input-address"]}
              />
            {/* </div> */}
            <div className={styles["contributor-input-container"]}>
              <input
                type="number"
                className={styles["contributor-input"]}
                value={producerRevenue}
                onChange={(e) => setProducerRevenue(e.target.value)}
                min="1"
                max="100"
              />
              <span>%</span>
            </div>
          </div>

          <div className={styles["contributor"]}>
            {/* <div className={styles["contributor-info"]}> */}
              <div className={styles["contributor-role"]}>Writer</div>
              <input 
                type="text"
                value={writerAddress}
                onChange={(e) => setWriterAddress(e.target.value)}
                className={styles["contributor-input-address"]}
              />
            {/* </div> */}
            <div className={styles["contributor-input-container"]}>
              <input
                type="number"
                className={styles["contributor-input"]}
                value={writerRevenue}
                onChange={(e) => setWriterRevenue(e.target.value)}
                min="1"
                max="100"
              />
              <span>%</span>
            </div>
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
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              step="0.01"
              min="0"
            />
          </div>

          <div className={styles["upload-actions"]}>
            <Button btnClass={'secondary'} text={'Preview'} onClick={showPreview}/>
            <Button btnClass={'primary'} text={'Upload Track'} />
          </div>
        </form>
     );
}
 
export default Form;