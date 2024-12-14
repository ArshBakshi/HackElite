import React, { useState } from "react";
import {
  ShieldCheckIcon,
  DatabaseIcon,
  CodeIcon,
  ServerIcon,
  ArrowRightIcon,
  GlobeIcon,
  LockIcon,
  BarChartIcon,
  CheckCircleIcon,
  GitMergeIcon,
} from "lucide-react";
import { Link } from "react-router-dom";

const BlockchainLandingPage = () => {
  const [hoveredFeature, setHoveredFeature] = useState(null);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const features = [
    {
      icon: ShieldCheckIcon,
      title: "Quantum Encryption",
      description:
        "Advanced cryptographic protocols leveraging quantum-resistant algorithms for unparalleled security.",
      color: "text-cyan-400",
      gradient: "from-cyan-500 to-blue-600",
    },
    {
      icon: DatabaseIcon,
      title: "Distributed Ledger",
      description:
        "Seamless, decentralized data management across multiple institutional networks with real-time synchronization.",
      color: "text-green-400",
      gradient: "from-green-500 to-teal-600",
    },
    {
      icon: CodeIcon,
      title: "Smart Contracts",
      description:
        "Autonomous, self-executing contracts with absolute precision, transparency, and cross-chain interoperability.",
      color: "text-purple-400",
      gradient: "from-purple-500 to-indigo-600",
    },
    {
      icon: GlobeIcon,
      title: "Global Compliance",
      description:
        "Adaptive regulatory framework ensuring seamless compliance across international jurisdictions.",
      color: "text-orange-400",
      gradient: "from-orange-500 to-red-600",
    },
  ];

  const testimonials = [
    {
      name: "Elena Rodriguez",
      role: "CTO, Global Financial Solutions",
      quote:
        "QuantumVault has revolutionized our approach to secure data management.",
      avatar: "/api/placeholder/80/80",
    },
    {
      name: "Michael Chen",
      role: "Head of Innovation, TechCorp",
      quote:
        "The smart contract integration has transformed our operational efficiency.",
      avatar: "/api/placeholder/80/80",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 px-8 py-6 flex justify-between items-center border-b border-white/10 bg-gray-900/80 backdrop-blur-sm">
        <div className="flex items-center space-x-4">
          <div 
            onClick={scrollToTop}
            className="flex items-center space-x-4 cursor-pointer hover:opacity-80 transition-opacity"
          >
            <ServerIcon className="w-10 h-10 text-cyan-400" />
            <h1 className="text-3xl font-bold tracking-tight text-cyan-300">
              BlockSafe
            </h1>
          </div>
        </div>
        <div className="flex items-center space-x-6">
          <button
            onClick={() => scrollToSection('features')}
            className="text-gray-300 hover:text-white transition-colors"
          >
            Features
          </button>
          <button
            onClick={() => scrollToSection('about')}
            className="text-gray-300 hover:text-white transition-colors"
          >
            About
          </button>
          <Link to="/login">
            <button className="px-6 py-3 bg-cyan-600 hover:bg-cyan-700 text-white font-semibold rounded-full flex items-center space-x-2 transition-all">
              <span>Login</span>
              <ArrowRightIcon className="w-5 h-5" />
            </button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="container mx-auto px-8 py-16 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-6xl font-extrabold mb-6 text-cyan-300 leading-tight">
            Blockchain.
            <br />
            Reinvented.
          </h2>
          <p className="text-xl text-gray-300 mb-8 leading-relaxed">
            Pioneering institutional record management with next-generation
            blockchain technology. Secure, transparent, and infinitely scalable
            infrastructure for the digital enterprise.
          </p>

          <div className="flex space-x-4">
            <Link to="/login">
              <button className="px-8 py-4 bg-gradient-to-r from-cyan-600 to-blue-700 text-white font-bold rounded-full text-lg flex items-center space-x-3 hover:scale-105 transition-transform">
                <span>Get Started</span>
                <ArrowRightIcon className="w-6 h-6" />
              </button>
            </Link>
            <button className="px-8 py-4 border border-white/20 text-white rounded-full text-lg flex items-center space-x-3 hover:bg-white/10 transition-colors">
              <span>Watch Demo</span>
            </button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              onMouseEnter={() => setHoveredFeature(index)}
              onMouseLeave={() => setHoveredFeature(null)}
              className={`
                p-6 rounded-xl border border-white/10 
                bg-gradient-to-br ${feature.gradient}
                relative overflow-hidden
                transition-all duration-300
                ${hoveredFeature === index ? "scale-105 shadow-2xl" : ""}
              `}
            >
              <div className="relative z-10">
                <feature.icon className={`w-12 h-12 mb-4 ${feature.color}`} />
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-white/80">{feature.description}</p>
              </div>
              <div
                className={`absolute inset-0 bg-black transition-opacity duration-300 ${
                  hoveredFeature === index ? "opacity-20" : "opacity-0"
                }`}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="container mx-auto px-8 py-16 bg-black/20">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-cyan-300 mb-4">
            Cutting-Edge Features
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Our blockchain solution combines advanced security with seamless integration
            capabilities to deliver a robust enterprise platform.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-6 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors"
            >
              <feature.icon className={`w-12 h-12 mb-4 ${feature.color}`} />
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-gray-300">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* About Section */}
      <div id="about" className="container mx-auto px-8 py-16 bg-black/10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-cyan-300 mb-6 text-center">
            About BlockSafe
          </h2>
          <div className="space-y-6 text-gray-300">
            <p className="text-lg">
              BlockSafe is pioneering the future of institutional blockchain technology.
              Founded in 2024, we're committed to revolutionizing how enterprises
              manage and secure their digital assets through advanced blockchain solutions.
            </p>
            <p className="text-lg">
              Our team of expert developers and cryptographers has created a unique
              quantum-resistant blockchain architecture that sets new standards for
              security and scalability in enterprise applications.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-cyan-300 mb-2">100+</div>
                <div className="text-sm text-gray-400">Enterprise Clients</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-cyan-300 mb-2">99.99%</div>
                <div className="text-sm text-gray-400">Uptime Guaranteed</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-cyan-300 mb-2">24/7</div>
                <div className="text-sm text-gray-400">Expert Support</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="container mx-auto px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-cyan-300 mb-4">
            Trusted by Industry Leaders
          </h2>
          <p className="text-xl text-gray-300">
            Our technology is transforming enterprise blockchain solutions
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white/5 p-8 rounded-xl border border-white/10"
            >
              <p className="text-xl italic mb-6 text-gray-300">
                "{testimonial.quote}"
              </p>
              <div className="flex items-center space-x-4">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full"
                />
                <div>
                  <h4 className="font-bold text-cyan-300">{testimonial.name}</h4>
                  <p className="text-gray-400 text-sm">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-black/20 border-t border-white/10 py-12">
        <div className="container mx-auto px-8 grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold text-cyan-300 mb-4">
              BlockSafe
            </h3>
            <p className="text-gray-400">
              Revolutionizing blockchain technology for enterprise solutions.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">Solutions</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Enterprise Blockchain
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Smart Contracts
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Compliance
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">Company</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">Connect</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">
                <GitMergeIcon className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <LockIcon className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <BarChartIcon className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <CheckCircleIcon className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
        <div className="container mx-auto px-8 mt-8 pt-8 border-t border-white/10 text-center">
          <p className="text-gray-400">
            &copy; 2024 BlockSafe. All Rights Reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default BlockchainLandingPage;