import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import { Toaster } from "../components/ui/sonner";
import "./globals.css";

import { QueryClientProvider } from "../providers/query-client-provider";
import { metaData, viewPort } from "../utils/seo";

export const metadata = metaData;
export const viewport = viewPort;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body
        className={`${GeistSans.variable} ${GeistMono.variable} antialiased`}
      >
        <Toaster
          richColors={true}
          expand={true}
          visibleToasts={5}
          closeButton
          theme="system"
        />
        <QueryClientProvider>{children}</QueryClientProvider>
      </body>
    </html>
  );
}
