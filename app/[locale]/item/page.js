import ItemView from "@/[locale]/item/_components/ItemView";

const TITLE = {
  es: "Nuevo artículo",
  en: "New item",
};

export async function generateMetadata({ params }) {
  const locale = params.locale;

  return {
    title: TITLE[locale],
  };
}

export default function ItemPage() {
  return <ItemView />;
}
