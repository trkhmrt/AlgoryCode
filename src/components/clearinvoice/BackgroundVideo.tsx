"use client";

import Hls from "hls.js";
import { memo, useEffect, useRef } from "react";

const HLS_URL =
  "https://stream.mux.com/hUT6X11m1Vkw1QMxPOLgI761x2cfpi9bHFbi5cNg4014.m3u8";

export const BackgroundVideo = memo(function BackgroundVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return undefined;

    let hls: Hls | null = null;
    let cancelled = false;

    const safePlay = () => {
      const p = video.play();
      if (p !== undefined) {
        void p.catch(() => {});
      }
    };

    if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = HLS_URL;
      safePlay();
    } else if (Hls.isSupported()) {
      hls = new Hls({
        enableWorker: false,
      });
      hls.loadSource(HLS_URL);
      hls.attachMedia(video);
      hls.on(Hls.Events.MEDIA_ATTACHED, () => {
        if (!cancelled) safePlay();
      });
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        if (!cancelled) safePlay();
      });
      hls.on(Hls.Events.ERROR, (_, data) => {
        if (data.fatal && data.type === Hls.ErrorTypes.NETWORK_ERROR) {
          hls?.startLoad();
        } else if (data.fatal && data.type === Hls.ErrorTypes.MEDIA_ERROR) {
          hls?.recoverMediaError();
        }
      });
    }

    return () => {
      cancelled = true;
      if (hls) {
        hls.destroy();
        hls = null;
      }
      video.pause();
      video.removeAttribute("src");
      video.load();
    };
  }, []);

  return (
    <video
      ref={videoRef}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      className="pointer-events-none absolute inset-0 z-0 min-h-full min-w-full object-cover"
      aria-hidden
    />
  );
});
