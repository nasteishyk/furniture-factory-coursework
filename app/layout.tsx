import "./globals.css";
import { Poppins } from "next/font/google";
import type { Metadata } from "next";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { CartProvider } from "@/app/context/CartContext";

const poppins = Poppins({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Furniture Factory - Cozy Nest",
  description: 'Меблева фабрика "Cozy Nest" - Затишок та якість',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uk" className={poppins.className}>
      <body className="layout-body">
        <CartProvider>
          <Header />
          <div className="container layout-main">{children}</div>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
