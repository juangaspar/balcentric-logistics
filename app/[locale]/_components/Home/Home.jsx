"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import Menu from "./Menu";
import OrdersTable from "@/components/OrdersTable";
import ItemsTable from "@/components/ItemsTable";

const MENU_OPTIONS = [
  { translationKey: "items", component: <ItemsTable /> },
  { translationKey: "orders", component: <OrdersTable /> },
];

export default function Home() {
  const router = useRouter();
  const params = useSearchParams();
  const pathname = usePathname();
  const selectedMenuOption = params.get('tab') ? params.get('tab') : 0;

  const onMenuChange = (index) => {
    router.replace(`${pathname}?tab=${index}`);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <Menu
        options={MENU_OPTIONS}
        selectedIndex={selectedMenuOption}
        onChange={onMenuChange}
      ></Menu>
      <div className="mt-4">{MENU_OPTIONS[selectedMenuOption].component}</div>
    </div>
  );
}
