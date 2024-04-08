"use client";

import { useEffect, useReducer } from "react";
import useTranslations from "@/hooks/useTranslations";
import { useRouter } from "next/navigation";
import { v4 } from "uuid";
import ItemsSelector from "./ItemsSelector";
import { API_BASE_URL } from "@/utils/constants";

function orderInfoReducer(orderInfo, action) {
  switch (action.type) {
    case "loadOrder":
      return calculateAmounts({ ...orderInfo, order: { ...action.order } });
    case "loadAllItems":
      return {
        ...orderInfo,
        allItems: [...action.allItems],
        allItemsLoaded: true,
      };
    case "setId":
      return { ...orderInfo, order: { ...orderInfo.order, id: action.id } };
    case "addItem":
      return calculateAmounts({
        ...orderInfo,
        order: {
          ...orderInfo.order,
          items: [...(orderInfo.order.items || []), action.item],
        },
        showAddItemModal: false,
      });
    case "removeItem":
      return calculateAmounts({
        ...orderInfo,
        order: {
          ...orderInfo.order,
          items: orderInfo.order.items.filter((item) => item.id != action.id),
        },
      });
    case "updateItemQuantity":
      return calculateAmounts({
        ...orderInfo,
        order: {
          ...orderInfo.order,
          items: orderInfo.order.items.map((item) =>
            item.id === action.id
              ? { ...item, quantity: action.quantity }
              : item
          ),
        },
      });
    case "showAddItemModal":
      return {
        ...orderInfo,
        showAddItemModal: true,
      };
    case "hideAddItemModal":
      return {
        ...orderInfo,
        showAddItemModal: false,
      };
    default:
      return { ...orderInfo };
  }
}

function calculateAmounts(orderInfo) {
  const totalAmount = orderInfo.order.items.reduce(
    (currentAmount, orderItem) =>
      currentAmount + Number(orderItem.price) * orderItem.quantity,
    0
  );

  const totalAmountWithTaxes = orderInfo.order.items.reduce(
    (currentAmount, orderItem) =>
      currentAmount +
      (Number(orderItem.price) +
        Number(orderItem.price) * (orderItem.taxes / 100)) *
        orderItem.quantity,
    0
  );

  return {
    ...orderInfo,
    totalAmount: parseFloat(totalAmount).toFixed(2),
    totalAmountWithTaxes: parseFloat(totalAmountWithTaxes).toFixed(2),
  };
}

export default function OrderView({ id }) {
  const router = useRouter();
  const translations = useTranslations();
  const [orderInfo, dispatch] = useReducer(orderInfoReducer, {
    order: {
      items: [],
    },
    allItems: [],
    allItemsLoaded: false,
    showAddItemModal: false,
  });

  useEffect(() => {
    async function loadOrder() {
      const response = await fetch(`${API_BASE_URL}/orders/${id}`);
      const order = await response.json();

      dispatch({ type: "loadOrder", order });
    }

    if (id) {
      loadOrder();
    } else {
      const newId = v4();
      dispatch({ type: "setId", id: newId });
    }

    loadItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadItems = async function () {
    const response = await fetch(`${API_BASE_URL}/items`);
    const items = await response.json();
    dispatch({ type: "loadAllItems", allItems: items });
  };

  const onSave = async () => {
    await fetch(`${API_BASE_URL}/orders`, {
      method: "POST",
      body: JSON.stringify(orderInfo.order),
    });

    router.back();
  };

  const onUpdate = async () => {
    await fetch(`${API_BASE_URL}/orders/${id}`, {
      method: "PUT",
      body: JSON.stringify(orderInfo.order),
    });

    router.back();
  };

  const onAddItemSelected = (item) => {
    if (item) {
      const { id, name, price, taxes } = item;

      dispatch({
        type: "addItem",
        item: { id, name, price, taxes, quantity: 1 },
      });
    }

    dispatch({ type: "hideAddItemModal" });
  };

  const onQuantityChange = (itemId) => (e) => {
    dispatch({
      type: "updateItemQuantity",
      id: itemId,
      quantity: e.target.value,
    });
  };

  const onItemRemove = (id) => () => {
    dispatch({ type: "removeItem", id: id });
  };

  const getItemRow = (orderItem) => {
    return (
      <div className="flex justify-between items-center border-b border-gray-200 last:border-b-0 py-1">
        <div className="flex items-center space-x-4">
          <div className="w-32">{orderItem.name}</div>
          <input
            className="w-full px-3 py-1 border rounded-md shadow-sm focus:outline-none focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
            type="number"
            value={orderItem.quantity}
            onChange={onQuantityChange(orderItem.id)}
          />
        </div>
        <input
          className="text-red-600 hover:text-red-800 cursor-pointer"
          type="button"
          value={translations("remove")}
          onClick={onItemRemove(orderItem.id)}
        />
      </div>
    );
  };

  return (
    <div className="relative bg-white rounded-lg shadow-md p-6">
      <h1 className="text-xl font-bold mb-4">
        {id ? `${translations("order")} ${id}` : translations("new_order")}
      </h1>
      <div className="flex flex-col">
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">
            {translations("id")}
          </label>
          <input
            className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
            type="text"
            readOnly
            value={orderInfo.order.id || ""}
          />
        </div>
        <div>
          <label className="block text-sm font-bold mb-2">
            {translations("items")}
          </label>
        </div>
        <div>
          {orderInfo.allItemsLoaded &&
          orderInfo.order.items &&
          orderInfo.order.items.length > 0
            ? orderInfo.order.items.map((item) => getItemRow(item))
            : translations("no_items")}
        </div>
        <input
          className="w-auto cursor-pointer"
          type="button"
          onClick={() => {
            dispatch({ type: "showAddItemModal" });
          }}
          value={translations("add_item")}
        />
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">
            {translations("total")}
          </label>
          <input
            className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
            type="number"
            readOnly
            value={orderInfo.totalAmount ?? ""}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">
            {translations("total_with_taxes")}
          </label>
          <input
            className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
            type="number"
            readOnly
            value={orderInfo.totalAmountWithTaxes ?? ""}
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
      {orderInfo.showAddItemModal && (
        <div className="absolute w-full h-full bg-white bg-opacity-90 top-0 left-0 flex items-center justify-center">
          <ItemsSelector
            items={orderInfo.allItems}
            excludedItems={(orderInfo.order.items || []).map(({ id }) => id)}
            onSelect={onAddItemSelected}
          />
        </div>
      )}
    </div>
  );
}
