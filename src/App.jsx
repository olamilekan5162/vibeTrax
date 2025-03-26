import { Outlet } from "react-router-dom";
import Sidebar from "./components/sidebar/Sidebar"
import Navbar from "./components/navbar/Navbar";
function App() {
  return (
    <div style={{display: 'flex', flexDirection: 'row', width: '100%'}}>
      <Sidebar />
      <div style={{display: 'flex', flexDirection: 'column', width: '80%', height: '100vh'}}>
        <Navbar />
        <Outlet />
      </div>
    </div>
  );
}

export default App;
