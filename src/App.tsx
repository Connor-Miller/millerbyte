import { RouterProvider } from '@tanstack/react-router'
import router from './router'

import './App.css'


// Modify the App component to use RouterProvider
function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
