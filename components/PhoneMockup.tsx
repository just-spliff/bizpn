// components/PhoneMockup.tsx
"use client";
import { motion } from "framer-motion";
import Image from "next/image";

export default function PhoneMockup() {
  const phoneVariants = {
    initial: {
      rotate: -1,
      borderRadius: "15% 85% 20% 80% / 80% 20% 80% 20%",
    },
    animate: {
      rotate: [0, 0.5, -0.5, 0],
      borderRadius: [
        "15% 85% 20% 80% / 80% 20% 80% 20%",
        "18% 82% 22% 78% / 75% 25% 75% 25%",
        "12% 88% 18% 82% / 85% 15% 85% 15%",
        "15% 85% 20% 80% / 80% 20% 80% 20%",
      ],
      transition: {
        duration: 12,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const bgVariants = {
    initial: { scale: 0.9 },
    animate: {
      scale: [1, 1.1, 1],
      rotate: [0, 180, 360],
      transition: {
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <div className="relative h-full w-full max-w-[300px] mx-auto">
      {/* Animowane tło */}
      <motion.div
        className="absolute inset-0 bg-[#5EEB5B]/20 blur-3xl rounded-[40%_60%_40%_60%]"
        variants={bgVariants}
        initial="initial"
        animate="animate"
      />

      {/* Kształt telefonu */}
      <motion.div
        className="relative z-10 aspect-[9/19]"
        variants={phoneVariants}
        initial="initial"
        animate="animate"
        whileHover={{
          scale: 1.03,
          boxShadow: "0 25px 50px -12px rgba(94, 235, 91, 0.25)",
        }}
      >
        {/* Ekran telefonu */}
        <div className="absolute inset-0 rounded-[38px] overflow-hidden border-8 border-white/20 shadow-inner">
          <Image
            src="/phone-mockup.png"
            alt="Mockup aplikacji"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Dynamiczny przycisk */}
        <motion.div
          className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-[#5EEB5B] text-white px-6 py-2 rounded-full shadow-lg"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <span className="block animate-pulse">📲 Przewiń case studies</span>
        </motion.div>
      </motion.div>

      {/* Animowane elementy dodatkowe */}
      <motion.div
        className="absolute -top-20 -right-20 w-40 h-40 bg-[#5EEB5B]/10 rounded-full"
        animate={{
          scale: [0.8, 1.2, 0.8],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}
