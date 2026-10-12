"use client"

import { useState } from "react"
import { ArrowLeft, ArrowRight, RotateCcw } from "lucide-react"

export default function PhotoCard({ imageData }: { imageData: string[] }) {
  const [active, setActive] = useState(0)
  const [failedImages, setFailedImages] = useState<Set<string>>(new Set())
  const count = imageData.length
  if (!count) return <p className="album-empty">More memories coming soon.</p>

  function move(direction: number) {
    setActive((current) => (current + direction + count) % count)
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
