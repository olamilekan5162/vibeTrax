import React, { createContext, useState, useRef, useEffect } from 'react';

export const AudioContext = createContext();

export const AudioProvider = ({ children }) => {
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef(new Audio());

  // Set up audio element
  useEffect(() => {
    const audio = audioRef.current;
    
    // Event handlers
    const handleTimeUpdate = () => {
      setProgress((audio.currentTime / audio.duration) * 100);
    };
    
    const handleEnded = () => {
      setIsPlaying(false);
      setProgress(0);
    };
    
    // Add event listeners
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);
    
    // Cleanup
    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
      audio.pause();
    };
  }, []);

  // Update audio when track changes
  useEffect(() => {
    const audio = audioRef.current;
    
    if (currentTrack) {
      audio.src = currentTrack.audioSrc;
      if (isPlaying) {
        audio.play().catch(err => console.error("Playback failed:", err));
      }
    } else {
      audio.pause();
    }
  }, [currentTrack]);

  // Play/pause control
  useEffect(() => {
    const audio = audioRef.current;
    
    if (isPlaying) {
      audio.play().catch(err => {
        console.error("Playback failed:", err);
        setIsPlaying(false);
      });
    } else {
      audio.pause();
    }
  }, [isPlaying]);

  const playTrack = (track) => {
    if (currentTrack && currentTrack.id === track.id) {
      setIsPlaying(!isPlaying);
    } else {
      setCurrentTrack(track);
      setIsPlaying(true);
    }
  };

  const pauseTrack = () => {
    setIsPlaying(false);
  };

  const seekTo = (percent) => {
    const audio = audioRef.current;
    audio.currentTime = (percent / 100) * audio.duration;
    setProgress(percent);
  };

  return (
    <AudioContext.Provider value={{
      currentTrack,
      isPlaying,
      progress,
      playTrack,
      pauseTrack,
      seekTo
    }}>
      {children}
    </AudioContext.Provider>
  );
};