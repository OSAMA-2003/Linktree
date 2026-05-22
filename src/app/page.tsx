'use client';

import React, { useState, useEffect, useRef } from 'react';
import { FaGithub, FaTwitter, FaLinkedin, FaGlobe, FaEnvelope, FaYoutube, FaInstagram, FaWhatsapp, FaFacebook } from 'react-icons/fa';
import {  Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
const links = [
  {
    id: 1,
    title: 'Personal Website',
    description: 'My portfolio ',
    url: 'https://osama-ahmd-portfolio.vercel.app/',
    icon: FaGlobe,
    color: 'from-sky-400 to-blue-600',
  },
 
  // {
  //   id: 3, // Re-ordered ID
  //   title: 'Twitter / X',
  //   description: 'Thoughts & updates',
  //   url: 'https://twitter.com/Osama_Ahmed_dev',
  //   icon: FaTwitter,
  //   color: 'from-sky-400 to-sky-600',
  // },
  {
    id: 4, // Re-ordered ID
    title: 'LinkedIn',
    description: 'Professional network',
    url: 'https://www.linkedin.com/in/osamaahmedd/',
    icon: FaLinkedin,
    color: 'from-blue-500 to-blue-700',
  },
  // {
  //   id: 5, // Re-ordered ID
  //   title: 'YouTube',
  //   description: 'Video content & tutorials',
  //   url: 'https://www.youtube.com/@OsamaAhmed-dev',
  //   icon: FaYoutube,
  //   color: 'from-red-500 to-red-700',
  // },
  // {
  //   id: 6, // Re-ordered ID
  //   title: 'Instagram',
  //   description: 'Photos & stories',
  //   url: 'https://www.instagram.com/osama_ahmed_dev/',
  //   icon: FaInstagram,
  //   color: 'from-orange-400 to-pink-600',
  // },
  {
    id: 7, // New ID for Whatsapp
    title: 'Whatsapp',
    description: 'Be in touch',
    url: 'https://wa.me/201029317818',
    icon: FaWhatsapp,
    color: 'from-green-700 to-green-900',
  },
  {
    id: 8, // New ID for Facebook
    title: 'Facebook',
    description: 'Connect with me on Facebook',
    url: 'https://www.facebook.com/profile.php?id=100006681611874',
    icon: FaFacebook,
    color: 'from-blue-600 to-blue-800',
  },
  {
    id: 9, // Re-ordered ID
    title: 'Email Me',
    description: 'osama.ahmd.dev@gmail.com',
    url: 'mailto:osama.ahmd.dev@gmail.com',
    icon: FaEnvelope,
    color: 'from-emerald-400 to-teal-600',
  },
];

const AnimatedNumber: React.FC<{ value: string; duration?: number }> = ({ value, duration = 1600 }) => {
  const [currentValue, setCurrentValue] = useState(0);
  const animationFrameRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const hasAnimated = useRef(false); // To ensure animation runs only once

  useEffect(() => {
    if (hasAnimated.current) return; // Don't re-animate if already done

    const numericValueMatch = value.match(/(\d+)/);
    const targetNumericValue = numericValueMatch ? parseInt(numericValueMatch[1], 10) : 0;

    if (targetNumericValue === 0) {
      setCurrentValue(0);
      hasAnimated.current = true;
      return;
    }

    setCurrentValue(0);
    startTimeRef.current = null;

    const animate = (currentTime: number) => {
      if (!startTimeRef.current) {
        startTimeRef.current = currentTime;
      }

      const progress = (currentTime - startTimeRef.current) / duration;
      const easedProgress = Math.min(1, progress); // Simple linear easing

      const nextValue = Math.floor(easedProgress * targetNumericValue);
      setCurrentValue(nextValue);

      if (easedProgress < 1) {
        animationFrameRef.current = requestAnimationFrame(animate);
      } else {
        setCurrentValue(targetNumericValue); // Ensure it lands exactly on target
        hasAnimated.current = true;
      }
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [value, duration]);

  return (
    <>
      {currentValue}
      {value.replace(/(\d+)/, '')} {/* Display the original suffix */}
    </>
  );
};

// Framer Motion Variants
const mainContentVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" as const } },
};

const profilePicVariants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: { duration: 0.6, delay: 0.2, ease: "easeOut" as const } },
};

const headerTextContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.4,
    },
  },
};

const headerTextItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

const statsItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

const linkCardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1 + 0.8, // Staggered delay + base delay after header/stats
      duration: 0.5,
      ease: "easeOut" as const,
    },
  }),
};

