import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './app/store.js'
import NotificationProvider from './contexts/NotificationContext.jsx'
import { Toaster } from 'sonner'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <NotificationProvider>
        <App />
        <Toaster richColors />
      </NotificationProvider>
    </Provider>
  </StrictMode>,
)
