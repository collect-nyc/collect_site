import React, { useEffect, useRef } from "react";

const VideoPlayer = ({ source }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current && videoRef.current.paused) {
      // console.log("Video is paused", source);
      videoRef.current.play();
    }
  }, []);

  return (
    <video
      className="component_video"
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
