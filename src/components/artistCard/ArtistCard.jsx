import image1 from "/assets/daniel.jpg";
import image2 from "/assets/austin.jpg";
import image3 from "/assets/tengu.jpg";
import image4 from "/assets/felipe.jpg";
import image5 from "/assets/hanny.jpg";
import image6 from "/assets/jefferson.jpg";
import TopArtist from "../../components/topArtist/TopArtist";
import styles from "./artistCard.module.css";
import { useState } from "react";
import { GrNext as Nexticon, GrPrevious as Previcon } from "react-icons/gr";

const ArtistCard = () => {
 const topArtist = [
   {
     id: 1,
     profilePic: image1,
     name: "Daniel Howe",
     follower: "200",
   },

   {
     id: 2,
     profilePic: image2,
     name: "Bee Wizzy",
     follower: "115",
   },

   {
     id: 3,
     profilePic: image3,
     name: "Tengu Power",
     follower: "552",
   },

   {
     id: 4,
     profilePic: image4,
     name: "Danny Dreokt",
     follower: "595",
   },

   {
     id: 5,
     profilePic: image5,
     name: "Tamara Austin",
     follower: "135",
   },

   {
     id: 6,
     profilePic: image6,
     name: "Lizzy Tube",
     follower: "919",
   },
 ];

 const [index, setIndex] = useState(0);
 const showingCards = topArtist.slice(index, index + 3);
 const nextCards = () => {
    setIndex((prev) => (
        prev + 3 < topArtist.length ? prev + 3 : 0
));
 };

 const prevCards = () => {
   setIndex((prev => prev - 3 >= 0 ? prev - 3 : topArtist.length-3));
 };


  return (
    <section className={styles.artistSection}>
      <div className={styles.artistHeader}>
        <h2>Top Artist</h2>
        <div className={styles.controls}>
          <button onClick={prevCards} className={styles.prevButton}>
            <Previcon />
          </button>
          <button onClick={nextCards} className={styles.nextButton}>
            <Nexticon />
          </button>
        </div>
      </div>

      <div className={styles.artistContainer}>
        <div className={styles.artistGrid}>
          {showingCards.map((artist) => (
            <TopArtist
              key={artist.id}
              profilePic={artist.profilePic}
              name={artist.name}
              follower={artist.follower}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ArtistCard;
