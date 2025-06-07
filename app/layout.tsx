import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Header } from "./components/header/header";
import { Footer } from "./components/footer/footer";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ['200', '300', '400', '500', '600', '700', '800', '900']
});

export const metadata: Metadata = {
  title: "Abrigo já",
  description: "Ache o abrigo mais próximo de onde voce estiver",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <body className={`${poppins.className} antialiased`}>
        <div className="flex flex-col min-h-screen">
          <Header/>
          <main className="flex-grow w-full">
            {children}
          </main>
        </div>
        <Footer />
      </body>
    </html>
  );
}

