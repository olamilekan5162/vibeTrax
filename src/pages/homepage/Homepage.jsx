import React from "react";
import styles from "./HomePage.module.css";
import preview1 from "../../assets/MichaelJackson-SmoothCriminalLow.mp3";
import full1 from "../../assets/MichaelJackson-SmoothCriminalHigh.mp3";
import preview2 from "../../assets/MichaelJackson-SmoothCriminalLow.mp3";
import full2 from "../../assets/MichaelJackson-SmoothCriminalHigh.mp3";
import img1 from "../../assets/img1.jpeg";
import img2 from "../../assets/sui-bears.png";
import img3 from "../../assets/img3.png";
import { useState } from "react";
import { motion } from "framer-motion";
import { GrNext as Nexticon, GrPrevious as Previcon } from "react-icons/gr";
import TopArtists from "../../components/TopArtist/TopArtist";
import MyNFTs from "../MyNfts/MyNfts";

import Library from "../Library/Library";
import TrendingCard from "../../components/trendingCard/TrendingCard";
import NFTCard from "../../components/NftCard/NftCard";

const HomePage = () => {
  const nfts = [
    {
      id: 1,
      image: img1,
      title: "Sui Vibes #1",
      artist: "DJ Crypto",
      price: 2.5,
      isOwned: false,
      previewAudio: preview1,
      fullAudio: full1,
    },
    {
      id: 2,
      image: img2,
      title: "Lofi NFT",
      artist: "BeatMakerX",
      price: 1.2,
      isOwned: true,
      previewAudio: preview2,
      fullAudio: full2,
    },
    {
      id: 3,
      image: img3,
      title: "Sui Vibes #1",
      artist: "DJ Crypto",
      price: 2.5,
      isOwned: false,
      previewAudio: preview1,
      fullAudio: full1,
    },
    {
      id: 3,
      image: img1,
      title: "Sui Vibes #1",
      artist: "DJ Crypto",
      price: 2.5,
      isOwned: false,
      previewAudio: preview1,
      fullAudio: full1,
    },
    {
      id: 4,
      image: img1,
      title: "Sui Vibes #1",
      artist: "DJ Crypto",
      price: 2.5,
      isOwned: false,
      previewAudio: preview1,
      fullAudio: full1,
    },
    {
      id: 5,
      image: img1,
      title: "Sui Vibes #1",
      artist: "DJ Crypto",
      price: 2.5,
      isOwned: false,
      previewAudio: preview1,
      fullAudio: full1,
    },
    {
      id: 6,
      image: img1,
      title: "Sui Vibes #1",
      artist: "DJ Crypto",
      price: 2.5,
      isOwned: false,
      previewAudio: preview1,
      fullAudio: full1,
    },
  ];
  const [index, setIndex] = useState(0);
  const visibleCards = nfts.slice(index, index + 3);
    const nextSlide = () => {
        setIndex((prev) => (prev + 3 < nfts.length ? prev + 3 : 0));
    };



    const prevSlide = () => {
        setIndex((prev) => (prev - 3 >= 0 ? prev - 3 : nfts.length - 3));
    };


  return (
    <div className={styles.homeContainer}>
      <main className={styles.mainContent}>
        <section className={styles.header}>
          <h1>Discover Exclusive Music NFTs 🎵</h1>
          <p>Collect, trade, and earn with your favorite artists.</p>
          <div className={styles.controls}>
            <button onClick={prevSlide} className={styles.prevButton}>
              <Previcon />
            </button>
            <button onClick={nextSlide} className={styles.nextButton}>
              <Nexticon />
            </button>
          </div>
        </section>
        <div className={styles.gridContainer}>
          <motion.div
            className={styles.nftGrid}
            key={index}
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: "0%", opacity: 1 }}
            exit={{ x: "-100%", opacity: 0 }}
            transition={{ duration: 0.1 }}
          >
            {visibleCards.map((nft) => {

              return (
                <motion.div
                  key={nft.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <NFTCard
                    {...nft}
                    onClick={() => handleCardClick(nft.id)}
                    onBuy={() => handleBuyClick(nft)}
                  />
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        <TopArtists />

        <section className={styles.nftCollection}>
          <MyNFTs />
        </section>

        {/* <section className={styles.librarySection}>
          <h2>Explore the Library 📚</h2>
          <Library />
        </section> */}
      </main>
    </div>
  );
};

export default HomePage;
