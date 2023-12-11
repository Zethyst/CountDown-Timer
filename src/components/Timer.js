import React, { useState, useEffect, useRef } from "react";
import PlayCircleRoundedIcon from "@mui/icons-material/PlayCircleRounded";
import PauseCircleRoundedIcon from "@mui/icons-material/PauseCircleRounded";
import StopCircleRoundedIcon from '@mui/icons-material/StopCircleRounded';

export default function Timer(props) {

  const [isRunning, setIsRunning] = useState(true);
  const [time, setTime] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const ref = useRef(null);
  const secondref = useRef(null);
  let totalSeconds = props.Minutes * 60;

  function TimeCalculation() {
    if (totalSeconds > 0) {
      const seconds = Math.floor(totalSeconds % 60);
      const minutes = Math.floor((totalSeconds / 60) % 60);
      const hours = Math.floor((totalSeconds / 3600) % 24);

      return { hours, minutes, seconds };
    } else {
      return { hours: 0, minutes: 0, seconds: 0 };
    }
  }
  

  useEffect(() => {
    if (ref.current) clearInterval(ref.current);
    const x = setInterval(() => {
      totalSeconds -= 1;
      setTime(TimeCalculation());
    }, 1000);
    ref.current = x;
  }, [props.Minutes]);


  const handlePlayPause = () => {
    if (isRunning) {
      clearInterval(secondref.current);
      clearInterval(ref.current);
    } else {
      secondref.current = setInterval(() => {
        if(!isRunning) { 
          if (totalSeconds > 0) {
            totalSeconds -= 1;
            setTime(TimeCalculation());
          }
        }
    }, 1000);
    
    }
    setIsRunning(!isRunning);
  };

  const handleReset = ()=>{
    props.setMinutes(0);
    clearInterval(secondref.current);
    clearInterval(ref.current);
  }

  return (
    <div>
      <div className="flex space-x-4 justify-center items-center">
        <div onClick={handlePlayPause}>
          {!isRunning ? (
            <PlayCircleRoundedIcon
              fontSize="large"
              className="text-cyan-600 scale-150 cursor-pointer"
            />
          ) : (
            <PauseCircleRoundedIcon
              fontSize="large"
              className="text-cyan-600 scale-150 cursor-pointer"
            />
          )}
        </div>
        <div onClick={handleReset}> <StopCircleRoundedIcon
              fontSize="large"
              className="text-cyan-600 scale-150 cursor-pointer"
            /></div>
        <div
          className="flex text-cyan-600 font-bold text-4xl"
          style={{ fontFamily: "Source Sans 3" }}
        >
          <span>{time.hours}</span>:<span>{time.minutes}</span>:
          <span>{time.seconds}</span>
        </div>
      </div>
    </div>
  );
}
