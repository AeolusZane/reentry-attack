import './App.css'
// import { useContract } from './useContract';


function App() {
  // const { approve, transfer, balanceOf } = useContract()

  return (
    <>
      <div className="card">
        <div 
          id="approve"
        onClick={() => {
          console.log('approve')
          // approve()
        }}>
          A授权B可以从A转账3个代币
        </div>

        <button onClick={async () => {
          // await transfer();
        }}>
          A往B转账3个代币
        </button>

        <button onClick={async () => {
          // await balanceOf();
        }}>
          balanceOf
        </button>
      </div>
    </>
  )
}

export default App
