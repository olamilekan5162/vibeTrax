import React from "react";
import styles from "./NftDetail.module.css";
import img1 from "../../assets/sui-bears.png";
import img2 from "../../assets/sui-bears1.png";
import NftDetailCard from "../../components/NftDetailCard/NftDetailCard";
import {CompactMusicPlayer} from "../../components/musicplayer/MusicPlayer";

const NftDetail = () => {
  const nft = {
    id: 1,
    title: "Dream Vibes",
    artist: "DJ Sui",
    description: "An exclusive track with smooth vibes.",
    image: img1,
    price: "2.5 SUI",
    totalStreams: 1245,
    owner: "0x1234...5678",
    isOwned: false,
  };
  return (
    <div className={styles.container}>
      <NftDetailCard nft={nft} />
      <CompactMusicPlayer />
    </div>
  )
};

export default NftDetail;
