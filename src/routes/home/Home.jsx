import { useState } from "react";
import Banner from "../../components/banner/Banner";
import CtaComponent from "../../components/cta-section/CtaComponent";
import SectionContainer from "../../components/section-container/SectionContainer";
import PremiumModal from "../../modals/premium-modal/PremiumData";
import {
  featuresData,
  stepsData,
  testimonialsData,
} from "../../samples/homeSample";
import styles from "./Home.module.css";
const Home = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <main className={styles.home}>
      <Banner />
      <SectionContainer
        title={"Why TuneFlow?"}
        type="features"
        items={featuresData}
        backgroundColor="var(--color-bg-secondary)"
      />
      <SectionContainer
        title={"How it works?"}
        type="steps"
        items={stepsData}
      />
      <SectionContainer
        title={"Artist Success Stories"}
        type="testimonials"
        items={testimonialsData}
        backgroundColor="var(--color-bg-secondary)"
      />
      <CtaComponent
        title="Ready to Transform Your Music Experience?"
        subtitle="Join TuneFlow today and be part of the revolution that's creating a fairer, more transparent music ecosystem for artists and fans alike."
        buttonText="Get Started Today"
      />
      <button onClick={() => setIsOpen(true)}>open</button>
      <PremiumModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </main>
  );
};

export default Home;
