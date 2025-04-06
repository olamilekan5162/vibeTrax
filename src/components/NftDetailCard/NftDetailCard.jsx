import React from 'react'
import styles from './NftDetailCard.module.css'

const NftDetailCard = ({nft, onBuy}) => {
  return (
    <div className={styles.card}>
      <img src={nft.genre} alt={nft.title} className={styles.image} />
      <div className={styles.details}>
        <h2>{nft.title}</h2>
        <p>By <span className={styles.artist}>{`${nft.artist.slice(0,6)}...${nft.artist.slice(-4)}`}</span></p>
        <p className={styles.description}>{nft.description}</p>

        <div className={styles.info}>
          <p><strong>Price:</strong> {nft.price}</p>
          <p><strong>Total Streams:</strong> {nft.totalStreams}</p>
          <p><strong>Owner:</strong> {nft.owner}</p>
        </div>

        {nft.isOwned ? (
          <button className={styles.playButton}>Play High-Quality</button>
        ) : (
          <button className={styles.buyButton} onClick={onBuy}>Buy NFT</button>
        )}
      </div>
    </div>
  )
}

export default NftDetailCard