import React, { useEffect, useState } from 'react'

interface ITimerProps {
  countStart: number
  action: () => void
}

export const Timer: React.FC<ITimerProps> = ({ countStart, action }) => {
  const [count, setCount] = useState<number>(countStart)

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setCount(c => c - 1)
    }, 1000)
    return () => {
      console.log('useEffect cleared')
      window.clearInterval(intervalId)
    };
  }, [])

  return (
    <span>
      {count === 0 ? (action(), count) : count}
    </span>
  )
}
