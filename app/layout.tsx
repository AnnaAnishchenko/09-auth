import type { Metadata } from "next";
import {Roboto } from "next/font/google";
import "./globals.css";
import TanStackProvider from "./components/TanStackProvider/TanStackProvider";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import AuthProvider from "./components/AuthProvider/AuthProvider";


const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
}); 


export const metadata: Metadata = {
   title: "NoteHub",
  description: "AI note system that helps you keep you notes",
 openGraph: {
    title: "NoteHub",
    description: "AI note system that helps you keep your notes",
    url: "https://08-zustand-phi-one.vercel.app/", 
    type: "website",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
      },
    ],
  },
};

export default function RootLayout({
 modal,
  children,
}: Readonly<{
  modal: React.ReactNode;
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={` ${roboto.variable}`}>
        
       <TanStackProvider>
        <AuthProvider>
          <Header />
          {children}
         {modal}
          <Footer />
          </AuthProvider>
        </TanStackProvider>
      </body>
    </html>
  );
}
