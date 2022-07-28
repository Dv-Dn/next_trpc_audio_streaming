import { usePlayerStore } from "@/store/playerStore";
import { formatTime } from "@/utils/formatTime";
import {
  ForwardedRef,
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { Slider } from "../base/Slider";

export interface ForwardedHandlers {
  setCurrentTime: (time: number) => void;
}
interface PlayerTimeControlProps {
  onSetCurrentTime: (time: number) => void;
  duration: number;
}

// Moved to component for rendering optimization (forwardRef ... )

const PlayerTimeControl = forwardRef<ForwardedHandlers, PlayerTimeControlProps>(
  (
    { onSetCurrentTime, duration }: PlayerTimeControlProps,
    ref: ForwardedRef<ForwardedHandlers>
  ) => {
    const [currentTime, setCurrentTime] = useState(0);

    const isPlayerMousePressed = useRef(false);

    function onPlayerMouseDown() {
      isPlayerMousePressed.current = true;
    }
    function onPlayerMouseUp() {
      onSetCurrentTime(currentTime);
      isPlayerMousePressed.current = false;
    }

    useImperativeHandle(ref, () => ({
      setCurrentTime(time: number) {
        if (!isPlayerMousePressed.current) setCurrentTime(time);
      },
    }));

    return (
      <div className="flex items-center">
        <span>{formatTime(currentTime)}</span>
        {
          <div className="mx-3 w-full">
            <Slider
              value={currentTime}
              onChange={setCurrentTime}
              max={duration}
              onMouseUp={onPlayerMouseUp}
              onMouseDown={onPlayerMouseDown}
              onTouchStart={onPlayerMouseDown}
              onTouchEnd={onPlayerMouseUp}
            />
          </div>
        }
        <span>{formatTime(duration)}</span>
      </div>
    );
  }
);

export { PlayerTimeControl };
