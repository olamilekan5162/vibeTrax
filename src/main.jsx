import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Homepage from './pages/homepage/Homepage.jsx'
import MarketPlace from './pages/MarketPlace/MarketPlace.jsx'
import UserProfile from './pages/userprofile/UserProfile.jsx'

const router = createBrowserRouter([
  {
    path: 
    "/",
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
      }
      
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
