import style from './homepage.module.css';
import { SiBluesound as Soundicon } from "react-icons/si";

const Homepage = () => {
  return (
    <body>
      <header>
        <div className={style.headerContainer} >
          <nav>
            <ul>
              <li>
                <Soundicon className={style.headerIcon} />
              </li>
              <li className={style.logoText}>WaveKey</li>
            </ul>

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
            <div className={style.articleContainer} >
              <h1>Own the Sound.</h1>
              <h1>Fuel the Future.</h1>

              <p>
                Discover exclusive music NFTs, support your favorite artists,
                and unlock premium experiences. Stream, collect, and
                trade—because music should be yours to own.
              </p>
              <div className={style.buton}>
                <a href="#">
                  <button>Get Started</button>
                </a>
                <a href="#">
                  <button>Explore</button>
                </a>
              </div>
            </div>
          </article>
        </div>
      </header>
    </body>
  );
}
export default Homepage;