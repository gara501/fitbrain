import React, {useState, useEffect} from 'react';

const Timer = () => {
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);

  useEffect(() => {
       const interval = setInterval(() => {
        setSeconds(seconds => seconds + 1);
      }, 1000);

      return () => clearInterval(interval);
  }, []);

  const getRealTime = (time) => {
    let currentTime = `00:${time}`;

    if (time > 60) {
      setMinutes(minutes+1);
      setSeconds(0);
    }
    if (seconds < 10) {
      currentTime = `${minutes} : 0${seconds}`;
    } else {
      currentTime = `${minutes} : ${seconds}`;
    }

    return currentTime;
  }

  return (
    <div className="timer mv-3">
      <span>Workout Time: {getRealTime(seconds)}</span>
    </div>
  )
}

export default Timer;