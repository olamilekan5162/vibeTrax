import { useSignAndExecuteTransaction, useSuiClient, useCurrentAccount } from '@mysten/dapp-kit';
import Button from '../button/Button';
import styles from './Form.module.css'
import { useState } from 'react';
import { Transaction } from '@mysten/sui/transactions';
import { useNetworkVariables } from '../../config/networkConfig';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { PinataSDK } from "pinata";

const Form = ({showPreview, setHighQuality, setLowQuality, setPreviewTitle, setPreviewImage, setPreviewGenre}) => {

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [genre, setGenre] = useState("")
  const [producerAddress, setProducerAddress] = useState("")
  const [writerAddress, setWriterAddress] = useState("")
  const [ownerRevenue, setOwnerRevenue] = useState(0)
  const [producerRevenue, setProducerRevenue] = useState(0)
  const [writerRevenue, setWriterRevenue] = useState(0)
  const [price, setPrice] = useState(0)
  const currentAccount = useCurrentAccount()
  const [imageFile, setImageFile] = useState(null);
  const [highQualityFile, setHighQualityFile] = useState(null);
  const [lowQualityFile, setLowQualityFile] = useState(null);
  const navigate = useNavigate()

  const { tunflowNFTRegistryId, tunflowPackageId } = useNetworkVariables(
      "tunflowNFTRegistryId",
      "tunflowPackageId"
    );

  const suiClient = useSuiClient();
    const {
      mutate: signAndExecute,
    } = useSignAndExecuteTransaction();

    const pinata = new PinataSDK({
      pinataJwt: import.meta.env.VITE_PINATA_JWT,
      pinataGateway: import.meta.env.VITE_GATEWAY_UR
    });

    

  // const publisherUrl = "https://publisher.walrus-testnet.walrus.space";
      
  // const uploadMusicImageFile = async (e) => {
  //   e.preventDefault()
  //   try {
  //     const [res1, res2, res3] = await Promise.all([
  //       fetch(`${publisherUrl}/v1/blobs?epochs=35`,{
  //         method: "PUT",
  //         headers: {
  //           "Content-Type": lowQualityFile.type || "application/octet-stream",
  //         },
  //         body: lowQualityFile,
  //       }),
  //       fetch(`${publisherUrl}/v1/blobs?epochs=35`,{
  //         method: "PUT",
  //         headers: {
  //           "Content-Type": highQualityFile.type || "application/octet-stream",
  //         },
  //         body: highQualityFile,
  //       }),
  //       fetch(`${publisherUrl}/v1/blobs?epochs=35`,{
  //         method: "PUT",
  //         headers: {
  //           "Content-Type": imageFile.type || "application/octet-stream",
  //         },
  //         body: imageFile,
  //       }),
  //     ]);

  //     const [result1, result2, result3] = await Promise.all([
  //       res1.json(), 
  //       res2.json(), 
  //       res3.json()]);

  //     const [blobId1, blobId2, blobId3] = [
  //       result1?.newlyCreated?.blobObject?.blobId || result1?.alreadyCertified?.blobId,
  //       result2?.newlyCreated?.blobObject?.blobId || result2?.alreadyCertified?.blobId, 
  //       result3?.newlyCreated?.blobObject?.blobId || result3?.alreadyCertified?.blobId
  //     ]

  //     toast.success("Files uploaded successfully")
      

  //     return {
  //       lowQualityBlobId: blobId1,
  //       highQualityBlobId: blobId2,
  //       imageBlobId: blobId3,
  //     };

  //   } catch (err) {
  //     console.error("Upload failed", err);
  //     toast.error("File Upload failed")
  //   } 
  // };

  const uploadMusicImageFile = async (e) => {
    e.preventDefault()
    try {
      const ImageUpload = await pinata.upload.public.file(imageFile);
      const imageCid = ImageUpload.cid

      const highQualityUpload = await pinata.upload.public.file(highQualityFile);
      const highQualityCid = highQualityUpload.cid

      const lowQualityUpload = await pinata.upload.public.file(lowQualityFile);
      const lowQualityCid = lowQualityUpload.cid

      console.log("files uploaded successfully")
      toast.success("files uploaded successfully")
      
      return{
        imageCid: imageCid,
        highQualityCid: highQualityCid,
        lowQualityCid: lowQualityCid
  
      }
    }
    catch(e){
      console(e)
    }

    
  }

  const handleUpload = async (e) => {
    e.preventDefault()
    toast.loading("Loading...")

    const cIds = await uploadMusicImageFile(e);

    const {
      lowQualityCid,
      highQualityCid,
      imageCid
    } = cIds;

    const tx = new Transaction();
    
        tx.moveCall({
          arguments: [
            tx.object(tunflowNFTRegistryId),
            tx.pure.string(title),
            tx.pure.string(description),
            tx.pure.string(genre),
            tx.pure.string(`https://black-far-coyote-812.mypinata.cloud/ipfs/${imageCid}`),
            tx.pure.string(`https://black-far-coyote-812.mypinata.cloud/ipfs/${highQualityCid}`),
            tx.pure.string(`https://black-far-coyote-812.mypinata.cloud/ipfs/${lowQualityCid}`),
            tx.pure.u64(Number(price)),
            tx.pure.u64(Number(ownerRevenue)),
            tx.pure.vector("address", [
              currentAccount.address,
              producerAddress,
              writerAddress
            ]),
            tx.pure.vector("u64", [
              ownerRevenue*100,
              producerRevenue*100,
              writerRevenue*100
            ]),
          ],
          target: `${tunflowPackageId}::music_nft::mint_music_nft`,
        });
    
        signAndExecute(
          {
            transaction: tx,
          },
          {
            onSuccess: async ({ digest }) => {
              const { effects } = await suiClient.waitForTransaction({
                digest: digest,
                options: {
                  showEffects: true,
                },
              });
    
              console.log(effects?.created?.[0]?.reference?.objectId);
              console.log("Uploaded!!!");
              toast.success("Music uploaded successfully", {
                duration: 5000
              })
              navigate("/dashboard")
              toast.dismiss()
            },
          }
        );

  }
    return ( 
        <form onSubmit={handleUpload}>
          <Toaster position='top-right'/>
          {/* <Basic Info */}
          <div className={styles["form-group"]}>
            <label className={styles["form-label"]} for="title">Track Title</label>
            <input
              type="text"
              id="title"
              className={styles["form-input"]}
              placeholder="Enter track title"
              value={title}
              onChange={
                (e) => {
                  setTitle(e.target.value)
                  setPreviewTitle(e.target.value)
                }
              }
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
            <select id="genre" className={styles["form-select"]} value={genre} onChange={(e) => {
              setGenre(e.target.value)
              setPreviewGenre(e.target.value)
            }}>
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
              <input type="file" accept="audio/*" onChange={(e) => {
                setLowQualityFile(e.target.files[0])
                setLowQuality(e.target.files[0])
              }}
                />
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
              <input type="file" accept="audio/*" onChange={(e) => {
                setHighQualityFile(e.target.files[0])
                setHighQuality(e.target.files[0])
                }}
                />
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
              <input type="file" accept="image/*" onChange={(e) => {
                setImageFile(e.target.files[0])
                setPreviewImage(e.target.files[0])
              }}
                />
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
                min="0"
                max="5000"
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
                min="0"
                max="5000"
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
                min="0"
                max="5000"
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