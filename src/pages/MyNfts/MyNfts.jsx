import React from 'react';
import NFTCard from '../../components/NftCard/NftCard';
import styles from './MyNfts.module.css';
import img1 from '../../assets/sui-bears.png';
import img2 from '../../assets/sui-bears1.png';
import preview1 from '../../assets/MichaelJackson-SmoothCriminalLow.mp3';
import full1 from '../../assets/MichaelJackson-SmoothCriminalHigh.mp3';
import preview2 from '../../assets/MichaelJackson-SmoothCriminalLow.mp3';
import full2 from '../../assets/MichaelJackson-SmoothCriminalHigh.mp3';
import Navbar from '../../components/navbar/Navbar';

const MyNFTs = () => {
  const ownedNFTs = [
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

  return (
    <div className={styles.myNFTs}>
      
      <h1 className={styles.title}>My NFTs</h1>
      {ownedNFTs.length > 0 ? (
        <div className={styles.nftContainer}>
          {ownedNFTs.map((nft) => (
            <NFTCard key={nft.id} {...nft} />
          ))}
        </div>
      ) : (
        <p className={styles.noNFTs}>You don't own any NFTs yet.</p>
      )}
    </div>
  );
};

export default MyNFTs;
