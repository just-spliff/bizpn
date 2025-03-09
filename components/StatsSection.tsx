// components/StatsSection.tsx
"use client";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  AccessibilityIcon,
  BarChartIcon,
  ClockIcon,
  Crosshair1Icon,
  ExclamationTriangleIcon,
  LightningBoltIcon,
  MagicWandIcon,
  MixerHorizontalIcon,
} from "@radix-ui/react-icons";
import { RocketIcon } from "lucide-react";
import { redirect } from "next/navigation";

function handleClick() {
  redirect("/checkout");
}

export default function StatsSection() {
  return (
    <section className="container mx-auto px-4 py-16 md:py-24">
      <div className="grid md:grid-cols-2 gap-12 items-start">
        {/* Lewa kolumna - Statystyki */}
        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="inline-flex items-center gap-3 bg-[#5EEB5B]/10 px-6 py-2 rounded-full"
          >
            <BarChartIcon className="w-6 h-6 text-[#5EEB5B]" />
            <h2 className="text-2xl md:text-3xl font-bold">
              Brutalna prawda w liczbach
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-lg text-gray-600 border-l-4 border-[#5EEB5B] pl-4"
          >
            Dane, które zmienią Twoje spojrzenie
          </motion.p>

          <div className="grid grid-cols-2 gap-4">
            {[
              {
                icon: <Crosshair1Icon className="w-6 h-6 text-[#5EEB5B]" />,
                title: "Upadek sklepów",
                value: "93%",
                desc: "w pierwszym roku",
              },
              {
                icon: <AccessibilityIcon className="w-6 h-6 text-[#5EEB5B]" />,
                title: "Porzucone koszyki",
                value: "78%",
                desc: "przez zły UX",
              },
              {
                icon: <LightningBoltIcon className="w-6 h-6 text-[#5EEB5B]" />,
                title: "Stabilne zyski",
                value: "1/10",
                desc: "udanych biznesów",
              },
              {
                icon: <ClockIcon className="w-6 h-6 text-[#5EEB5B]" />,
                title: "Czas na sukces",
                value: "6-10 lat",
                desc: "Amazon/Tesla",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0.95 }}
                whileInView={{ scale: 1 }}
              >
                <Card className="p-4 border border-[#5EEB5B]/20 hover:border-[#5EEB5B]/40 h-full">
                  <div className="flex items-center gap-3">
                    {item.icon}
                    <div>
                      <div className="text-2xl font-bold text-[#5EEB5B]">
                        {item.value}
                      </div>
                      <div className="text-sm font-medium">{item.title}</div>
                      <div className="text-xs text-gray-500">{item.desc}</div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Prawa kolumna - Błędy */}
        <motion.div
          initial={{ scale: 0.95 }}
          whileInView={{ scale: 1 }}
          className="space-y-8"
        >
          <div className="bg-[#5EEB5B]/10 p-8 rounded-xl">
            <div className="flex items-center gap-3 mb-6">
              <ExclamationTriangleIcon className="w-6 h-6 text-[#5EEB5B]" />
              <h3 className="text-xl font-bold">Największe pułapki</h3>
            </div>

            <div className="grid gap-4">
              {[
                {
                  icon: (
                    <MixerHorizontalIcon className="w-5 h-5 text-[#5EEB5B]" />
                  ),
                  title: "Zły UX",
                  desc: "68% porzuconych koszyków",
                },
                {
                  icon: <MagicWandIcon className="w-5 h-5 text-[#5EEB5B]" />,
                  title: "Błędy w reklamach",
                  desc: "72% przepalonych budżetów",
                },
                {
                  icon: <RocketIcon className="w-5 h-5 text-[#5EEB5B]" />,
                  title: "Automatyzacja",
                  desc: "65% złudnych oczekiwań",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="p-4 border border-[#5EEB5B]/20 hover:border-[#5EEB5B]/40">
                    <div className="flex items-center gap-3">
                      {item.icon}
                      <div>
                        <div className="font-medium">{item.title}</div>
                        <div className="text-sm text-gray-600">{item.desc}</div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Sekcja CTA na dole */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="text-center mt-16"
      >
        <div className="mb-8">
          <motion.div
            className="flex items-center justify-center gap-4 mb-8"
            initial={{ scale: 0.9 }}
            whileInView={{ scale: 1 }}
            transition={{ type: "spring" }}
          >
            <span className="lg:text-2xl font-bold bg-[#5EEB5B] md:text-sm sm:text-sm text-white px-6 py-3 rounded-full shadow-lg transform rotate-3">
              7% zwycięzców
            </span>
            <span className="text-xl font-medium text-gray-500">vs</span>
            <span className="lg:text-2xl font-bold md:text-sm sm:text-sm bg-gray-200 text-gray-600 px-6 py-3 rounded-full shadow-lg transform -rotate-3">
              93% przegranych
            </span>
          </motion.div>

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
              Dołącz do zwycięskiej grupy
            </Button>
          </motion.div>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-gray-600 mt-4"
        >
          Natychmiastowy dostęp PDF + aktualizacje
        </motion.p>

        {/* Dekoracyjne tło */}
        <div className="absolute inset-x-0 -bottom-20 h-64 bg-[#5EEB5B]/5 blur-3xl -z-10" />
      </motion.div>
    </section>
  );
}
