// CtaComponent.jsx;
import styles from './CtaComponent.module.css';


const CtaComponent = ({
  title,
  subtitle,
  buttonText,
  handleClick,
  variant = "section", // "section" or "box"
  customBackground,
  customClassName,
  disabled,
  toggleTrackForSale,
  trackForSale
}) => {

  // Determine which class to use based on variant
  const containerClass = variant === "box" 
    ? styles.ctaBox 
    : styles.ctaSection;

  // Handle title class based on variant
  const titleClass = variant === "box" 
    ? styles.boxTitle 
    : styles.sectionTitle;

  // Handle description/subtitle class based on variant
  const descriptionClass = variant === "box" 
    ? styles.boxDesc 
    : styles.sectionSubtitle;

  // Apply custom background if provided
  const backgroundStyle = customBackground 
    ? { background: customBackground } 
    : {};

  return (
    <div
      className={`${containerClass} ${customClassName || ""}`}
      style={backgroundStyle}
    >
      <h2 className={titleClass}>{title}</h2>
      <p className={descriptionClass}>{subtitle}</p>
      {trackForSale &&
      <div className={styles.toggleSale}>
        <p>Music not currently for sale: </p>
        <button onClick={toggleTrackForSale}> set for sale</button>
      </div>
      }
      <button className={styles.button} onClick={handleClick} disabled={disabled}>
        {buttonText}
      </button>
    </div>
  );
};

export default CtaComponent;