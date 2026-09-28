import React, { useEffect, useState } from 'react'
import useThrottle from '../hooks/useThrottle'

function ThrottleDriver() {
    const [value, setValue] = useState('hello')
    const throttledValue = useThrottle(value, 2000)
    
  useEffect(() => console.log(`throttledValue changed: ${throttledValue}`), [
    throttledValue,
  ])

  function onChange(event: React.ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value)
  }

  return (
    <div>
      Input: <input value={value} onChange={onChange} />
      <p>Throttled value: {throttledValue}</p>
    </div>
  )
}

export default ThrottleDriver