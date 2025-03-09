"use client";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  CrossCircledIcon,
  RocketIcon,
  ArrowLeftIcon,
} from "@radix-ui/react-icons";
import Link from "next/link";
import "@/app/globals.css";

export default function CancelPage() {
  return (
    <section className="container mx-auto px-4 py-16 md:py-24 min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto text-center"
      >
        {/* Nagłówek */}
        <div className="mb-8 flex justify-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="bg-red-100 p-4 rounded-full"
          >
            <CrossCircledIcon className="w-16 h-16 text-red-500" />
          </motion.div>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
          Płatność została anulowana
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-lg text-gray-600 mb-8"
        >
          Twoja transakcja nie została zakończona. Możesz spróbować ponownie lub
          wrócić do strony głównej.
        </motion.p>

        {/* Karta z opcjami */}
        <Card className="p-6 md:p-8 border-[#5EEB5B]/20 mb-8">
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">
              Co możesz zrobić teraz?
            </h2>

            <div className="grid md:grid-cols-2 gap-4">
              <motion.div whileHover={{ y: -2 }}>
                <Link href="/" className="block">
                  <Button
                    variant="outline"
                    className="w-full h-full py-6 border-[#5EEB5B] text-[#5EEB5B] hover:bg-[#5EEB5B]/10"
                  >
                    <ArrowLeftIcon className="mr-2 w-5 h-5" />
                    Wróć do strony głównej
                  </Button>
                </Link>
              </motion.div>

              <motion.div whileHover={{ y: -2 }}>
                <Link href="/checkout" className="block">
                  <Button className="w-full h-full py-6 bg-[#5EEB5B] hover:bg-[#4BC947]">
                    <RocketIcon className="mr-2 w-5 h-5" />
                    Spróbuj ponownie
                  </Button>
                </Link>
              </motion.div>
            </div>
          </div>
        </Card>

        {/* Dodatkowe informacje */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-[#5EEB5B]/10 p-6 rounded-xl text-left"
        >
          <h3 className="text-lg font-semibold mb-4 text-gray-900">
            Potrzebujesz pomocy?
          </h3>
          <ul className="list-disc pl-5 space-y-2 text-gray-600">
            <li>Sprawdź poprawność danych płatności</li>
            <li>Upewnij się, że posiadasz wystarczające środki na koncie</li>
            <li>Skontaktuj się z naszym wsparciem: pomoc@ecommercebook.pl</li>
          </ul>
        </motion.div>
      </motion.div>
    </section>
  );
}
