"use client"
import { animate } from "animejs";
import * as React from "react";
import '@/app/album/vanmemory/album.css';

import { useState } from "react"
import { ArrowLeft, ArrowRight, RotateCcw } from "lucide-react"

export function PhotoCard(props: { imageData: string[] }) {
  
  const el = React.useRef<HTMLDivElement>(null);
  let endPosition:number, startPosition:number;

  React.useEffect(() => {

    const cards = el.current!.children;

    // Initial cards position
    for (let i = 0; i < cards.length; i++) {

      const c = cards[i] as HTMLDivElement;
      const angle = Math.random() * 20 - 10;
      animate(
        c,
        {
        rotateZ:angle,
        translateZ:-i * ITEM_DISTANCE,
        duration:1200
      })
      c.dataset.z = (-i * ITEM_DISTANCE).toString();
    }

    // Reset card stack position
    animate(
      el.current!,
      {
      rotateX:-20,
      translateZ:-10,
      duration:0
    });
    endPosition = -cards.length * ITEM_DISTANCE;
    startPosition = -10 + ITEM_DISTANCE;
  }, [props.imageData]);

  // Swap next item in the stack
  function swapNext(index:number) {

    const cards = el.current!.children;
    const c = cards[index] as HTMLDivElement;
    const cardZ = parseFloat(c.dataset.z!);

    // Move card behind
    animate(
    c,      
    {
      translateX:[0, 600, 0],
      rotateY:[0, -45, 0],
      translateZ:[cardZ, cardZ, endPosition],
      easing:'easeOutQuad',
      duration:900
    });
    c.dataset.z = endPosition.toString();

    // Move stack closer
    animate(
      el.current!,
      {
      rotateX:-20,
      translateZ:startPosition,
      duration:600
    });
    endPosition -= ITEM_DISTANCE;
    startPosition += ITEM_DISTANCE;
  }

  return (
    <section className="album-viewer" aria-label="Vancouver photo album">
      <div className="album-photo-stage">
        <span className="album-sticker" aria-hidden="true">days to<br />remember ♡</span>
        <button className="album-polaroid" onClick={() => move(1)} aria-label={`Photo ${active + 1} of ${count}. Show next photo`}>
          <span className="album-tape" aria-hidden="true" />
          <span className="album-photo-window">
            {failedImages.has(imageData[active]) ? (
              <span className="album-photo-error">This memory couldn’t load.<br />Tap to see the next one ♡</span>
            ) : (
              <img
                key={imageData[active]}
                src={imageData[active]}
                alt={`Vancouver travel memory ${active + 1}`}
                onError={() => setFailedImages((current) => new Set(current).add(imageData[active]))}
              />
            )}
          </span>
          <span className="album-photo-caption"><span>Memory in Vancouver</span><span>♡ {String(active + 1).padStart(2, "0")}</span></span>
        </button>
        <span className="album-side-note" aria-hidden="true">oh, those days! ↗</span>
      </div>
      <p className="album-tap-hint">写真をタップして、次の思い出へ</p>
      <div className="album-controls">
        <button onClick={() => move(-1)} className="album-arrow" aria-label="Previous photo"><ArrowLeft size={20} /></button>
        <p className="album-counter" aria-live="polite" aria-atomic="true"><strong>{String(active + 1).padStart(2, "0")}</strong><span>/</span>{String(count).padStart(2, "0")}</p>
        <button onClick={() => move(1)} className="album-arrow" aria-label="Next photo"><ArrowRight size={20} /></button>
      </div>
      <button className="album-restart" onClick={() => setActive(0)}><RotateCcw size={13} /> Back to the first memory</button>
    </section>
  )
}
