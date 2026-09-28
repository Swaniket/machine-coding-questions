import React, { useEffect, useState } from 'react'
import useDebounce2 from '../hooks/useDebounce2'

function Debounce2Driver() {
    const [ipValue, setInputValue] = useState("")
  const [debouncedValue, setValue] = useDebounce2("", 2000)

  const handleInputValueChange = (e: any) => {
    setInputValue(e.target.value)
    setValue(e.target.value)
  }

  useEffect(() => {
    console.log("debouncedValue", debouncedValue)
  }, [debouncedValue])


  return (
    <>
      <input value={ipValue} onChange={handleInputValueChange}/>
    </>
        
  )
}

export default Debounce2Driver