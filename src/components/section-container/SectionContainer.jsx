import { useState } from "react";
import styles from "./SectionContainer.module.css";

const SectionContainer = ({
  title,
  type = "default",
  items,
  backgroundColor,
}) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleCardHover = (index) => {
    setActiveIndex(index);
  };

  const renderItems = () => {
    switch (type) {
      case "features":
        return (
          <div className={styles.grid}>
            {items.map((item, index) => (
              <div
                key={index}
                className={styles.card}
                onMouseEnter={() => handleCardHover(index)}
                onMouseLeave={() => handleCardHover(null)}
                style={{
                  transform:
                    activeIndex === index ? "translateY(-5px)" : "none",
                }}
              >
                <div className={styles.featureIcon}>{item.icon}</div>
                <h3 className={styles.featureTitle}>{item.title}</h3>
                <p className={styles.featureDesc}>{item.description}</p>
              </div>
            ))}
          </div>
        );

      case "steps":
        return (
          <div className={styles.steps}>
            {items.map((item, index) => (
              <div
                key={index}
                className={styles.step}
                style={{ position: "relative" }}
              >
                <div className={styles.stepNumber}>{item.number}</div>
                <h3 className={styles.stepTitle}>{item.title}</h3>
                <p className={styles.stepDesc}>{item.description}</p>
                {index !== items.length - 1 && (
                  <div className={styles.stepArrow}>→</div>
                )}
              </div>
            ))}
          </div>
        );

      case "testimonials":
        return (
          <div className={styles.grid}>
            {items.map((item, index) => (
              <div
                key={index}
                className={styles.card}
                onMouseEnter={() => handleCardHover(index)}
                onMouseLeave={() => handleCardHover(null)}
                style={{
                  transform:
                    activeIndex === index ? "translateY(-5px)" : "none",
                }}
              >
                <p className={styles.testimonialText}>{item.text}</p>
                <div className={styles.testimonialAuthor}>
                  <img
                    src={item.authorImage}
                    alt={item.authorName}
                    className={styles.authorImage}
                  />
                  <div>
                    <p className={styles.authorName}>{item.authorName}</p>
                    <p className={styles.authorTitle}>{item.authorTitle}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        );

      default:
        return (
          <div className={styles.grid}>
            {items.map((item, index) => (
              <div
                key={index}
                className={styles.card}
                onMouseEnter={() => handleCardHover(index)}
                onMouseLeave={() => handleCardHover(null)}
                style={{
                  transform:
                    activeIndex === index ? "translateY(-5px)" : "none",
                }}
              >
                {item.content}
              </div>
            ))}
          </div>
        );
    }
  };

  return (
    <section
      className={styles.sectionContainer}
      style={{ backgroundColor: backgroundColor || "var(--color-bg-primary)" }}
    >
      <h2 className={styles.sectionTitle}>{title}</h2>
      {renderItems()}
    </section>
  );
};

export default SectionContainer;
