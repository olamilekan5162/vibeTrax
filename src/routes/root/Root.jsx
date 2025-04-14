import { Outlet } from "react-router-dom";
import Header from "../../components/header/Header";
import styles from "./Root.module.css";
import Footer from "../../components/footer/Footer";
import MusicPlayer from "../../components/music-player/MusicPlayer";

const Root = () => {
  return (
    <div className={styles.root}>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Root;
