import PhotoCard from '@/components/photo-card';
import Link from 'next/link';
import { ArrowLeft, Heart, MapPin, Sparkles } from 'lucide-react';
import './album.css';

const imageData = [
  'https://gallary-lovat.vercel.app/vanphoto/van1.JPG',
  'https://gallary-lovat.vercel.app/vanphoto/19.jpg',
  'https://gallary-lovat.vercel.app/vanphoto/24.jpg',
  'https://gallary-lovat.vercel.app/vanphoto/12.jpg',
  'https://gallary-lovat.vercel.app/vanphoto/13.jpg',
  'https://gallary-lovat.vercel.app/vanphoto/14.jpg',
  'https://gallary-lovat.vercel.app/vanphoto/15.jpg',
  'https://gallary-lovat.vercel.app/vanphoto/16.jpg',
  'https://gallary-lovat.vercel.app/vanphoto/17.jpg',
  'https://gallary-lovat.vercel.app/vanphoto/18.jpg',
  'https://gallary-lovat.vercel.app/vanphoto/20.jpg',
  'https://gallary-lovat.vercel.app/vanphoto/21.jpg',
  'https://gallary-lovat.vercel.app/vanphoto/22.jpg',
  'https://gallary-lovat.vercel.app/vanphoto/23.jpg',
  'https://gallary-lovat.vercel.app/vanphoto/25.jpg',
  'https://gallary-lovat.vercel.app/vanphoto/26.jpg',
  'https://gallary-lovat.vercel.app/vanphoto/van10.jpg',
  'https://gallary-lovat.vercel.app/vanphoto/van11.jpg',
  'https://gallary-lovat.vercel.app/vanphoto/van2.JPG',
  'https://gallary-lovat.vercel.app/vanphoto/van3.JPG',
  'https://gallary-lovat.vercel.app/vanphoto/van4.JPG',
  'https://gallary-lovat.vercel.app/vanphoto/van5.jpg',
  'https://gallary-lovat.vercel.app/vanphoto/van6.jpg',
  'https://gallary-lovat.vercel.app/vanphoto/van7.jpg',
  'https://gallary-lovat.vercel.app/vanphoto/van8.jpg'
];

export default function VancouverAlbumPage() {
  return (
    <main className="memory-album">
      <nav className="album-nav" aria-label="Album navigation">
        <Link href="/" className="album-back"><ArrowLeft size={16} /> Back to portfolio</Link>
        <span className="album-volume">TRAVEL DIARY / VOL. 01</span>
      </nav>
      <header className="album-header">
        <span className="album-location"><MapPin size={14} /> Vancouver, Canada</span>
        <h1>Little moments,<br /><span>big memories.</span><Sparkles className="album-sparkle" aria-hidden="true" /></h1>
        <p>バンクーバーで見つけた、忘れたくない日々。</p>
        <span className="album-note">a little collection of my Vancouver days</span>
      </header>
      <PhotoCard imageData={imageData} />
      <footer className="album-footer"><Heart size={14} aria-hidden="true" /> Collected with love, kept forever.</footer>
    </main>
  )
}
