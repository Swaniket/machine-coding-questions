import React, { useEffect, useRef, useState } from 'react'

function useThrottle<T>(value: T, interval=500): T {
    const [throttledValue, setThrottledValue] = useState<T>(value)
    const lastExecutedTime = useRef<number>(Date.now())

    useEffect(() => {
        // Current time is more that the last executed + interval - need to re-execute
        if(Date.now() >= lastExecutedTime.current + interval) {
            lastExecutedTime.current = Date.now()
            setThrottledValue(value)
        } 
        // There is still time to reach to the interval, so create a timeout to execute
        else {
            const timer = setTimeout(() => {
                lastExecutedTime.current = Date.now()
                setThrottledValue(value)
            }, interval)

            return () => clearTimeout(timer)
        }
    }, [value, interval])

    return throttledValue
}

export default useThrottle