import React, { useEffect, useState } from "react";
import { Code, Loader } from "lucide-react";

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onLoadingComplete }) => {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState("Initializing...");

  useEffect(() => {
    const loadingSteps = [
      { text: "Loading components...", duration: 800 },
      { text: "Preparing portfolio...", duration: 600 },
      { text: "Almost ready...", duration: 400 },
      { text: "Welcome!", duration: 200 },
    ];

    let currentStep = 0;
    let currentProgress = 0;
    const totalDuration = loadingSteps.reduce(
      (sum, step) => sum + step.duration,
      0
    );

    const updateProgress = () => {
      if (currentStep < loadingSteps.length) {
        const step = loadingSteps[currentStep];
        setLoadingText(step.text);

        const stepProgress = (step.duration / totalDuration) * 100;
        const targetProgress = currentProgress + stepProgress;

        const animateProgress = () => {
          setProgress((prev) => {
            const increment = stepProgress / (step.duration / 50);
            const newProgress = Math.min(prev + increment, targetProgress);

            if (newProgress < targetProgress) {
              setTimeout(animateProgress, 50);
            } else {
              currentProgress = targetProgress;
              currentStep++;
              if (currentStep < loadingSteps.length) {
                setTimeout(updateProgress, 100);
              } else {
                setTimeout(() => {
                  setProgress(100);
                  setTimeout(onLoadingComplete, 500);
                }, 200);
              }
            }

            return newProgress;
          });
        };

        setTimeout(animateProgress, 200);
      }
    };

    updateProgress();
  }, [onLoadingComplete]);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-primary-600 via-secondary-600 to-accent-600 flex items-center justify-center z-50">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl animate-float"></div>
        <div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-white rounded-full blur-3xl animate-float"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white rounded-full blur-3xl animate-float"
          style={{ animationDelay: "4s" }}
        ></div>
      </div>

      <div className="text-center text-white z-10">
        {/* Logo */}
        <div className="mb-8 animate-scale-in">
          <div className="w-20 h-20 mx-auto mb-4 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center animate-pulse-slow">
            <Code size={40} className="text-white" />
          </div>
          <h1 className="text-3xl font-display font-bold">
            Ignazio Balistreri
          </h1>
          <p className="text-white/80 text-lg">Full-Stack Developer</p>
        </div>

        {/* Loading Animation */}
        <div className="mb-8 animate-fade-in-up delay-300">
          <div className="flex justify-center mb-4">
            <Loader size={32} className="animate-spin" />
          </div>

          {/* Progress Bar */}
          <div className="w-80 max-w-sm mx-auto">
            <div className="progress-bar bg-white/20 mb-4">
              <div
                className="progress-fill bg-white"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Loading Text */}
            <p className="text-white/90 font-medium animate-pulse">
              {loadingText}
            </p>

            {/* Progress Percentage */}
            <p className="text-white/60 text-sm mt-2">
              {Math.round(progress)}%
            </p>
          </div>
        </div>

        {/* Loading Dots */}
        <div className="loading-dots text-white/80 justify-center animate-fade-in-up delay-500">
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>

      {/* Particle Effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/30 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 6}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default LoadingScreen;
