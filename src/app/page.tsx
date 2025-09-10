"use client";
/* eslint-disable */
import React, {
  useState,
  useEffect,
  useRef,
  ChangeEvent,
  FormEvent,
} from "react";
import {
  ChevronDown,
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Code,
  Smartphone,
  Globe,
  Database,
  Terminal,
  Star,
  User,
  Send,
  Download,
  Menu,
  X,
  ArrowRight,
  Zap,
  Award,
  Coffee,
} from "lucide-react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
}
const Home = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const heroRef = useRef(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  // Particle system for canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Particle[] = [];
    const particleCount = 100;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        size: Math.random() * 3 + 1,
        opacity: Math.random() * 0.5 + 0.2,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(139, 92, 246, ${particle.opacity})`;
        ctx.fill();
      });

      // Connect nearby particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(139, 92, 246, ${
              0.1 * (1 - distance / 100)
            })`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Update active section based on scroll position
      const sections = [
        "home",
        "about",
        "skills",
        "projects",
        "experience",
        "contact",
      ];
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      sections.forEach((section) => {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section);
          }
        }
      });
    };

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const skills = [
    {
      name: "React Native",
      level: 90,
      icon: <Code className="w-6 h-6" />,
      color: "from-blue-400 to-purple-600",
    },
    {
      name: "Node.js",
      level: 80,
      icon: <Terminal className="w-6 h-6" />,
      color: "from-green-400 to-blue-500",
    },
    {
      name: "TypeScript",
      level: 85,
      icon: <Code className="w-6 h-6" />,
      color: "from-yellow-400 to-orange-500",
    },
    {
      name: "Javascript",
      level: 85,
      icon: <Globe className="w-6 h-6" />,
      color: "from-purple-400 to-pink-600",
    },
    {
      name: "Android",
      level: 80,
      icon: <Database className="w-6 h-6" />,
      color: "from-pink-400 to-red-500",
    },
    {
      name: "Java",
      level: 80,
      icon: <Smartphone className="w-6 h-6" />,
      color: "from-cyan-400 to-blue-600",
    },
  ];

  const projects = [
    {
      title: "AI-Powered Analytics Dashboard",
      description:
        "Revolutionary data visualization platform with machine learning insights, real-time processing, and predictive analytics for enterprise clients.",
      tech: ["React", "Python", "TensorFlow", "D3.js", "AWS"],
      github: "#",
      live: "#",
      image: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      featured: true,
      metrics: { users: "50K+", performance: "99.9%", growth: "+300%" },
    },
    {
      title: "Decentralized Trading Platform",
      description:
        "Next-generation cryptocurrency trading platform with DeFi integration, advanced charting, and automated trading strategies.",
      tech: ["Next.js", "Solidity", "Web3", "Chart.js", "Node.js"],
      github: "#",
      live: "#",
      image: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
      featured: true,
      metrics: { volume: "$2M+", trades: "100K+", uptime: "99.98%" },
    },
    {
      title: "Smart City IoT Dashboard",
      description:
        "Comprehensive IoT management system for smart cities with real-time monitoring, predictive maintenance, and citizen services integration.",
      tech: ["Vue.js", "IoT", "MongoDB", "Socket.io", "Docker"],
      github: "#",
      live: "#",
      image: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
      featured: true,
      metrics: { devices: "10K+", cities: "25+", efficiency: "+45%" },
    },
  ];

  const experience = [
    {
      company: "Infosys Limited",
      position: "Technology Analyst",
      duration: "02/2023 - 09/2024",

      technologies: ["React Native", "Javascript", "Typescript"],
      achievements: [
        "Develop and maintain high-performance React Native applications for iOS and Android platforms.",
        "Optimize app performance by profiling and identifying bottlenecks, implementing performance-enhancing techniques.",
        "Implement new frameworks and software meeting performance, reliability, and maintainability standards.",
        "Develop apps for various Android versions and screen sizes, ensuring compatibility and optimal performance.",
        "Write unit and UI tests to identify malfunctions using Jest and Enzymes.",
        "Launch and maintain apps in PlayStore and AppStore.",
      ],
    },
    {
      company: "Softprodigy System Solutions",
      position: "Associate Software Engineer",
      duration: "06/2021 - 01/2023",
      technologies: ["React Native", "Javascript", "Android", "Java", "Kotlin"],
      achievements: [
        "Built responsive and interactive mobile applications using React Native.",
        "Optimized app performance by refactoring codebase, reducing app crash rate by 40% and enhancing user rating to above 4 stars",
        "Utilized Redux/Hooks API for state management and efficient application performance.",
        "Collaborated with design and product teams to create intuitive user interfaces.",
        "Deployed applications using native build tools like XCode and Gradle.",
        "Debugged dependency conflicts and ensured smooth integration with third-party libraries.",
        "Strong verbal and written communication skills to communicate strategy and progress effectively.",
      ],
    },
  ];

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setActiveSection(sectionId);
      setIsMenuOpen(false);
    }
  };

  const nextProject = () => {
    setCurrentProjectIndex((prev) => (prev + 1) % projects.length);
  };

  const prevProject = () => {
    setCurrentProjectIndex(
      (prev) => (prev - 1 + projects.length) % projects.length
    );
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    console.log("Received request: ===>", process.env.EMAIL_KEY);
    try {
      const res = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (res.ok) {
        setShowSuccessPopup(true);
        setFormData({ name: "", email: "", subject: "", message: "" });
      }
    } catch (err) {

    }
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-x-hidden">
      {/* Animated Canvas Background */}
      <canvas ref={canvasRef} className="fixed inset-0 z-0" />

      {/* Dynamic Background Gradients */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-blue-900/20 to-teal-900/30"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
        <div
          className="absolute w-96 h-96 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl transition-all duration-1000 ease-out animate-pulse"
          style={{
            left: mousePosition.x - 192,
            top: mousePosition.y - 192,
            transform: "translate(-50%, -50%)",
          }}
        ></div>
        <div className="absolute top-20 right-20 w-72 h-72 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-full blur-2xl animate-bounce"></div>
        <div className="absolute bottom-20 left-20 w-64 h-64 bg-gradient-to-r from-pink-500/10 to-purple-500/10 rounded-full blur-2xl animate-pulse"></div>
      </div>

      {/* Navigation */}
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-black/90 backdrop-blur-xl border-b border-purple-500/20 shadow-2xl"
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="text-3xl font-black bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent animate-pulse">
              &lt;DevMaster/&gt;
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8">
              {[
                "Home",
                "About",
                "Skills",
                "Projects",
                "Experience",
                "Contact",
              ].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className={`relative px-4 py-2 font-semibold transition-all duration-300 group ${
                    activeSection === item.toLowerCase()
                      ? "text-purple-400"
                      : "text-gray-300 hover:text-white"
                  }`}
                >
                  {item}
                  <div
                    className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 transform transition-transform duration-300 ${
                      activeSection === item.toLowerCase()
                        ? "scale-x-100"
                        : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  ></div>
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-purple-400 hover:text-purple-300 transition-colors duration-300"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden absolute top-full left-0 w-full bg-black/95 backdrop-blur-xl border-b border-purple-500/20">
              <div className="px-6 py-4 space-y-4">
                {[
                  "Home",
                  "About",
                  "Skills",
                  "Projects",
                  "Experience",
                  "Contact",
                ].map((item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item.toLowerCase())}
                    className="block w-full text-left px-4 py-2 text-gray-300 hover:text-purple-400 transition-colors duration-300"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section
        ref={heroRef}
        id="home"
        className="min-h-screen flex items-center justify-center relative z-10"
      >
        <div className="container mx-auto px-6 text-center mt-30">
          <div className="mb-8">
            {/* Glowing Avatar */}
            <div className="relative w-40 h-40 mx-auto mb-12 mt-3">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 rounded-full animate-spin"></div>
              <div className="absolute inset-2 bg-black rounded-full flex items-center justify-center">
                <div className="w-32 h-32 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full backdrop-blur-sm flex items-center justify-center">
                  <User className="w-16 h-16 text-purple-400" />
                </div>
              </div>
              <div className="absolute -inset-4 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-xl animate-pulse"></div>
            </div>

            {/* Typing Animation Effect */}
            <div className="mb-8">
              <h1 className="text-6xl md:text-8xl p-2 font-black mb-4 bg-gradient-to-r from-white via-purple-200 to-purple-400 bg-clip-text text-transparent">
                Chirag Gulati
              </h1>
              <div className="text-2xl md:text-3xl text-gray-300 font-light mb-2">
                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent font-bold">
                  Mobile Application Developer
                </span>
              </div>
              <div className="text-lg md:text-xl text-cyan-400 font-mono">
                &lt; Building the future, one line of code at a time /&gt;
              </div>
            </div>

            <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
              {`Passionate engineer crafting `}
              <span className="text-purple-400 font-semibold">
                {`scalable solutions `}
              </span>
              and
              <span className="text-pink-400 font-semibold">
                {` immersive experiences`}
              </span>
              . Specialized in React Native, and emerging technologies.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-6 mb-12">
              <button className="group relative px-8 py-4 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 rounded-full text-white font-bold text-lg transition-all duration-300 transform hover:scale-110 hover:shadow-2xl overflow-hidden">
                <span className="relative z-10 flex items-center">
                  View My Work
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>

              <button className="group px-8 py-4 border-2 border-purple-400 hover:border-transparent bg-transparent hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 rounded-full text-purple-400 hover:text-white font-bold text-lg transition-all duration-300 transform hover:scale-110 flex items-center">
                <Download className="mr-2 w-5 h-5 group-hover:animate-bounce" />
                Download Resume
              </button>
            </div>

            {/* Social Links with Hover Effects */}
            <div className="flex justify-center space-x-8 mb-12">
              {[
                {
                  icon: Github,
                  href: "https://github.com/chiraggulati16",
                  label: "GitHub",
                },
                {
                  icon: Linkedin,
                  href: "https://www.linkedin.com/in/chirag-gulati-507412131/",
                  label: "LinkedIn",
                },
                {
                  icon: Mail,
                  href: "mailto:chirag.gulati282@gmail.com",
                  label: "Email",
                },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  className="group relative p-4 bg-gray-800/50 hover:bg-gray-700/50 rounded-full transition-all duration-300 transform hover:scale-110 hover:rotate-12 backdrop-blur-sm"
                >
                  <Icon className="w-6 h-6 text-gray-400 group-hover:text-purple-400 transition-colors duration-300" />
                  <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-black/90 text-white px-2 py-1 rounded text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {label}
                  </div>
                </a>
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 max-w-md mx-auto mb-12">
              {[
                { number: "7", label: "Projects" },
                { number: "5+", label: "Years Exp." },
                { number: "100K+", label: "Users Impacted" },
              ].map((stat) => (
                <div key={stat.label} className="text-center group">
                  <div className="text-3xl md:text-4xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
                    {stat.number}
                  </div>
                  <div className="text-gray-400 text-sm mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="animate-bounce">
            <div className="w-8 h-12 border-2 border-purple-400 rounded-full mx-auto flex justify-center">
              <div className="w-1 h-3 bg-purple-400 rounded-full mt-2 animate-pulse"></div>
            </div>
            <ChevronDown className="w-6 h-6 mx-auto mt-2 text-purple-400" />
          </div>
        </div>
      </section>

      {/* About Section - Enhanced */}
      <section id="about" className="py-32 relative z-10">
        <div className="container mx-auto px-6">
          <h2 className="text-5xl md:text-6xl font-black text-center mb-20 bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
            About Me
          </h2>
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <p className="text-xl text-gray-300 leading-relaxed">
                  I'm a
                  <span className="text-purple-400 font-semibold">
                    {` passionate technologist `}
                  </span>
                  with a relentless drive to push the boundaries of what's
                  possible in web development. My journey spans from
                  <span className="text-pink-400 font-semibold">
                    {` startup MVPs to enterprise-scale applications `}
                  </span>
                  serving millions of users.
                </p>
                <p className="text-xl text-gray-300 leading-relaxed">
                  I specialize in building
                  <span className="text-cyan-400 font-semibold">
                    {` high-performance applications `}
                  </span>
                  using cutting-edge technologies. My expertise includes modern
                  React ecosystems, serverless architectures, and AI-powered
                  solutions that deliver exceptional user experiences.
                </p>
                <div className="grid grid-cols-2 gap-6">
                  {[
                    { icon: Zap, text: "Performance Optimization Expert" },
                    { icon: Award, text: "Award-winning Solutions" },
                    { icon: Coffee, text: "Open Source Contributor" },
                    { icon: Star, text: "4.9/5 Client Rating" },
                  ].map(({ icon: Icon, text }) => (
                    <div
                      key={text}
                      className="flex items-center space-x-3 p-4 bg-gray-800/30 rounded-xl backdrop-blur-sm border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 hover:scale-105"
                    >
                      <Icon className="w-6 h-6 text-purple-400" />
                      <span className="text-sm text-gray-300">{text}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Interactive Code Block */}
              <div className="relative">
                <div className="bg-gray-900/90 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/30 shadow-2xl">
                  <div className="flex items-center space-x-2 mb-4">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-gray-400 text-sm ml-4">
                      developer.js
                    </span>
                  </div>
                  <div className="font-mono text-sm space-y-2">
                    <div className="text-purple-400">
                      const <span className="text-white">developer</span> =
                      {`{`}
                    </div>
                    <div className="ml-4 text-cyan-400">
                      name:
                      <span className="text-green-400">'Chirag Gulati'</span>,
                    </div>
                    <div className="ml-4 text-cyan-400">
                      role:
                      <span className="text-green-400">
                        'React Native Developer'
                      </span>
                      ,
                    </div>
                    <div className="ml-4 text-cyan-400">
                      skills: <span className="text-white">[</span>
                    </div>
                    <div className="ml-8 text-green-400">
                      'React Native', 'Node.js', 'SQL', 'Android'
                    </div>
                    <div className="ml-8 text-green-400">
                      'TypeScript', 'Java', 'Javascript'
                    </div>
                    <div className="ml-4 text-white">],</div>

                    <div className="ml-4 text-cyan-400">
                      available: <span className="text-yellow-400">true</span>
                    </div>
                    <div className="text-purple-400">{`};`}</div>
                  </div>
                </div>
                <div className="absolute -inset-4 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-3xl blur-xl opacity-75"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section - Redesigned */}
      <section id="skills" className="py-32 relative z-10">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/10 to-pink-900/10"></div>
        <div className="container mx-auto px-6 relative">
          <h2 className="text-5xl md:text-6xl font-black text-center mb-20 bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
            Technical Arsenal
          </h2>
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {skills.map((skill, index) => (
                <div
                  key={skill.name}
                  className="group relative bg-gray-900/50 backdrop-blur-xl rounded-2xl p-8 border border-purple-500/20 hover:border-purple-500/50 transition-all duration-500 hover:scale-105 hover:-translate-y-2"
                >
                  <div className="flex items-center mb-6">
                    <div
                      className={`p-3 rounded-xl bg-gradient-to-r ${skill.color} mr-4 group-hover:animate-pulse`}
                    >
                      {skill.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">
                        {skill.name}
                      </h3>
                      <div className="text-3xl font-black text-purple-400">
                        {skill.level}%
                      </div>
                    </div>
                  </div>

                  {/* Animated Progress Ring */}
                  <div className="relative w-32 h-32 mx-auto">
                    <svg
                      className="w-32 h-32 transform -rotate-90"
                      viewBox="0 0 36 36"
                    >
                      <path
                        d="m18,2.0845 a 15.9155,15.9155 0 0,1 0,31.831 a 15.9155,15.9155 0 0,1 0,-31.831"
                        fill="none"
                        stroke="#374151"
                        strokeWidth="2"
                      />
                      <path
                        d="m18,2.0845 a 15.9155,15.9155 0 0,1 0,31.831 a 15.9155,15.9155 0 0,1 0,-31.831"
                        fill="none"
                        stroke="url(#gradient)"
                        strokeWidth="2"
                        strokeDasharray={`${skill.level}, 100`}
                        className="transition-all duration-1000 ease-out"
                      />
                      <defs>
                        <linearGradient
                          id="gradient"
                          x1="0%"
                          y1="0%"
                          x2="100%"
                          y2="0%"
                        >
                          <stop offset="0%" stopColor="#8b5cf6" />
                          <stop offset="100%" stopColor="#ec4899" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-2xl font-bold text-white">
                        {skill.level}%
                      </span>
                    </div>
                  </div>

                  <div
                    className={`absolute inset-0 bg-gradient-to-r ${skill.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-500`}
                  ></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section - Completely Redesigned */}
      <section id="projects" className="py-32 relative z-10">
        <div className="container mx-auto px-6">
          <h2 className="text-5xl md:text-6xl font-black text-center mb-20 bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
            Featured Projects
          </h2>

          {/* Project Showcase */}
          <div className="max-w-7xl mx-auto">
            <div className="relative">
              <div className="overflow-hidden rounded-3xl">
                <div
                  className="flex transition-transform duration-700 ease-in-out"
                  style={{
                    transform: `translateX(-${currentProjectIndex * 100}%)`,
                  }}
                >
                  {projects.map((project, index) => (
                    <div key={index} className="min-w-full">
                      <div className="grid lg:grid-cols-2 gap-12 items-center p-12 bg-gray-900/50 backdrop-blur-xl border border-purple-500/20 rounded-3xl">
                        {/* Project Visual */}
                        <div className="relative group">
                          <div
                            className="h-80 rounded-2xl shadow-2xl transition-transform duration-500 group-hover:scale-105"
                            style={{ background: project.image }}
                          >
                            <div className="absolute inset-0 bg-black/40 rounded-2xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              <div className="text-white text-xl font-bold">
                                View Project
                              </div>
                            </div>
                          </div>

                          {/* Floating Metrics */}
                          <div className="absolute -top-4 -right-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full p-6 shadow-2xl">
                            <Star className="w-8 h-8 text-white" />
                          </div>

                          <div className="absolute -bottom-4 -left-4 grid grid-cols-3 gap-2">
                            {Object.entries(project.metrics).map(
                              ([key, value]) => (
                                <div
                                  key={key}
                                  className="bg-black/80 backdrop-blur-sm rounded-lg p-3 text-center border border-purple-500/30"
                                >
                                  <div className="text-purple-400 font-bold text-sm">
                                    {value}
                                  </div>
                                  <div className="text-gray-400 text-xs uppercase">
                                    {key}
                                  </div>
                                </div>
                              )
                            )}
                          </div>
                        </div>

                        {/* Project Details */}
                        <div className="space-y-6">
                          <div>
                            <h3 className="text-4xl font-black bg-gradient-to-r from-white to-purple-400 bg-clip-text text-transparent mb-4">
                              {project.title}
                            </h3>
                            <p className="text-xl text-gray-300 leading-relaxed">
                              {project.description}
                            </p>
                          </div>

                          {/* Tech Stack */}
                          <div className="flex flex-wrap gap-3">
                            {project.tech.map((tech, techIndex) => (
                              <span
                                key={techIndex}
                                className="px-4 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 text-sm font-semibold rounded-full border border-purple-500/30 backdrop-blur-sm hover:scale-110 transition-transform duration-300"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>

                          {/* Action Buttons */}
                          <div className="flex space-x-4 pt-6">
                            <a
                              href={project.github}
                              className="group flex items-center px-6 py-3 bg-gray-800 hover:bg-gray-700 rounded-xl text-white font-semibold transition-all duration-300 transform hover:scale-105 border border-gray-600 hover:border-purple-500"
                            >
                              <Github className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform duration-300" />
                              View Code
                            </a>
                            <a
                              href={project.live}
                              className="group flex items-center px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-xl text-white font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
                            >
                              <ExternalLink className="w-5 h-5 mr-2 group-hover:translate-x-1 transition-transform duration-300" />
                              Live Demo
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Navigation Buttons */}
              <button
                onClick={prevProject}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 p-4 bg-black/50 hover:bg-black/70 rounded-full text-white backdrop-blur-sm transition-all duration-300 hover:scale-110"
              >
                <ChevronDown className="w-6 h-6 rotate-90" />
              </button>
              <button
                onClick={nextProject}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 p-4 bg-black/50 hover:bg-black/70 rounded-full text-white backdrop-blur-sm transition-all duration-300 hover:scale-110"
              >
                <ChevronDown className="w-6 h-6 -rotate-90" />
              </button>

              {/* Project Indicators */}
              <div className="flex justify-center space-x-3 mt-8">
                {projects.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentProjectIndex(index)}
                    className={`w-4 h-4 rounded-full transition-all duration-300 ${
                      index === currentProjectIndex
                        ? "bg-gradient-to-r from-purple-500 to-pink-500 scale-125"
                        : "bg-gray-600 hover:bg-gray-500"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section - Enhanced */}
      <section id="experience" className="py-32 relative z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/5 to-transparent"></div>
        <div className="container mx-auto px-6 relative">
          <h2 className="text-5xl md:text-6xl font-black text-center mb-20 bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
            Career Journey
          </h2>
          <div className="max-w-6xl mx-auto">
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-3 md:left-1/2 transform md:-translate-x-px top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500 via-pink-500 to-cyan-500"></div>

              <div className="space-y-16">
                {experience.map((job, index) => (
                  <div
                    key={index}
                    className={`relative flex items-center ${
                      index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                    }`}
                  >
                    {/* Timeline Dot */}
                    <div className="absolute left-0.95 md:left-1/2 transform md:-translate-x-1/2 w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full border-4 border-black shadow-lg z-10">
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-ping opacity-75"></div>
                    </div>

                    {/* Content Card */}
                    <div
                      className={`w-full md:w-5/12 ml-20 md:ml-0 ${
                        index % 2 === 0
                          ? "md:mr-auto md:pr-8"
                          : "md:ml-auto md:pl-8"
                      }`}
                    >
                      <div className="group bg-gray-900/50 backdrop-blur-xl rounded-2xl p-8 border border-purple-500/20 hover:border-purple-500/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl">
                        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-4">
                          <div>
                            <h3 className="text-2xl font-bold text-purple-400 mb-1 group-hover:text-purple-300 transition-colors duration-300">
                              {job.position}
                            </h3>

                            <p className="text-xl text-white font-semibold flex-grow">
                              {job.company}
                            </p>
                            <div className="mt-3">
                              <span className="text-gray-400 text-sm px-3 py-1 bg-gray-800 rounded-full flex-shrink-0">
                                {job.duration}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* <p className="text-gray-300 leading-relaxed mb-6">
                          {job.description}
                        </p> */}

                        {/* Technologies */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {job.technologies.map((tech, techIndex) => (
                            <span
                              key={techIndex}
                              className="px-3 py-1 bg-purple-500/20 text-purple-300 text-xs rounded-full border border-purple-500/30"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>

                        {/* Achievements */}
                        <div className="space-y-2">
                          {job.achievements.map((achievement, achIndex) => (
                            <div
                              key={achIndex}
                              className="flex items-center text-sm text-gray-400"
                            >
                              <div className="w-2 h-2 bg-purple-400 rounded-full mr-3 flex-shrink-0"></div>
                              {achievement}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section - Premium Design */}
      <section id="contact" className="py-32 relative z-10">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-5xl md:text-6xl font-black mb-12 bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
            Let's Build Something Amazing
          </h2>
          <p className="text-2xl text-gray-300 mb-16 max-w-3xl mx-auto leading-relaxed">
            Ready to bring your vision to life? I'm passionate about
            collaborating on innovative projects that push boundaries and create
            meaningful impact.
          </p>

          {/* Contact Form */}
          <form method="POST" onSubmit={handleSubmit}>
            <div className="max-w-4xl mx-auto mb-16">
              <div className="bg-gray-900/50 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-purple-500/20 shadow-2xl">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <input
                      name="name"
                      onChange={handleChange}
                      type="text"
                      value={formData.name}
                      required
                      placeholder="Your Name"
                      className="w-full p-4 bg-gray-800/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none transition-colors duration-300"
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Your Email"
                      className="w-full p-4 bg-gray-800/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none transition-colors duration-300"
                      required
                    />
                  </div>
                  <div className="md:col-span-2">
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Project Subject"
                      className="w-full p-4 bg-gray-800/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none transition-colors duration-300"
                      required
                    />
                  </div>
                  <div className="md:col-span-2">
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={6}
                      placeholder="Tell me about your project..."
                      className="w-full p-4 bg-gray-800/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none transition-colors duration-300 resize-none"
                    ></textarea>
                  </div>
                </div>

                <button
                  type="submit"
                  className="group mt-8 px-12 py-4 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 rounded-full text-white font-bold text-lg transition-all duration-300 transform hover:scale-110 hover:shadow-2xl relative overflow-hidden"
                >
                  <span className="relative z-10 flex items-center justify-center">
                    Send Message
                    <Send className="ml-3 w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
              </div>
            </div>
          </form>

          {/* Quick Contact Options */}
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16">
            {[
              {
                icon: Mail,
                title: "Email",
                subtitle: "mailto:chirag.gulati282@gmail.com",
                href: "mailto:chirag.gulati282@gmail.com",
              },
              {
                icon: Github,
                title: "GitHub",
                subtitle: "/chiraggulati16",
                href: "https://github.com/chiraggulati16",
              },
              {
                icon: Linkedin,
                title: "LinkedIn",
                subtitle: "/in/chirag-gulati-507412131",
                href: "https://www.linkedin.com/in/chirag-gulati-507412131/",
              },
            ].map(({ icon: Icon, title, subtitle, href }) => (
              <a
                key={title}
                href={href}
                className="group p-8 bg-gray-900/30 backdrop-blur-sm rounded-2xl border border-purple-500/20 hover:border-purple-500/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl"
              >
                <Icon className="w-12 h-12 text-purple-400 mx-auto mb-4 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300" />
                <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
                <p className="text-gray-400">{subtitle}</p>
              </a>
            ))}
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <p className="text-xl text-gray-300 mb-8">
              Prefer a quick chat? I'm just one click away!
            </p>
            <button className="px-8 py-4 border-2 border-purple-400 hover:border-transparent bg-transparent hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 rounded-full text-purple-400 hover:text-white font-bold text-lg transition-all duration-300 transform hover:scale-110">
              Schedule a Call
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-gray-800 text-center relative z-10">
        <p className="text-purple-400 text-sm">
          "Code is poetry, and every project is a masterpiece in progress."
        </p>
      </footer>

      {showSuccessPopup ? (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg border-t-4 border-green-500">
            <div className="flex items-center">
              <svg
                className="h-6 w-6 text-green-500 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h3 className="text-lg font-semibold text-green-700">Success!</h3>
            </div>
            <p className="mt-2 text-gray-700">Message Send Successfully</p>
            <button onClick={() => setShowSuccessPopup(false)} className="mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
              Close
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Home;
