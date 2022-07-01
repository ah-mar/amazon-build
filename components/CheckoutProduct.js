import { StarIcon } from "@heroicons/react/solid";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { addToBasket, removeFromBasket } from "../slices/basketSlice";

function CheckoutProduct(props) {
  const dispatch = useDispatch();

  const {
    id,
    title,
    price,
    description,
    category,
    image,
    isPrime,
    rating: { rate, count },
  } = props.item;

  function addItemToBasket() {
    dispatch(addToBasket(props.item));
  }

  function removeItemFromBasket() {
    dispatch(removeFromBasket(props.item));
  }

  return (
    <div className="grid grid-cols-5">
      <Image src={image} height={200} width={200} objectFit="contain" alt="" />
      {/* Middle */}
      <div className="col-span-3 mx-5">
        <p>{title}</p>
        <div className="flex mt-2">
          {Array(Math.round(rate))
            .fill()
            .map((item, index) => (
              <StarIcon key={index} className="h-5 text-yellow-500" />
            ))}
        </div>
        <p className=" text-xs my-2 line-clamp-2">{description}</p>
        <p>${price}</p>
        {isPrime && (
          <div className="flex items-center gap-2">
            <Image
              src="https://links.papareact.com/fdw"
              alt=""
              className=""
              width={50}
              height={50}
              objectFit="contain"
            />
            <p className="text-xs text-gray-500">FREE Next-day Delivery</p>
          </div>
        )}
      </div>
      {/* Right buttons */}
      <div className="flex flex-col gap-2 my-auto justify-self-end">
        <button onClick={addItemToBasket} className="button">
          Add to Basket
        </button>
        <button onClick={removeItemFromBasket} className="button">
          Remove from Basket
        </button>
      </div>
    </div>
  );
}
export default CheckoutProduct;
