import { createBrowserRouter } from "react-router-dom";
import LandingPage from "./pages/LandingPage/LandingPage";
import Login from "./pages/Login/Login";
import NftDetail from "./pages/NftDetail/NftDetail";
import App from "./App";
import HomePage from "./pages/homepage/Homepage";
import UserProfile from "./pages/userprofile/UserProfile";
import MyNFTs from "./pages/MyNfts/MyNfts";
import Library from "./pages/Library/Library";

export const router = createBrowserRouter([
  { path: "/", element: <LandingPage /> },
  { path: "/login", element: <Login /> },
  { path: "/nft/:id", element: <NftDetail /> },
  {
    path: "homepage",
    element: <App />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "library", element: <Library /> },
      { path: "profile", element: <UserProfile /> },
      { path: "my-nfts", element: <MyNFTs /> },
    ],
  },
]);
