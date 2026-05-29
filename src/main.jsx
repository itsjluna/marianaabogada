import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import { FormspreeProvider } from '@formspree/react';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <FormspreeProvider project="3012604000848575722">
      <App />
    </FormspreeProvider>
  </StrictMode>,
)
