import useTranslations from "@/hooks/useTranslations";

export default function ItemsSelector({ items, excludedItems, onSelect }) {
  const translations = useTranslations();

  const onChange = (e) => {
    onSelect(items.find((item) => item.id === e.target.value));
  };

  return (
    <div>
      <div className="mb-2">{translations("item_list")}</div>
      <select onChange={onChange}>
        <option>{translations("select_an_item")}</option>
        {items
          .filter((item) => !excludedItems.includes(item.id))
          .map(({ id, name }) => (
            <option key={id} value={id}>
              {name}
            </option>
          ))}
      </select>
      <div className="mt-4">
        <input
          className="bg-indigo-500 text-white py-1 px-2 rounded-md cursor-pointer hover:bg-indigo-600 transition duration-300"
          type="button"
          onClick={() => {
            onSelect(null);
          }}
          value={translations("cancel")}
        />
      </div>
    </div>
  );
}
