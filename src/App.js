import './App.css';
import Timer from './components/Timer';
import { useState } from 'react';

function App() {
  const [Minutes, setMinutes] = useState(0);

  const handleInputChange = (e) => {
    setMinutes(e.target.value);
  };
  return (
    <div className="App flex flex-col space-y-5">
    <div className='flex flex-col space-y-1'>
      <label htmlFor='timeval' className='text-cyan-600'>Enter Minutes</label>
      <input value={Minutes} onChange={handleInputChange} className='bg-transparent w-96 h-8 text-white border rounded-md border-gray-700 outline-none p-2' type='number' id='timeval' name='timeval' placeholder='0' ></input>
    </div>
      <Timer Minutes={parseInt(Minutes, 10)} setMinutes={setMinutes}/> 
    </div>
  );
}

export default App;
