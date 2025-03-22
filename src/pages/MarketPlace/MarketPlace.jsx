import React from 'react'
import NFTCard from '../../components/NftCard/NftCard';
import styles from './MarketPlace.module.css'
import img1 from '../../assets/sui-bears.png'
import img2 from '../../assets/sui-bears1.png'
import { useNavigate } from 'react-router-dom';




const MarketPlace = () => {
  const navigate = useNavigate();
  const nfts = [
    {
      id: 1,
      image: img1,
      title: "Sui Vibes #1",
      artist: "DJ Crypto",
      price: 2.5,
      isOwned: false,
    },
    {
      id: 2,
      image: img2,
      title: "Lofi NFT",
      artist: "BeatMakerX",
      price: 1.2,
      isOwned: true,
    },
  ];

  const handleCardClick = ()=>{
    navigate(`/nft/${id}`)
  }
  return (
    <div className={styles.marketplace}>
      <h1 className={styles.title}>NFT MarketPlace</h1>
      <div className={styles.nftGrid}>
        {nfts.map((nft)=>(
          <NFTCard key={nft.id} {...nft} onClick={() => handleCardClick(nft.id)} onBuy={()=>alert(`Buying ${nft.title}`)}/>
        ))}
      </div>
        
    </div>
  )
}

export default MarketPlace