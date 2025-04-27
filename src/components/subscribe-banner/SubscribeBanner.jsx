import React, { useState } from "react";
import Button from "../button/Button";
import styles from "./SubscribeBanner.module.css";
import { useNetworkVariables } from "../../config/networkConfig";
import { Transaction } from "@mysten/sui/transactions";
import { useSignAndExecuteTransaction, useSuiClient, useCurrentAccount } from "@mysten/dapp-kit";
import { useOutletContext } from "react-router-dom";


const SubscribeBanner = () => {
  const [isOpen, setIsOpen] = useState(false);
  const currentAccount = useCurrentAccount();
  const subscriberData = useOutletContext()

  const {tunflowPackageId, tunflowTreasuryId, tunflowSubscriptionId} = useNetworkVariables(
    "tunflowPackageId",
    "tunflowTreasuryId",
    "tunflowSubscriptionId",
  );

  const suiClient = useSuiClient();
  const {
    mutate: signAndExecute,
    // isSuccess,
    // isPending,
  } = useSignAndExecuteTransaction();

  const handleOpen = () => {
    setIsOpen(true);
    
    document.body.style.overflow = "hidden";
  };
  
  const handleClose = () => {
    setIsOpen(false);
    
    document.body.style.overflow = "auto";
  };

   const handleSubscribe = (e) =>{
      e.preventDefault();
      const amountMist = BigInt(Math.floor(50 * 1_000_000_000));
  
      const tx = new Transaction();
  
      const [coin] = tx.splitCoins(tx.gas, [tx.pure("u64", amountMist)]);
         
      tx.moveCall({
        arguments: [
        tx.object(tunflowSubscriptionId),
        tx.object(tunflowTreasuryId),
        tx.pure.address(currentAccount?.address),
        coin
      ],
        target: `${tunflowPackageId}::governance::subscribe`,
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
            console.log("Subscribed successfully");
            setIsOpen(false);
          },
        }
      );

    }

  return (
    <>
      <div className={styles.infoBanner}>
        <p>Subscribe to enjoy premium quality music and exclusive content.</p>
        {subscriberData && subscriberData.length > 0
        ? <Button
        text="Subscribed"
        disabled={true}
        />

        : <Button 
            text="Subscribe" 
            onClick={handleOpen} 
            // className={styles.subscribeButton} 
          />
        }
      </div>

      {isOpen && (
        <div className={styles.overlay} onClick={handleClose}>
          <div 
            className={styles.content} 
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={handleClose} 
              className={styles.closeButton} 
              
            >
              ×
            </button>
            
            <div className={styles.modalHeader}>
              <h2>Unlock the Sounds</h2>
              <p className={styles.subtitle}>
                Subscribe to enjoy premium quality music and exclusive content.
              </p>
            </div>
            
            <div className={styles.benefitsList}>
              <div className={styles.benefitItem}>
                <div className={styles.benefitIcon}>🎵</div>
                <div className={styles.benefitText}>
                  <h3>Early Access</h3>
                  <p>Get new music before anyone else</p>
                </div>
              </div>
              
              <div className={styles.benefitItem}>
                <div className={styles.benefitIcon}>🔒</div>
                <div className={styles.benefitText}>
                  <h3>Exclusive Content</h3>
                  <p>Access special releases and behind-the-scenes</p>
                </div>
              </div>
              
              <div className={styles.benefitItem}>
                <div className={styles.benefitIcon}>🎧</div>
                <div className={styles.benefitText}>
                  <h3>High-Quality Audio</h3>
                  <p>Experience music in crystal clear sound</p>
                </div>
              </div>
              
              <div className={styles.benefitItem}>
                <div className={styles.benefitIcon}>✨</div>
                <div className={styles.benefitText}>
                  <h3>Ad-Free Experience</h3>
                  <p>No interruptions, just pure music enjoyment</p>
                </div>
              </div>
            </div>
            
            <div className={styles.ctaSection}>
              <p className={styles.ctaText}>
                Subscribe now and elevate your music experience!
              </p>
              <div className={styles.buttonGroup}>
                <Button 
                  text="Subscribe Now" 
                  onClick={handleSubscribe} 
                  className={styles.primaryButton} 
                />
                <Button 
                  text="Learn More" 
                //   onClick={handleClose} 
                  className={styles.secondaryButton} 
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SubscribeBanner;