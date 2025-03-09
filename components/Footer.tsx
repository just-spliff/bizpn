"use client";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  CheckCircledIcon,
  TwitterLogoIcon,
  InstagramLogoIcon,
} from "@radix-ui/react-icons";
import { RocketIcon } from "lucide-react";
import { redirect } from "next/navigation";

function handleClick() {
  redirect("/checkout");
}

export default function FooterSection() {
  return (
    <footer className="border-t border-[#5EEB5B]/20 mt-12 md:mt-24">
      {/* Sekcja CTA */}
      <div className="bg-[#5EEB5B]/10 py-12 md:py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 md:mb-6">
              <RocketIcon className="inline-block w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 mr-2 sm:mr-3 -mt-1 text-[#5EEB5B]" />
              E-commerce to nie loteria
            </h2>

            <motion.p
              initial={{ scale: 0.95 }}
              whileInView={{ scale: 1 }}
              className="text-base sm:text-lg text-gray-600 mb-6 md:mb-8"
            >
              Jeśli działasz na ślepo,{" "}
              <span className="font-semibold">tracisz pieniądze</span>
            </motion.p>

            <div className="space-y-3 md:space-y-4 mb-6 md:mb-8 max-w-md mx-auto text-center">
              {[
                "Zrozum dlaczego Twój sklep nie sprzedaje",
                "Poznaj prawdziwe mechanizmy e-commerce",
                "Uniknij błędów niszczących 93% biznesów",
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ x: -20 }}
                  whileInView={{ x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-center gap-2 sm:gap-3"
                >
                  <CheckCircledIcon className="w-4 h-4 sm:w-5 sm:h-5 text-[#5EEB5B]" />
                  <span className="text-sm sm:text-base text-gray-600">
                    {item}
                  </span>
                </motion.div>
              ))}
            </div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Button
                size="lg"
                className="bg-[#5EEB5B] hover:bg-[#4BC947] text-lg py-6 px-8 shadow-2xl relative overflow-hidden"
                onClick={handleClick}
              >
                <span className="absolute inset-0 bg-white/10 opacity-0 hover:opacity-20 transition-opacity" />
                <RocketIcon />
                Dołącz do zwycięskiej grupy
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Stopka właściwa */}
      <div className="bg-gray-50 py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-center justify-center">
            {/* Social Media */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="flex justify-center md:justify-start gap-4 md:gap-6"
            >
              <TwitterLogoIcon className="w-5 h-5 md:w-6 md:h-6 text-gray-600 hover:text-[#5EEB5B] cursor-pointer" />
              <InstagramLogoIcon className="w-5 h-5 md:w-6 md:h-6 text-gray-600 hover:text-[#5EEB5B] cursor-pointer" />
            </motion.div>

            {/* Copyright */}
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-center text-gray-600 text-xs sm:text-sm"
            >
              © {new Date().getFullYear()} BizPioneer
              <br />
              Wszystkie prawa zastrzeżone.
            </motion.p>

            {/* Ostatni CTA */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="flex justify-center md:justify-end"
            >
              <Button
                variant="outline"
                className="border-[#5EEB5B] text-[#5EEB5B] hover:bg-[#5EEB5B]/10 text-sm sm:text-base"
                onClick={handleClick}
              >
                <RocketIcon className="mr-2 w-3 h-3 sm:w-4 sm:h-4" />
                Ostatnia szansa na rabat
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  );
}
