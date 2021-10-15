import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [time, setTime] = useState(0);
  const [timerOn, setTimerOn] = useState(false);

  // timeOn이 변경될때마다 useEffect실행
  // setInterval 사용하여 시간표시
  useEffect(() => {
    let interval = null;

    // timeOn이 true라면 +10, false라면 clear
    if (timerOn) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [timerOn]);

  return (
    <div className="section-center">
      <h2 className="time-container">Timer</h2>
      <div className="time-show">
        {/* 시간(시,분,초 별로) 표시 */}
        {/* slice(-2) 끝에서 2자리만 표시 */}
        {/* floor 소숫점 제거 */}
        <span>{("0" + Math.floor((time / 60000) % 60)).slice(-2)}:</span>
        <span>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}:</span>
        <span>{("0" + ((time / 10) % 100)).slice(-2)}</span>
      </div>

      {/* Start to Reset버튼 생성 */}
      {/* timerOn=true,time=0 일때만 Start버튼 표시 */}
      <div className="time-container">
        {!timerOn && time === 0 && (
          <button className="show-btn" onClick={() => setTimerOn(true)}>
            Start
          </button>
        )}
        {timerOn && (
          <button className="show-btn" onClick={() => setTimerOn(false)}>
            Stop
          </button>
        )}
        {/* timerOn=false이고 time=0이 아닐때만 Resume,Reset버튼 표시 */}
        {!timerOn && time > 0 && (
          <button className="show-btn" onClick={() => setTime(0)}>
            Reset
          </button>
        )}
        {!timerOn && time > 0 && (
          <button className="show-btn" onClick={() => setTimerOn(true)}>
            Resume
          </button>
        )}
      </div>
    </div>
  );
}

export default App;
