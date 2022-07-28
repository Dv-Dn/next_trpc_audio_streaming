import { memo } from "react";
import {
  PlayerPlay,
  PlayerPause,
  PlayerSkipBack,
  PlayerSkipForward,
  Repeat,
} from "tabler-icons-react";

const iconSettings = {
  size: 20,
  fill: "#2c3e50",
  color: "#2c3e50",
};

interface PlayerControlsProps {
  isPlaying: boolean;
  toPrevTrack: () => void;
  onPlayPause: () => void;
}

const PlayerControls = memo(
  ({ isPlaying, onPlayPause, toPrevTrack }: PlayerControlsProps) => {
    return (
      <div className="flex items-center justify-center gap-5">
        <button className="p-2" onClick={toPrevTrack}>
          <PlayerSkipBack {...iconSettings} />
        </button>

        <button className="rounded-full p-2 shadow-md " onClick={onPlayPause}>
          {isPlaying ? (
            <PlayerPause {...iconSettings} />
          ) : (
            <PlayerPlay {...iconSettings} />
          )}
        </button>
        <button className="p-2">
          <PlayerSkipForward {...iconSettings} />
        </button>
        <button>
          <Repeat size={iconSettings.size} color={iconSettings.color} />
        </button>
      </div>
    );
  }
);

export { PlayerControls };
