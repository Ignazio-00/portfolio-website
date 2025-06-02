import React from "react";
import {
  Code,
  Database,
  Wrench,
  Globe,
  Award,
  Users,
  Coffee,
} from "lucide-react";

const About: React.FC = () => {
  const skills = {
    Frontend: [
      "React",
      "TypeScript",
      "JavaScript",
      "HTML",
      "CSS",
      "Tailwind CSS",
      "Next.js",
      "Remix",
      "Responsive Design",
      "Authentication",
    ],
    Backend: [
      "Node.js",
      "Express.js",
      "NestJS",
      "Python",
      "FastAPI",
      "PostgreSQL",
      "MongoDB",
      "REST APIs",
      "GraphQL",
      "Redis",
      "MongoDB",
      "Prisma",
      "TypeORM",
    ],
    Tools: [
      "Git",
      "Docker",
      "AWS",
      "Vercel",
      "Netlify",
      "Webpack",
      "Vite",
      "Jest",
      "Cypress",
      "Figma",
    ],
    Other: [
      "Agile/Scrum",
      "UI/UX Design",
      "SEO",
      "Performance Optimization",
      "Testing",
      "CI/CD",
      "AI",
    ],
  };

  const skillIcons = {
    Frontend: <Code className="w-6 h-6" />,
    Backend: <Database className="w-6 h-6" />,
    Tools: <Wrench className="w-6 h-6" />,
    Other: <Globe className="w-6 h-6" />,
  };

  const stats = [
    {
      icon: <Award className="w-6 h-6" />,
      value: "1st",
      label: "Intel Liftoff Challenge Winner",
      color: "text-primary-600",
    },
    {
      icon: <Users className="w-6 h-6" />,
      value: "3+",
      label: "Years Experience",
      color: "text-secondary-600",
    },
    {
      icon: <Coffee className="w-6 h-6" />,
      value: "1000+",
      label: "Cups of Coffee",
      color: "text-accent-600",
    },
  ];

  return (
    <section id="about" className="section bg-white dark:bg-neutral-800">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-secondary-100 dark:bg-secondary-900 text-secondary-700 dark:text-secondary-300 rounded-full text-sm font-medium">
            <Users size={16} />
            Get to Know Me
          </div>

          <h2 className="font-display font-bold text-neutral-900 dark:text-white mb-6">
            About Me
          </h2>

          <div className="w-24 h-1 bg-gradient-to-r from-secondary-600 to-accent-600 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Profile Section */}
          <div className="text-center lg:text-left space-y-8">
            {/* Profile Image */}
            <div className="inline-block">
              <div className="relative">
                <div className="w-64 h-64 mx-auto lg:mx-0 rounded-3xl overflow-hidden shadow-large hover:shadow-glow transition-all duration-500 bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-700 dark:to-neutral-800">
                  <img
                    src="/images/profile/profile-photo.jpg"
                    alt="Ignazio Balistreri - Full Stack Developer"
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    onError={(e) => {
                      // Fallback to placeholder if image fails to load
                      const target = e.target as HTMLImageElement;
                      target.style.display = "none";
                      const fallback = target.nextElementSibling as HTMLElement;
                      if (fallback) fallback.style.display = "flex";
                    }}
                  />

                  {/* Fallback placeholder (hidden by default) */}
                  <div
                    className="absolute inset-0 bg-gradient-to-br from-primary-400 via-secondary-500 to-accent-500 flex items-center justify-center text-white text-6xl font-bold"
                    style={{ display: "none" }}
                  >
                    <span className="relative z-10">IB</span>
                  </div>
                </div>

                {/* Floating elements around avatar */}
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-accent-400 rounded-full animate-bounce opacity-80"></div>
                <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-secondary-400 rounded-full animate-pulse opacity-80"></div>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-3xl font-display font-bold text-neutral-900 dark:text-white">
                Ignazio
              </h3>

              <div className="space-y-4 text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed">
                <p>
                  I'm a passionate full stack developer with 3+ years of
                  experience creating digital solutions that make a difference.
                  Recently won 1st place in the Intel Liftoff Challenge at START
                  Hack 2024 with our AI-powered employee companion app for Bell
                  Food Group.
                </p>

                <p>
                  I love working with modern technologies and am always eager to
                  learn new skills. When I'm not coding, you can find me
                  exploring new technologies, participating in hackathons, or
                  enjoying outdoor activities. I believe in writing clean,
                  maintainable code and creating user experiences that delight.
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center lg:text-left">
                    <div className="card-interactive p-6 h-full">
                      <div
                        className={`${stat.color} mb-3 flex justify-center lg:justify-start`}
                      >
                        {stat.icon}
                      </div>
                      <div className={`text-3xl font-bold ${stat.color} mb-1`}>
                        {stat.value}
                      </div>
                      <div className="text-sm text-neutral-600 dark:text-neutral-400 font-medium">
                        {stat.label}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Skills Section */}
          <div className="space-y-8">
            <div className="text-center lg:text-left">
              <h3 className="text-2xl font-display font-bold text-neutral-900 dark:text-white mb-2">
                Skills & Technologies
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400">
                The tools and technologies I work with daily
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {Object.entries(skills).map(([category, skillList]) => (
                <div key={category} className="card-elevated p-6 group">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-primary-100 to-primary-200 dark:from-primary-900 dark:to-primary-800 text-primary-600 dark:text-primary-400 group-hover:scale-110 transition-transform duration-300">
                      {skillIcons[category as keyof typeof skillIcons]}
                    </div>
                    <h4 className="text-lg font-semibold text-neutral-900 dark:text-white">
                      {category}
                    </h4>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {skillList.map((skill, index) => (
                      <span
                        key={skill}
                        className="skill-tag"
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Additional Info */}
            <div className="card p-6 bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-primary-950 dark:to-secondary-950 border-primary-200 dark:border-primary-800">
              <h4 className="text-lg font-semibold text-neutral-900 dark:text-white mb-3">
                What I'm Currently Learning
              </h4>
              <div className="flex flex-wrap gap-2">
                {["Mobile Development", "React Native", "LLMs"].map((tech) => (
                  <span key={tech} className="badge-primary">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
