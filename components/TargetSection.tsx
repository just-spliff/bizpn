"use client";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import {
  CheckCircledIcon,
  CrossCircledIcon,
  RocketIcon,
  MixerHorizontalIcon,
  MagicWandIcon,
} from "@radix-ui/react-icons";

export default function TargetSection() {
  return (
    <section className="container mx-auto px-4 py-16 md:py-24">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
        {/* Lewa kolumna - Dla kogo? */}
        <div className="space-y-6 md:space-y-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="inline-flex items-center gap-2 sm:gap-3 bg-[#5EEB5B]/10 px-4 py-1.5 sm:px-6 sm:py-2 rounded-full"
          >
            <CheckCircledIcon className="w-5 h-5 sm:w-6 sm:h-6 text-[#5EEB5B]" />
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold">
              Dla kogo jest ten ebook?
            </h2>
          </motion.div>

          <div className="space-y-4 md:space-y-6">
            {[
              {
                icon: (
                  <MixerHorizontalIcon className="w-5 h-5 sm:w-6 sm:h-6 text-[#5EEB5B] mt-1" />
                ),
                title: "Masz sklep bez zysków?",
                content:
                  "Analiza porzuconych koszyków, błędów UX i problemów z produktem",
              },
              {
                icon: (
                  <RocketIcon className="w-5 h-5 sm:w-6 sm:h-6 text-[#5EEB5B] mt-1" />
                ),
                title: "Dopiero zaczynasz?",
                content:
                  "Dowiedz się, co decyduje o sukcesie, a co prowadzi do upadku",
              },
              {
                icon: (
                  <MagicWandIcon className="w-5 h-5 sm:w-6 sm:h-6 text-[#5EEB5B] mt-1" />
                ),
                title: "Próbowałeś i nie wyszło?",
                content:
                  "Prawdopodobnie coś przeoczyłeś w strategii i marketingu",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-4 sm:p-6 border-[#5EEB5B]/20 hover:border-[#5EEB5B]/40">
                  <div className="flex items-start gap-3 sm:gap-4">
                    {item.icon}
                    <div>
                      <h3 className="text-base sm:text-lg font-semibold mb-1 sm:mb-2">
                        {item.title}
                      </h3>
                      <p className="text-sm sm:text-base text-gray-600">
                        {item.content}
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Prawa kolumna - Dla kogo NIE? */}
        <div className="space-y-6 md:space-y-8 mt-8 md:mt-0">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="inline-flex items-center gap-2 sm:gap-3 bg-red-100 px-4 py-1.5 sm:px-6 sm:py-2 rounded-full"
          >
            <CrossCircledIcon className="w-5 h-5 sm:w-6 sm:h-6 text-red-500" />
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold">
              Dla kogo NIE jest?
            </h2>
          </motion.div>

          <div className="space-y-4 md:space-y-6">
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}>
              <Card className="p-4 sm:p-6 border-red-100 hover:border-red-200 bg-red-50">
                <div className="flex items-start gap-3 sm:gap-4">
                  <CrossCircledIcon className="w-5 h-5 sm:w-6 sm:h-6 text-red-500 mt-1" />
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold mb-1 sm:mb-2">
                      Wierzysz w łatwy zarobek
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600">
                      To nie jest ebook o pasywnych dochodach
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="p-4 sm:p-6 border-red-100 hover:border-red-200 bg-red-50">
                <div className="flex items-start gap-3 sm:gap-4">
                  <CrossCircledIcon className="w-5 h-5 sm:w-6 sm:h-6 text-red-500 mt-1" />
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold mb-1 sm:mb-2">
                      Szukasz magicznej recepty
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600">
                      Tu znajdziesz strategię, nie gotowe rozwiązania
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
