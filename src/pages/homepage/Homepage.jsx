import styles from "./homepage.module.css";
import { Link } from "react-router-dom";
import TrendingCard from "../../components/trendingCard/TrendingCard";
import ArtistCard from "../../components/artistCard/ArtistCard";
import { SiBluesound as Soundicon } from "react-icons/si";

import MarketPlace from "../MarketPlace/MarketPlace";
import {CompactMusicPlayer} from "../../components/musicplayer/MusicPlayer"

const Homepage = () => {

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
       <TrendingCard />

       <ArtistCard />
      </main>
      {/* <MarketPlace /> */}
      {/* <CompactMusicPlayer /> */}
    </div>
  );
};
export default Homepage;
