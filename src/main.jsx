import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Homepage from './pages/homepage/Homepage.jsx'
import LandingPage from './pages/LandingPage/LandingPage.jsx'
import MarketPlace from './pages/MarketPlace/MarketPlace.jsx'
import UserProfile from './pages/userprofile/UserProfile.jsx'
import MyNFTs from './pages/MyNfts/MyNfts.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />
  },
  {
    path: 
    "homepage",
    element: <App />,
    children: [
      {
        index: true, element: <Homepage/>
      },
      {
        path:"marketplace", element: <MarketPlace/>
      },
      {
        path: "profile", element: <UserProfile/>
      },
      {
        path: "my-nfts", element: <MyNFTs/>
      },
      
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
