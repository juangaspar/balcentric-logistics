export default function OrderRow({ order, actions }) {
  const totalAmount = order.items.reduce(
    (currentAmount, orderItem) =>
      currentAmount + Number(orderItem.price) * orderItem.quantity,

    0
  );

  const totalAmountWithTaxes = order.items.reduce(
    (currentAmount, orderItem) =>
      currentAmount +
      (Number(orderItem.price) +
        Number(orderItem.price) * (orderItem.taxes / 100)) *
        orderItem.quantity,
    0
  );

  return (
    <div className="w-full flex justify-between">
      <div className="flex items-center space-x-4">
        <div className="text-gray-700  w-96">{order.id}</div>
        <div className="text-gray-700 w-24">
          {parseFloat(totalAmount).toFixed(2)}
        </div>
        <div className="text-gray-700 w-48">
          {parseFloat(totalAmountWithTaxes).toFixed(2)}
        </div>
      </div>
      <div className="flex items-center space-x-2">{actions}</div>
    </div>
  );
}
