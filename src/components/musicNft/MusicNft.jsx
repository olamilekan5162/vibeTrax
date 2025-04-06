import React from "react";
import styles from "./musicNft.module.css";
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


import NFTCard from "../../components/NftCard/NftCard";
import { useNavigate } from "react-router-dom";

const MusicNft = () => {
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
      description: "An exclusive track with smooth vibes.",
      owner: "0x1234...5678",
      totalStreams: 1245,
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
      description: "An exclusive track with smooth vibes.",
      owner: "0x1234...5678",
      totalStreams: 1245,
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
      description: "An exclusive track with smooth vibes.",
      owner: "0x1234...5678",
      totalStreams: 1245,
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
      description: "An exclusive track with smooth vibes.",
      owner: "0x1234...5678",
      totalStreams: 1245,
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
      description: "An exclusive track with smooth vibes.",
      owner: "0x1234...5678",
      totalStreams: 1245,
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
      description: "An exclusive track with smooth vibes.",
      owner: "0x1234...5678",
      totalStreams: 1245,
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
      description: "An exclusive track with smooth vibes.",
      owner: "0x1234...5678",
      totalStreams: 1245,
    },
  ];

  const navigate = useNavigate()
  
  const [index, setIndex] = useState(0);
  const visibleCards = nfts.slice(index, index + 3);
    const nextSlide = () => {
        setIndex((prev) => (prev + 3 < nfts.length ? prev + 3 : 0));
    };



    const prevSlide = () => {
        setIndex((prev) => (prev - 3 >= 0 ? prev - 3 : nfts.length - 3));
    };

    const handleCardClick = (nft) => {
      navigate(`/nft/${nft.id}`, { state: nft });
    };


  return (
    
        
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
                    onClick={() => handleCardClick(nft)}
                    onBuy={() => handleBuyClick(nft)}
                  />
                </motion.div>
              );
            })}
          </motion.div>

          <div className={styles.controls}>
            <button onClick={prevSlide} className={styles.prevButton}>
              <Previcon />
            </button>
            <button onClick={nextSlide} className={styles.nextButton}>
              <Nexticon />
            </button>
          </div>
        </div>
  );
};

export default MusicNft;
