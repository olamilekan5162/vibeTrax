import React, { useState } from "react";
import PremiumModal from "../../modals/premium-modal/PremiumData";

import MusicCard from "../../components/cards/music-card/MusicCard";
import { trendingTracks } from "../../samples/musicSample";
import styles from "./MusicPlayer.module.css";
import SongDetails from "../../components/song-details/SongDetails";
import CtaComponent from "../../components/cta-section/CtaComponent";
import Contributors from "../../components/contributors/Contributors";
import PlayerControls from "../../components/player-controls/PlayerControls";
import { useParams } from "react-router-dom";
import { useCurrentAccount, useSuiClientQuery } from "@mysten/dapp-kit";

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { id } = useParams();
  

  const { data, isPending } = useSuiClientQuery(
    "getObject",
    {
      id: id,
      options: {
        showContent: true,
        showDisplay: true,
        showOwner: true,
      },
    },
    {
      select: (data) => data.data.content,
    }
  );

  const currentAccount = useCurrentAccount()

  const forSale = currentAccount?.address === data?.fields.artist 
  || currentAccount?.address === data?.fields.current_owner 
  || data?.fields.for_sale === false 
  || data?.fields.collaborators.includes(currentAccount?.address)

  const isPremium = currentAccount?.address === data?.fields.current_owner 
  || data?.fields.collaborators.includes(currentAccount?.address)


  

  return (
    <div className={styles.container}>
      <main className={styles.mainContent}>
        {!isPending && (
          <div className={styles.playerContainer}>
            <SongDetails isPremium={isPremium} songData={data} isPlaying={isPlaying} />
            {/* <PlayerControls songData={data} /> */}
          </div>
        )}

        <div>
          <CtaComponent
            title="Upgrade to Premium Quality"
            subtitle="Experience this track in high-fidelity 320kbps audio quality.
            Support the artist and unlock premium features with a one-time purchase."
            buttonText= {forSale ? "Already Sold" : `Purchase for ${data?.fields.price} SUI`}
            handleClick={() => setIsOpen(!isOpen)}
            songData={data}
            disabled={forSale}
          />
          <PremiumModal isOpen={isOpen} onClose={() => setIsOpen(false)} songData={data}/>
        </div>
        <Contributors contributors={data?.fields.collaborators} splits={data?.fields.collaborator_splits} />

        <h2 className={styles.sectionTitle}>More from Urban Echoes</h2>
        <div className={styles.musicGrid}>
          {trendingTracks.map((track) => (
            <MusicCard
              key={track.id}
              title={track.title}
              artist={track.artist}
              duration={track.duration}
              plays={track.plays}
              quality={track.quality}
              imageSrc={track.imageSrc}
            />
          ))}
        </div>

        <section className={styles.commentsSection}>
          <h2 className={styles.sectionTitle}>Comments</h2>

          <div className={styles.commentForm}>
            <img
              src="/api/placeholder/50/50"
              alt="Your Avatar"
              className={styles.commentAvatar}
            />
            <div className={styles.commentInputContainer}>
              <input
                type="text"
                placeholder="Add a comment..."
                className={styles.commentInput}
              />
              <button className={styles.commentBtn}>Post</button>
            </div>
          </div>

          <div className={styles.commentsList}>
            <div className={styles.comment}>
              <img
                src="/api/placeholder/50/50"
                alt="SynthWave92 Avatar"
                className={styles.commentAvatar}
              />
              <div className={styles.commentContent}>
                <div className={styles.commentHeader}>
                  <span className={styles.commentUser}>SynthWave92</span>
                  <span className={styles.commentTime}>2 days ago</span>
                </div>
                <p className={styles.commentText}>
                  This track is amazing! The synth work around 2:15 is
                  absolutely mind-blowing. Can't wait to hear more from Urban
                  Echoes.
                </p>
              </div>
            </div>

            <div className={styles.comment}>
              <img
                src="/api/placeholder/50/50"
                alt="BeatMaker404 Avatar"
                className={styles.commentAvatar}
              />
              <div className={styles.commentContent}>
                <div className={styles.commentHeader}>
                  <span className={styles.commentUser}>BeatMaker404</span>
                  <span className={styles.commentTime}>1 day ago</span>
                </div>
                <p className={styles.commentText}>
                  The bass line in this track is fire 🔥 Any chance you could
                  share what plugin you used?
                </p>
              </div>
            </div>

            <div className={styles.comment}>
              <img
                src="/api/placeholder/50/50"
                alt="MusicCollector Avatar"
                className={styles.commentAvatar}
              />
              <div className={styles.commentContent}>
                <div className={styles.commentHeader}>
                  <span className={styles.commentUser}>MusicCollector</span>
                  <span className={styles.commentTime}>5 hours ago</span>
                </div>
                <p className={styles.commentText}>
                  Just purchased the premium version. Totally worth it - the
                  audio quality difference is incredible! Supporting artists
                  directly feels great too.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default MusicPlayer;
