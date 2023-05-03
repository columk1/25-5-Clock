import React from 'react'
import { useState, useRef } from 'react'
import './App.css'

function App() {
  const [breakInterval, setBreakInterval] = React.useState(5)
  const [sessionInterval, setSessionInterval] = React.useState(25)
  const [minutes, setMinutes] = React.useState(25)    
  const [seconds, setSeconds] = React.useState(0)
  const [timer, setTimer] = React.useState(null)
  const [currentStatus, setCurrentStatus] = React.useState('Session')

  React.useEffect(
    () => {
      if (timer) {
          interval = setInterval(() => {
              handleNumber()
          }, 1000) //periodLength
          return () => {
              clearInterval(interval)
          }
        }
      }
    )
//Could try to do this using recursion
  function handleNumber() {
    if (seconds === 0) {
      if (minutes === 0) {                       
        audioBeep.play()
        switchesTimerMode()
      } else {
        setSeconds(59)
        setMinutes(minutes - 1)
        }
    } else setSeconds(seconds - 1)
  }

  function switchesTimerMode() {
    currentStatus === 'Session'
        ? (setCurrentStatus('Break'),
            setMinutes(stateBreak),
            setSeconds(0))
        : (setCurrentStatus('Session'),
            setMinutes(stateSession),
            setSeconds(0))
  }

  function breakDecrement() {
    if (!timer) {
      if (breakInterval !== 1) {
        setBreakInterval(breakInterval - 1)
      }
    }
  }

  function breakIncrement() {
    if (!timer) {
      if (stateBreak <= 59) {
        setBreakInterval(breakInterval + 1)
      }
    }
  }

  function sessionDecrement() {
    if (!timer) {
      if (session !== 1) {
        setSession(session - 1)
        setMinutes(session - 1)
      }
    }        
  }

  function sessionIncrement() {
    if (!timer) {
      if (session <= 59) {
        setSession(session + 1)
        setMinutes(session + 1)
      }
    }             
  }

  function reset() {
    setBreakInterval(5)
    setSessionInterval(25)
    setMinutes(25)
    setSeconds(0)
    setCurrentStatus('Session')
    stopTimer()
    //setPeriodLength(null)
    audioBeep.pause()
    audioBeep.currentTime = 0
  }

  function startStop() {
    timer ? stopTimer() : startTimer()
  }

  function stopTimer() {
    setTimer(null)
    //setPeriodLength(null)
  }

  function startTimer() {
    setTimer('Start')
    //setPeriodLength(1000)
  }

  function timeLeft() {
    let minutesLeft = minutes < 10 ? '0' + minutes : minutes
    let secondsLeft = seconds < 10 ? '0' + seconds : seconds
    return minutesLeft + ':' + secondsLeft
  }

  return (
    <div className="App">
      <h1>Clock</h1>

      <TimerOutput
        time={timeLeft()}
        status={currentStatus}
      />

      <div className='btn-control'>
        <button id='start_stop' onClick={startStop}>{timer ? 'Stop' : 'Start'}</button>
        <button id='reset' onClick={reset}>Reset</button>
      </div>

      <div className='setting'>
        <div className='break-wrap'>
          <div id='break-label'>Break Length</div>
          <div className='break-setting'>
           <button id='break-decrement' onClick={breakDecrement}>-</button>
           <div id='break-length'>{breakInterval}</div>
           <button id='break-increment' onClick={breakIncrement}>+</button>
           </div>
        </div>
        <div className='session-wrap'>
          <div id='session-label'>Session Length</div>
          <div className='session-setting'>
            <button id='session-decrement' onClick={sessionDecrement}>-</button>
            <div id='session-length'>{sessionInterval}</div>
            <button id='session-increment' onClick={sessionIncrement}>+</button>
          </div>
        </div>
      </div>
      <audio id="beep" preload="auto" src="./assets/beep.wav" ref={audioBeep} />
    </div>
  )
}
//ref={(audio) => { audioBeep = audio }}

function TimerOutput({ time, status }) {
  return (
      <div className='timer-output'>
          <div id='timer-label'>{status}</div>
          <div id='time-left'>{time}</div>
      </div>
  )
}

export default App
