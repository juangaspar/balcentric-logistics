export default function ItemRow({ item, actions }) {
  return (
    <div className="w-full flex justify-between">
      <div className="flex items-center space-x-4">
        <div className="text-gray-700 w-48">{item.reference}</div>
        <div className="text-gray-700 w-32">{item.name}</div>
        <div className="text-gray-700 w-24">{item.price}</div>
        <div className="text-gray-700 w-24">{item.taxes}</div>
      </div>
      <div className="flex items-center space-x-2">{actions}</div>
    </div>
  );
}
