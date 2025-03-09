"use client";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  CheckCircledIcon,
  RocketIcon,
  DownloadIcon,
  CopyIcon,
  ArrowLeftIcon,
} from "@radix-ui/react-icons";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import "@/app/globals.css";
import { LinkIcon } from "lucide-react";

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [valid, setValid] = useState(false);
  const [sessionId, setSessionId] = useState("");
  const [downloadLoading, setDownloadLoading] = useState(false);
  const [currentUrl, setCurrentUrl] = useState("");

  const [copyStatus, setCopyStatus] = useState<"idle" | "success" | "error">(
    "idle"
  );

  // Funkcja do kopiowania linku
  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(currentUrl);
    setCopyStatus("success");
    setTimeout(() => setCopyStatus("idle"), 2000);
  };

  useEffect(() => {
    setCurrentUrl(window.location.href);
  }, []);

  useEffect(() => {
    const verifyAccess = async () => {
      try {
        const sessionId = searchParams?.get("session_id");

        if (!sessionId) {
          setValid(false);
          setLoading(false);
          return;
        }

        setSessionId(sessionId);

        const response = await fetch(
          `/api/verify-payment?session_id=${sessionId}`
        );
        const data = await response.json();

        if (data.success) {
          setValid(true);
        } else {
          setValid(false);
        }
      } catch (error) {
        console.error("Verification error:", error);
        setValid(false);
      } finally {
        setLoading(false);
      }
    };

    verifyAccess();
  }, [searchParams]);

  const handleDownload = async () => {
    try {
      setDownloadLoading(true);

      // Dodaj nagłówki i sprawdź URL
      const response = await fetch(`/api/download?session_id=${sessionId}`, {
        headers: {
          "Cache-Control": "no-cache",
          "Content-Type": "application/pdf",
        },
      });

      // Debugowanie odpowiedzi
      console.log("Status:", response.status, "Headers:", response.headers);

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Błąd ${response.status}: ${errorText}`);
      }

      // Utwórz obiekt URL do pobrania
      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);

      // Automatyczne pobieranie
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.setAttribute("download", "Od Zera Do Ecommerce Milionera.pdf");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      console.error("Pełny błąd pobierania:", error);
    } finally {
      setDownloadLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-24 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#5EEB5B] mx-auto"></div>
          <p className="mt-4 text-gray-600">Weryfikacja płatności...</p>
        </div>
      </div>
    );
  }

  if (!valid) {
    return (
      <div className="container mx-auto px-4 py-24 min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <Card className="p-8 border-[#5EEB5B]/20 hover:border-[#5EEB5B]/40">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 bg-red-100 px-4 py-2 rounded-full mb-4">
                <CheckCircledIcon className="w-6 h-6 text-red-500" />
                <span className="font-medium text-red-600">Błąd dostępu</span>
              </div>

              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                Nie znaleziono zamówienia
              </h2>

              <p className="text-gray-600 mb-6">
                Nie możemy potwierdzić Twojego zakupu. Sprawdź czy link jest
                poprawny.
              </p>

              <motion.div whileHover={{ scale: 1.05 }}>
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 text-[#5EEB5B] hover:text-[#4BC947] transition-colors"
                >
                  <RocketIcon className="w-5 h-5" />
                  <span>Wróć do strony głównej</span>
                </Link>
              </motion.div>
            </div>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <section className="container mx-auto px-4 py-16 md:py-24 min-h-screen">
      <div className="mb-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[#5EEB5B] hover:text-[#4BC947]"
        >
          <ArrowLeftIcon className="w-5 h-5" />
          <span>Powrót do strony głównej</span>
        </Link>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto text-center"
      >
        <div className="mb-8 flex justify-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="bg-[#5EEB5B]/10 p-4 rounded-full"
          >
            <CheckCircledIcon className="w-16 h-16 text-[#5EEB5B]" />
          </motion.div>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
          Płatność zakończona sukcesem!
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-lg text-gray-600 mb-8"
        >
          Zakup udany! Twój ebook jest gotowy do pobrania.
        </motion.p>

        <Card className="p-6 md:p-8 border-[#5EEB5B]/20 mb-8">
          <div className="space-y-4">
            <div className="flex items-center justify-between gap-3 p-3 bg-[#5EEB5B]/10 rounded-lg">
              <div className="flex items-center gap-2 flex-1">
                <LinkIcon className="w-5 h-5 text-[#5EEB5B] shrink-0" />
                <code className="text-sm break-all text-gray-600">
                  {currentUrl}
                </code>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={copyToClipboard}
                className="hover:bg-[#5EEB5B]/20"
              >
                <CopyIcon className="w-4 h-4 text-[#5EEB5B]" />
              </Button>
            </div>

            {copyStatus === "success" && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm text-[#5EEB5B]"
              >
                Link skopiowany do schowka!
              </motion.div>
            )}

            {copyStatus === "error" && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm text-red-500"
              >
                Błąd kopiowania. Skopiuj ręcznie.
              </motion.div>
            )}
          </div>
        </Card>

        <motion.div whileHover={{ y: -2 }}>
          <Button
            onClick={handleDownload}
            className="w-full h-full mb-6 font-bold py-6 bg-[#5EEB5B] hover:bg-[#4BC947]"
            disabled={downloadLoading}
          >
            {downloadLoading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Pobieranie...
              </span>
            ) : (
              <span className="flex items-center">
                <DownloadIcon className="mr-2 w-5 h-5" />
                Pobierz ebooka
              </span>
            )}
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-[#5EEB5B]/10 p-6 rounded-xl text-left"
        >
          <h3 className="text-lg font-semibold mb-4 text-gray-900">
            Ważne informacje:
          </h3>
          <ul className="list-disc pl-5 space-y-2 text-gray-600">
            <li>Plik PDF działa na wszystkich urządzeniach</li>
            <li>Link dostępu jest aktywny bezterminowo – zapisz go!</li>
            <li>
              Masz problem z pobraniem?
              <br /> Napisz do nas: pomoc@ecommercebook.pl
            </li>
          </ul>
        </motion.div>
      </motion.div>
    </section>
  );
}
