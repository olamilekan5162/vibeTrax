
import React from 'react';
import styles from './Contributors.module.css';

const Contributors = ({ contributors }) => {
  return (
    <section className={styles.contributors}>
      <h2 className={styles.sectionTitle}>Contributors</h2>
      <div className={styles.contributorsList}>
        {contributors.map((contributor, index) => (
          <div key={index} className={styles.contributorCard}>
            <img 
              src={contributor.avatar || "/api/placeholder/60/60"} 
              alt={`${contributor.name} avatar`} 
              className={styles.contributorAvatar}
            />
            <div className={styles.contributorInfo}>
              <h3 className={styles.contributorName}>{contributor.name}</h3>
              <p className={styles.contributorRole}>{contributor.role}</p>
              <p className={styles.contributorShare}>{contributor.share}% Share</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Contributors;