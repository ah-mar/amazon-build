import { StarIcon } from "@heroicons/react/solid";
import Image from "next/image";
import { useState } from "react";

function Product(props) {

    // const [stars, setStars] = useState(Math.round(props.product.rating.rate));
    // const [isPrime, setIsPrime] = useState(
    //   Math.round(Math.random()) === 0 ? false : true
    // );
  

  const {
    id,
    title,
    price,
    description,
    category,
    image,
    rating: { rate, count },
  } = props.product;

  const stars = Math.round(rate);
  const isPrime = Math.round(Math.random()) === 0 ? false : true;
  
  

  return (
    <div className="relative flex flex-col m-5 bg-white z-30 p-10">
      <p className="absolute top-2 right-2 text-xs text-gray-400 italic">{category}</p>
      <Image src={image} height={200} width={200} objectFit="contain" alt="" />
      <h4 className="my-3">{title}</h4>
      <div className="flex">
        {Array(stars)
          .fill()
          .map(() => (
            <StarIcon key={Math.random()} className="h-5 text-yellow-500" />
          ))}
      </div>
      <p className="text-xs my-2  line-clamp-2">{description}</p>
      <p className="mb-5">${price} USD</p>
      {isPrime && (<div className="flex items-center gap-2 -mt-5">
        <img className="w-12" src="https://links.papareact.com/fdw" alt="" />
        <p className="text-xs text-gray-500">FREE Next-day Delivery</p>
      </div>)}
      <button className="mt-auto button">Add to Basket</button>
    </div>
  );
}
export default Product;
