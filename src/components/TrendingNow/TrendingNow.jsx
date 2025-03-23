import style from "./trendingNow.module.css";
import { motion } from "framer-motion"
import { Link } from "react-router-dom";

const TrendingNow = ({image, artist, price}) => {
  return (
    <motion.div whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.95 }}>
      <img src={image} alt="album cover" />

      <h4>{artist}</h4>
      <a href="#">Buy</a>
      <p>{price} SUI</p>
    </motion.div>

    /* <section>
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
           
          </section> */
  );
};
export default TrendingNow;
