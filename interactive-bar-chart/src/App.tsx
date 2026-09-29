import { useState } from 'react'
import './App.css'
import BarChart from './BarChart'
import { CHART_DATA } from './chartData'

function App() {
  const [chartVisible, setChartVisible] = useState<boolean>(false)
  
  
  return (
    <div className='all-container'>
      <button className="my-button" onClick={() => setChartVisible(!chartVisible)}>Toggle Chart</button>

      {chartVisible ? <BarChart data={CHART_DATA}/> : null}
    </div>
  )
}

export default App
