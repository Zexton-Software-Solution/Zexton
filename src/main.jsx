import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

const root = createRoot(document.getElementById('root'))

root.render(
  <StrictMode>
    <App />
  </StrictMode>,
)

window.requestAnimationFrame(() => {
  document.getElementById('initial-loader-shell')?.remove()
  document.getElementById('initial-loader-critical')?.remove()
})
