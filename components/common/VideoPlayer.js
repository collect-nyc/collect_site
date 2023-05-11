import React, { useEffect, useRef, useState } from "react";

const VideoPlayer = ({ source }) => {
  const videoRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const handleLoadedData = () => {
    setIsLoaded(true);
  };

  useEffect(() => {
    if (isLoaded) {
      console.log("Video is loaded", source);
      videoRef.current.play();
    }

    return () => {
      setIsLoaded(false);
    };
  }, [isLoaded]);

  useEffect(() => {
    if (videoRef.current && videoRef.current.paused) {
      console.log("Video is paused", source);
      videoRef.current.play();
    }
  }, []);

  return (
    <video
      className="component_video"
      // onLoadedData={handleLoadedData}
      ref={videoRef}
      autoPlay
      muted
      loop
      playsInline
    >
      <source src={source} type="video/mp4" />
    </video>
  );
};

export default VideoPlayer;
