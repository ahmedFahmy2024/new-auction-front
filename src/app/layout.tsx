import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import DashNavbar from "@/components/website/DashNavbar";
import { AuthProvider } from "@/context/AuthContext";
import { IBM_Plex_Sans_Arabic } from "next/font/google";
import Footer from "@/components/website/Footer";

const ibm_plex_sans = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
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
      <body className={`${ibm_plex_sans.className} antialiased`}>
        <AuthProvider>
          <DashNavbar />
          {children}
          <Footer />
          <Toaster position="top-right" />
        </AuthProvider>
      </body>
    </html>
  );
}
