import { useNavigate } from "react-router-dom";
import Button from "../button/Button";
import styles from "./Banner.module.css";
import { useCurrentAccount } from "@mysten/dapp-kit";

const Banner = () => {
  const navigate = useNavigate();
  const currentAccount = useCurrentAccount();

  return (
    <section className={styles.hero}>
      <div className={styles.heroContent}>
        <h1 className={styles.heroTitle}>
          Empower Artists, Reward Fans, Transform Music
        </h1>
        <p className={styles.heroSubtitle}>
          VibeTrax connects artists directly with fans through blockchain,
          enabling fair royalty distribution and exclusive high-quality music
          experiences.
        </p>
        <div className={styles.heroCta}>
          <Button
            text={"Discover Music"}
            btnClass={"primary"}
            onClick={() => navigate("/discover")}
          />
          {currentAccount?.address && (
            <Button
              text={"For Artists"}
              btnClass={"secondary"}
              onClick={() => navigate(`/profile/${currentAccount.address}`)}
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default Banner;
