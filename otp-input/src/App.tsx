import { useEffect, useRef, useState } from 'react'
import './App.css'

interface IOtpInput {
  otpDigitCount: number
  finalInput: string[]
  setFinalInput: (val: string[]) => void
}

interface IOtpInputBox {
  currElementIndex: number
  focussedElement: number
  finalInput: string[]
  setFocussedElement: (val: number) => void
  setFinalInput: (val: string[]) => void
}

const OtpInputBox = ({
  currElementIndex, 
  focussedElement, 
  finalInput,
  setFocussedElement,
  setFinalInput
}: IOtpInputBox) => {
  const currInputRef = useRef<any>(null)
  const [value, setValue] = useState<number | string>('')

  const handleChangeInput = (e: any) => {
    const val = e.target.value
    const eventType = e.nativeEvent.inputType

    if (val?.length <= 1) {
      setValue(val)
      
      const finalInputCopy = [...finalInput]
      finalInputCopy[currElementIndex] = val
      setFinalInput(finalInputCopy)
      
      if (eventType === "insertText") {
        setFocussedElement(focussedElement + 1)
      }

      if (eventType === "deleteContentBackward") {
        setFocussedElement(currElementIndex)
      }
    }
  }

  useEffect(() => {
    if(focussedElement === currElementIndex && currInputRef.current) {
      currInputRef.current?.focus()
    }
  }, [focussedElement, currElementIndex])

  return (
    <input 
      ref={currInputRef}
      className={'otp-input-box'}
      type='number' 
      value={value} 
      onChange={handleChangeInput}
    />
  )
}

const OtpInput = ({otpDigitCount, finalInput, setFinalInput}: IOtpInput) => {
  const [focussedElement, setFocussedElement] = useState<number>(0)

  return (
    <div className='otp-input-box-wrapper'>
      {[...Array(otpDigitCount)].map((_, i) => (
        <OtpInputBox 
          key={i} 
          currElementIndex={i} 
          focussedElement={focussedElement} 
          finalInput={finalInput}
          setFocussedElement={setFocussedElement}
          setFinalInput={setFinalInput}
          />
      ))}
    </div>
  )
}

function App() {
  const NUMBER_OF_INPUT = 5

  const initialArray = Array.from({length: NUMBER_OF_INPUT}, (_, i) => "")
  const [finalInput, setFinalInput] = useState<string[]>(initialArray)

  return (
    <>
      <OtpInput 
        otpDigitCount={NUMBER_OF_INPUT} 
        finalInput={finalInput} 
        setFinalInput={setFinalInput}/>
    
      <div>{finalInput.join('')}</div>
    </>
  )
}

export default App
