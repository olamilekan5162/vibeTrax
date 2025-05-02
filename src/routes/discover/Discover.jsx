import { useNavigate, useOutletContext } from "react-router-dom";
// import ArtistCard from "../../components/cards/artist-card/ArtistCard";
import MusicCard from "../../components/cards/music-card/MusicCard";
import SubscribeBanner from "../../components/subscribe-banner/SubscribeBanner";
import { useNetworkVariable } from "../../config/networkConfig";
import styles from "./Discover.module.css";
import { useCurrentAccount, useSuiClientQuery } from "@mysten/dapp-kit";
import { useEffect, useState } from "react";

const Discover = () => {
  const [userNfts, setUserNfts] = useState([]);
  const [NftIds, setNftIds] = useState([]);
  const [_artists, setArtists] = useState([]);
  const [activeTab, setActiveTab] = useState("all");
  const [activeGenre, setActiveGenre] = useState("All Genres");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentSlide, setCurrentSlide] = useState(0);
  const subscriberData = useOutletContext();
  const navigate = useNavigate();

  const isSubscribed = () => {
    return subscriberData && subscriberData.length <= 0;
  };

  const tunflowPackageId = useNetworkVariable("tunflowPackageId");

  const { data: objectData, isPending: objectPending } = useSuiClientQuery(
    "queryEvents",
    {
      query: {
        MoveEventType: `${tunflowPackageId}::music_nft::MusicNFTMinted`,
      },
    },
    {
      select: (data) => data.data.flatMap((x) => x.parsedJson),
    }
  );

  useEffect(() => {
    if (objectPending) {
      console.log("pending");
    } else if (objectData) {
      const allNftIds = objectData.map((nft) => nft.nft_id);
      setNftIds(allNftIds);
    }
  }, [objectData, objectPending]);

  const { data: musicData, isPending: musicPending } = useSuiClientQuery(
    "multiGetObjects",
    {
      ids: NftIds,
      options: {
        showOwner: true,
        showContent: true,
      },
    },
    {
      select: (data) => data.flatMap((x) => x.data.content.fields),
    }
  );

  useEffect(() => {
    if (musicPending) {
      console.log("Pending");
    } else if (musicData) {
      const musicNfts = musicData;
      const allArtist = [...new Set(musicNfts.map((artist) => artist.artist))];
      setArtists(allArtist);
      setUserNfts(musicNfts);
    }
  }, [musicData, musicPending]);

  const currentAccount = useCurrentAccount();
  const featuredMusic = userNfts.slice(0, 3);
  const otherMusic = userNfts;

  // Auto-rotate carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredMusic.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [userNfts, featuredMusic.length]);

  const filteredMusic = otherMusic.filter((track) => {
    const tabFilter =
      activeTab === "all" ||
      (activeTab === "songs" && !track.is_album) ||
      (activeTab === "albums" && track.is_album);

    const genreFilter =
      activeGenre === "All Genres" ||
      track.genre?.toLowerCase() === activeGenre.toLowerCase();

    const searchFilter =
      searchQuery === "" ||
      track.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      track.artist.toLowerCase().includes(searchQuery.toLowerCase());

    return tabFilter && genreFilter && searchFilter;
  });

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

  return (
    <main className={styles.mainContent}>
      {isSubscribed() && <SubscribeBanner subscriberData={subscriberData} />}

      <div className={styles.headerSection}>
        <h1 className={styles.pageTitle}>Discover Music</h1>
        <div className={styles.searchBar}>
          <input
            type="text"
            placeholder="Search for artists, songs, or albums..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <svg className={styles.searchIcon} viewBox="0 0 24 24">
            <path d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 0 0 1.48-5.34c-.47-2.78-2.79-5-5.59-5.34a6.505 6.505 0 0 0-7.27 7.27c.34 2.8 2.56 5.12 5.34 5.59a6.5 6.5 0 0 0 5.34-1.48l.27.28v.79l4.25 4.25c.41.41 1.08.41 1.49 0 .41-.41.41-1.08 0-1.49L15.5 14zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
          </svg>
        </div>
      </div>

      {/* Featured Music Carousel */}
      <section className={styles.featuredSection}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Featured Music</h2>
          <div className={styles.carouselIndicators}>
            {featuredMusic.map((_, index) => (
              <button
                key={index}
                className={`${styles.carouselIndicator} ${
                  index === currentSlide ? styles.active : ""
                }`}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div>
        </div>
        <div className={styles.carousel}>
          {featuredMusic.length > 0 && (
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
                    <svg viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                    Play Now
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Top Artists Section */}
      {/* <section className={styles.artistsSection}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Top Artists</h2>
          <button className={styles.viewAll}>View All</button>
        </div>
        <div className={styles.artistsGrid}>
          {artists.slice(0, 6).map((artist, index) => (
            <ArtistCard key={index} name={artist} />
          ))}
        </div>
      </section> */}

      {/* Music Content Section */}
      <section className={styles.musicSection}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Browse Music</h2>
          <div className={styles.tabsControls}>
            <button
              className={`${styles.tabButton} ${
                activeTab === "all" ? styles.active : ""
              }`}
              onClick={() => setActiveTab("all")}
            >
              All
            </button>
            <button
              className={`${styles.tabButton} ${
                activeTab === "songs" ? styles.active : ""
              }`}
              onClick={() => setActiveTab("songs")}
            >
              Songs
            </button>
            <button
              className={`${styles.tabButton} ${
                activeTab === "albums" ? styles.active : ""
              }`}
              onClick={() => setActiveTab("albums")}
            >
              Albums
            </button>
          </div>
        </div>

        <div className={styles.genreFilters}>
          {genres.map((genre, index) => (
            <button
              key={index}
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
                title={track.title}
                artist={track.artist}
                duration={56}
                votes={track.vote_count}
                quality={
                  currentAccount?.address === track?.current_owner ||
                  track?.collaborators.includes(currentAccount?.address) ||
                  (subscriberData && subscriberData.length > 0)
                    ? "Premium"
                    : "Standard"
                }
                imageSrc={track?.music_art}
                objectId={track.id.id}
              />
            ))
          ) : (
            <div className={styles.noResults}>
              <h3>No music found</h3>
              <p>
                {searchQuery
                  ? `No results for "${searchQuery}". Try a different search term.`
                  : "No music available in this category. Check back later!"}
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default Discover;
