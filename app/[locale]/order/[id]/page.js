import OrderView from "@/[locale]/order/_components/OrderView";

const TITLE = {
  es: "Pedido",
  en: "Order",
};

export async function generateMetadata({ params }) {
  const locale = params.locale;

  return {
    title: TITLE[locale],
  };
}

export default function OrderPage({ params }) {
  return <OrderView id={params.id} />;
}
