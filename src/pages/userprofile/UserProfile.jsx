import React, { useState } from "react";
import styles from "./userProfile.module.css";
import profilePic from "../../assets/sui-bears.png";
import MyNFTs from "../MyNfts/MyNfts";
import Navbar from "../../components/navbar/Navbar";


const UserProfile = () => {
  const [user, setUser] = useState({
    name: "Crypto Enthusiast",
    wallet: "0x1234...abcd",
    bio: "NFT Collector & Web3 Music Lover",
  });

  const handleEditProfile = () => {
    alert("Edit profile coming soon!");
  };

  const copyWalletAddress = () => {
    navigator.clipboard.writeText(user.wallet);
    alert("Wallet address copied!");
  };

  return (
    <div className={styles.profileContainer}>
      <div className={styles.navbar}>
          <Navbar />
        </div>
      <div className={styles.userInfo}>
        <img src={profilePic} alt="Profile" className={styles.profilePic} />
        <h2>{user.name}</h2>
        <p className={styles.wallet}>
          {user.wallet}
          <button onClick={copyWalletAddress} className={styles.copyButton}>
            📋
          </button>
        </p>
        <p className={styles.bio}>{user.bio}</p>

        <button className={styles.editButton} onClick={handleEditProfile}>
          Edit Profile
        </button>
      </div>

      <div className={styles.nftSection}>
        <MyNFTs/>
      </div>
    </div>
  );
};

export default UserProfile;
