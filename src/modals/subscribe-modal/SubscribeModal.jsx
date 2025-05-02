import { useNetworkVariables } from "../../config/networkConfig";
import { Transaction } from "@mysten/sui/transactions";
import {
  useSignAndExecuteTransaction,
  useSuiClient,
  useCurrentAccount,
} from "@mysten/dapp-kit";
import React, { useState } from "react";
import styles from "./SubscribeModal.module.css";
import Button from "../../components/button/Button";
import {
  FiX,
  FiMusic,
  FiLock,
  FiHeadphones,
  FiStar,
  FiCheck,
  FiAlertTriangle,
  FiInfo,
} from "react-icons/fi";

const SubscribeModal = ({ isOpen, onClose, subscriberData }) => {
  const [subscriptionStatus, setSubscriptionStatus] = useState("idle");
  const currentAccount = useCurrentAccount();
  const subscriptionPrice = 1; // 1 SUI

  const { tunflowPackageId, tunflowTreasuryId, tunflowSubscriptionId } =
    useNetworkVariables(
      "tunflowPackageId",
      "tunflowTreasuryId",
      "tunflowSubscriptionId"
    );

  const suiClient = useSuiClient();
  const { mutate: signAndExecute } = useSignAndExecuteTransaction();

  const handleSubscribe = (e) => {
    e.preventDefault();
    setSubscriptionStatus("subscribing");
    const amountMist = BigInt(Math.floor(subscriptionPrice * 1_000_000_000));

    const tx = new Transaction();
    const [coin] = tx.splitCoins(tx.gas, [tx.pure("u64", amountMist)]);

    tx.moveCall({
      arguments: [
        tx.object(tunflowSubscriptionId),
        tx.object(tunflowTreasuryId),
        tx.pure.address(currentAccount?.address),
        coin,
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
          if (effects?.status?.status === "success") {
            setSubscriptionStatus("subscribed");
            console.log("Subscription successful!");
            window.location.reload();
          } else {
            console.error("Subscription failed:", effects);
            setSubscriptionStatus("failed");
          }
        },
        onError: (error) => {
          console.error("Subscription failed:", error);
          setSubscriptionStatus("failed");
        },
      }
    );
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.content} onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className={styles.closeButton}>
          <FiX size={24} />
        </button>

        <div className={styles.modalHeader}>
          <h2>Unlock the Sounds</h2>
          <p className={styles.subtitle}>
            Subscribe to enjoy premium quality music and exclusive content.
          </p>

          <div className={styles.priceContainer}>
            <span className={styles.priceLabel}>Subscription Price:</span>
            <span className={styles.priceValue}>{subscriptionPrice} SUI</span>
          </div>
        </div>

        <div className={styles.benefitsList}>
          <div className={styles.benefitItem}>
            <div className={styles.benefitIcon}>
              <FiMusic size={20} />
            </div>
            <div className={styles.benefitText}>
              <h3>Early Access</h3>
              <p>Get new music before anyone else</p>
            </div>
          </div>

          <div className={styles.benefitItem}>
            <div className={styles.benefitIcon}>
              <FiLock size={20} />
            </div>
            <div className={styles.benefitText}>
              <h3>Exclusive Content</h3>
              <p>Access special releases and behind-the-scenes</p>
            </div>
          </div>

          <div className={styles.benefitItem}>
            <div className={styles.benefitIcon}>
              <FiHeadphones size={20} />
            </div>
            <div className={styles.benefitText}>
              <h3>High-Quality Audio</h3>
              <p>Experience music in crystal clear sound</p>
            </div>
          </div>

          <div className={styles.benefitItem}>
            <div className={styles.benefitIcon}>
              <FiStar size={20} />
            </div>
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
              text={
                subscriptionStatus === "subscribing"
                  ? "Processing..."
                  : subscriptionStatus === "subscribed"
                  ? "Subscribed"
                  : `Subscribe for ${subscriptionPrice} SUI`
              }
              icon={
                subscriptionStatus === "subscribed" ? <FiCheck /> : undefined
              }
              disabled={subscriptionStatus === "subscribing"}
              onClick={handleSubscribe}
              className={styles.primaryButton}
            />
            <Button
              text="Learn More"
              icon={<FiInfo />}
              className={styles.secondaryButton}
            />
          </div>

          {subscriptionStatus === "subscribed" && (
            <div className={styles.successAlert}>
              <FiCheck /> Subscription successful!
            </div>
          )}
          {subscriptionStatus === "failed" && (
            <div className={styles.failedAlert}>
              <FiAlertTriangle /> Subscription failed. Please try again.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SubscribeModal;
