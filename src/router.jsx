import { createBrowserRouter } from "react-router-dom";
import Root from "./routes/root/Root";
import Home from "./routes/home/Home";
import Discover from "./routes/discover/Discover";
import UploadMusic from "./routes/upload-music/UploadMusic";
import Dashboard from "./routes/dashboard/Dashboard";
import MusicPlayer from "./routes/music-player/MusicPlayer";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "discover",
        Component: Discover,
      },
      {
        path: "discover/:id",
        Component: MusicPlayer,
      },
      {
        path: "upload",
        Component: UploadMusic,
      },
      {
        path: "dashboard",
        Component: Dashboard,
      },
    ],
  },
]);
