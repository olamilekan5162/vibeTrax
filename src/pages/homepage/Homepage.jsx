import React, { useState, useEffect } from "react";
import styles from "./homepage.module.css";
import ArtistCard from "../../components/artist-card/ArtistCard";
import MusicNft from "../../components/musicNft/MusicNft";
import MyNFTs from "../MyNfts/MyNfts";


const HomePage = () => {
  const backgroundImages = [
    "/assets/hanny.jpg",
    "/assets/dreokt.jpg",
    "/assets/austin.jpg",
    "/assets/marcela.jpg",
    "/assets/zachary.jpg",
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);

      setTimeout(() => {
        setCurrentImageIndex((prevIndex) =>
          prevIndex === backgroundImages.length - 1 ? 0 : prevIndex + 1
        );

        setTimeout(() => {
          setIsTransitioning(false);
        }, 500);
      }, 1000);
    }, 5000);

    return () => clearInterval(interval);
  }, [backgroundImages.length]);


  return (
    <div className={styles.homeContainer}>
      <main className={styles.mainContent}>
        <section
          className={`${styles.header} ${isTransitioning ? styles.fading : ""}`}
          style={{
            backgroundImage: `url("${backgroundImages[currentImageIndex]}")`,
          }}
        >
          <div className={styles.headerOverlay}>
            <h1>Discover Exclusive Music NFTs 🎵</h1>
            <p>Collect, trade, and earn with your favorite artists.</p>
          </div>
        </section>


        <section className={styles.nftCollection}>
          <MusicNft />

          <MyNFTs />

          <ArtistCard />
        </section>
      </main>
    </div>
  );
};

export default HomePage;
