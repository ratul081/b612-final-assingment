import React from "react";

const ProductCard = ({ product }) => {
  const { name, img, resalePrice } = product;
  return (
    <div className="card card-compact w-96">
      <figure>
        <img
          className="h-64 w-60 object-cover"
          src="https://i.postimg.cc/wTgsW1jx/Juging.jpg"
          alt={name}
        />
      </figure>
      <div className="card-body mx-2">
        <p className="font-bold text-2xl">{name}</p>
        <p className="font-bold text-xl">
          ৳<span>{resalePrice}</span>
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
