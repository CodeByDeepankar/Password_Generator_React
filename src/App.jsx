import { useState, useCallback, useEffect, useRef } from "react";

function App() {
  const [length, setLength] = useState(6);
  const [numberAllowed, setNumberAllowed] = useState(6);
  const [charAllowed, setSetCharAllowed] = useState(6);
  const [password, setPassword] = useState();

  // useRef Hook
  const passwordRef = useRef(null);

  //button text toggle
  const [buttonText, setButtonText] = useState("copy");

  const handleButtonClick = () => {
    setButtonText("Copied");

    // Optional: Reset back to 'Copy' after a delay
    setTimeout(() => {
      setButtonText("Copy");
    }, 2000); // 2000 ms = 2 seconds
  };

  const handleClick = () => {
    handleButtonClick();
    copyToClipBoard();
  };

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) str += "01234567890";
    if (charAllowed) str += "!@#$%&*^";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);

      setPassword(pass);
    }
  }, [length, numberAllowed, charAllowed, setPassword]);

  const copyToClipBoard = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, setPassword]);

  return (
    <>
      <div className="w-full pb-8 max-w-md mx-auto shadow-md rounded-lg px-5 my-8 text-orange-400 bg-gray-700">
        <h1 className="text-white text-center my-2">Password Generator</h1>
        <div class="max-w-md mx-auto">
          <div class="relative">
            <input
              type="text"
              value={password}
              readOnly
              id="default-search"
              class="block w-full p-4 ps-10 text-yellow-200 text-xl border rounded-lg outline-none cursor-default bg-gray-50 dark:bg-gray-700  "
              placeholder="Password"
              ref={passwordRef}
            />
            <button
              type="submit"
              class="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={handleClick}
            >
              {buttonText}
            </button>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={6}
              max={30}
              value={length}
              className="cursor-pointer"
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label>Length: {length}</label>
          </div>
          <div className="flex items-center gap-x-1 float-end">
            <input
              type="checkbox"
              className="cursor-pointer"
              defaultChecked={numberAllowed}
              onChange={() => {
                setNumberAllowed((prev) => !prev);
              }}
            />
            <label>Numbers</label>
            <input
              type="checkbox"
              className="cursor-pointer"
              defaultChecked={charAllowed}
              onChange={() => {
                setSetCharAllowed((prev) => !prev);
              }}
            />
            <label>Charecters</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
