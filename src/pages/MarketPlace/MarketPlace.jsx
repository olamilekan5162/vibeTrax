import React, { useState } from 'react'; 
import NFTCard from '../../components/NftCard/NftCard';
import BuyNFTModal from '../../components/BuyNftModal/BuyNftModal';
import Navbar from "../../components/navbar/Navbar";
import styles from './MarketPlace.module.css'
import img1 from '../../assets/sui-bears.png';
import img2 from '../../assets/sui-bears1.png';
import preview1 from '../../assets/MichaelJackson-SmoothCriminalLow.mp3';
import full1 from '../../assets/MichaelJackson-SmoothCriminalHigh.mp3';
import preview2 from '../../assets/MichaelJackson-SmoothCriminalLow.mp3';
import full2 from '../../assets/MichaelJackson-SmoothCriminalHigh.mp3';
import { useNavigate } from 'react-router-dom';

const MarketPlace = () => {
  const navigate = useNavigate();
  const [selectedNFT, setSelectedNFT] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
  ];

  const handleCardClick = (id) => {
    navigate(`/nft/${id}`);
  };

  const handleBuyClick = (nft) => {
    setSelectedNFT(nft);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedNFT(null);
  };

  return (
      <div className={styles.container} >
            <div className={styles.marketplace}>
        <h1 className={styles.title}>NFT MarketPlace</h1>
        <div className={styles.nftGrid}>
          {nfts.map((nft) => (
            <NFTCard
              key={nft.id}
              {...nft}
              onClick={() => handleCardClick(nft.id)}
              onBuy={() => handleBuyClick(nft)}
            />
          ))}
        </div>
        {isModalOpen && selectedNFT && (
          <BuyNFTModal nft={selectedNFT} onClose={closeModal} />
        )}
            </div>
      </div>
  );
};

export default MarketPlace;
