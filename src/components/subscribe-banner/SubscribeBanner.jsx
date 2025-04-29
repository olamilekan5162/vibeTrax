import React, { useState } from "react";
import Button from "../button/Button";
import styles from "./SubscribeBanner.module.css";
import SubscribeModal from "../../modals/subscribe-modal/SubscribeModal";

const SubscribeBanner = ({ subscriberData }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);

    document.body.style.overflow = "hidden";
  };

  const handleClose = () => {
    setIsOpen(false);

    document.body.style.overflow = "auto";
  };
  return (
    <>
      <div className={styles.infoBanner}>
        <p>Subscribe to enjoy premium quality music and exclusive content.</p>
        {subscriberData && subscriberData.length > 0 ? (
          <Button text="Subscribed" disabled={true} />
        ) : (
          <Button
            text="Subscribe"
            onClick={handleOpen}
            // className={styles.subscribeButton}
          />
        )}
      </div>
      <SubscribeModal isOpen={isOpen} onClose={handleClose} subscriberData={subscriberData}/>
    </>
  );
};

export default SubscribeBanner;
