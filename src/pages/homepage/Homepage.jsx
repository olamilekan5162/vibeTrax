import style from "./homepage.module.css";
import { Link } from "react-router-dom";
import {
  SiBluesound as Soundicon,
  SiMintlify as Minticon,
} from "react-icons/si";
import {
  FaCloudUploadAlt as Uploadicon,
  FaMoneyBillWave as Moneyicon,
} from "react-icons/fa";
import { MdPayments as Paymenticon } from "react-icons/md";
import MarketPlace from "../MarketPlace/MarketPlace";
import MusicPlayer from "../../components/musicplayer/MusicPlayer"

const Homepage = () => {
  return (
    <div className={style.body}>
      <div className={style.container}>
        <header>
          <div className={style.headerContainer}>
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
          </div>
        </header>
        <main className={style.mainBody}>
          <section>
            <h3>Trending Now</h3>
            <article className={style.musicCard}>
              <div>
                <img src="/assets/zachary.jpg" alt="album cover" />
                <h4>P.Jay</h4>
                <span>
                  <a href="#">Buy</a>
                  <p>20 Sui</p>
                </span>
              </div>
              <div>
                <img src="/assets/howe.jpg" alt="album cover" />
                <h4>CharBae</h4>
                <span>
                  <a href="#">Buy</a>
                  <p>15 Sui</p>
                </span>
              </div>
              <div>
                <img src="/assets/dreokt.jpg" alt="album cover" />
                <h4>R.Power</h4>
                <span>
                  <a href="#">Buy</a>
                  <p>5 Sui</p>
                </span>
              </div>
              <div>
                <img src="/assets/marcela.jpg" alt="album cover" />
                <h4>Oracle</h4>
                <span>
                  <a href="#">Buy</a>
                  <p>6 Sui</p>
                </span>
              </div>
            </article>
          </section>
          {/* <section>
            <h3>How it Works</h3>
            <article className={style.stepsContainer}>
              <div className={style.stepsCard}>
                <h2>1. Upload Music</h2>
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
        <MarketPlace />
      </div>
    </div>
  );
};
export default Homepage;
