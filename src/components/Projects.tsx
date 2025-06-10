import React from "react";
import { ExternalLink, Github, Eye, Star, TrendingUp, Zap } from "lucide-react";

interface Project {
  id: number;
  title: string;
  description: string;
  longDescription: string;
  technologies: string[];
  image: string;
  liveUrl: string;
  githubUrl: string;
  featured: boolean;
  category: string;
  stats?: {
    stars?: number;
    forks?: number;
    views?: string;
  };
}

const Projects: React.FC = () => {
  const projects: Project[] = [
    {
      id: 1,
      title: "BellBoost AI Companion",
      description:
        "Winner of Intel Liftoff Challenge at START Hack 2024 - AI-powered employee companion app.",
      longDescription:
        "Full-stack React Native mobile app with AI chat functionality, multi-language support, and employee matching system. Built for Bell Food Group to enhance employee experience and integration. Features real-time chat, language learning, health advice, and coworker matching with AI assistance.",
      technologies: [
        "React Native",
        "Expo",
        "Python",
        "FastAPI",
        "Poetry",
        "TypeScript",
        "Predictionguard LLM",
        "Chatengine IO",
        "Docker",
      ],
      image: "/images/projects/bellboost-team.png",
      liveUrl:
        "https://community.intel.com/t5/Blogs/Intel/We-Are-Intel/The-AI-SpeedRacers-Quest-at-Start-Hack-2024-with-Intel-Liftoff/post/1582160",
      githubUrl: "https://github.com/Hannes221/bellfood_start_2024",
      featured: true,
      category: "Mobile App",
      stats: {
        stars: 2,
        forks: 0,
        views: "500+",
      },
    },
    {
      id: 2,
      title: "Journal AI App",
      description: "A full-stack Journal AI companion app.",
      longDescription:
        "Built with React, Next.js, TypeScript, Tailwind CSS, MySQL and Prisma. Features include user authentication, AI mood analysis with langchain and Sentiment Score Dashboard.",
      technologies: [
        "React",
        "Next.js",
        "TypeScript",
        "Tailwind CSS",
        "MySQL",
        "Prisma",
        "Langchain",
        "OpenAI",
        "Vercel",
      ],
      image: "/images/projects/journal-app.png", // Journal app with dark background and "The best Journal App" text
      liveUrl: "https://journal-app-ai.vercel.app/",
      githubUrl: "https://github.com/Ignazio-00/journalAi-app-fullstack",
      featured: true,
      category: "Full Stack",
      stats: {
        stars: 124,
        forks: 32,
        views: "2.3k",
      },
    },
    {
      id: 3,
      title: "Real Estate Radar App",
      description: "A property listing platform.",
      longDescription:
        "Built with Next.js, JavaScript, React,TailwindCSS, MongoDB with Mongoose and Node.js. Features include property listing, search, filter, interactive map views, real time messaging between users and responsive design for all devices.",
      technologies: [
        "Next.js",
        "JavaScript",
        "React",
        "TailwindCSS",
        "MongoDB",
        "Mongoose",
        "Node.js",
      ],
      image: "/images/projects/real-estate-radar.png", // Real Estate Radar website with blue header and property listings
      liveUrl: "https://real-estate-radar.vercel.app/",
      githubUrl: "https://github.com/Ignazio-00/RealEstateRadar",
      featured: false,
      category: "Web App",
      stats: {
        stars: 89,
        forks: 21,
        views: "1.8k",
      },
    },
    {
      id: 4,
      title: "Automated Pharmacy",
      description:
        "A prescription management platform that enables patients to manage their medical prescriptions digitally.",
      longDescription:
        "Full-Stack application built with Remix with React, TypeScript, TailwindCSS, PostgreSQL, Node.js and NestJS. Features include patient registration, prescription management, inventory tracking, and secure payment processing.",
      technologies: [
        "Remix",
        "React",
        "TypeScript",
        "TailwindCSS",
        "PostgreSQL",
        "Node.js",
        "NestJS",
        "Stripe",
        "Docker",
      ],
      image: "/images/projects/pharmacy-app.png", // German login form with "WILLKOMMEN ZURÜCK!" text
      liveUrl: "https://rezept.cannadoc24.de/login",
      githubUrl: "",
      featured: false,
      category: "Full Stack Freelance Project",
      stats: {
        stars: 67,
        forks: 15,
        views: "1.2k",
      },
    },
    {
      id: 5,
      title: "Hit Your Protein",
      description:
        "Scientific daily protein calculator built with React and TypeScript.",
      longDescription:
        "A simple, scientific daily protein calculator that provides personalized protein needs based on current sports nutrition research. Features dual unit support (kg/lb), three goal categories (maintain, build, maximize), instant calculations, and meal distribution recommendations. Built with React 18, TypeScript, and TailwindCSS.",
      technologies: [
        "React",
        "TypeScript",
        "TailwindCSS",
        "Vite",
        "Lucide React",
        "Vercel",
      ],
      image: "/images/projects/hit-your-protein.png",
      liveUrl: "https://hit-your-protein.vercel.app/",
      githubUrl: "https://github.com/Ignazio-00/hit-your-protein",
      featured: false,
      category: "Web App",
      stats: {
        stars: 1,
        forks: 0,
        views: "200+",
      },
    },
    {
      id: 6,
      title: "ChildRight",
      description:
        "AI-powered child support assistant with step-by-step legal guidance and community support.",
      longDescription:
        "Comprehensive full-stack application designed to empower individuals to handle child support claims independently. Features AI-assisted legal document generation, child support calculator, multi-step wizard forms, real-time chat community, and secure file management. Built with modern T3 stack architecture and includes comprehensive testing, CI/CD, and production-grade infrastructure.",
      technologies: [
        "React",
        "Next.js",
        "TypeScript",
        "TailwindCSS",
        "tRPC",
        "Prisma",
        "MySQL",
        "NextAuth.js",
        "AWS S3",
        "Mantine",
        "Playwright",
        "Vercel",
      ],
      image: "/images/projects/childright-app.png",
      liveUrl: "https://childright.vercel.app/",
      githubUrl: "https://github.com/Ignazio-00/childright",
      featured: false,
      category: "Full Stack",
      stats: {
        stars: 1,
        forks: 0,
        views: "300+",
      },
    },
  ];

  const ProjectCard: React.FC<{ project: Project }> = ({ project }) => (
    <div className="card-elevated p-0 overflow-hidden group">
      {/* Project Image */}
      <div className="relative overflow-hidden h-64">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
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
          className="absolute inset-0 image-placeholder w-full h-full flex items-center justify-center"
          style={{ display: "none" }}
        >
          <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-large">
            {project.title
              .split(" ")
              .map((word) => word[0])
              .join("")}
          </div>
        </div>

        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className="badge-primary backdrop-blur-sm">
            {project.category}
          </span>
        </div>

        {/* Featured Badge */}
        {project.featured && (
          <div className="absolute top-4 right-4">
            <div className="flex items-center gap-1 px-2 py-1 bg-accent-500 text-white rounded-full text-xs font-medium shadow-medium">
              <Star size={12} fill="currentColor" />
              Featured
            </div>
          </div>
        )}

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
      </div>

      {/* Project Content */}
      <div className="p-6 space-y-4">
        {/* Title and Stats */}
        <div className="space-y-2">
          <h3 className="text-xl font-bold text-neutral-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-200">
            {project.title}
          </h3>

          {/* Project Stats */}
          {project.stats && (
            <div className="flex items-center gap-4 text-sm text-neutral-500 dark:text-neutral-400">
              {project.stats.stars && (
                <div className="flex items-center gap-1">
                  <Star size={14} />
                  <span>{project.stats.stars}</span>
                </div>
              )}
              {project.stats.views && (
                <div className="flex items-center gap-1">
                  <TrendingUp size={14} />
                  <span>{project.stats.views}</span>
                </div>
              )}
              <div className="flex items-center gap-1">
                <Zap size={14} />
                <span className="text-primary-600 dark:text-primary-400 font-medium">
                  Active
                </span>
              </div>
            </div>
          )}
        </div>

        <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed">
          {project.description}
        </p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2">
          {project.technologies.slice(0, 4).map((tech) => (
            <span key={tech} className="skill-tag">
              {tech}
            </span>
          ))}
          {project.technologies.length > 4 && (
            <span className="skill-tag font-medium">
              +{project.technologies.length - 4} more
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-2">
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`btn btn-primary text-sm py-2.5 ${
              project.githubUrl ? "flex-1" : "w-full"
            }`}
          >
            <ExternalLink size={16} />
            Live Demo
          </a>
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary text-sm py-2.5 px-4"
            >
              <Github size={16} />
            </a>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <section id="projects" className="section section-alternate">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 rounded-full text-sm font-medium">
            <Zap size={16} />
            Recent Work
          </div>

          <h2 className="font-display font-bold text-neutral-900 dark:text-white mb-6">
            Featured Projects
          </h2>

          <div className="w-24 h-1 bg-gradient-to-r from-primary-600 to-secondary-600 mx-auto rounded-full mb-6"></div>

          <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto leading-relaxed">
            Here are some of my recent projects that showcase my skills in
            full-stack development, UI/UX design, and problem-solving. Each
            project represents a unique challenge and solution.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <ProjectCard project={project} />
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4">
            <a
              href="https://github.com/Ignazio-00"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
            >
              <Github size={20} />
              View All Projects
            </a>

            <span className="text-neutral-500 dark:text-neutral-400 text-sm">
              50+ repositories available on GitHub
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
