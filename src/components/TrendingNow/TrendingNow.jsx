import style from "./trendingNow.module.css";
import { motion } from "framer-motion"


const TrendingNow = ({image, artist, price}) => {
  return (
    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
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
                
            </article>
           
          </section> */
  );
};
export default TrendingNow;
