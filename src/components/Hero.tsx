import React from "react";
import { Github, Linkedin, Mail, MapPin, ArrowDown } from "lucide-react";

const Hero: React.FC = () => {
  const scrollToAbout = () => {
    const aboutSection = document.querySelector("#about");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToContact = () => {
    const contactSection = document.querySelector("#contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="section-hero bg-mesh relative overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-pattern opacity-30"></div>

      {/* Floating Shapes */}
      <div className="floating-shape w-64 h-64 bg-gradient-to-br from-primary-400/30 to-secondary-500/30 top-20 -left-32"></div>
      <div
        className="floating-shape w-48 h-48 bg-gradient-to-br from-accent-400/20 to-primary-500/20 top-1/2 -right-24"
        style={{ animationDelay: "2s" }}
      ></div>
      <div
        className="floating-shape w-32 h-32 bg-gradient-to-br from-secondary-400/40 to-accent-500/40 bottom-32 left-1/4"
        style={{ animationDelay: "4s" }}
      ></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* Content */}
          <div className="flex-1 text-center lg:text-left">
            {/* Availability Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm rounded-full shadow-soft border border-white/50 dark:border-neutral-700/50">
              <div className="status-online animate-pulse"></div>
              <span className="text-sm font-medium text-success-700 dark:text-success-400">
                Available for new opportunities
              </span>
            </div>

            <h1 className="font-display font-bold mb-6 animate-fade-in-up">
              Hi, I'm{" "}
              <span className="text-gradient animate-gradient">
                Ignazio Balistreri
              </span>
            </h1>

            <p
              className="text-xl sm:text-2xl text-neutral-600 dark:text-neutral-400 mb-8 leading-relaxed animate-fade-in-up"
              style={{ animationDelay: "0.2s" }}
            >
              Full-Stack Developer passionate about creating{" "}
              <span className="text-gradient-primary font-semibold">
                exceptional digital experiences
              </span>{" "}
              through clean code and innovative solutions.
            </p>

            <div
              className="flex items-center justify-center lg:justify-start gap-2 mb-8 text-neutral-600 dark:text-neutral-400 animate-fade-in-up"
              style={{ animationDelay: "0.3s" }}
            >
              <MapPin
                size={18}
                className="text-primary-600 dark:text-primary-400"
              />
              <span>Berlin, Germany</span>
            </div>

            {/* Action Buttons */}
            <div
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12 animate-fade-in-up"
              style={{ animationDelay: "0.4s" }}
            >
              <button onClick={scrollToContact} className="btn btn-primary">
                <Mail size={18} />
                Get In Touch
              </button>

              <button
                onClick={() => {
                  const projectsSection = document.querySelector("#projects");
                  if (projectsSection) {
                    projectsSection.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                className="btn btn-secondary"
              >
                View My Work
              </button>
            </div>

            {/* Social Links */}
            <div
              className="flex items-center justify-center lg:justify-start gap-4 animate-fade-in-up"
              style={{ animationDelay: "0.5s" }}
            >
              <a
                href="https://github.com/Ignazio-00"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                aria-label="GitHub Profile"
              >
                <Github size={20} />
              </a>
              <a
                href="https://linkedin.com/in/ignazio-balistreri/"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                aria-label="LinkedIn Profile"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="mailto:ignazio.balistreri@code.berlin"
                className="social-link"
                aria-label="Send Email"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>

          {/* Profile Image */}
          <div
            className="flex-shrink-0 animate-fade-in-up"
            style={{ animationDelay: "0.6s" }}
          >
            <div className="relative">
              {/* Floating Elements */}
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-gradient-to-br from-primary-400/20 to-secondary-500/20 rounded-2xl animate-float"></div>
              <div
                className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-br from-accent-400/20 to-primary-500/20 rounded-full animate-float"
                style={{ animationDelay: "1s" }}
              ></div>

              {/* Main Avatar */}
              <div className="relative w-80 h-80 rounded-3xl bg-gradient-to-br from-primary-100 to-secondary-100 dark:from-primary-900 dark:to-secondary-900 p-8 shadow-large hover:shadow-glow transition-all duration-500">
                <div className="w-full h-full rounded-2xl image-placeholder">
                  <div className="text-6xl font-bold text-primary-600 dark:text-primary-400">
                    IB
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-fade-in-up"
          style={{ animationDelay: "0.8s" }}
        >
          <button
            onClick={scrollToAbout}
            className="flex flex-col items-center gap-2 text-neutral-600 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-300 group"
            aria-label="Scroll to About section"
          >
            <span className="text-sm font-medium">Scroll to explore</span>
            <div className="p-2 rounded-full border-2 border-current group-hover:bg-primary-600 group-hover:text-white transition-all duration-300">
              <ArrowDown size={16} className="animate-bounce" />
            </div>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
