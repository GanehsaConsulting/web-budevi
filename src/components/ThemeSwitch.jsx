'use client';

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { TbMoonFilled, TbSunFilled, TbAdjustmentsFilled, TbAd } from "react-icons/tb";

export default function ThemeSwitch() {
  const { theme, setTheme } = useTheme('system');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="flex gap-2">
      <div className='flex gap-2 p-[6px] border border-neutral-400 rounded-full group relative'>
        <button
          onClick={() => setTheme('system')}
          className={`${theme === 'system' && 'dark:text-black text-white'} z-20 duration-300 active:scale-90`}>
          <TbAdjustmentsFilled />
        </button>
        <button
          onClick={() => setTheme('light')}
          className={`${theme === 'light' && 'dark:text-black text-white'} z-20 duration-300 active:scale-90`}>
          <TbSunFilled />
        </button>
        <button
          onClick={() => setTheme('dark')}
          className={`${theme === 'dark' && 'dark:text-black text-white'} z-20 duration-300 active:scale-90`}>
          <TbMoonFilled />
        </button>
        <div className={`w-[22px] h-[22px] rounded-full z-10 bg-mainColor dark:bg-secondaryColorD absolute inset-[3px] ease-in-out duration-300 group-active:scale-90
          ${theme === 'light' && "translate-x-6"}
          ${theme === 'dark' && "translate-x-12"}
          `}></div>
      </div>

    </div>
  );
}
