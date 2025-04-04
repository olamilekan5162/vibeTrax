import styles from "./LandingPage.module.css";
import { Link } from "react-router-dom";
import { SiBluesound as Soundicon } from "react-icons/si";
import { FaXTwitter as Xicon } from "react-icons/fa6";
import { IoLogoInstagram as Igicon } from "react-icons/io5";

const LandingPage = () => {
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
  
         <footer className={styles.footer}>
            <div class={styles.footerWrap}>
                <div>
                Enjoy your Sound
                <p>&copy; 2025 - SuiTunes Music Catalog</p>
                </div>

                <div className={styles.footerLhs} >
                <a href="#" target="_blank">
                    <button>Help</button>
                </a>

                <a href="#" target="_blank">
                    <button>Feedback</button>
                </a>

                <Xicon className={styles.footerIcon} />
                <Igicon className={styles.footerIcon} />
                </div>
            </div>
        </footer>
        </div>
       
    );
  };
  export default LandingPage;
  