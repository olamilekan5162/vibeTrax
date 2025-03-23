import React from "react";
import styles from "./BuyNftModal.module.css";

const BuyNFTModal = ({ nft, onClose }) => {
  if (!nft) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button className={styles.closeBtn} onClick={onClose}>✖</button>
        <img src={nft.image} alt={nft.name} className={styles.nftImage} />
        <h2>{nft.name}</h2>
        <p>{nft.description}</p>
        <button className={styles.buyBtn}>Buy for {nft.price} SUI</button>
      </div>
    </div>
  );
};

export default BuyNFTModal;
