import { useEffect, useState } from 'react'
import useDebounce from '../hooks/useDebounce'

function Debounce1Driver() {
    const [ipValue, setInputValue] = useState("")
    const [debouncedValue] = useDebounce({ value: ipValue, delay: 2000 })

    const handleInputValueChange = (e: any) => {
        setInputValue(e.target.value)
    }

    useEffect(() => {
        console.log("debouncedValue", debouncedValue)
    }, [debouncedValue])

    return (
        <>
            <input value={ipValue} onChange={handleInputValueChange} />
        </>
    )
}

export default Debounce1Driver