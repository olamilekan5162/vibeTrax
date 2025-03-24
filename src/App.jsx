import { Outlet } from "react-router-dom";
import Sidebar from "./components/sidebar/Sidebar"
function App() {
  return (
    <div style={{display: 'flex', flexDirection: 'row', width: '100%'}}>
      <Sidebar />
      <Outlet />
    </div>
  );
}

export default App;
