import ItemView from "@/[locale]/item/_components/ItemView";

const TITLE = {
  es: "Artículo",
  en: "Item",
};

export async function generateMetadata({ params }) {
  const locale = params.locale;

  return {
    title: TITLE[locale],
  };
}

export default function ItemPage({ params }) {
  return <ItemView id={params.id} />;
}
