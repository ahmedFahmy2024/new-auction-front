"use client";

import { useEffect, useState } from "react";

type CounterDownProps = {
  targetDate: string;
};

const CounterDown = ({ targetDate }: CounterDownProps) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    // Update the countdown every second
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = new Date(targetDate).getTime() - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        clearInterval(interval);
      }
    }, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <div className="flex justify-between pt-4">
      <div className="text-center">
        <p className="text-xl font-bold text-black">{timeLeft.days}</p>
        <p className="text-sm">يوم</p>
      </div>
      <div className="text-center">
        <p className="text-xl font-bold text-black">{timeLeft.hours}</p>
        <p className="text-sm">ساعة</p>
      </div>
      <div className="text-center">
        <p className="text-xl font-bold text-black">{timeLeft.minutes}</p>
        <p className="text-sm">دقيقة</p>
      </div>
      <div className="text-center">
        <p className="text-xl font-bold text-black">{timeLeft.seconds}</p>
        <p className="text-sm">ثانية</p>
      </div>
    </div>
  );
};

export default CounterDown;
