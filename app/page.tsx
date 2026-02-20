import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import ReflectionsSection from '@/components/ReflectionsSection';
import CloudSection from '@/components/CloudSection';
import WorkSection from '@/components/WorkSection';
import GamesSection from '@/components/GamesSection';
import Footer from '@/components/Footer';
import Navigation from '@/components/Navigation';
import TransitionBridge from '@/components/TransitionBridge';
import Preloader from '@/components/Preloader';
import MusicPlayer from '@/components/MusicPlayer';

export default function Home() {
    return (
        <main>
            <Preloader />
            <Navigation />
            <HeroSection />
            <TransitionBridge>
                <AboutSection />
                <ReflectionsSection />
                <CloudSection />
            </TransitionBridge>
            <WorkSection />
            <GamesSection />
            <Footer />
            <MusicPlayer />
        </main>
    );
}
