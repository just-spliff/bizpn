"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function ShapedImage() {
  const bookVariants = {
    initial: {
      rotate: -2,
      borderRadius: "33% 67% 18% 82% / 65% 27% 73% 35%",
    },
    animate: {
      rotate: [0, 1, -1, 0],
      borderRadius: [
        "33% 67% 18% 82% / 65% 27% 73% 35%",
        "38% 62% 22% 78% / 60% 30% 70% 40%",
        "28% 72% 25% 75% / 70% 25% 75% 30%",
        "33% 67% 18% 82% / 65% 27% 73% 35%",
      ],
      transition: {
        duration: 15,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const badgeVariants = {
    initial: { y: 0 },
    hover: {
      y: -10,
      rotate: 45,
      transition: {
        type: "spring",
        stiffness: 300,
      },
    },
  };

  return (
    <div className="relative h-full w-full p-4 sm:p-6 md:p-8">
      {/* Kształt książki */}
      <motion.div
        className="relative z-10 mx-auto aspect-[1/1.414] w-full max-w-[400px] lg:max-w-[500px]"
        variants={bookVariants}
        initial="initial"
        animate="animate"
        whileHover={{
          scale: 1.05,
          boxShadow: "0 20px 25px -5px rgba(94, 235, 91, 0.2)",
        }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          className="absolute inset-0 rounded-[20%_84%_23%_77%_/_70%_30%_70%_29%] bg-[#5EEB5B]/40"
          animate={{
            borderRadius: [
              "20% 84% 23% 77% / 70% 30% 70% 29%",
              "25% 75% 18% 82% / 65% 35% 65% 35%",
              "15% 85% 28% 72% / 75% 25% 75% 25%",
              "20% 84% 23% 77% / 70% 30% 70% 29%",
            ],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="relative h-full w-full overflow-hidden rounded-[33%_67%_18%_82%_/_65%_27%_73%_35%] border-2 border-[#5EEB5B]/25"
          whileHover={{
            borderColor: "rgba(94, 235, 91, 0.4)",
          }}
        >
          <Image
            src="/mockup.png"
            alt="Okładka książki"
            fill
            className="object-cover object-center"
            priority
            sizes="(max-width: 640px) 90vw, (max-width: 1024px) 50vw, 40vw"
          />
        </motion.div>
      </motion.div>

      {/* Floating badge */}
      <motion.div
        className="absolute right-[5%] top-[10%] z-20 rounded-2xl bg-[#5EEB5B] px-3 py-1 text-xs sm:right-[10%] sm:top-[15%] sm:px-4 sm:py-1.5 sm:text-sm md:right-[15%] md:top-[20%] md:text-base"
        initial={{ y: 0, rotate: 35 }}
        animate={{
          y: [-5, 5, -5],
          rotate: [35, 40, 35],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        variants={badgeVariants}
        whileHover="hover"
      >
        Uniknij losu 93% sklepów!
      </motion.div>
    </div>
  );
}
