"use client";

import { useEffect, useReducer } from "react";
import useTranslations from "@/hooks/useTranslations";
import { useRouter } from "next/navigation";
import { API_BASE_URL } from "@/utils/constants";

function itemReducer(item, action) {
  switch (action.type) {
    case "load":
      return { ...action.value };
    default:
      return {
        ...item,
        [action.type]: action.value,
      };
  }
}

export default function ItemView({ id }) {
  const router = useRouter();
  const translations = useTranslations();
  const [item, dispatch] = useReducer(itemReducer, {});

  const onInputChange = (field) => (e) => {
    dispatch({ type: field, value: e.target.value });
  };

  useEffect(() => {
    async function loadData() {
      const response = await fetch(`${API_BASE_URL}/items/${id}`);
      const loadedItem = await response.json();
      dispatch({ type: "load", value: loadedItem });
    }
    if (id) loadData();
  }, [id]);

  const onSave = async () => {
    await fetch(`${API_BASE_URL}/items`, {
      method: "POST",
      body: JSON.stringify(item),
    });

    router.back();
  };

  const onUpdate = async () => {
    await fetch(`${API_BASE_URL}/items/${id}`, {
      method: "PUT",
      body: JSON.stringify(item),
    });

    router.back();
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h1 className="text-xl font-bold mb-4">
        {id ? `${translations("item")} ${id}` : translations("new_item")}
      </h1>
      <div className="flex flex-col">
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">
            {translations("reference")}
          </label>
          <input
            className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
            type="text"
            onChange={onInputChange("reference")}
            value={item["reference"] || ""}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">
            {translations("name")}
          </label>
          <input
            className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
            type="text"
            onChange={onInputChange("name")}
            value={item["name"] || ""}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">
            {translations("description")}
          </label>
          <input
            className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
            type="text"
            onChange={onInputChange("description")}
            value={item["description"] || ""}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">
            {translations("price")}
          </label>
          <input
            className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
            type="number"
            onChange={onInputChange("price")}
            value={item["price"] || ""}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">
            {translations("taxes")}
          </label>
          <input
            className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
            type="number"
            onChange={onInputChange("taxes")}
            value={item["taxes"] || ""}
          />
        </div>
      </div>
      <div className="flex w-full justify-between">
        <input
          className="bg-indigo-500 text-white py-1 px-2 rounded-md cursor-pointer hover:bg-indigo-600 transition duration-300"
          type="button"
          onClick={() => {
            router.back();
          }}
          value={translations("back")}
        />
        <input
          className="bg-indigo-500 text-white py-1 px-2 rounded-md cursor-pointer hover:bg-indigo-600 transition duration-300"
          type="button"
          onClick={id ? onUpdate : onSave}
          value={id ? translations("update") : translations("save")}
        />
      </div>
    </div>
  );
}
