import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@aws-amplify/ui-react/styles.css";
const inter = Inter({ subsets: ["latin"] });
import './globals.css';
import AuthComponent from "./AuthComponent";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthComponent>
          {children}
        </AuthComponent>
      </body>
    </html>
  );
}