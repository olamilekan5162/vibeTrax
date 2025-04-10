import styles from "./BuyNftModal.module.css";
import React, { useState } from "react";
import { useNetworkVariables } from "../../config/networkConfig";
import { useSignAndExecuteTransaction, useSuiClient } from "@mysten/dapp-kit";
import { Transaction } from "@mysten/sui/transactions";

const BuyNFTModal = ({ nft, onClose }) => {
  // if (!nft) return null;

  const { tunflowNFTRegistryId, tunflowPackageId } = useNetworkVariables(
    "tunflowNFTRegistryId",
    "tunflowPackageId"
  );

  const suiClient = useSuiClient();
  const {
    mutate: signAndExecute,
    isSuccess,
    isPending,
  } = useSignAndExecuteTransaction();

  const buyNft = (e) => {
    e.preventDefault();
    const amountMist = BigInt(Math.floor(nft.price * 1_000_000_000));

    const tx = new Transaction();

    const [coin] = tx.splitCoins(tx.gas, [tx.pure("u64", amountMist)]);

    tx.moveCall({
      arguments: [tx.object(tunflowNFTRegistryId), tx.object(nft.id.id), coin],
      target: `${tunflowPackageId}::music_nft::purchase_music_nft`,
    });

    signAndExecute(
      {
        transaction: tx,
      },
      {
        onSuccess: async ({ digest }) => {
          const { effects } = await suiClient.waitForTransaction({
            digest: digest,
            options: {
              showEffects: true,
            },
          });

          console.log(effects);
          console.log(effects?.created?.[0]?.reference?.objectId);
          console.log("Bought successfully");
        },
      }
    );
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button className={styles.closeBtn} onClick={onClose}>
          ✖
        </button>
        <img src={nft.genre} alt={nft.name} className={styles.nftImage} />
        <h2>{nft.title}</h2>
        <p>{nft.description}</p>
        <button className={styles.buyBtn} onClick={buyNft}>
          Buy for {nft.price} SUI
        </button>
      </div>
    </div>
  );
};

export default BuyNFTModal;
