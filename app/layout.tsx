import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css"; // <--- ESTA LINHA É A MAIS IMPORTANTE!

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Levantamento de Processos",
  description: "Diagnóstico interno de rotinas",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>{children}</body>
    </html>
  );
}