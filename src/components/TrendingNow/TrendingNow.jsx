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
  );
};
export default TrendingNow;
