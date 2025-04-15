import React, { useState } from "react";


import MusicCard from "../../components/cards/music-card/MusicCard";
import { trendingTracks } from "../../samples/musicSample";
import styles from "./MusicPlayer.module.css";
import SongDetails from "../song-details/SongDetails";
import CtaComponent from "../cta-section/CtaComponent";
import Contributors from "../contributors/Contributors";
import PlayerControls from "../player-controls/PlayerControls";

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  const songData = {
    title: "Midnight City Lights",
    artist: "Urban Echoes",
    albumCover: "/api/placeholder/350/350",
    duration: "4:35",
    plays: "4.2k",
    likes: 326,
    description:
      "An ambient journey through the neon-lit streets of a cyberpunk metropolis. This track blends electronic synths with urban beats to create a moody atmosphere that captures the essence of midnight city exploration.",
    quality: "Standard Quality",
  };

  const contributorsData = [
    {
      name: "Urban Echoes",
      role: "Artist/Producer",
      share: 60,
      avatar: "/api/placeholder/60/60",
    },
    {
      name: "Alex Rivera",
      role: "Songwriter",
      share: 15,
      avatar: "/api/placeholder/60/60",
    },
    {
      name: "Synth Masters",
      role: "Sound Design",
      share: 15,
      avatar: "/api/placeholder/60/60",
    },
    {
      name: "Beats Promoter",
      role: "Marketing",
      share: 10,
      avatar: "/api/placeholder/60/60",
    },
  ];

  return (
    <div className={styles.container}>
      <main className={styles.mainContent}>
        <div className={styles.playerContainer}>
          <SongDetails songData={songData} isPlaying={isPlaying} />
          <PlayerControls/>
          
        </div>

        <CtaComponent
          title="Upgrade to Premium Quality"
          subtitle="Experience this track in high-fidelity 320kbps audio quality. 
          Support the artist and unlock premium features with a one-time purchase."
          buttonText="Purchase for 0.05 SUI"
        />
        <Contributors contributors={contributorsData} />

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
              <p className={styles.commentText}>This track is amazing! The synth work around 2:15 is absolutely mind-blowing. Can't wait to hear more from Urban Echoes.</p>
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
              <p className={styles.commentText}>The bass line in this track is fire 🔥 Any chance you could share what plugin you used?</p>
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
              <p className={styles.commentText}>Just purchased the premium version. Totally worth it - the audio quality difference is incredible! Supporting artists directly feels great too.</p>
            </div>
          </div>
        </div>
      </section>
      </main>
    </div>
  );
};

export default MusicPlayer;
