import { RouterProvider } from '@tanstack/react-router'
import router from './router'

import './App.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'


// Modify the App component to use RouterProvider
function App() {
  const queryClient = new QueryClient();
  
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </>
  )
}

export default App
