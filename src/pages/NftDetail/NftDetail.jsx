import React from "react";
import styles from "./NftDetail.module.css";
import img1 from "../../assets/sui-bears.png";
import img2 from "../../assets/sui-bears1.png";
import NftDetailCard from "../../components/NftDetailCard/NftDetailCard";
import {CompactMusicPlayer} from "../../components/musicplayer/MusicPlayer";
import { useLocation } from 'react-router-dom';

const NftDetail = () => {
  const location = useLocation()
  const nft = location.state
  // const nft = {
  //   id: 1,
  //   title: "Dream Vibes",
  //   artist: "DJ Sui",
  //   description: "An exclusive track with smooth vibes.",
  //   image: img1,
  //   price: "2.5 SUI",
  //   totalStreams: 1245,
  //   owner: "0x1234...5678",
  //   isOwned: false,
  // };
  return (
    <div className={styles.container}>
      <NftDetailCard nft={nft} />
      <CompactMusicPlayer nft={nft}/>
    </div>
  )
};

export default NftDetail;
