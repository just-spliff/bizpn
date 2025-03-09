"use client";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import { PlusIcon, RocketIcon } from "lucide-react";
import { CheckCircledIcon, LightningBoltIcon } from "@radix-ui/react-icons";

export default function ContentSection() {
  return (
    <section className="container mx-auto px-4 py-16 md:py-24">
      <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
        {/* Tekst */}
        <div className="space-y-6 md:space-y-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="inline-flex items-center gap-3 bg-[#5EEB5B]/10 px-4 py-1.5 sm:px-6 sm:py-2 rounded-full"
          >
            <RocketIcon className="w-5 h-5 sm:w-6 sm:h-6 text-[#5EEB5B]" />
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold">
              Co znajdziesz w środku?
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-base sm:text-lg text-gray-600 border-l-4 border-[#5EEB5B] pl-3 sm:pl-4"
          >
            Nie kolejny „poradnik sukcesu”, tylko{" "}
            <span className="font-semibold">brutalna prawda</span> o e-commerce
          </motion.p>

          <div className="space-y-4 md:space-y-6">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="flex items-start gap-3 sm:gap-4"
            >
              <PlusIcon className="w-5 h-5 sm:w-6 sm:h-6 text-[#5EEB5B] mt-1" />
              <div>
                <h3 className="text-base sm:text-lg font-semibold mb-1 sm:mb-2">
                  Prawdziwe case studies
                </h3>
                <ul className="list-disc pl-4 sm:pl-6 space-y-1 sm:space-y-2 text-gray-600">
                  <li className="text-sm sm:text-base">
                    Jak Reserved śledzi trendy na TikToku
                  </li>
                  <li className="text-sm sm:text-base">
                    Dlaczego Allegro skraca czas dostawy do 2h
                  </li>
                  <li className="text-sm sm:text-base">
                    Ile tak na prawdę zarobisz sprzedając za 89 zł
                  </li>
                </ul>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="flex items-start gap-3 sm:gap-4"
            >
              <LightningBoltIcon className="w-5 h-5 sm:w-6 sm:h-6 text-[#5EEB5B] mt-1" />
              <div>
                <h3 className="text-base sm:text-lg font-semibold mb-1 sm:mb-2">
                  Kluczowe tematy
                </h3>
                <div className="grid gap-2 sm:gap-4">
                  {[
                    "Trzy wampiry wysysające konwersje",
                    "Jak nie spalić budżetu w pierwszym tygodniu?",
                    "Dlaczego 9 na 10 sklepów umiera?",
                  ].map((title, index) => (
                    <Card
                      key={index}
                      className="p-3 sm:p-4 border-[#5EEB5B]/20"
                    >
                      <div className="flex items-center gap-2 sm:gap-3">
                        <CheckCircledIcon className="w-4 h-4 sm:w-5 sm:h-5 text-[#5EEB5B]" />
                        <span className="text-sm sm:text-base font-medium">
                          {title}
                        </span>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="bg-[#5EEB5B]/10 p-4 sm:p-6 rounded-xl"
            >
              <p className="text-sm sm:text-base text-gray-600 italic">
                „Nie znajdziesz tu magicznych trików. Ale jeśli podejdziesz do
                tego serio,
                <span className="block font-semibold text-[#5EEB5B] mt-1 sm:mt-2">
                  unikniesz błędów, które pogrążyły tysiące sklepów.”
                </span>
              </p>
            </motion.div>
          </div>
        </div>

        {/* Mockup książki */}
        <motion.div
          initial={{ scale: 0.95 }}
          whileInView={{ scale: 1 }}
          className="relative mx-auto w-full max-w-[300px] sm:max-w-[400px] md:max-w-[500px]"
        >
          <div className="aspect-[1/1.414] relative">
            <div className="absolute inset-0 bg-[#5EEB5B]/10 rounded-xl sm:rounded-3xl transform rotate-3" />
            <div className="relative h-full w-full overflow-hidden rounded-lg sm:rounded-2xl border-2 sm:border-4 border-white shadow-lg sm:shadow-xl">
              <Image
                src="/table-phone-mockup.png"
                alt="Wnętrze książki"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 90vw, 50vw"
                priority
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
