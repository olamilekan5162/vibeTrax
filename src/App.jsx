import { Outlet } from "react-router-dom";
import Sidebar from "./components/sidebar/Sidebar";
import Navbar from "./components/navbar/Navbar";
import AudioPlayer from "./components/AudioPlayer/AudioPlayer";

function App() {
  return (
    <div style={{ display: "flex", flexDirection: "row", width: "100%" }}>
      <Sidebar />
      <div
        style={{
          display: "flex",
          position: "sticky",
          left: "20%",
          flexDirection: "column",
          width: "80%",
          height: "100vh",
          paddingBottom: "80px",
        }}
      >
        <Navbar />
        <Outlet />
      </div>
      <AudioPlayer />
    </div>
  );
}

export default App;
