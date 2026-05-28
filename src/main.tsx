import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'

// URL 包含 reset 参数即清除所有本地数据
if (window.location.search.includes('reset')) {
  localStorage.clear();
  window.history.replaceState({}, '', '/');
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
