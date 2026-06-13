import { useEffect, useState, type JSX } from "react";


export default function Countdown({timerEnd}:{timerEnd: ()=>void}): JSX.Element {

  const [seconds, setSeconds] = useState<number>(60);

  useEffect(() => {

    if (seconds <= 0) {
      timerEnd()
    };

    const timer: ReturnType<typeof setTimeout> = setTimeout(() => {
      setSeconds((prev: number) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);

  }, [seconds]);

  return (
    <div>
   {seconds}s
   
    </div>
  );
}
