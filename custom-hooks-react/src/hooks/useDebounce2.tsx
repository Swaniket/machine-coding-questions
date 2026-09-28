import React, { useEffect, useState } from 'react'

function useDebounce2(initialValue: string, delay: number) {
    const [value, setValue] = useState(initialValue)
    const [debouncedValue, setDebouncedValue] = useState(initialValue)

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedValue(value)
        }, delay)

        return () => clearTimeout(timer)
    }, [value, delay])


    return [debouncedValue, setValue] as const 
}

export default useDebounce2