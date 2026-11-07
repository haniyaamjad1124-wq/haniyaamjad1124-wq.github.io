import React, { useEffect, useRef, useState } from "react";
import type { PlayPin } from "../../data/sections";

/*
  A pin board: photos and short clips in masonry columns, each with a
  caption underneath. A pin with a story is a card. Click it (or press
  Enter) and it turns over to a coloured back with the story. Click again
  to turn it back. Reduced motion: the faces swap without the turn.

  Clips are muted and loop. They play only while at least half of the pin
  is on screen, so a page full of clips does not all run at once. With
  reduced motion on, a clip waits for a tap on its play mark instead.
*/
function Clip({ pin, eager }: { pin: PlayPin; eager: boolean }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [manual, setManual] = useState(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (still) {
      setManual(true);
      return;
    }
    const io = new IntersectionObserver(
      entries => {
        const on = entries[0].isIntersecting;
        if (on) video.play().catch(() => setManual(true));
        else video.pause();
      },
      { threshold: 0.5 }
    );
    io.observe(video);
    return () => io.disconnect();
  }, []);

  const toggle = () => {
    const video = ref.current;
    if (!video) return;
    if (video.paused) video.play().catch(() => undefined);
    else video.pause();
  };

  return (
    <span className={`pin-clip${playing ? " is-playing" : ""}`}>
      <video
        ref={ref}
        className="pin-image"
        src={pin.video}
        poster={pin.image}
        muted
        loop
        playsInline
        preload={eager ? "auto" : "metadata"}
        aria-label={pin.alt}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      />
      {manual && (
        <button type="button" className="pin-clip-play" aria-label={playing ? "Pause clip" : "Play clip"} onClick={toggle}>
          <i />
        </button>
      )}
      {!manual && <span className="pin-clip-mark" aria-hidden="true"><i /></span>}
    </span>
  );
}

function Media({ pin, index }: { pin: PlayPin; index: number }) {
  if (pin.video) return <Clip pin={pin} eager={index < 4} />;
  return <img className="pin-image" src={pin.image} alt={pin.alt} loading={index < 4 ? "eager" : "lazy"} />;
}

function Pin({ pin, index }: { pin: PlayPin; index: number }) {
  const [flipped, setFlipped] = useState(false);
  const style = { "--i": index } as React.CSSProperties;

  if (!pin.story) {
    return (
      <figure className="pin" style={style}>
        <Media pin={pin} index={index} />
        {pin.caption && <figcaption className="pin-caption">{pin.caption}</figcaption>}
      </figure>
    );
  }
  return (
    <div className={`pin pin-flip${flipped ? " is-flipped" : ""}`} style={style}>
      <button
        type="button"
        className="pin-flip-button"
        aria-pressed={flipped}
        aria-label={flipped ? `Hide the story: ${pin.story.title}` : `Read the story: ${pin.story.title}`}
        onClick={() => setFlipped(f => !f)}
      >
        <span className="pin-flip-inner">
          <span className="pin-face pin-front">
            <Media pin={pin} index={index} />
            <span className="pin-flip-hint" aria-hidden="true">
              <i />
            </span>
          </span>
          <span className={`pin-face pin-back tone-${pin.story.tone}`}>
            <span className="pin-kicker">Story</span>
            <span className="pin-title">{pin.story.title}</span>
            <span className="pin-story">{pin.story.text}</span>
          </span>
        </span>
      </button>
      {pin.caption && <p className="pin-caption">{pin.caption}</p>}
    </div>
  );
}

export default function PlayBoard({ pins }: { pins: PlayPin[] }) {
  const [ready, setReady] = useState(false);
  const [cols, setCols] = useState(3);
  useEffect(() => {
    setReady(true);
    const mq = window.matchMedia("(max-width: 1024px)");
    const apply = () => setCols(mq.matches ? 2 : 3);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);
  if (!pins.length) return null;
  /* reading order: pin i goes to column i mod n, so the data order is the order on the page */
  const columns = Array.from({ length: cols }, (_, c) => pins.map((pin, i) => [pin, i] as const).filter(([, i]) => i % cols === c));
  return (
    <div className={`play-board${ready ? " is-ready" : ""}`} style={{ "--cols": cols } as React.CSSProperties}>
      {columns.map((column, c) => (
        <div className="play-col" key={c}>
          {column.map(([pin, i]) => (
            <Pin key={pin.image + i} pin={pin} index={i} />
          ))}
        </div>
      ))}
    </div>
  );
}
