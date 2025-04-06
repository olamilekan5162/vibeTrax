import React, { useEffect, useState } from 'react';
import NFTCard from '../../components/NftCard/NftCard';
import styles from './MyNfts.module.css';
import img1 from '../../assets/sui-bears.png';
import img2 from '../../assets/sui-bears1.png';
import preview1 from '../../assets/MichaelJackson-SmoothCriminalLow.mp3';
import full1 from '../../assets/MichaelJackson-SmoothCriminalHigh.mp3';
import preview2 from '../../assets/MichaelJackson-SmoothCriminalLow.mp3';
import full2 from '../../assets/MichaelJackson-SmoothCriminalHigh.mp3';
import Navbar from '../../components/navbar/Navbar';
import { useNavigate } from 'react-router-dom';
import { useCurrentAccount } from "@mysten/dapp-kit";
import useFetchAllNfts from '../../hooks/useFetchAllNfts';



const MyNFTs = () => {
  const navigate = useNavigate()
  const currentAccount = useCurrentAccount()

  const { userNfts, isPending } = useFetchAllNfts()

  useEffect(() =>{
    if(isPending){
      console.log('pending')
    }else{
        console.log(userNfts);
    }
  },[isPending, userNfts])

  // useEffect(() => {
  //   if (isPending){
  //     console.log("pending")
  //   }else if(userNfts.length > 0 && currentAccount?.address ){
  //     const myNft = userNfts.filter((nft) => nft.current_owner === currentAccount.address)
  //     console.log(myNft)
  //   }
  // }, [isPending, userNfts, currentAccount?.address])

  const ownedNFTs = [
    {
      id: 2,
      image: img2,
      title: "Lofi NFT",
      artist: "BeatMakerX",
      price: 1.2,
      isOwned: false,
      previewAudio: preview2,
      fullAudio: full2,
      description: "An exclusive track with smooth vibes.",
      owner: "0x1234...5678",
      totalStreams: 1245,
    },
    {
      id: 3,
      image: img2,
      title: "Lofi NFT",
      artist: "BeatMakerX",
      price: 1.2,
      isOwned: false,
      previewAudio: preview2,
      fullAudio: full2,
      description: "An exclusive track with smooth vibes.",
      owner: "0x1234...5678",
      totalStreams: 1245,
    },
    {
      id: 4,
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
      id: 5,
      image: img2,
      title: "Lofi NFT",
      artist: "BeatMakerX",
      price: 1.2,
      isOwned: false,
      previewAudio: preview2,
      fullAudio: full2,
      description: "An exclusive track with smooth vibes.",
      owner: "0x1234...5678",
      totalStreams: 1245,
    },
    {
      id: 6,
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
      id: 7,
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
      id: 8,
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
      id: 9,
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
  ];

  const handleCardClick = (nft) => {
    navigate(`/nft/${nft.id}`, { state: nft });
  };

  return (
    <div className={styles.myNFTs}>
      
      <h1 className={styles.title}>My NFTs</h1>
      {ownedNFTs.length > 0 ? (
        <div className={styles.nftContainer}>
          {ownedNFTs.map((nft) => (
            <NFTCard key={nft.id} {...nft} onClick={() => handleCardClick(nft)}/>
          ))}
        </div>
      ) : (
        <p className={styles.noNFTs}>You don't own any NFTs yet.</p>
      )}
    </div>
  );
};

export default MyNFTs;
