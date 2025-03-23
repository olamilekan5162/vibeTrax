import style from "./homepage.module.css";
import { Link } from "react-router-dom";
import img1 from "/assets/zachary.jpg"
import img2 from "/assets/howe.jpg";
import img3 from "/assets/dreokt.jpg";
import img4 from "/assets/marcela.jpg";
import TrendingNow from "../../components/TrendingNow/TrendingNow";
import {
  SiBluesound as Soundicon,
} from "react-icons/si";
import MarketPlace from "../MarketPlace/MarketPlace";
import {CompactMusicPlayer} from "../../components/musicplayer/MusicPlayer"

const Homepage = () => {
  
  const trendingNow = [

    {
      id: 1,
      image: img1,
      artist: 'P.Jay',
      price: '20',
    },

    {
      id: 2,
      image: img2,
      artist: 'Charbae',
      price: '15',
    },

    {
      id: 3,
      image: img3,
      artist: 'R.power',
      price: '5',
    },

    {
      id: 4,
      image: img4,
      artist: 'Oracle',
      price: '6',
    }
  ]
  return (
    <div className={style.body}>
      <header>
       
          <nav>
            <div className={style.logoContainer}>
              <Link to="/">
                <Soundicon className={style.headerIcon} />
                <h1 className={style.logoText}>SuiTunes</h1>
              </Link>
            </div>
            <ul className={style.navLink}>
              <li>
                <a href="#">
                  <button>Get Started</button>
                </a>
              </li>
            </ul>
          </nav>
          <article>
            <div className={style.articleContainer}>
              <h1>
                Own the Sound. <br />
                Fuel the Future.
              </h1>
              <p>
                Discover exclusive music NFTs, support your favorite artists,
                and unlock premium experiences. Stream, collect, and
                trade—because music should be yours to own.
              </p>
              <div className={style.button}>
                <a href="#">
                  <button className={style.rightButton}>Get Started</button>
                </a>
                <a href="#">
                  <button className={style.leftButton}>Explore</button>
                </a>
              </div>
            </div>
          </article>
        
      </header>
      <main className={style.mainBody}>
        <section className={style.musicTrend}>
          <h2>Trending Now</h2>
          <article className={style.musicGallery}>
            {trendingNow.map(trend => (
              <TrendingNow 
              key = {trend.id}
              image={trend.image}
              artist={trend.artist}
              price={trend.price}
               />
            ))}
          </article>
        </section>

        {/* <section>
            <h2>How it Works</h2>
            <article className={style.stepsContainer}>
              <div className={style.stepsCard}>
                <h3>1. Upload Music</h3>
                <div className={style.iconCard}>
                  <Uploadicon className={style.stepsIcon} />
                </div>
              </div>
              <div>
                <h4>Mint as NFTs</h4>
              </div>
              <div>
                <h4>Sell to your Fave</h4>
              </div>
              <div>
                <h4>Get Paid Instantly</h4>
        
              </div>
            </article>
            <MarketPlace/>
          </section> */}
      </main>
      <CompactMusicPlayer />
    </div>
  );
};
export default Homepage;
