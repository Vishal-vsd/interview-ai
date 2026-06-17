import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { AuthProvider } from './context/AuthContext.tsx'
import { Toaster } from 'react-hot-toast'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <App />
      <>
  <App />
  <Toaster
    position="top-right"
    toastOptions={{
      style: {
        background: "#18181b",
        color: "#fff",
      },
    }}
  />
</>
    </AuthProvider>
  </StrictMode>,
)
