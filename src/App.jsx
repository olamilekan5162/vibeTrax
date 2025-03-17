import {Route, createBrowserRouter, RouterProvider} from 'react-router-dom';
import UserProfile from "./pages/userprofile/UserProfile"
import Homepage from "./pages/homepage/Homepage"

function App() {
    const router = createBrowserRouter([
    {
      path: "/",
      element: <Homepage />
    },
    {
      path: "userprofile",
      element: <UserProfile />
    }
    ])
  
  return (
    <RouterProvider router={router}/>
  )
}

export default App
