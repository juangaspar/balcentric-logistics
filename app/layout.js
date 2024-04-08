import "./globals.css";
import { Suspense } from "react";
import Header from "@/components/Header";

export default function RootLayout({ children, params: { locale } }) {
  return (
    <html lang={locale}>
      <body>
        <Suspense>
          <Header>{children}</Header>
        </Suspense>
      </body>
    </html>
  );
}
