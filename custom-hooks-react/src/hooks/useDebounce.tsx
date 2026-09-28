import { useEffect, useState } from "react"

function useDebounce({value, delay}: {value: string, delay: number}) {
  const [internalValue, setInternalValue] = useState("")

  useEffect(() => {
    const timer = setTimeout(() => {
      setInternalValue(value)
    }, delay)

    return () => clearTimeout(timer)
  }, [value, delay])


  return [internalValue]
}

export default useDebounce