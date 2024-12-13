import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
import { Link } from "react-router-dom"; // Import Link from react-router-dom

const BlockchainLandingPage = () => {
  const [hoveredFeature, setHoveredFeature] = useState(null);

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

  const backgroundVariants = {
    initial: {
      background: "linear-gradient(135deg, #0f1020, #1a1a2e, #16213e)",
      backgroundSize: "400% 400%",
    },
    animate: {
      background: "linear-gradient(135deg, #1a1a2e, #16213e, #0f1020)",
      backgroundSize: "400% 400%",
      transition: {
        duration: 5,
        repeat: Infinity,
        repeatType: "reverse",
      },
    },
  };

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
    <motion.div
      initial="initial"
      animate="animate"
      variants={backgroundVariants}
      className="min-h-screen relative overflow-hidden text-white"
    >
      {/* Particle Background Effect */}
      <div className="absolute inset-0 z-0 opacity-50">
        {[...Array(100)].map((_, i) => (
          <motion.div
            key={i}
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              opacity: Math.random(),
            }}
            animate={{
              x: [
                Math.random() * window.innerWidth,
                Math.random() * window.innerWidth,
                Math.random() * window.innerWidth,
              ],
              y: [
                Math.random() * window.innerHeight,
                Math.random() * window.innerHeight,
                Math.random() * window.innerHeight,
              ],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              repeatType: "loop",
            }}
            className="absolute w-1 h-1 bg-white/30 rounded-full"
          />
        ))}
      </div>

      {/* Navigation */}
      <motion.nav
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 px-8 py-6 flex justify-between items-center border-b border-white/10"
      >
        <div className="flex items-center space-x-4">
          <ServerIcon className="w-10 h-10 text-cyan-400" />
          <h1 className="text-3xl font-bold tracking-tight text-cyan-300">
            BlockSafe
          </h1>
        </div>
        <div className="flex items-center space-x-6">
          <a
            href="#features"
            className="text-gray-300 hover:text-white transition-colors"
          >
            Features
          </a>
          <a
            href="#solutions"
            className="text-gray-300 hover:text-white transition-colors"
          >
            Solutions
          </a>
          <a
            href="#about"
            className="text-gray-300 hover:text-white transition-colors"
          >
            About
          </a>
          <a href="/login">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-cyan-600 hover:bg-cyan-700 text-white font-semibold rounded-full flex items-center space-x-2 transition-all"
            >
              <span>Login</span>
              <ArrowRightIcon className="w-5 h-5" />
            </motion.button>
          </a>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <div className="relative z-10 container mx-auto px-8 py-16 grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
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
              {" "}
              {/* Link instead of anchor tag */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-cyan-600 to-blue-700 text-white font-bold rounded-full text-lg flex items-center space-x-3"
              >
                <span>Get Started</span>
                <ArrowRightIcon className="w-6 h-6" />
              </motion.button>
            </Link>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 border border-white/20 text-white rounded-full text-lg flex items-center space-x-3 hover:bg-white/10 transition-colors"
            >
              <span>Watch Demo</span>
            </motion.button>
          </div>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              onHoverStart={() => setHoveredFeature(index)}
              onHoverEnd={() => setHoveredFeature(null)}
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
              <motion.div
                initial={{ opacity: 0 }}
                animate={{
                  opacity: hoveredFeature === index ? 0.2 : 0,
                  transition: { duration: 0.3 },
                }}
                className="absolute inset-0 bg-black"
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="relative z-10 container mx-auto px-8 py-16">
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
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
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
                  <h4 className="font-bold text-cyan-300">
                    {testimonial.name}
                  </h4>
                  <p className="text-gray-400 text-sm">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 bg-black/20 border-t border-white/10 py-12">
        <div className="container mx-auto px-8 grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold text-cyan-300 mb-4">
              QuantumVault
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
                <GitMergeIcon />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <LockIcon />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <BarChartIcon />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <CheckCircleIcon />
              </a>
            </div>
          </div>
        </div>
        <div className="container mx-auto px-8 mt-8 pt-8 border-t border-white/10 text-center">
          <p className="text-gray-400">
            &copy; 2024 QuantumVault. All Rights Reserved.
          </p>
        </div>
      </footer>

      {/* Animated Background Styling */}
      <style jsx global>{`
        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        body {
          overflow-x: hidden;
        }
      `}</style>
    </motion.div>
  );
};

export default BlockchainLandingPage;
