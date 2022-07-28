import { CSSProperties } from "react";
import clsx from "clsx";

interface SliderProps {
  label?: string;
  value: number;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  onChange?: (value: number) => void;
  onMouseUp?: () => void;
  onMouseDown?: () => void;
  onTouchStart?: () => void;
  onTouchEnd?: () => void;
}

export const Slider = ({
  label,
  disabled,
  value,
  onMouseUp,
  onMouseDown,
  onTouchStart,
  onTouchEnd,
  onChange,
  min = 0,
  max = 100,
  step = 1,
}: SliderProps) => {
  const calcWidth = value > max ? 100 : ((value - min) / (max - min)) * 100;

  return (
    <div
      className="group relative flex w-full flex-1 touch-none select-none items-center justify-center py-2"
      style={
        {
          "--thumb-size": "16px",
        } as CSSProperties
      }
    >
      <input
        type="range"
        className={clsx("w-full opacity-0", {
          "cursor-pointer": !disabled,
        })}
        value={value}
        onChange={(e) => onChange && onChange(+e.target.value)}
        onMouseUp={onMouseUp}
        onMouseDown={onMouseDown}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        min={min}
        max={max}
        step={step}
        disabled={disabled}
      />
      {/* BG */}
      <div
        className={`bg-gray pointer-events-none absolute h-1 w-full overflow-hidden rounded-xl bg-slate-200`}
      >
        {/* Fill */}
        <div
          className={clsx(
            "pointer-events-none h-1",
            disabled ? "bg-gray-500" : "bg-primary"
          )}
          style={{ width: `${calcWidth}%` }}
        ></div>
      </div>

      {/* Thumb */}
      <div className="bg pointer-events-none absolute h-full w-[calc(100%-16px)] scale-y-50 select-none pt-[1px] opacity-0 duration-150 group-hover:scale-y-100 group-hover:opacity-100">
        <div
          className={clsx(
            `pointer-events-none absolute h-4 w-4 -translate-x-1/2 select-none rounded-full`,
            disabled ? "bg-transparent" : "bg-primary"
          )}
          style={{ left: `${calcWidth}%` }}
        ></div>
      </div>
    </div>
  );
};
