"use client";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Image from "next/image";
import { RocketIcon, CheckIcon, ArrowLeftIcon } from "lucide-react";
import { loadStripe } from "@stripe/stripe-js";
import Link from "next/link";
import "@/app/globals.css";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

const formSchema = z.object({
  email: z.string().email("Nieprawidłowy adres email"),
});

export default function CheckoutSummary() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
  });

  const product = {
    name: "Brutalna prawda o e-commerce",
    price: 39.99,
    image: "/mockup.png",
    description:
      "Nie kolejny „poradnik sukcesu”, tylko prawdziwe case studies i strategie",
  };

  const initiateCheckout = async (email: string) => {
    const stripe = await stripePromise;

    const response = await fetch("/api/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        price: product.price,
      }),
    });

    const session = await response.json();

    const result = await stripe?.redirectToCheckout({
      sessionId: session.id,
    });

    if (result?.error) {
      console.error(result.error);
    }
  };

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    initiateCheckout(data.email);
  };

  return (
    <section className="container mx-auto px-4 py-16 md:py-24">
      <div className="mb-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[#5EEB5B] hover:text-[#4BC947]"
        >
          <ArrowLeftIcon className="w-5 h-5" />
          <span>Powrót do strony głównej</span>
        </Link>
      </div>

      <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
        {/* Lewa kolumna - Formularz */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="space-y-6 md:space-y-8"
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="inline-flex items-center gap-3 bg-[#5EEB5B]/10 px-6 py-2 rounded-full">
              <RocketIcon className="w-6 h-6 text-[#5EEB5B]" />
              <h2 className="text-2xl md:text-3xl font-bold">
                Podsumowanie zamówienia
              </h2>
            </div>

            <Card className="p-6 border-[#5EEB5B]/20 mt-6">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <CheckIcon className="w-8 h-8 text-[#5EEB5B]" />
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      {product.name}
                    </h3>
                    <p className="text-gray-600">{product.description}</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center justify-between border-t border-[#5EEB5B]/10 pt-4">
                    <span className="text-gray-600">Cena:</span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-lg text-gray-400 line-through">
                        99 zł
                      </span>
                      <span className="text-2xl font-bold text-[#5EEB5B]">
                        {product.price.toFixed(2)} PLN
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Adres email</Label>
                    <Input
                      id="email"
                      type="email"
                      {...register("email")}
                      className={`border-[#5EEB5B]/30 focus:border-[#5EEB5B] ${
                        errors.email ? "border-red-500" : ""
                      }`}
                      placeholder="example@example.com"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm">
                        {errors.email.message?.toString()}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </Card>

            <div className="bg-[#5EEB5B]/10 p-6 rounded-xl mt-6">
              <h3 className="text-lg font-semibold mb-2">
                Po udanej płatności otrzymasz:
              </h3>
              <ul className="list-disc pl-5 space-y-2">
                <li className="text-gray-600">
                  Natychmiastowy dostęp do ebooka w formacie PDF
                </li>
                <li className="text-gray-600">
                  Fakturę VAT na podany adres email
                </li>
              </ul>
            </div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="mt-8"
            >
              <Button
                type="submit"
                size="lg"
                className="bg-[#5EEB5B] hover:bg-[#4BC947] w-full text-lg py-6 px-8 shadow-2xl relative overflow-hidden"
              >
                <span className="absolute inset-0 bg-white/10 opacity-0 hover:opacity-20 transition-opacity" />
                <RocketIcon className="mr-2" />
                Przestań tracić - zacznij sprzedawać
              </Button>
            </motion.div>
          </form>
        </motion.div>

        {/* Prawa kolumna - Okładka */}
        <motion.div
          initial={{ scale: 0.95 }}
          whileInView={{ scale: 1 }}
          className="relative mx-auto w-full max-w-[400px]"
        >
          <div className="aspect-[1/1.414] relative">
            <div className="absolute inset-0 bg-[#5EEB5B]/10 rounded-xl transform rotate-3" />
            <div className="relative h-full w-full overflow-hidden rounded-lg border-4 border-white shadow-lg">
              <Image
                src={product.image}
                alt={product.name}
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
