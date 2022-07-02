import moment from "moment";

function Order(props) {
  const { id, amount, amountShipping, images, timestamp, items } = props?.order;

  console.log("Order are", props.order);

  return (
    <div className="relative border rounded-md">
      <div className="flex items-center gap-10 p-5 bg-gray-100 text-sm text-gray-600">
        <div>
          <p className="font-bold text-xs">ORDER PLACED</p>
          <p>{moment.unix(timestamp).format("DD MMM YYYY")}</p>
        </div>
        <div>
          <p className="text-xs font-bold">TOTAL</p>
          <p>
            ${amount} - Next Day Delivery - ${amountShipping}
          </p>
        </div>
        <p className="text-sm whitespace-nowrap sm:text-xl self-end flex-1 text-right text-blue-500">
          {items.length} items
        </p>
        <p className="absolute top-2 right-2 w-40 lg:w-72 truncate text-xs whitespace-nowrap">
          ORDER # {id}
        </p>
      </div>
      <div className="p-5 sm:p-10">
        <div className="flex gap-6 overflow-x-auto">
            {images.map(image => (
                <img src={image} alt="" key={image} className="h-20 object-contain sm:h-32" />
            ))}
        </div>
      </div>
    </div>
  );
}
export default Order;
