import React from "react";
import styles from "./NftCard.module.css";

const NFTCard = ({ image, title, artist, price, isOwned, onBuy }) => {
  return (
    <div className={styles.nftCard}>
      <img src={image} alt={title} className={styles.nftImage} />
      <div className={styles.cardContent}>
        <h3 className={styles.nftTitle}>{title}</h3>
        <p className={styles.artist}>By {artist}</p>
        <div className={styles.footer}>
          <span className={styles.price}>{price} SUI</span>
          {isOwned ? (
            <span className={styles.ownedLabel}>Owned</span>
          ) : (
            <button className={styles.buyButton} onClick={onBuy}>
              Buy
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default NFTCard;
