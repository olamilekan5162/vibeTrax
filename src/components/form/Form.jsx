import {
  useCurrentAccount,
  useSuiClientQuery,
} from "@mysten/dapp-kit";
import Button from "../button/Button";
import styles from "./Form.module.css";
import { useEffect, useState } from "react";
import { Transaction } from "@mysten/sui/transactions";
import toast from "react-hot-toast";
import { PinataSDK } from "pinata";
import { useMusicUpload } from "../../hooks/useMusicUpload";
import { useParams } from "react-router-dom";

const Form = ({
  showPreview,
  setHighQuality,
  setLowQuality,
  setPreviewTitle,
  setPreviewImage,
  setPreviewGenre,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [genre, setGenre] = useState("");
  const [price, setPrice] = useState(0);
  const currentAccount = useCurrentAccount();
  const [imageFile, setImageFile] = useState(null);
  const [highQualityFile, setHighQualityFile] = useState(null);
  const [lowQualityFile, setLowQualityFile] = useState(null);
  const { uploadMusic } = useMusicUpload()
  const { id } = useParams()
  const [contributors, setContributors] = useState([]);


  const pinata = new PinataSDK({
    pinataJwt: import.meta.env.VITE_PINATA_JWT,
    pinataGateway: import.meta.env.VITE_GATEWAY_URL,
  });


  // function to fetch song details using id
  const {
      data: songData,
      isPending,
      isError,
    } = useSuiClientQuery(
      "getObject",
      { id, options: { showContent: true } },
      { select: (data) => data.data?.content }
    );


    // function go get image and music blob file
    const getBlobFile = async (blobUrl) => {
      const response = await fetch(blobUrl)
      const blob = await response.blob()
      return blob
    }


    // effect to update form
  useEffect(() => {
    if (id && !isPending) {
      setTitle(songData?.fields?.title)
      setPreviewTitle(songData?.fields?.title)
      setDescription(songData?.fields?.description)   
      setGenre(songData?.fields?.genre)
      setPreviewGenre(songData?.fields?.genre)
      setPrice(songData?.fields?.price)
      getBlobFile(songData?.fields?.music_art).then(blob => {
        setImageFile(blob)
        setPreviewImage(blob)
      })
      getBlobFile(songData?.fields?.high_quality_ipfs).then(blob => {
        setHighQualityFile(blob)
        setHighQuality(blob)
      })
      getBlobFile(songData?.fields?.low_quality_ipfs).then(blob => {
        setLowQualityFile(blob)
        setLowQuality(blob)
      })
      setContributors(
        songData?.fields?.collaborators.map((collaborator, index) => ({
          role: songData?.fields?.collaborator_roles[index],
          address: collaborator,
          percentage: songData?.fields?.collaborator_splits[index]/100

        }))
      )
    }
  },[id, songData, isPending])


  useEffect(() => {
    // Initialize the first contributor as the artist
    if (currentAccount) {
    setContributors([
      {
        role: "Artist",
        address: currentAccount?.address,
        percentage: 100,
      },
    ]);}
  },[currentAccount])

  // Track remaining percentage
  const [_remainingPercentage, setRemainingPercentage] = useState(0);

  // Calculate remaining percentage whenever contributors change
  const calculateRemainingPercentage = () => {
    const total = contributors.reduce((sum, contributor) => {
      return sum + (parseInt(contributor.percentage) || 0);
    }, 0);
    return 100 - total;
  };

  // function to Add new contributor
  const addContributor = () => {
    if (calculateRemainingPercentage() <= 0) {
      toast.error("No percentage remaining to allocate");
      return;
    }

    setContributors([
      ...contributors,
      { role: "", address: "", percentage: 0 },
    ]);
  };

  //Function to Remove contributor
  const removeContributor = (index) => {
    if (index === 0) {
      toast.error("Cannot remove the main artist");
      return;
    }

    const updatedContributors = [...contributors];
    updatedContributors.splice(index, 1);
    setContributors(updatedContributors);
  };

  // Funtion to Update contributor
  const updateContributor = (index, field, value) => {
    const updatedContributors = [...contributors];
    updatedContributors[index] = {
      ...updatedContributors[index],
      [field]: value,
    };
    setContributors(updatedContributors);

    // Update remaining percentage
    setRemainingPercentage(calculateRemainingPercentage());
  };


  // function to upload music to pinata

  const uploadMusicImageFile = async (e) => {
    e.preventDefault();
    try {
      const ImageUpload = await pinata.upload.public.file(imageFile);
      const imageCid = ImageUpload.cid;

      const highQualityUpload = await pinata.upload.public.file(
        highQualityFile
      );
      const highQualityCid = highQualityUpload.cid;

      const lowQualityUpload = await pinata.upload.public.file(lowQualityFile);
      const lowQualityCid = lowQualityUpload.cid;

      console.log("files uploaded successfully");
      toast.success("files uploaded successfully, creating transaction", {
        duration: 5000,
      });

      return {
        imageCid: imageCid,
        highQualityCid: highQualityCid,
        lowQualityCid: lowQualityCid,
      };
    } catch (e) {
      console.error(e);
      toast.error("failed to upload files", {
        duration: 5000,
      });
    }
  };


  // function to upload music to smart contract

  const handleUpload = async (e) => {
    e.preventDefault();

    // Validate that percentages add up to 100%
    if (calculateRemainingPercentage() !== 0) {
      toast.error("Revenue distribution must total exactly 100%");
      return;
    }
    
    const toastId = toast.loading("Loading...");

    const cIds = await uploadMusicImageFile(e);

    if (!cIds) {
      toast.dismiss(toastId);
      return;
    }

    const { lowQualityCid, highQualityCid, imageCid } = cIds;

  
    const roles = contributors.map((c) => c.role);
    const percentages = contributors.map((c) => parseInt(c.percentage) * 100);

    uploadMusic(
      title,
      description,
      genre,
      `https://${import.meta.env.VITE_GATEWAY_URL}/ipfs/${imageCid}`,
      `https://${import.meta.env.VITE_GATEWAY_URL}/ipfs/${highQualityCid}`,
      `https://${import.meta.env.VITE_GATEWAY_URL}/ipfs/${lowQualityCid}`,
      price,
      contributors,
      roles,
      percentages
    )
  }

  // function to update music

  const handleUpdate = (e) => {
    e.preventDefault()
    console.log("hello"); 
  }

  return (
    <form onSubmit={id ? handleUpdate : handleUpload}>
      {/* Basic Info */}
      <div className={styles["form-group"]}>
        <label className={styles["form-label"]} htmlFor="title">
          Track Title
        </label>
        <input
          type="text"
          id="title"
          className={styles["form-input"]}
          placeholder="Enter track title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            setPreviewTitle(e.target.value);
          }}
        />
      </div>

      <div className={styles["form-group"]}>
        <label className={styles["form-label"]} htmlFor="description">
          Description
        </label>
        <textarea
          id="description"
          className={styles["form-textarea"]}
          placeholder="Tell us about your track..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
      </div>

      <div className={styles["form-group"]}>
        <label className={styles["form-label"]} htmlFor="genre">
          Genre
        </label>
        <select
          id="genre"
          className={styles["form-select"]}
          value={genre}
          onChange={(e) => {
            setGenre(e.target.value);
            setPreviewGenre(e.target.value);
          }}
        >
          <option value="" disabled>
            Select a genre
          </option>
          <option value="pop">Pop</option>
          <option value="hiphop">Hip Hop</option>
          <option value="rnb">R&B</option>
          <option value="rock">Rock</option>
          <option value="electronic">Electronic</option>
          <option value="jazz">Jazz</option>
          <option value="classical">Classical</option>
          <option value="afrobeat">Afrobeat</option>
          <option value="latin">Latin</option>
          <option value="other">Other</option>
        </select>
      </div>

      {/* File Uploads */}
      <div className={styles["form-group"]}>
        <label className={styles["form-label"]}>
          Upload Standard Quality Track
        </label>
        <div
          className={`${styles["file-upload"]} ${
            lowQualityFile ? styles["file-selected"] : ""
          }`}
        >
          <input
            type="file"
            id="standard-quality"
            accept="audio/*"
            onChange={(e) => {
              if (e.target.files[0]) {
                setLowQualityFile(e.target.files[0]);
                setLowQuality(e.target.files[0]);
              }
            }}
          />
          <div className={styles["upload-icon"]}>
            {lowQualityFile ? "✓" : "🎵"}
          </div>
          <div className={styles["upload-text"]}>
            {lowQualityFile ? (
              <>
                <strong className={styles["file-name"]}>
                  {lowQualityFile.name}
                </strong>
                <p>{(lowQualityFile.size / (1024 * 1024)).toFixed(2)} MB</p>
              </>
            ) : (
              <>
                <strong>Click or drag to upload standard quality track</strong>
                <p>MP3 format, max size 20MB</p>
              </>
            )}
          </div>
          {lowQualityFile && (
            <button
              type="button"
              className={styles["remove-file"]}
              onClick={(e) => {
                e.preventDefault();
                setLowQualityFile(null);
                setLowQuality(null);
                document.getElementById("standard-quality").value = "";
              }}
            >
              ✕
            </button>
          )}
        </div>
      </div>

      <div className={styles["form-group"]}>
        <label className={styles["form-label"]}>
          Upload Premium Quality Track
        </label>
        <div
          className={`${styles["file-upload"]} ${
            highQualityFile ? styles["file-selected"] : ""
          }`}
        >
          <input
            type="file"
            id="premium-quality"
            accept="audio/*"
            onChange={(e) => {
              if (e.target.files[0]) {
                setHighQualityFile(e.target.files[0]);
                setHighQuality(e.target.files[0]);
              }
            }}
          />
          <div className={styles["upload-icon"]}>
            {highQualityFile ? "✓" : "🎧"}
          </div>
          <div className={styles["upload-text"]}>
            {highQualityFile ? (
              <>
                <strong className={styles["file-name"]}>
                  {highQualityFile.name}
                </strong>
                <p>{(highQualityFile.size / (1024 * 1024)).toFixed(2)} MB</p>
              </>
            ) : (
              <>
                <strong>Click or drag to upload high quality track</strong>
                <p>FLAC or WAV format, max size 50MB</p>
              </>
            )}
          </div>
          {highQualityFile && (
            <button
              type="button"
              className={styles["remove-file"]}
              onClick={(e) => {
                e.preventDefault();
                setHighQualityFile(null);
                setHighQuality(null);
                document.getElementById("premium-quality").value = "";
              }}
            >
              ✕
            </button>
          )}
        </div>
      </div>

      <div className={styles["form-group"]}>
        <label className={styles["form-label"]}>Upload Artwork</label>
        <div
          className={`${styles["file-upload"]} ${
            imageFile ? styles["file-selected"] : ""
          }`}
        >
          <input
            type="file"
            id="artwork-file"
            accept="image/*"
            onChange={(e) => {
              if (e.target.files[0]) {
                setImageFile(e.target.files[0]);
                setPreviewImage(e.target.files[0]);
              }
            }}
          />
          <div className={styles["upload-icon"]}>{imageFile ? "✓" : "🖼️"}</div>
          <div className={styles["upload-text"]}>
            {imageFile ? (
              <>
                <strong className={styles["file-name"]}>
                  {imageFile.name}
                </strong>
                <p>{(imageFile.size / (1024 * 1024)).toFixed(2)} MB</p>
                {imageFile.type.includes("image") && (
                  <div className={styles["image-preview"]}>
                    <img
                      src={URL.createObjectURL(imageFile)}
                      alt="Preview"
                      className={styles["preview-thumbnail"]}
                    />
                  </div>
                )}
              </>
            ) : (
              <>
                <strong>Click or drag to upload artwork</strong>
                <p>JPG or PNG format, minimum 1000x1000px</p>
              </>
            )}
          </div>
          {imageFile && (
            <button
              type="button"
              className={styles["remove-file"]}
              onClick={(e) => {
                e.preventDefault();
                setImageFile(null);
                setPreviewImage(null);
                document.getElementById("artwork-file").value = "";
              }}
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Revenue Distribution - Updated Section */}
      <h3 className={styles["section-title"]}>Revenue Distribution</h3>

      {contributors.map((contributor, index) => (
        <div className={styles["contributor"]} key={index}>
          <div className={styles["contributor-role-container"]}>
            {index === 0 ? (
              <div className={styles["contributor-role"]}>You (Artist)</div>
            ) : (
              <input
                type="text"
                className={styles["contributor-input-role"]}
                placeholder="Role (e.g., Producer, Writer)"
                value={contributor.role}
                onChange={(e) =>
                  updateContributor(index, "role", e.target.value)
                }
              />
            )}
          </div>

          <input
            type="text"
            value={contributor.address}
            onChange={(e) =>
              updateContributor(index, "address", e.target.value)
            }
            placeholder="Enter wallet address"
            className={styles["contributor-input-address"]}
            disabled={index === 0}
          />

          <div className={styles["contributor-input-container"]}>
            <input
              type="number"
              className={styles["contributor-input"]}
              value={contributor.percentage}
              onChange={(e) =>
                updateContributor(index, "percentage", e.target.value)
              }
              min="0"
              max="100"
              placeholder="%"
            />
            <span>%</span>

            {index !== 0 && (
              <button
                type="button"
                className={styles["remove-contributor"]}
                onClick={() => removeContributor(index)}
              >
                ✕
              </button>
            )}
          </div>
        </div>
      ))}

      <div className={styles["add-contributor"]} onClick={addContributor}>
        <div className={styles["add-icon"]}>+</div>
        <div>Add another contributor</div>
      </div>

      <div
        className={styles["remaining"]}
        style={{
          color: calculateRemainingPercentage() < 0 ? "red" : "inherit",
        }}
      >
        Remaining allocation: <span>{calculateRemainingPercentage()}%</span>
      </div>

      <div className={styles["form-group"]}>
        <label className={styles["form-label"]} htmlFor="price">
          Premium Access Price (SUI)
        </label>
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
        <Button btnClass={"secondary"} text={"Preview"} onClick={showPreview} />
        <Button btnClass={"primary"} text={id ? "Update Track" : "Upload Track"} />
      </div>
    </form>
  );
};

export default Form;
