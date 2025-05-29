import React from "react";
import { Star } from "lucide-react";

const Testimonials: React.FC = () => {
  const companies = [
    {
      name: "Porsche AG",
      logo: "/images/companies/porsche-logo.png",
      description: "Software Engineering Intern",
    },
    {
      name: "CODE University",
      logo: "/images/companies/code-university-logo.png",
      description: "Software Engineering Student",
    },
  ];

  return (
    <section id="testimonials" className="section bg-white dark:bg-neutral-800">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-accent-100 dark:bg-accent-900 text-accent-700 dark:text-accent-300 rounded-full text-sm font-medium">
            <Star size={16} />
            Experience & Education
          </div>

          <h2 className="font-display font-bold text-neutral-900 dark:text-white mb-6">
            Proud to have worked with
          </h2>

          <div className="w-24 h-1 bg-gradient-to-r from-accent-600 to-secondary-600 mx-auto rounded-full mb-6"></div>

          <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto leading-relaxed">
            Organizations where I've gained valuable experience and contributed
            to meaningful projects.
          </p>
        </div>

        {/* Company Logos Section */}
        <div className="flex justify-center items-center gap-16 flex-wrap mb-16">
          {companies.map((company, index) => (
            <div
              key={index}
              className="group flex flex-col items-center gap-4 opacity-70 hover:opacity-100 transition-all duration-300 hover:scale-105"
            >
              <div className="w-32 h-32 rounded-3xl bg-white dark:bg-neutral-100 flex items-center justify-center p-6 group-hover:shadow-large transition-all duration-300 border border-neutral-200 dark:border-neutral-300">
                <img
                  src={company.logo}
                  alt={`${company.name} logo`}
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    // Fallback to initials if image fails to load
                    const target = e.target as HTMLImageElement;
                    target.style.display = "none";
                    const fallback = target.nextElementSibling as HTMLElement;
                    if (fallback) fallback.style.display = "flex";
                  }}
                />

                {/* Fallback placeholder (hidden by default) */}
                <div
                  className="w-full h-full bg-gradient-to-br from-primary-400 to-secondary-500 rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-medium"
                  style={{ display: "none" }}
                >
                  {company.name
                    .split(" ")
                    .map((word) => word[0])
                    .join("")}
                </div>
              </div>
              <div className="text-center">
                <div className="font-bold text-neutral-900 dark:text-white text-lg mb-1">
                  {company.name}
                </div>
                <div className="text-sm text-neutral-600 dark:text-neutral-400">
                  {company.description}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="card p-8 bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-primary-950 dark:to-secondary-950 border-primary-200 dark:border-primary-800 max-w-2xl mx-auto">
            <h3 className="text-xl font-display font-bold text-neutral-900 dark:text-white mb-4">
              Want to work together?
            </h3>
            <p className="text-neutral-600 dark:text-neutral-400 mb-6">
              I'm always open to discussing new opportunities and exciting
              projects. Let's connect and see how we can create something
              amazing together.
            </p>
            <button
              onClick={() => {
                const contactSection = document.querySelector("#contact");
                if (contactSection) {
                  contactSection.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className="btn btn-primary"
            >
              Get In Touch
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
