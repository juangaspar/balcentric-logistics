import { useState, useEffect } from "react";
import useTranslations from "@/hooks/useTranslations";
import ItemRow from "./ItemRow";
import { useParams } from "next/navigation";
import { API_BASE_URL } from "@/utils/constants";

export default function ItemsTable() {
  const translations = useTranslations();
  const { locale } = useParams();
  const [items, setItems] = useState([]);

  const loadItems = async function () {
    const response = await fetch(`${API_BASE_URL}/items`);
    const items = await response.json();
    setItems(items);
  };

  useEffect(() => {
    loadItems();
  }, []);

  const onItemDelete = (id) => async () => {
    await fetch(`${API_BASE_URL}/items/${id}`, { method: "DELETE" });
    loadItems();
  };

  return (
    <div>
      <div className="flex items-center space-x-4 mb-4">
        <div className="font-semibold w-48">{translations("reference")}</div>
        <div className="font-semibold w-32">{translations("name")}</div>
        <div className="font-semibold w-24">{translations("price")}</div>
        <div className="font-semibold w-24">{translations("taxes")}</div>
      </div>
      <div className="space-y-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex justify-between items-center border-b border-gray-200 last:border-b-0"
          >
            <ItemRow
              item={item}
              actions={[
                <a
                  key="edit"
                  className="text-indigo-600 hover:text-indigo-800"
                  href={`/${locale}/item/${item.id}`}
                >
                  {translations("edit")}
                </a>,
                <input
                  key="delete"
                  className="text-red-600 hover:text-red-800 cursor-pointer"
                  type="button"
                  value={translations("delete")}
                  onClick={onItemDelete(item.id)}
                />,
              ]}
            />
          </div>
        ))}
        {(!items || items.length === 0) && (
          <div className="text-center">{translations("no_items")}</div>
        )}
        <div className="text-right">
          <a
            href={`/${locale}/item`}
            className="text-indigo-600 hover:text-indigo-800"
          >
            {translations("add_item")}
          </a>
        </div>
      </div>
    </div>
  );
}
