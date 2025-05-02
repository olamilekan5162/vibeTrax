import { useState, useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { FiSearch, FiPlay } from "react-icons/fi";
import { useCurrentAccount } from "@mysten/dapp-kit";
import styles from "./Discover.module.css";
import { useMusicNfts } from "../../hooks/useMusicNfts";
import { LoadingState } from "../../components/state/LoadingState";
import { ErrorState } from "../../components/state/ErrorState";
import { EmptyState } from "../../components/state/EmptyState";
import MusicCard from "../../components/cards/music-card/MusicCard";
import SubscribeBanner from "../../components/subscribe-banner/SubscribeBanner";

const Discover = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [activeGenre, setActiveGenre] = useState("All Genres");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentSlide, setCurrentSlide] = useState(0);
  const subscriberData = useOutletContext();
  const navigate = useNavigate();
  const currentAccount = useCurrentAccount();

  const { musicNfts, isPending, isError } = useMusicNfts();

  const isSubscribed = subscriberData?.length > 0;

  const genres = [
    "All Genres",
    "Pop",
    "HipHop",
    "R&B",
    "Rock",
    "Electronic",
    "Jazz",
    "Classical",
    "Afrobeat",
    "Latin",
  ];

  const featuredMusic = musicNfts
    .filter((track) => track.vote_count > 0)
    .sort((a, b) => {
      const aVotes = a.vote_count || 0;
      const bVotes = b.vote_count || 0;
      return bVotes - aVotes;
    })
    .slice(0, 5);

  const otherMusic = musicNfts;

  useEffect(() => {
    if (featuredMusic.length === 0) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredMusic.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [featuredMusic.length]);

  const filteredMusic = otherMusic.filter((track) => {
    const tabMatch =
      activeTab === "all" ||
      (activeTab === "songs" && !track.is_album) ||
      (activeTab === "albums" && track.is_album);

    const genreMatch =
      activeGenre === "All Genres" ||
      track.genre?.toLowerCase() === activeGenre.toLowerCase();

    const searchMatch =
      searchQuery === "" ||
      track.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      track.artist.toLowerCase().includes(searchQuery.toLowerCase());

    return tabMatch && genreMatch && searchMatch;
  });

  if (isPending) return <LoadingState />;
  if (isError) return <ErrorState />;

  return (
    <main className={styles.mainContent}>
      {!isSubscribed && <SubscribeBanner subscriberData={subscriberData} />}

      <div className={styles.headerSection}>
        <h1 className={styles.pageTitle}>Discover Music</h1>
        <div className={styles.searchBar}>
          <input
            type="text"
            placeholder="Search for artists, songs, or albums..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <FiSearch className={styles.searchIcon} />
        </div>
      </div>

      {featuredMusic.length > 0 && (
        <section className={styles.featuredSection}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Featured Music</h2>
            <div className={styles.carouselIndicators}>
              {featuredMusic.map((_, i) => (
                <button
                  key={i}
                  className={`${styles.carouselIndicator} ${
                    i === currentSlide ? styles.active : ""
                  }`}
                  onClick={() => setCurrentSlide(i)}
                />
              ))}
            </div>
          </div>
          <div className={styles.carousel}>
            <div
              className={styles.carouselSlide}
              style={{
                backgroundImage: `url(${featuredMusic[currentSlide].music_art})`,
              }}
            >
              <div className={styles.carouselOverlay}>
                <div className={styles.carouselContent}>
                  <span className={styles.featuredBadge}>Featured</span>
                  <h3>{featuredMusic[currentSlide].title}</h3>
                  <p>{featuredMusic[currentSlide].artist}</p>
                  <button
                    className={styles.playButton}
                    onClick={() =>
                      navigate(`/discover/${featuredMusic[currentSlide].id.id}`)
                    }
                  >
                    <FiPlay />
                    Play Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      <section className={styles.musicSection}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Browse Music</h2>
          <div className={styles.tabsControls}>
            {["all", "songs", "albums"].map((tab) => (
              <button
                key={tab}
                className={`${styles.tabButton} ${
                  activeTab === tab ? styles.active : ""
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.genreFilters}>
          {genres.map((genre) => (
            <button
              key={genre}
              className={`${styles.genrePill} ${
                genre === activeGenre ? styles.active : ""
              }`}
              onClick={() => setActiveGenre(genre)}
            >
              {genre}
            </button>
          ))}
        </div>

        <div className={styles.musicGrid}>
          {filteredMusic.length > 0 ? (
            filteredMusic.map((track) => (
              <MusicCard
                key={track.id.id}
                track={track}
                quality={
                  currentAccount?.address === track?.current_owner ||
                  track?.collaborators.includes(currentAccount?.address) ||
                  (subscriberData && subscriberData.length > 0)
                    ? "Premium"
                    : "Standard"
                }
              />
            ))
          ) : (
            <EmptyState
              message={searchQuery ? "No results found" : "No music available"}
              subMessage={
                searchQuery
                  ? `No results for "${searchQuery}"`
                  : "Check back later!"
              }
            />
          )}
        </div>
      </section>
    </main>
  );
};

export default Discover;
