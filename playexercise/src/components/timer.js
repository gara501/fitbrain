import React, {useState, useEffect} from 'react';

const Timer = () => {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
       const interval = setInterval(() => {
        setSeconds(seconds => seconds + 1);
      }, 1000);

      return () => clearInterval(interval);
  }, []);

  return (
    <div className="timer">
      <span>Workout Time: {seconds} Seconds</span>
    </div>
  )
}

export default Timer;