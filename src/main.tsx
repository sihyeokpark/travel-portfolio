import { RecoilRoot } from 'recoil'
import { createRoot } from 'react-dom/client'

import './index.css'

import App from './App'

createRoot(document.getElementById('root') as HTMLElement).render(
  <RecoilRoot>
    <App />
  </RecoilRoot>
)