import { useState, useEffect } from 'react'

function Countdown() {
  const [time, setTime] = useState(
    new Date(
      `${
        new Date().getMonth() + 1
      }/${new Date().getDate()}/${new Date().getFullYear()} 18:59:59`,
    ).getTime(),
  )
  const [hours, setHours] = useState(0)
  const [miuntes, setMinutes] = useState(0)
  const [seconds, setSeconds] = useState(0)

  useEffect(() => {
    const updateTime = setInterval(() => {
      const now = new Date().getTime()
      const diff = time - now

      const newHours = Math.floor(
        (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      )
      const newMinutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
      const newSeconds = Math.floor((diff % (1000 * 60)) / 1000)

      setHours(newHours)
      setMinutes(newMinutes)
      setSeconds(newSeconds)

      if (newHours <= 0 && newMinutes <= 0 && newSeconds <= 0) {
        setHours(0)
        setMinutes(0)
        setSeconds(0)
        setTime(
          new Date(
            `${
              new Date().getMonth() + 1
            }/${new Date().getDate()}/${new Date().getFullYear()} 18:59:59`,
          ).getTime() + 86400000,
        )
      }
    }, 1000)

    return () => clearInterval(updateTime)
  }, [time])

  return (
    <>
      {hours}H {miuntes}M {seconds}S
    </>
  )
}

export default Countdown
