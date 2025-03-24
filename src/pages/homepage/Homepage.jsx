import styles from "./homepage.module.css";
import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import img1 from "/assets/zachary.jpg";
import img2 from "/assets/danny.jpg";
import img3 from "/assets/dreokt.jpg";
import img4 from "/assets/marcela.jpg";
import img5 from "/assets/tamara.jpg";
import TrendingNow from "../../components/TrendingNow/TrendingNow";
import ArtistCard from "../../components/artistcard/ArtistCard";
import { SiBluesound as Soundicon } from "react-icons/si";
import { GrNext as Nexticon, GrPrevious as Previcon } from "react-icons/gr";
import MarketPlace from "../MarketPlace/MarketPlace";
import {CompactMusicPlayer} from "../../components/musicplayer/MusicPlayer"

const Homepage = () => {
  const trendingNow = [
    {
      id: 1,
      image: img1,
      artist: "P.Jay",
      price: "20",
    },

    {
      id: 2,
      image: img2,
      artist: "Charbae",
      price: "15",
    },

    {
      id: 3,
      image: img3,
      artist: "R.power",
      price: "5",
    },

    {
      id: 4,
      image: img4,
      artist: "Oracle",
      price: "6",
    },

    {
      id: 5,
      image: img5,
      artist: "tamara",
      price: "6",
    },
  ];

  const [index, setIndex] = useState(0);
  const visibleCards = trendingNow.slice(index, index + 3);

  const nextSlide = () => {
    setIndex((prev) => (prev + 3 < trendingNow.length ? prev + 3 : 0));
  };

  const prevSlide = () => {
    setIndex((prev) => (prev - 3 >= 0 ? prev - 3 : trendingNow.length - 3));
  };


  return (
    <div className={styles.body}>
      <header>
        <nav>
          <div className={styles.logoContainer}>
            <Link to="/">
              <Soundicon className={styles.headerIcon} />
              <h1 className={styles.logoText}>SuiTunes</h1>
            </Link>
          </div>
          <ul className={styles.navLink}>
            <li>
              <a href="#">
                <button>Get Started</button>
              </a>
            </li>
          </ul>
        </nav>
        <article>
          <div className={styles.articleContainer}>
            <h1>
              Own the Sound. <br />
              Fuel the Future.
            </h1>
            <p>
              Discover exclusive music NFTs, support your favorite artists, and
              unlock premium experiences. Stream, collect, and trade—because
              music should be yours to own.
            </p>
            <div className={styles.button}>
              <a href="#">
                <button className={styles.rightButton}>Get Started</button>
              </a>
              <a href="#">
                <button className={styles.leftButton}>Explore</button>
              </a>
            </div>
          </div>
        </article>
      </header>

      <main className={styles.mainBody}>
        <section className={styles.musicTrend}>
          <div className={styles.musicTrendTopBar}>
            <h2>Trending Now</h2>
            <div className={styles.controls}>
              <button onClick={prevSlide} className={styles.prevButton}>
                <Previcon />
              </button>
              <button onClick={nextSlide} className={styles.nextButton}>
                <Nexticon />
              </button>
            </div>
          </div>

          <div className={styles.carouselContainer}>
            <motion.div
              key={index}
              className={styles.musicGallery}
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: "0%", opacity: 1 }}
              exit={{ x: "-100%", opacity: 0 }}
              transition={{ duration: 0.1 }}
            >
              {visibleCards.map((trend) => (
                <TrendingNow
                  key={trend.id}
                  image={trend.image}
                  artist={trend.artist}
                  price={trend.price}
                />
              ))}
            </motion.div>
          </div>
        </section>

        <section className={styles.artistSection}>
          <div className={styles.artistHeader}>
            <h2>Top Artist</h2>
            <div className={styles.controls}>
              <button onClick={prevSlide} className={styles.prevButton}>
                <Previcon />
              </button>
              <button onClick={nextSlide} className={styles.nextButton}>
                <Nexticon />
              </button>
            </div>
          </div>

          <div className={styles.artistContainer}>
            <div className={styles.artistGrid}>

          <ArtistCard />

            </div>
          </div>
        </section>
      </main>
      <MarketPlace />
      {/* <CompactMusicPlayer /> */}
    </div>
  );
};
export default Homepage;
