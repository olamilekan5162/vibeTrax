import {
  useSignAndExecuteTransaction,
  useSuiClient,
  useCurrentAccount,
} from "@mysten/dapp-kit";
import Button from "../button/Button";
import styles from "./Form.module.css";
import { useState } from "react";
import { Transaction } from "@mysten/sui/transactions";
import { useNetworkVariables } from "../../config/networkConfig";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { PinataSDK } from "pinata";

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
  const navigate = useNavigate();

  // Contributors state management
  const [contributors, setContributors] = useState([
    {
      role: "Artist",
      address: currentAccount?.address || "",
      percentage: 100,
    },
  ]);

  // Track remaining percentage
  const [_remainingPercentage, setRemainingPercentage] = useState(0);

  // Calculate remaining percentage whenever contributors change
  const calculateRemainingPercentage = () => {
    const total = contributors.reduce((sum, contributor) => {
      return sum + (parseInt(contributor.percentage) || 0);
    }, 0);
    return 100 - total;
  };

  // Add new contributor
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

  // Remove contributor
  const removeContributor = (index) => {
    if (index === 0) {
      toast.error("Cannot remove the main artist");
      return;
    }

    const updatedContributors = [...contributors];
    updatedContributors.splice(index, 1);
    setContributors(updatedContributors);
  };

  // Update contributor
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

  const { tunflowNFTRegistryId, tunflowPackageId } = useNetworkVariables(
    "tunflowNFTRegistryId",
    "tunflowPackageId"
  );

  const suiClient = useSuiClient();
  const { mutate: signAndExecute } = useSignAndExecuteTransaction();

  const pinata = new PinataSDK({
    pinataJwt: import.meta.env.VITE_PINATA_JWT,
    pinataGateway: import.meta.env.VITE_GATEWAY_URL,
  });

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

    // Extract addresses, roles, and percentages for the contract
    const addresses = contributors.map((c) => c.address);
    const roles = contributors.map((c) => c.role);
    const percentages = contributors.map((c) => parseInt(c.percentage) * 100);

    const tx = new Transaction();

    tx.moveCall({
      arguments: [
        tx.object(tunflowNFTRegistryId),
        tx.pure.string(title),
        tx.pure.string(description),
        tx.pure.string(genre),
        tx.pure.string(
          `https://${import.meta.env.VITE_GATEWAY_URL}/ipfs/${imageCid}`
        ),
        tx.pure.string(
          `https://${import.meta.env.VITE_GATEWAY_URL}/ipfs/${highQualityCid}`
        ),
        tx.pure.string(
          `https://${import.meta.env.VITE_GATEWAY_URL}/ipfs/${lowQualityCid}`
        ),
        tx.pure.u64(Number(price)),
        tx.pure.u64(Number(contributors[0].percentage)),
        tx.pure.vector("address", addresses),
        tx.pure.vector("string", roles), // Add roles to the transaction
        tx.pure.vector("u64", percentages),
      ],
      target: `${tunflowPackageId}::music_nft::mint_music_nft`,
    });

    toast.success("Transaction created successfully, waiting for signature", {
      duration: 5000,
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
            duration: 5000,
          });
          toast.dismiss(toastId);
          navigate("/discover");
        },
      }
    );
  };

  return (
    <form onSubmit={handleUpload}>
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
        <Button btnClass={"primary"} text={"Upload Track"} />
      </div>
    </form>
  );
};

export default Form;
