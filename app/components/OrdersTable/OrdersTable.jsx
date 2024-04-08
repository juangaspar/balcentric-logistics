import { useState, useEffect } from "react";
import useTranslations from "@/hooks/useTranslations";
import { useParams } from "next/navigation";
import OrderRow from "./OrderRow";
import { API_BASE_URL } from "@/utils/constants";

export default function OrdersTable() {
  const translations = useTranslations();
  const { locale } = useParams();
  const [orders, setOrders] = useState([]);

  const loadOrders = async function () {
    const response = await fetch(`${API_BASE_URL}/orders`);
    const orders = await response.json();
    setOrders(orders);
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const onOrderDelete = (id) => async () => {
    await fetch(`${API_BASE_URL}/orders/${id}`, { method: "DELETE" });
    loadOrders();
  };

  return (
    <div>
      <div className="flex items-center space-x-4 mb-4">
        <div className="font-semibold w-96">{translations("reference")}</div>
        <div className="font-semibold w-24">{translations("total")}</div>
        <div className="font-semibold w-48">
          {translations("total_with_taxes")}
        </div>
      </div>
      <div className="space-y-4">
        {orders.map((order) => (
          <div
            key={order.id}
            className="flex justify-between items-center border-b border-gray-200 last:border-b-0"
          >
            <OrderRow
              order={order}
              actions={[
                <a
                  key="edit"
                  className="text-indigo-600 hover:text-indigo-800"
                  href={`/${locale}/order/${order.id}`}
                >
                  {translations("edit")}
                </a>,
                <input
                  key="delete"
                  className="text-red-600 hover:text-red-800 cursor-pointer"
                  type="button"
                  value={translations("delete")}
                  onClick={onOrderDelete(order.id)}
                />,
              ]}
            />
          </div>
        ))}
        {(!orders || orders.length === 0) && (
          <div className="text-center">{translations("no_orders")}</div>
        )}
        <div className="text-right">
          <a
            className="text-indigo-600 hover:text-indigo-800"
            key="edit"
            href={`/${locale}/order`}
          >
            {translations("add_order")}
          </a>
        </div>
      </div>
    </div>
  );
}
