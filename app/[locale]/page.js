import { Suspense } from "react";
import Home from "./_components/Home/Home";

const TITLE = {
  es: "Inicio",
  en: "Home",
};

export async function generateMetadata({ params }) {
  const locale = params.locale;

  return {
    title: TITLE[locale],
  };
}

export default function HomePage() {
  return (
    <Suspense>
      <Home />
    </Suspense>
  );
}
