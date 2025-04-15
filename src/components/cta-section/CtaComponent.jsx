// CtaComponent.jsx
import styles from './CtaComponent.module.css';

const CtaComponent = ({
  title,
  subtitle,
  buttonText,
  buttonLink = "#",
  variant = "section", // "section" or "box"
  customBackground,
  customClassName,
  toggleModal
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
      {toggleModal ? (
        <button className={styles.button} onClick={toggleModal}>
          {buttonText}
        </button>
      ) : (
        <a href={buttonLink} className={styles.button}>
          {buttonText}
        </a>
      )}
      {/* <a href={buttonLink} className={styles.button}>
        {buttonText}
      </a> */}
    </div>
  );
};

export default CtaComponent;