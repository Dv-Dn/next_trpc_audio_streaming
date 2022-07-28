import { usePlayerStore } from "@/store/playerStore";
import { memo, useCallback, useEffect, useRef, useState } from "react";

import { Slider } from "../base/Slider";
import { PlayerControls } from "./PlayerControls";
import { ForwardedHandlers, PlayerTimeControl } from "./PlayerTimeControl";

import { Volume, Volume3 } from "tabler-icons-react";

// let audio: HTMLAudioElement | null = null;

export const Player = memo(() => {
  const {
    name,
    url: audioUrl,
    artist,
    genre,
  } = usePlayerStore((state) => state.track);

  const setTrack = usePlayerStore((state) => state.setTrack);

  const audioRef = useRef<HTMLAudioElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);

  const [isMuted, setIsMuted] = useState(false);

  const [volume, setVolume] = useState(75);

  const [duration, setDuration] = useState(100);

  const timeControlRef = useRef<ForwardedHandlers>(null);

  // useEffect(() => {
  //   const storagedAudio = localStorage.getItem("track");
  //   if (storagedAudio) {
  //     setTrack(JSON.parse(storagedAudio));
  //     // setAudioUrl(storagedAudio);
  //   }

  //   const handleTabClose = (event: Event) => {
  //     event.preventDefault();
  //     audioRef.current?.src &&
  //       localStorage.setItem(
  //         "track",
  //         JSON.stringify({
  //           name,
  //           url: audioUrl,
  //           artist,
  //           genre,
  //         })
  //       );
  //   };

  //   window.addEventListener("beforeunload", handleTabClose);

  //   return () => {
  //     window.removeEventListener("beforeunload", handleTabClose);
  //   };
  // }, []);

  useEffect(() => {
    setAudio();
    localStorage.setItem("audioUrl", audioRef.current?.src || "");
  }, [audioUrl]);

  const setAudio = useCallback(() => {
    if (!audioRef.current) return;

    if (audioUrl) {
      audioRef.current.src = audioUrl;
      audioRef.current.volume = isMuted ? 0 : volume / 100;
      audioRef.current.onloadedmetadata = () => {
        setDuration(Math.ceil(audioRef.current?.duration || 0));
      };
      audioRef.current.onended = () => {
        setIsPlaying(false);
      };
      audioRef.current.onloadeddata = () => {
        play();
      };

      audioRef.current.ontimeupdate = () => {
        timeControlRef?.current?.setCurrentTime(
          Math.ceil(audioRef.current?.currentTime || 0)
        );
      };
    }
  }, [audioUrl]);

  //
  //  CONTROLS
  //

  function audioSetCurrentTime(value: number) {
    if (audioRef.current) {
      timeControlRef?.current?.setCurrentTime(value);
      audioRef.current.currentTime = value;
    }
  }

  function toPrevTrack() {
    if (audioRef.current && audioRef.current?.currentTime > 5)
      audioSetCurrentTime(0);
  }

  function setVolumeHandler(volume: string | number) {
    if (!audioRef.current) return;

    audioRef.current.volume = Number(volume) / 100;
    setVolume(Number(volume));
  }

  function setCurrentTimeHandler(value: number) {
    if (audioRef.current) audioRef.current.currentTime = value;
  }

  function toggleMute() {
    if (!audioRef.current) return;
    audioRef.current.volume = isMuted ? volume / 100 : 0;
    setIsMuted(!isMuted);
  }
  // Play/Pause

  // https://developer.chrome.com/blog/play-request-was-interrupted/
  async function play() {
    audioRef.current?.play();
    setIsPlaying(true);
  }

  function pause() {
    audioRef.current?.pause();
    setIsPlaying(false);
  }

  const toggleIsPlaying = () => (isPlaying ? pause() : play());

  return (
    <div className="player grid h-[95px] grid-cols-3 items-center bg-slate-50 px-4 sm:px-24">
      <audio ref={audioRef} hidden />
      {/* Track info */}
      <div className="flex-1">{name}</div>

      {/* Control */}
      <div>
        <PlayerControls
          isPlaying={isPlaying}
          onPlayPause={toggleIsPlaying}
          toPrevTrack={toPrevTrack}
        />

        {/*  Moved to component for rendering optimization (forwardRef ... ) */}
        <PlayerTimeControl
          onSetCurrentTime={setCurrentTimeHandler}
          duration={duration}
          ref={timeControlRef}
        />
      </div>
      {/* Volume control */}
      <div>
        <div className="h-full"></div>
        <div className="flex flex-shrink items-center justify-center">
          <button onClick={toggleMute} className="mr-3">
            {isMuted ? (
              <Volume3 size={20} color="#2c3e50" />
            ) : (
              <Volume size={20} color="#2c3e50" />
            )}
            {/* <Volume3 size={20} color="#2c3e50" /> */}
          </button>

          <div className="w-6/12">
            <Slider
              value={volume}
              onChange={setVolumeHandler}
              disabled={isMuted}
            />
          </div>
        </div>
      </div>
    </div>
  );
});
