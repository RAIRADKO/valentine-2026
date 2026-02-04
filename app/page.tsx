import HeroSection from "@/components/HeroSection";
import InteractiveHeart from "@/components/InteractiveHeart";
import PhotoGallery from "@/components/PhotoGallery";
import WhyILoveYou from "@/components/WhyILoveYou";
import TheQuestion from "@/components/TheQuestion";
import { Heart } from "lucide-react";

export default function Home() {
  return (
    <main className="relative">
      {/* Hero Section with Typewriter Effect */}
      <HeroSection name="Athalia Sayang" />

      {/* Interactive Heart */}
      <InteractiveHeart />

      {/* Photo Gallery with Scroll Reveal */}
      <PhotoGallery />

      {/* Why I Love You Flip Cards */}
      <WhyILoveYou />

      {/* The Question - Will You Be My Valentine? */}
      <TheQuestion />

      {/* Footer */}
      <footer className="py-8 text-center bg-gradient-to-t from-rose-200/50 to-transparent">
        <div className="flex items-center justify-center gap-2 text-rose-500">
          <span>Made with</span>
          <Heart size={18} fill="currentColor" className="animate-pulse-heart" />
          <span>for you</span>
        </div>
        <p className="text-rose-400 text-sm mt-2">
          Happy Valentine&apos;s Day 2026 💕
        </p>
      </footer>
    </main>
  );
}
