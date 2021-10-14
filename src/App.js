import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [time, setTime] = useState(0);
  const [timeOn, setTimeOn] = useState(false);

  // timeOn이 변경될때마다 useEffect실행
  // setInterval 사용하여 시간표시
  useEffect(() => {
    let interval = null;

    // timeOn이 true라면 +10, false라면 clear
    if (timeOn) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [timeOn]);

  return (
    <div className="App">
      <div>
        {/* 시간(시,분,초 별로) 표시 */}
        {/* slice(-2) 끝에서 2자리만 표시 */}
        {/* floor 소숫점 제거 */}
        <span>{("0" + Math.floor((time / 60000) % 60)).slice(-2)}:</span>
        <span>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}:</span>
        <span>{("0" + ((time / 10) % 100)).slice(-2)}</span>
      </div>
      <div>
        {/* Start to Reset버튼 생성 */}
        <button onClick={() => setTimeOn(true)}>Start</button>
        <button onClick={() => setTimeOn(false)}>Stop</button>
        <button onClick={() => setTimeOn(true)}>Resume</button>
        <button onClick={() => setTime(0)}>Reset</button>
      </div>
    </div>
  );
}

export default App;
