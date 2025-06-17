import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AppLayout } from '@/components/AppLayout'; // Certifique-se de que o caminho está correto

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CodePrompt App", // Título atualizado para o seu aplicativo
  description: "AI Code Learning Application", // Descrição atualizada
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        style={{ margin: 0, padding: 0 }} // Adicionado para garantir que não haja margens/padding padrão do body
      >
        <AppLayout> {/* AppLayout agora envolve os filhos */}
          {children}
        </AppLayout>
      </body>
    </html>
  );
}