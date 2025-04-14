import ArtistCard from "../../components/cards/artist-card/ArtistCard";
import MusicCard from "../../components/cards/music-card/MusicCard";
import {
  featuredArtists,
  newReleases,
  trendingTracks,
} from "../../samples/musicSample";
import styles from "./Discover.module.css";

const Discover = () => {
  const genres = [
    "All Genres",
    "Pop",
    "Hip Hop",
    "R&B",
    "Rock",
    "Electronic",
    "Jazz",
    "Classical",
    "Afrobeat",
    "Latin",
  ];

  const filters = ["All", "Songs", "Albums", "Artists"];

  return (
    <main className={styles.mainContent}>
      <h1 className={styles.pageTitle}>Discover Music</h1>

      <div className={styles.searchFilter}>
        <div className={styles.searchBar}>
          <input
            type="text"
            placeholder="Search for artists, songs, or albums..."
          />
        </div>
        <div className={styles.filters}>
          {filters.map((filter, index) => (
            <button
              key={index}
              className={`${styles.filterBtn} ${
                index === 0 ? styles.active : ""
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.genres}>
        {genres.map((genre, index) => (
          <div
            key={index}
            className={`${styles.genrePill} ${
              index === 0 ? styles.active : ""
            }`}
          >
            {genre}
          </div>
        ))}
      </div>

      <h2 className={styles.sectionTitle}>Trending Now</h2>
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

      <h2 className={styles.sectionTitle}>Featured Artists</h2>
      <div className={styles.artistsRow}>
        {featuredArtists.map((artist) => (
          <ArtistCard
            key={artist.id}
            name={artist.name}
            followers={artist.followers}
            imageSrc={artist.imageSrc}
          />
        ))}
      </div>

      <h2 className={styles.sectionTitle}>New Releases</h2>
      <div className={styles.musicGrid}>
        {newReleases.map((track) => (
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

      <div className={styles.pagination}>
        <div className={styles.pageBtn}>1</div>
        <div className={`${styles.pageBtn} ${styles.active}`}>2</div>
        <div className={styles.pageBtn}>3</div>
        <div className={styles.pageBtn}>4</div>
        <div className={styles.pageBtn}>5</div>
        <div className={styles.pageBtn}>→</div>
      </div>
    </main>
  );
};

export default Discover;
