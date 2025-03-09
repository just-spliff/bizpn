"use client";
import { motion } from "framer-motion";
import ShapedImage from "./ShapedImage";
import { RocketIcon } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import { redirect } from "next/navigation";

function handleClick() {
  redirect("/checkout");
}

export default function HeroSection() {
  const headingVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="relative bg-white pt-4 md:pt-0">
      <div className="container mx-auto flex items-center px-4 py-4 md:h-screen md:py-0">
        <div className="grid w-full items-center gap-8 md:grid-cols-2">
          <div className="flex flex-col justify-center space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex w-fit items-center rounded-full border border-[#5EEB5B] bg-[#5EEB5B]/10 px-4 py-1.5 text-xs sm:px-6 sm:py-2 sm:text-sm md:text-base"
            >
              🔥 Najnowsze wydanie 2025
            </motion.div>

            <motion.h1
              initial="hidden"
              animate="visible"
              variants={headingVariants}
              className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl"
            >
              <span className="text-gray-900">
                Większość sklepów upada w rok.{" "}
              </span>
              <br />
              <span className="text-[#5EEB5B]">Twój nie musi!</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="border-l-4 border-[#5EEB5B] pl-3 md:pl-4"
            >
              <p className="text-base text-gray-600 sm:text-lg md:text-xl text-justify">
                Samo wrzucenie produktów do sklepu i odpalenie reklam to za
                mało. W e-commerce przetrwają tylko ci, którzy{" "}
                <span className="font-bold">
                  {" "}
                  unikają pułapek, rozumieją, dlaczego klienci porzucają
                  koszyki, i wiedzą, jak nie przepalić budżetu na marketing.
                </span>{" "}
                <br /> Ten ebook nie da Ci gotowych schematów – pokaże, gdzie
                większość popełnia błędy i jak ich nie powtarzać.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="flex flex-wrap items-baseline gap-3"
            >
              <span className="text-lg font-medium text-gray-400 line-through sm:text-xl">
                99 zł
              </span>
              <span className="text-2xl font-bold text-[#5EEB5B] sm:text-3xl">
                39.99 zł
              </span>
              <span className="rounded-full bg-[#5EEB5B]/10 px-2 py-0.5 text-xs font-medium text-[#5EEB5B] sm:px-3 sm:py-1 sm:text-sm">
                -60% TYLKO TERAZ
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.0 }}
              className="flex flex-col gap-3 sm:flex-row"
            >
              <div className="flex flex-col items-center gap-1 ">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Button
                    size="lg"
                    className="bg-[#5EEB5B] hover:bg-[#4BC947] text-lg py-6 px-8 shadow-xl relative overflow-hidden"
                    onClick={handleClick}
                  >
                    <span className="absolute inset-0 bg-white/10 opacity-0 hover:opacity-20 transition-opacity" />
                    <RocketIcon />
                    <Link href="/checkout">
                      Przestań tracić - zacznij sprzedawać
                    </Link>
                  </Button>
                </motion.div>
                <p className="ml-1 mt-4 self-start text-xs text-gray-600">
                  • Natychmiastowy dostęp (PDF)
                </p>
              </div>
            </motion.div>
          </div>

          <div className="relative order-first md:order-last">
            <ShapedImage />
          </div>
        </div>
      </div>
    </section>
  );
}
