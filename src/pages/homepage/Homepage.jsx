import style from "./homepage.module.css";
import {
  SiBluesound as Soundicon,
  SiMintlify as Minticon,
} from "react-icons/si";
import {
  FaCloudUploadAlt as Uploadicon,
  FaMoneyBillWave as Moneyicon,
} from "react-icons/fa";
import { MdPayments as Paymenticon } from "react-icons/md";
import { Link } from "react-router-dom";

const Homepage = () => {
  return (
    <body>
      <header>
        <div className={style.headerContainer}>
          <nav>
            <Link to="/">
              <Soundicon className={style.headerIcon} />

             
                <p className={style.logoText}>WaveKey</p>
            </Link>

            <ul>
              <li>
                <a href="#">Sign In</a>
              </li>
              <li>
                <a href="#">Create Account</a>
              </li>
            </ul>
          </nav>

          <article>
            <div className={style.articleContainer}>
              <h1>Own the Sound.</h1>
              <h1>Fuel the Future.</h1>

              <p>
                Discover exclusive music NFTs, support your favorite artists,
                and unlock premium experiences. Stream, collect, and
                trade—because music should be yours to own.
              </p>
              <div className={style.button}>
                <a href="#" className={style.rightButton}>
                  Get Started
                </a>
                <a href="#">Explore</a>
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
              <img src="/asset/zachary.jpg" alt="album cover" />
              <h4>P.Jay</h4>
              <span>
                <a href="#">Buy</a>
                <p>20 Sui</p>
              </span>
            </div>
            <div>
              <img src="/asset/howe.jpg" alt="album cover" />
              <h4>CharBae</h4>
              <span>
                <a href="#">Buy</a>
                <p>15 Sui</p>
              </span>
            </div>
            <div>
              <img src="/asset/dreokt.jpg" alt="album cover" />
              <h4>R.Power</h4>
              <span>
                <a href="#">Buy</a>
                <p>5 Sui</p>
              </span>
            </div>
            <div>
              <img src="/asset/marcela.jpg" alt="album cover" />
              <h4>Oracle</h4>
              <span>
                <a href="#">Buy</a>
                <p>6 Sui</p>
              </span>
            </div>
          </article>
        </section>

        <section>
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
        </section>
      </main>
    </body>
  );
};
export default Homepage;