function LinkCard({ link, index }: { link: typeof links[0]; index: number }) {
  const [hovered, setHovered] = useState(false);
  const Icon = link.icon;
 
  return (
    <motion.a
      variants={linkCardVariants}
      initial="hidden"
      animate="visible"
      custom={index} // Pass index for staggered animation
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative overflow-hidden rounded-2xl border border-white/40 bg-black/60 backdrop-blur-sm shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-white/90 hover:bg-black/90">
        <div
          className={`absolute inset-0 bg-gradient-to-r ${link.color} opacity-0 transition-opacity duration-300 group-hover:opacity-[0.06]`}
        />
        <div className="flex items-center gap-4 p-4">
          <div
            className={`relative flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${link.color} shadow-md transition-transform duration-300 group-hover:scale-110`}
          >
            <Icon className="h-5 w-5 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-gray-100 text-sm leading-tight">{link.title}</p>
            <p className="text-xs text-gray-300 mt-0.5 truncate">{link.description}</p>
          </div>
          <div
            className={`shrink-0 rounded-full p-1.5 transition-all duration-300 ${
              hovered ? 'bg-gray-100 opacity-100' : 'opacity-0'
            }`}
          >
          </div>
        </div>
      </div>
    </motion.a>
  );
}

export default function Home() {
  return (
    <main
      className="relative min-h-screen overflow-hidden bg-gradient-to-br from-blue-900 via-black to-purple-900"
      initial="hidden"
      animate="visible"
      variants={mainContentVariants}
    >
      {/* Background blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle, #64748b 1px, transparent 1px)`,
            backgroundSize: '32px 32px',
          }}
        />
      </div>

      <motion.div className="relative mx-auto max-w-sm px-4 py-12 sm:py-16">
        {/* Profile section */}
        <div className="flex flex-col items-center text-center mb-10">
          {/* Avatar */}
          <motion.div
            className="relative mb-5"
            variants={profilePicVariants}
              initial="hidden"
      animate="visible"
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-sky-400 via-blue-500 to-emerald-400 blur-md opacity-60 scale-110 animate-pulse" />
            <div className="relative h-24 w-24 rounded-full ring-4 ring-white shadow-xl overflow-hidden">
              <img
                src="/osama-ahmed.jpg"
                alt="Profile"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute bottom-1 right-1 h-4 w-4 rounded-full bg-emerald-400 ring-2 ring-white shadow-sm" />
          </motion.div>

          <motion.div
            className="space-y-1.5"
            initial="hidden"
            animate="visible"
            variants={headerTextContainerVariants}
          >
            <div className="flex items-center justify-center gap-2">
              <motion.h1 variants={headerTextItemVariants} className="text-4xl font-bold tracking-tight text-gray-100 name">
                Osama Ahmed
              </motion.h1>
              <motion.div variants={headerTextItemVariants}>
                <Sparkles className="h-4 w-4 text-amber-400" />
              </motion.div>
            </div>
            <motion.p variants={headerTextItemVariants} className="text-sm font-medium text-gray-300">Web Developer &amp; LinkedIn Content Creator</motion.p>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="mt-5 flex items-center gap-8 "
            initial="hidden"
            animate="visible"
            variants={headerTextContainerVariants} // Re-using for staggered effect
          >
            {[
              { label: 'Projects', value: '20' },
              { label: 'Followers', value: '25K' },
              { label: 'Posts', value: '200' },
      
            ].map((stat) => (
              <motion.div key={stat.label} className="text-center" variants={statsItemVariants}>
                <p className="text-lg font-bold text-gray-100">
                  +<AnimatedNumber value={stat.value} />
                </p>
                <p className="text-xs text-gray-400">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Divider */}
        <motion.div
         className="relative mb-8"
          initial="hidden"
          animate="visible"
          variants={headerTextContainerVariants} 
         >
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200/80" />
          </div>
          <div className="relative flex justify-center">
            <span className="bg-slate-50 px-3 text-xs  uppercase tracking-widest text-gray-900 name">
              Links
            </span>
          </div>
        </motion.div>

        {/* Links */}
        <motion.div
          className="space-y-3"
          initial="hidden"
          animate="visible"
          variants={headerTextContainerVariants} // Re-using for staggered effect
        >
          {links.map((link, index) => (
            <LinkCard key={link.id} link={link} index={index} />
          ))}
        </motion.div>

        <p className="mt-10 text-center text-xs text-gray-400">
          &copy; {new Date().getFullYear()} Osama Ahmed 
        </p>
      </motion.div>
    </main>
  );
}
