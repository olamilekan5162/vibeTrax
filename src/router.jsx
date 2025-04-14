import { createBrowserRouter } from "react-router-dom";
import Root from "./routes/root/Root";
import Home from "./routes/home/Home";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      {
        index: true,
        Component: Home,
      },
    ],
  },
]);
