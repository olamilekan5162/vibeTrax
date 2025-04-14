import { createBrowserRouter } from "react-router-dom";
import Root from "./routes/root/Root";
import Home from "./routes/home/Home";
import Discover from "./routes/discover/Discover";
import UploadMusic from "./routes/upload-music/UploadMusic";

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
        path: "upload",
        Component: UploadMusic,
      },
    ],
  },
]);
