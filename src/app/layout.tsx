import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import DashNavbar from "@/components/website/DashNavbar";
import { AuthProvider } from "@/context/AuthContext";
import { Tajawal } from "next/font/google";
import Footer from "@/components/website/Footer";
import { AuctionProvider } from "@/context/AuctionSwitchContext";
import { ConfettiProvider } from "@/context/ConfettiContext";

const tajawal = Tajawal({
  subsets: ["arabic"],
  weight: ["200", "300", "400", "500", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "شركة كنوز مكة الإستثمارية",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body className={`${tajawal.className} antialiased`}>
        <AuthProvider>
          <AuctionProvider>
            <ConfettiProvider>
              <DashNavbar />
              {children}
              <Footer />
              <Toaster position="bottom-right" />
            </ConfettiProvider>
          </AuctionProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
