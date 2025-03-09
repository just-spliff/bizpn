import * as React from "react";

export interface EmailTemplateProps {
  downloadLink: string;
  customerId: string;
  receiptUrl?: string;
  name?: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  downloadLink,
  customerId,
  receiptUrl,
  name = "",
}) => (
  <html>
    <body
      style={{
        margin: 0,
        padding: 0,
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#f7fafc",
        lineHeight: 1.6,
      }}
    >
      <table width="100%" cellPadding="0" cellSpacing="0">
        <tr>
          <td align="center" style={{ padding: "40px 20px" }}>
            {/* Główny kontener */}
            <table
              width="100%"
              style={{
                maxWidth: 600,
                background: "white",
                borderRadius: 12,
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
              }}
            >
              {/* Nagłówek */}
              <tr>
                <td style={{ padding: "40px 32px 24px", textAlign: "center" }}>
                  <div
                    style={{
                      backgroundColor: "#5eeb5b1a",
                      display: "inline-block",
                      padding: 16,
                      borderRadius: 9999,
                    }}
                  >
                    ✅
                  </div>
                  <h1
                    style={{
                      fontSize: 26,
                      color: "#1a202c",
                      margin: "24px 0 16px",
                    }}
                  >
                    Płatność zakończona sukcesem!
                  </h1>
                  <p style={{ color: "#4a5568", marginBottom: 24 }}>
                    Zakup udany! Twój ebook jest gotowy do pobrania.
                  </p>

                  {/* Sekcja powitalna */}
                  <div
                    style={{
                      textAlign: "left",
                      marginBottom: 32,
                      borderLeft: "4px solid #5EEB5B",
                      padding: "16px 24px",
                      backgroundColor: "#f7fafc",
                      borderRadius: 8,
                    }}
                  >
                    <p style={{ margin: "0 0 16px" }}>
                      Hej {name || "drogi czytelniku"},<br />
                      <br />
                      Witaj w świecie e-commerce bez iluzji! 🚀 Właśnie zrobiłeś
                      pierwszy krok, by nie dołączyć do 93% sklepów, które
                      upadają w pierwszym roku.
                    </p>

                    <p style={{ margin: "0 0 16px" }}>
                      E-commerce to nie loteria – to strategia. W tym ebooku
                      znajdziesz brutalnie szczerą analizę błędów, które niszczą
                      większość biznesów online, oraz wskazówki, jak ich
                      uniknąć. Teraz wszystko zależy od Ciebie.
                    </p>
                  </div>

                  {/* Przycisk główny */}
                  <a
                    href={downloadLink}
                    style={{
                      display: "block",
                      backgroundColor: "#5EEB5B",
                      color: "white",
                      padding: "16px 24px",
                      textDecoration: "none",
                      borderRadius: 8,
                      fontWeight: "bold",
                      fontSize: 16,
                      transition: "background-color 0.3s",
                      marginBottom: 24,
                    }}
                  >
                    Pobierz ebooka teraz
                  </a>
                </td>
              </tr>

              {/* Instrukcja i link */}
              <tr>
                <td style={{ padding: "0 32px 24px" }}>
                  <div
                    style={{
                      background: "#f7fafc",
                      borderRadius: 8,
                      padding: 16,
                    }}
                  >
                    <h2
                      style={{
                        color: "#1a202c",
                        fontSize: 18,
                        margin: "0 0 16px",
                      }}
                    >
                      Ważne informacje:
                    </h2>
                    <ol
                      style={{
                        color: "#4a5568",
                        paddingLeft: 20,
                        margin: 0,
                      }}
                    >
                      <li style={{ marginBottom: 12 }}>
                        Zapisz link dostępu:
                        <code
                          style={{
                            display: "block",
                            margin: "10px 0",
                            padding: 10,
                            background: "#fff",
                            borderRadius: 6,
                            wordBreak: "break-all",
                            color: "#5EEB5B",
                            fontWeight: "500",
                          }}
                        >
                          {downloadLink}
                        </code>
                      </li>
                      <li style={{ marginBottom: 12 }}>
                        Plik PDF kompatybilny ze wszystkimi urządzeniami
                      </li>
                      <li>Dostęp bezterminowy do treści</li>
                    </ol>
                  </div>
                </td>
              </tr>

              {/* Sekcja kontaktowa */}
              <tr>
                <td style={{ padding: "0 32px 24px" }}>
                  <div
                    style={{
                      textAlign: "center",
                      padding: 24,
                      backgroundColor: "#5eeb5b1a",
                      borderRadius: 8,
                    }}
                  >
                    <h3
                      style={{
                        color: "#1a202c",
                        fontSize: 16,
                        margin: "0 0 12px",
                      }}
                    >
                      Potrzebujesz pomocy?
                    </h3>
                    <p style={{ margin: 0 }}>
                      Masz pytania? Chcesz podzielić się opinią?
                      <br />
                      Napisz do nas:{" "}
                      <a
                        href="mailto:pomoc@bizpioneer.eu"
                        style={{
                          color: "#5EEB5B",
                          fontWeight: "500",
                        }}
                      >
                        pomoc@bizpioneer.eu
                      </a>
                    </p>
                  </div>
                </td>
              </tr>

              {/* Dodatkowe informacje */}
              {receiptUrl && (
                <tr>
                  <td style={{ padding: "0 32px 40px" }}>
                    <div
                      style={{
                        backgroundColor: "#5eeb5b1a",
                        padding: 24,
                        borderRadius: 8,
                      }}
                    >
                      <h3
                        style={{
                          color: "#1a202c",
                          fontSize: 16,
                          margin: "0 0 12px",
                        }}
                      >
                        Dokumenty:
                      </h3>
                      <ul
                        style={{
                          color: "#4a5568",
                          paddingLeft: 20,
                          margin: 0,
                        }}
                      >
                        <li>
                          Potwierdzenie płatności:{" "}
                          <a href={receiptUrl} style={{ color: "#5EEB5B" }}>
                            Pobierz
                          </a>
                        </li>
                      </ul>
                    </div>
                  </td>
                </tr>
              )}

              {/* Stopka */}
              <tr>
                <td
                  style={{
                    padding: "24px 32px",
                    backgroundColor: "#f7fafc",
                    borderRadius: "0 0 12px 12px",
                  }}
                >
                  <p
                    style={{
                      color: "#718096",
                      fontSize: 12,
                      textAlign: "center",
                      margin: 0,
                    }}
                  >
                    © {new Date().getFullYear()} bizpioneer.eu
                    <br />
                    ID klienta: {customerId}
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
  </html>
);
