import { useOutletContext } from "react-router-dom";
import ArtistCard from "../../components/cards/artist-card/ArtistCard";
import MusicCard from "../../components/cards/music-card/MusicCard";
import SubscribeBanner from "../../components/subscribe-banner/SubscribeBanner";
import { useNetworkVariable } from "../../config/networkConfig";
import {
  newReleases,
} from "../../samples/musicSample";
import styles from "./Discover.module.css";
import { useCurrentAccount, useSuiClientQuery } from "@mysten/dapp-kit";
import { useEffect, useState } from "react";


const Discover = () => {
  const [userNfts, setUserNfts] = useState([]);
  const [NftIds, setNftIds] = useState([]);
  const [artists, setArtists] = useState([])
  const subscriberData = useOutletContext()
  
  const tunflowPackageId = useNetworkVariable(
    "tunflowPackageId"
  );

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
    if (objectPending){
      console.log("pending")
    }else if (objectData) {
      const allNftIds = objectData.map((nft) => nft.nft_id);
      console.log(allNftIds)
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
    if(musicPending){
      console.log("Pending")
    }else if (musicData) {
      const musicNfts = musicData;
      const allArtist = [...new Set(musicNfts.map((artist) => artist.artist))]
      setArtists(allArtist)
      console.log(musicNfts);
      setUserNfts(musicNfts);
    }
  }, [musicData, musicPending]);

  const currentAccount = useCurrentAccount()

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
      <SubscribeBanner subscriberData={subscriberData}/>
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
        {userNfts.map((track) => (
          <MusicCard
            key={track.id.id}
            title={track.title}
            artist={track.artist}
            duration={56}
            plays={"4.1k"}
            quality={
              currentAccount?.address === track.current_owner 
              || track.collaborators.includes(currentAccount?.address) 
              || subscriberData.length > 0
              ? "Premium"
              : "Standard" 
            }
            imageSrc={track.genre}
            objectId={track.id.id}
          />
        ))}
      </div>

      <h2 className={styles.sectionTitle}>Featured Artists</h2>
      <div className={styles.artistsRow}>
        {artists.map((artist, index) => (
          <ArtistCard
            key={index}
            name={artist}
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
