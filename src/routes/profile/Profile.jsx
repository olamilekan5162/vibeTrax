import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  FiDollarSign,
  FiTrendingUp,
  FiUser,
  FiPlus,
  FiEdit,
} from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import Button from "../../components/button/Button";
import MusicCard from "../../components/cards/music-card/MusicCard";
import styles from "./Profile.module.css";
import { useMusicNfts } from "../../hooks/useMusicNfts";
import { LoadingState } from "../../components/state/LoadingState";
import { ErrorState } from "../../components/state/ErrorState";
import { EmptyState } from "../../components/state/EmptyState";
import Jazzicon from "react-jazzicon";
import { useMusicActions } from "../../hooks/useMusicActions";
import { useCurrentAccount } from "@mysten/dapp-kit";

const Profile = () => {
  const { address } = useParams();
  const navigate = useNavigate();
  const { musicNfts, isPending, isError } = useMusicNfts();
  const { deleteTrack, toggleTrackForSale } = useMusicActions();
  const [trackType, setTrackType] = useState("uploaded");
  const currentAccount = useCurrentAccount();

  const userNfts = musicNfts.filter(
    (music) => music.artist === address || music.current_owner === address
  );
  const uploadedNfts = musicNfts.filter((music) => music.artist === address);
  const ownedNfts = musicNfts.filter(
    (music) => music.current_owner === address
  );

  if (!currentAccount) navigate("/");
  if (isPending) return <LoadingState />;
  if (isError) return <ErrorState />;

  return (
    <main className={styles["main-content"]}>
      <div className={styles["dashboard-header"]}>
        <div className={styles["artist-avatar"]}>
          <div className={styles["avatar-placeholder"]}>
            <Jazzicon diameter={100} seed={address} />
          </div>
        </div>
        <div className={styles["artist-info"]}>
          <h1>{`${address.slice(0, 5)}...${address.slice(-5)}`}</h1>
          <p>VibeTrax user</p>
          <div className={styles["artist-stats"]}>
            <div className={styles["stat"]}>
              <span className={styles["stat-value"]}>{userNfts.length}</span>
              <span className={styles["stat-label"]}>Tracks</span>
            </div>
            <div className={styles["stat"]}>
              <span className={styles["stat-value"]}>245K</span>
              <span className={styles["stat-label"]}>Total Plays</span>
            </div>
            <div className={styles["stat"]}>
              <span className={styles["stat-value"]}>3.8 SUI</span>
              <span className={styles["stat-label"]}>Earnings</span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles["user-musics-container"]}>
        <div className={styles["user-musics-tab"]}>
          <nav>
            <button
              className={trackType === "uploaded" ? styles.active : ""}
              onClick={() => setTrackType("uploaded")}
            >
              Uploaded Music
            </button>
            <button
              className={trackType === "owned" ? styles.active : ""}
              onClick={() => setTrackType("owned")}
            >
              Owned Music
            </button>
          </nav>
          <div className={styles["desktop"]}>
            <Button
              btnClass="primary"
              text="Create New Track"
              icon={<FiPlus />}
              onClick={() => navigate("/upload")}
            />
          </div>
          <div className={styles["mobile"]}>
            <Button
              btnClass="primary"
              icon={<FiPlus />}
              onClick={() => navigate("/upload")}
            />
          </div>
        </div>

        {trackType === "uploaded" ? (
          uploadedNfts.length > 0 ? (
            <div className={styles["music-row"]}>
              {uploadedNfts.map((track) => (
                <MusicCard key={track.id.id} track={track} quality="Premium" />
              ))}
            </div>
          ) : (
            <EmptyState message="No uploaded tracks" />
          )
        ) : ownedNfts.length > 0 ? (
          <div className={styles["music-row"]}>
            {ownedNfts.map((track) => (
              <MusicCard key={track.id.id} track={track} quality="Premium" />
            ))}
          </div>
        ) : (
          <EmptyState message="No owned tracks" />
        )}
      </div>

      <div className={styles.row}>
        <div className={styles["dashboard-card"]}>
          <div className={styles["card-header"]}>
            <h3 className={styles["card-title"]}>Streams Overview</h3>
            <div className={styles["card-action"]}>Last 30 days</div>
          </div>
          <div className={styles["chart-container"]}>
            <div className={styles["bar-chart"]}>
              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
                (day, i) => (
                  <div
                    key={day}
                    className={styles["bar"]}
                    style={{ height: `${30 + i * 10}%` }}
                    data-value={day}
                  ></div>
                )
              )}
            </div>
          </div>
          <div className={styles["card-stats"]}>
            <div className={styles["stat"]}>
              <span className={styles["stat-value"]}>12.5K</span>
              <span className={styles["stat-label"]}>Total Streams</span>
            </div>
          </div>
        </div>

        <div className={styles["dashboard-card"]}>
          <div className={styles["card-header"]}>
            <h3 className={styles["card-title"]}>Recent Earnings</h3>
            <div className={styles["card-action"]}>View All</div>
          </div>
          <div className={styles["transaction-list"]}>
            <div className={styles["transaction-item"]}>
              <div className={styles["transaction-info"]}>
                <FiDollarSign className={styles["transaction-icon"]} />
                <div className={styles["transaction-details"]}>
                  <h4>High-Quality Purchase</h4>
                  <p>by User029 • 2 hours ago</p>
                </div>
              </div>
              <div
                className={`${styles["transaction-amount"]} ${styles["amount-positive"]}`}
              >
                +0.25 SUI
              </div>
            </div>
            <div className={styles["transaction-item"]}>
              <div className={styles["transaction-info"]}>
                <FiTrendingUp className={styles["transaction-icon"]} />
                <div className={styles["transaction-details"]}>
                  <h4>Stream Royalties</h4>
                  <p>Weekly Payout • Yesterday</p>
                </div>
              </div>
              <div
                className={`${styles["transaction-amount"]} ${styles["amount-positive"]}`}
              >
                +0.18 SUI
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className={styles.row}>
        <div className={`${styles["dashboard-card"]} ${styles["track"]}`}>
          <div className={styles["card-header"]}>
            <h3 className={styles["card-title"]}>Top Tracks</h3>
            <div className={styles["card-action"]}>View All</div>
          </div>
          {userNfts.length > 0 ? (
            <ul className={styles["list"]}>
              {userNfts.slice(0, 3).map((track, index) => (
                <li key={track?.id?.id} className={styles["track-item"]}>
                  <span className={styles["track-number"]}>{index + 1}</span>
                  <img
                    src={track.music_art}
                    alt="Track Artwork"
                    className={styles["track-artwork"]}
                  />
                  <div className={styles["track-info"]}>
                    <h4 className={styles["track-title"]}>{track?.title}</h4>
                    <div className={styles["track-meta"]}>
                      <span>3:45</span>
                      <span>{track.genre}</span>
                    </div>
                  </div>
                  <div className={styles["track-stats"]}>
                    <span>5.2K plays</span>
                  </div>
                  <div className={styles["track-actions"]}>
                    {address === track.current_owner && (
                      <label
                        className={styles["toggle-switch"]}
                        title={
                          track.for_sale === true
                            ? "Fans can support this track — toggle to turn off"
                            : "Fans can't support this track yet — toggle to allow it"
                        }
                      >
                        <input
                          type="checkbox"
                          checked={track?.for_sale}
                          onChange={() => toggleTrackForSale(track?.id?.id)}
                        />
                        <span className={styles["slider"]}></span>
                      </label>
                    )}
                    {address === track.artist && (
                      <FiEdit
                        title={"Update Music Data"}
                        className={styles["action-icon"]}
                        onClick={() => navigate(`/upload/${track?.id?.id}`)}
                      />
                    )}
                    {address === track.current_owner &&
                      address === track.artist && (
                        <MdDelete
                          title={"Delete Music"}
                          className={styles["action-icon"]}
                          onClick={() => deleteTrack(track?.id?.id)}
                        />
                      )}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <EmptyState message="No recent tracks" />
          )}
        </div>

        <div className={`${styles["dashboard-card"]} ${styles["track"]}`}>
          <div className={styles["card-header"]}>
            <h3 className={styles["card-title"]}>Royalty Splits</h3>
            <div className={styles["card-action"]}>Edit</div>
          </div>

          {/* royal split card */}
          {uploadedNfts.length > 0 ? (
            uploadedNfts.slice(0, 3).map((track) => (
              <ul key={track?.id?.id} className={styles["list"]}>
                <h3>{track.title}</h3>
                {track.collaborators.map((c, index) => (
                  <>
                    <li key={index} className={styles["royalty-item"]}>
                      <div className={styles["royalty-icon"]}>
                        <FiUser />
                      </div>
                      <div className={styles["royalty-details"]}>
                        <div className={styles["royalty-role"]}>
                          {track.collaborator_roles[index] || "NA"}
                        </div>
                        <Link
                          className={styles["royalty-recipient"]}
                          to={`/profile/${c}`}
                        >{`${c.slice(0, 5)}...${c.slice(-5)}`}</Link>
                      </div>
                      <div className={styles["royalty-amount"]}>
                        {track.collaborator_splits[index] / 100}%
                      </div>
                    </li>
                  </>
                ))}
                <br />
              </ul>
            ))
          ) : (
            <EmptyState message="No music royalty" />
          )}
        </div>
      </section>
    </main>
  );
};

export default Profile;
