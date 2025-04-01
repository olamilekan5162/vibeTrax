import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import { AudioProvider } from "./components/AudioContext.jsx";

import Homepage from "./pages/homepage/Homepage.jsx";
import UserProfile from "./pages/userprofile/UserProfile.jsx";
import MyNFTs from "./pages/MyNfts/MyNfts.jsx";
import LandingPage from "./pages/LandingPage/LandingPage.jsx";
import Library from "./pages/Library/Library.jsx";
import Login from "./pages/Login/Login.jsx";
import NftDetail from "./pages/NftDetail/NftDetail.jsx";

const router = createBrowserRouter([
  { path: "/", element: <LandingPage /> },
  { path: "/login", element: <Login /> },
  { path: "/nft/:id", element: <NftDetail /> },
  {
    path: "homepage",
    element: <App />,
    children: [
      { index: true, element: <Homepage /> },
      { path: "library", element: <Library /> },
      { path: "profile", element: <UserProfile /> },
      { path: "my-nfts", element: <MyNFTs /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AudioProvider>
      <RouterProvider router={router} />
    </AudioProvider>
  </StrictMode>
);
