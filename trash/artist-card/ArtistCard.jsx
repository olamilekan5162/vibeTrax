import image1 from "/assets/daniel.jpg";
import image2 from "/assets/austin.jpg";
import image3 from "/assets/tengu.jpg";
import image4 from "/assets/felipe.jpg";
import image5 from "/assets/hanny.jpg";
import image6 from "/assets/jefferson.jpg";
import TopArtist from "../../components/topArtist/TopArtist";
import styles from "./ArtistCard.module.css";
import { useState } from "react";
import { GrNext as Nexticon, GrPrevious as Previcon } from "react-icons/gr";
import useFetchAllNfts from "../hooks/useFetchAllNfts";

const ArtistCard = () => {
  const { isPending, userNfts } = useFetchAllNfts();

  const topArtist = [...new Set(userNfts.map((artist) => artist.artist))];

  const [index, setIndex] = useState(0);
  const showingCards = topArtist.slice(index, index + 3);
  const nextCards = () => {
    setIndex((prev) => (prev + 3 < topArtist.length ? prev + 3 : 0));
  };

  const prevCards = () => {
    setIndex((prev) => (prev - 3 >= 0 ? prev - 3 : topArtist.length - 3));
  };

  return (
    <section className={styles.artistSection}>
      <div className={styles.artistHeader}>
        <h2>Top Artist</h2>
        <div className={styles.controls}>
          <button onClick={prevCards} className={styles.prevButton}>
            <Previcon />
          </button>
          <button onClick={nextCards} className={styles.nextButton}>
            <Nexticon />
          </button>
        </div>
      </div>

      <div className={styles.artistContainer}>
        <div className={styles.artistGrid}>
          {!isPending && topArtist.length > 0
            ? showingCards.map((artist, index) => (
                <TopArtist
                  key={index}
                  name={artist}
                  follower={artist.follower}
                />
              ))
            : "Loading..."}
        </div>
      </div>
    </section>
  );
};

export default ArtistCard;
