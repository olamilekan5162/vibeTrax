// Login.jsx
import React, { useState, useEffect } from 'react';
import styles from "./Login.module.css";

const Login = () => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [isZkLoading, setIsZkLoading] = useState(false);
  
  const handleWalletConnect = () => {
    setIsConnecting(true);
    // Simulate connection process
    setTimeout(() => setIsConnecting(false), 2000);
  };

  const handleZkLogin = () => {
    setIsZkLoading(true);
    // Simulate login process
    setTimeout(() => setIsZkLoading(false), 2000);
  };

  useEffect(() => {
    // Create background node animations
    const createNodes = () => {
      const container = document.querySelector(`.${styles.loginContainer}`);
      if (!container) return;
      
      // Clear existing nodes first
      const existingNodes = document.querySelectorAll(`.${styles.node}`);
      existingNodes.forEach(node => node.remove());
      
      // Create new nodes
      for (let i = 0; i < 12; i++) {
        const node = document.createElement('div');
        node.className = styles.node;
        
        // Random positioning
        node.style.left = `${Math.random() * 100}%`;
        node.style.top = `${Math.random() * 100}%`;
        node.style.animationDuration = `${Math.random() * 15 + 20}s`;
        node.style.animationDelay = `${Math.random() * 5}s`;
        
        container.appendChild(node);
      }
    };
    
    createNodes();
    
    // Recreate nodes occasionally for fresh animations
    const interval = setInterval(createNodes, 30000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className={styles.loginContainer}>
      <div className={styles.glowCircle}></div>
      
      <div className={styles.card}>
        <div className={styles.logoContainer}>
          <div className={styles.logo}>
            <span>ST</span>
          </div>
          <div className={styles.logoRing}></div>
          <div className={styles.logoRing2}></div>
        </div>
        
        <h1 className={styles.title}>Welcome to <span className={styles.gradient}>SuiTunes</span></h1>
        <p className={styles.subtitle}>Experience Music like never before</p>
        
        <div className={styles.buttons}>
          <button 
            className={`${styles.zkLogin} ${isZkLoading ? styles.loading : ''}`}
            onClick={handleZkLogin}
            disabled={isZkLoading || isConnecting}
          >
            {isZkLoading ? (
              <span className={styles.loader}></span>
            ) : (
              <>
                <span className={styles.buttonIcon}>🔐</span>
                Sign in with zkLogin
              </>
            )}
          </button>
          
          <div className={styles.separator}>
            <span>or</span>
          </div>
          
          <div className={styles.walletConnectWrapper}>
            <button 
              className={`${styles.walletConnect} ${isConnecting ? styles.loading : ''}`}
              onClick={handleWalletConnect}
              disabled={isConnecting || isZkLoading}
            >
              {isConnecting ? (
                <span className={styles.loader}></span>
              ) : (
                <>
                  <span className={styles.buttonIcon}>💼</span>
                  Connect Wallet
                </>
              )}
            </button>
          </div>
        </div>
        
        <div className={styles.features}>
          <div className={styles.feature}>
            <span className={styles.featureIcon}>🎵</span>
            <span>Own Your Music</span>
          </div>
          <div className={styles.feature}>
            <span className={styles.featureIcon}>💰</span>
            <span>Support Artists</span>
          </div>
          <div className={styles.feature}>
            <span className={styles.featureIcon}>🔄</span>
            <span>Trade NFTs</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;