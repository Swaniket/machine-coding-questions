import './App.css'
import Debounce1Driver from './driverCode/Debounce1Driver'
import Debounce2Driver from './driverCode/Debounce2Driver'
import ThrottleDriver from './driverCode/ThrottleDriver'

function App() {
  return (
    <>
      <Debounce1Driver />
      <Debounce2Driver />
      <div style={{margin: "20px"}}>
        <ThrottleDriver />
      </div>
      
    </>
        
  )
}

export default App
