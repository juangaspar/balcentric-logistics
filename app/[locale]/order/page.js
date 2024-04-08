import OrderView from "@/[locale]/order/_components/OrderView";

const TITLE = {
  es: "Nuevo pedido",
  en: "New order",
};

export async function generateMetadata({ params }) {
  const locale = params.locale;

  return {
    title: TITLE[locale],
  };
}

export default function OrderPage() {
  return <OrderView />;
}
