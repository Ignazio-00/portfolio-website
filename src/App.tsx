import React, { useState, useEffect, Suspense, lazy } from "react";
import { ThemeProvider } from "./contexts/ThemeContext";
import Navigation from "./components/Navigation";
import Hero from "./components/Hero";
import LoadingScreen from "./components/LoadingScreen";
import LazySection from "./components/LazySection";
import { measurePerformance, addResourceHints } from "./utils/performance";

// Lazy load non-critical components for better performance
const About = lazy(() => import("./components/About"));
const Projects = lazy(() => import("./components/Projects"));
const Testimonials = lazy(() => import("./components/Testimonials"));
const Contact = lazy(() => import("./components/Contact"));
const Footer = lazy(() => import("./components/Footer"));

// Loading fallback component
const SectionSkeleton: React.FC = () => (
  <div className="section">
    <div className="max-w-7xl mx-auto">
      <div className="space-y-8 animate-pulse">
        <div className="skeleton h-8 w-64 mx-auto mb-12"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="card p-6 space-y-4">
              <div className="skeleton h-6 w-3/4"></div>
              <div className="skeleton h-4 w-full"></div>
              <div className="skeleton h-4 w-5/6"></div>
              <div className="skeleton h-32 w-full"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  const handleLoadingComplete = () => {
    setIsLoading(false);
    // Small delay to ensure smooth transition
    setTimeout(() => {
      setShowContent(true);
    }, 100);
  };

  // Preload critical resources and set up performance monitoring
  useEffect(() => {
    // Add resource hints for better performance
    addResourceHints();

    // Initialize performance monitoring
    const performanceMonitor = measurePerformance();

    // Preload fonts and critical images
    const preloadResources = async () => {
      // Preload font variations
      const fontPromises = [
        document.fonts.load("400 1em Inter"),
        document.fonts.load("600 1em Inter"),
        document.fonts.load("700 1em Inter"),
      ];

      // Preload critical images (placeholder for future use)
      const criticalImages: string[] = [
        // Add critical image URLs here when you have actual images
      ];

      const imagePromises = criticalImages.map((src: string) => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.onload = resolve;
          img.onerror = reject;
          img.src = src;
        });
      });

      try {
        await Promise.all([...fontPromises, ...imagePromises]);
      } catch (error) {
        console.log("Resource preloading completed with some errors:", error);
      }
    };

    preloadResources();

    // Cleanup function
    return () => {
      performanceMonitor.cleanup();
    };
  }, []);

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-white dark:bg-neutral-900 transition-colors duration-300">
        {/* Loading Screen */}
        {isLoading && (
          <LoadingScreen onLoadingComplete={handleLoadingComplete} />
        )}

        {/* Main Content */}
        <div
          className={`transition-all duration-700 ${
            showContent ? "opacity-100" : "opacity-0"
          }`}
        >
          <Navigation />

          <main>
            {/* Hero section loads immediately - above the fold */}
            <Hero />

            {/* Lazy load other sections with intersection observer */}
            <Suspense fallback={<SectionSkeleton />}>
              <LazySection
                className="section"
                rootMargin="200px"
                animationClass="animate-fade-in-up"
              >
                <About />
              </LazySection>
            </Suspense>

            <Suspense fallback={<SectionSkeleton />}>
              <LazySection
                className="section"
                rootMargin="200px"
                animationClass="animate-slide-in-left"
              >
                <Projects />
              </LazySection>
            </Suspense>

            <Suspense fallback={<SectionSkeleton />}>
              <LazySection
                className="section"
                rootMargin="200px"
                animationClass="animate-slide-in-right"
              >
                <Testimonials />
              </LazySection>
            </Suspense>

            <Suspense fallback={<SectionSkeleton />}>
              <LazySection
                className="section"
                rootMargin="200px"
                animationClass="animate-fade-in-up"
              >
                <Contact />
              </LazySection>
            </Suspense>
          </main>

          <Suspense fallback={<div className="h-32 skeleton"></div>}>
            <LazySection rootMargin="100px" animationClass="animate-fade-in">
              <Footer />
            </LazySection>
          </Suspense>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
