import React, { useState, useEffect } from "react";
import NFTCard from "../../components/NftCard/NftCard";
import BuyNFTModal from "../../components/BuyNftModal/BuyNftModal";
// import MusicNFTUpload from "../../components/MusicNFTUpload/MusicNFTUpload";
import Navbar from "../../components/navbar/Navbar";
import styles from "./Library.module.css";
import img1 from "../../assets/sui-bears.png";
import img2 from "../../assets/sui-bears1.png";
import preview1 from "../../assets/MichaelJackson-SmoothCriminalLow.mp3";
import full1 from "../../assets/MichaelJackson-SmoothCriminalHigh.mp3";
import preview2 from "../../assets/MichaelJackson-SmoothCriminalLow.mp3";
import full2 from "../../assets/MichaelJackson-SmoothCriminalHigh.mp3";
import { useNavigate } from "react-router-dom";
import MusicNFTUpload from "../../components/MusicNftUpload/MusicNftUpload";
import useFetchAllNfts from "../../hooks/useFetchAllNfts";

const Library = () => {
  const navigate = useNavigate();
  const [selectedNFT, setSelectedNFT] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isWalletConnected, setIsWalletConnected] = useState(true); // Set based on your wallet connection logic
  


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
    // ... other NFTs
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
    {
      id: 7,
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
      id: 8,
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
      id: 9,
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
      id: 10,
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
      id: 11,
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

  const handleCardClick = (nft) => {
    navigate(`/nft/${nft.id}`, { state: nft });
  };

  const handleBuyClick = (nft) => {
    setSelectedNFT(nft);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedNFT(null);
  };

  const closeUploadModal = () => {
    setIsUploadModalOpen(false);
  };

  const handleSubmitNFT = async (formData) => {
    try {
      // Your minting logic here
      console.log("Minting NFT with data:", formData);
      // After successful minting:
      setIsUploadModalOpen(false);
      // You might want to refresh your NFT list here or add the new NFT to the state
    } catch (error) {
      console.error("Error minting NFT:", error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.library}>
        <div className={styles.libraryHeader}>
          <h1 className={styles.title}>NFT Library</h1>
          <button
            className={styles.uploadButton}
            onClick={() => setIsUploadModalOpen(true)}
          >
            <span className={styles.uploadIcon}>+</span>
            <span>Upload Music NFT</span>
          </button>
        </div>

        <div className={styles.nftGrid}>
          {nfts.map((nft) => (
            <NFTCard
              key={nft.id}
              {...nft}
              onClick={() => handleCardClick(nft)}
              onBuy={() => handleBuyClick(nft)}
            />
          ))}
        </div>

        {isModalOpen && selectedNFT && (
          <BuyNFTModal nft={selectedNFT} onClose={closeModal} />
        )}

        {isUploadModalOpen && (
          <div className={styles.modalOverlay}>
            <div className={styles.uploadModalContent}>
              <button
                className={styles.closeModalButton}
                onClick={closeUploadModal}
              >
                ×
              </button>
              <MusicNFTUpload
                onSubmit={handleSubmitNFT}
                walletConnected={isWalletConnected}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Library;
