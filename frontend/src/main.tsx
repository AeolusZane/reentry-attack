import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import Web3Provider from './Web3Provider.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <Web3Provider>
      <App />
    </Web3Provider>
)
