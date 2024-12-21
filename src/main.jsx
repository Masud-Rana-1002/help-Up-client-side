import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { RouterProvider } from 'react-router-dom'
import routes from './routes/routes.jsx'
import ThemeProviderContext from './context/ThemeProviderContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProviderContext>

     <RouterProvider router={routes} />
    </ThemeProviderContext>
  </StrictMode>,
)
