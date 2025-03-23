import style from "./trendingNow.module.css";
import { Link } from "react-router-dom";

const TrendingNow = ({image, artist, price}) => {
  return (


          <div>
            <img src={image} alt="album cover" />
            <h4>{artist}</h4>
            <span>
              <a href="#">Buy</a>
              <p>{price} SUI</p>
            </span>
           </div>
          /*<div>
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
          </div> */



  );
};
export default TrendingNow;
