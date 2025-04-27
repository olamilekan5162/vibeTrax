import { useNavigate } from "react-router-dom";
import Button from "../button/Button";
import styles from "./Banner.module.css";
const Banner = () => {
  const navigate = useNavigate()
  return (
    <section className={styles.hero}>
      <div className={styles["hero-content"]}>
        <h1 className={styles["hero-title"]}>
          Empower Artists, Reward Fans, Transform Music
        </h1>
        <p className={styles["hero-subtitle"]}>
          TuneFlow connects artists directly with fans through blockchain,
          enabling fair royalty distribution and exclusive high-quality music
          experiences.
        </p>
        <div className={styles["hero-cta"]}>
          <Button text={"Discover Music"} btnClass={"primary"} onClick={() => navigate("/discover")}/>
          <Button text={"For Artists"} btnClass={"secondary"} onClick={() => navigate("/dashboard")} />
        </div>
      </div>
    </section>
  );
};

export default Banner;
