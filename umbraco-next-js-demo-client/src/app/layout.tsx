import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import Navbar from "./Common/navbar";
import { GetDescendantsOfDocumentAsync } from "@/services/services.umbraco/services.umbraco.content";

const inter = Inter({ subsets: ["latin"] });

export default async function RootLayout({
  children
}:
  Readonly<{
    children: React.ReactNode;
  }>) {
    const thisPageDescendants = await GetDescendantsOfDocumentAsync('c59a3527-d045-4ef3-826b-e969aeb4245f');
    const getMenuItems = thisPageDescendants.items
    .filter((childPage: any) => childPage.properties.isVisible)
    .map((childPage: any) => ({
      name: childPage.name,
      href: childPage.route.path,
    }));  

  return (
    <html lang="en">
      <body className={inter.className}>
       <Navbar navItems={getMenuItems} />
        <main className="flex min-h-screen flex-col p-24 max-w-screen-2xl">
          {children}
        </main>

      </body>
    </html>
  );
}

export const metadata: Metadata =  {
  metadataBase: new URL('http://localhost:3000/'),
  title: {
    template: '%s | Demo Umbraco NextJS Site',
    default: 'Demo Umbraco NextJS Site - A demo website created with NextJS and Umbraco'
  },
  description: 'A demo website created with NextJS and Umbraco',
  // openGraph: {
  //   title: {
  //     template: '%s | Demo Umbraco NextJS Site',
  //     default: 'Demo Umbraco NextJS Site - A demo website created with NextJS and Umbraco'
  //   },
  //   description: 'A demo website created with NextJS and Umbraco',
  // },
  // twitter: {
  //   card: 'summary_large_image',
  //   title: {
  //     template: '%s | Demo Umbraco NextJS Site',
  //     default: 'Demo Umbraco NextJS Site - A demo website created with NextJS and Umbraco'
  //   },
  // },
}