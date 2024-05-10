import { useState, useCallback, useEffect, useRef } from 'react';
import './App.css';

function App() {
  let [length, setLength] = useState(8)
  let [numAllowed, setNumAllowed] = useState(false)
  let [specialCharAllowed, setSpecialCharAllowed] = useState(false)
  let [password, setPassword] = useState('')
  const passwordRef = useRef(null)
  const copyPasswordToClipboard = () => {
    window.navigator.clipboard.writeText(password)
    passwordRef.current?.select()
  }

  const generatePassword = useCallback(() => {
    let pass = ''
    let string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
    if(numAllowed) string += '0123456789'
    if(specialCharAllowed) string += '!@#$%^&*()_+'
    for (let i = 1; i<=length; i++) {
      const char = Math.floor(Math.random()*string.length +1)
      pass += string.charAt(char)
    }
    setPassword(pass)

  }, [length, numAllowed, specialCharAllowed])

  useEffect(() => { 
    generatePassword()
  }, [length, numAllowed, specialCharAllowed])

  return (
    <>
      <div className='main'>
        <h1>Password Generator</h1>
        <div className='displayPassword'>
          <input 
          type="text"
          value = {password}
          placeholder='Password'
          readOnly
          ref={passwordRef}
           />
          <button onClick={copyPasswordToClipboard}>copy</button>
        </div>
        <div>
          <div>
            <label htmlFor='length'>Length </label>

            <input 
            type="range"
            min = {6}
            max = {30}
            value={length}
            onChange={(e) => setLength(e.target.value)}
            name="" 
            id="" />
            <label htmlFor='length'>{length}</label>
          </div>
          <div>
            <input 
            type="checkbox"
            defaultChecked= {numAllowed}
            onChange={() => {
              setNumAllowed((prev) => !prev)
            }}
             />
             <label htmlFor="number">Number</label>
          </div>
          <div>
            <input 
            type="checkbox"
            defaultChecked= {specialCharAllowed} 
            onChange={() => {
              setSpecialCharAllowed((prev) => !prev)
            }}
            />
            <label htmlFor="Special Character">Special Character</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
