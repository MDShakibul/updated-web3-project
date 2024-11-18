import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Timer = () => {
  const [time, setTime] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  useEffect(() => {
    const countDownDate = new Date("Jan 17, 2025 23:59:59").getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = countDownDate - now;

      if (distance < 0) {
        clearInterval(interval);
        setTime({ days: "00", hours: "00", minutes: "00", seconds: "00" });
      } else {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        setTime({
          days: days.toString().padStart(2, "0"),
          hours: hours.toString().padStart(2, "0"),
          minutes: minutes.toString().padStart(2, "0"),
          seconds: seconds.toString().padStart(2, "0"),
        });
      }
    }, 1000);

    return () => clearInterval(interval); // Cleanup on component unmount
  }, []);

  return (
    <motion.div className="md:max-w-[80%] max-w-full" initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.5, duration: 0.4 }}>
      <p className="text-white/60 text-center text-base md:text-lg italic">
        Staking event ends in:
      </p>
      <div className="border-2 rounded-md mt-2">
        <p className="my-2 md:my-6 flex justify-evenly text-white">
          <span className="flex flex-col justify-center items-center">
            <span className="font-semibold text-[24px] md:text-[40px]">{time.days}</span>
            <span className="text-[12px]">DAYS</span>
          </span>

          <span className="font-semibold text-[24px] md:text-[40px]">:</span>

          <span className="flex flex-col justify-center items-center">
            <span className="font-semibold text-[24px] md:text-[40px]">{time.hours}</span>
            <span className="text-[12px]">HOURS</span>
          </span>

          <span className="font-semibold text-[24px] md:text-[40px]">:</span>

          <span className="flex flex-col justify-center items-center">
            <span className="font-semibold text-[24px] md:text-[40px]">{time.minutes}</span>
            <span className="text-[12px]">MINUTES</span>
          </span>

          <span className="font-semibold text-[24px] md:text-[40px]">:</span>

          <span className="flex flex-col justify-center items-center">
            <span className="font-semibold text-[24px] md:text-[40px]">{time.seconds}</span>
            <span className="text-[12px]">SECONDS</span>
          </span>
        </p>
      </div>
    </motion.div>
  );
};

export default Timer;
