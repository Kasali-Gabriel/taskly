import About from '@/components/LandingPage/About';
import Banner from '@/components/LandingPage/Banner';
import Features from '@/components/LandingPage/Features';
import Footer from '@/components/LandingPage/Footer';
import Hero from '@/components/LandingPage/Hero';
import Navbar from '@/components/LandingPage/Navbar';
import Testimonials from '@/components/LandingPage/Testimonials';

const Page = () => {
  return (
    <div className="flex h-full min-h-screen w-screen flex-col">
      <Navbar />

      <main className="w-full space-y-28 px-2 pb-28 sm:px-5 xl:px-20">
        <Hero />
        <Features />
        <About />
        <Testimonials />
        <Banner />
      </main>

      <Footer />
    </div>
  );
};

export default Page;
