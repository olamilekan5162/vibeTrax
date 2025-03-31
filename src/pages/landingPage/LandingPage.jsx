import React from "react";
import { Link } from "react-router-dom";
import styles from "./LandingPage.module.css";
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
              <Link to="/login">
                <button className={styles.loginButton}>Login / Connect Wallet</button>
              </Link>
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
              <Link to="/login">
                <button className={styles.rightButton}>Get Started</button>
              </Link>
              <Link to="/homepage">
                <button className={styles.leftButton}>Explore</button>
              </Link>
            </div>
          </div>
        </article>
      </header>

      <footer className={styles.footer}>
        <div className={styles.footerWrap}>
          <div>
            Enjoy your Sound
            <p>&copy; 2025 - SuiTunes Music Catalog</p>
          </div>
          <div className={styles.footerLhs}>
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
