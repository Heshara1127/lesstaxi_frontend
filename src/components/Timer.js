import { useEffect, useState } from "react";

export default function Timer({ expiry }) {
  const target = new Date(expiry).getTime();
  const [remaining, setRemaining] = useState(target - Date.now());

  useEffect(() => {
    const id = setInterval(() => {
      setRemaining(target - Date.now());
    }, 1000);
    return () => clearInterval(id);
  }, [target]);

  if (remaining <= 0)
    return <div className="text-sm text-red-600">Expired</div>;

  const s = Math.floor(remaining / 1000) % 60;
  const m = Math.floor(remaining / (1000 * 60)) % 60;
  const h = Math.floor(remaining / (1000 * 60 * 60));

  return (
    <div className="flex justify-end">
      <div className="flex flex-col items-center space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
        {/* Hours */}
        <div className="flex flex-col items-center">
          <div className="border-2 border-black rounded-lg p-1 min-w-[50px] text-center md:p-2">
            <div className="text-sm font-bold text-blue-950 md:text-3xl">
              {h.toString().padStart(2, "0")}
            </div>
          </div>
          <div className="text-xs text-gray-600 mt-1">Hours</div>
        </div>

        {/* Minutes */}
        <div className="flex flex-col items-center">
          <div className="border-2 border-black rounded-lg p-1 min-w-[50px] text-center md:p-2">
            <div className="text-sm font-bold text-blue-950 md:text-3xl">
              {m.toString().padStart(2, "0")}
            </div>
          </div>
          <div className="text-xs text-gray-600 mt-1">Minutes</div>
        </div>

        {/* Seconds */}
        <div className="flex flex-col items-center">
          <div className="border-2 border-black rounded-lg p-1 min-w-[50px] text-center md:p-2">
            <div className="text-sm font-bold text-blue-950 md:text-3xl">
              {s.toString().padStart(2, "0")}
            </div>
          </div>
          <div className="text-xs text-gray-600 mt-1">Seconds</div>
        </div>
      </div>
    </div>
  );
}
