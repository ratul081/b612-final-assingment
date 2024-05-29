import React from "react";
import { CiHeart } from "react-icons/ci";
import { TbTruckDelivery, TbTruckReturn } from "react-icons/tb";
import { Link } from "react-router-dom";
const ProductDetails = ({ productData }) => {
  const {
    product_name,
    user_email,
    product_category,
    product_resale_price,
    product_image,
    product_condition,
    product_description,
    product_location,
    product_phoneNumber,
    product_postdate,
  } = productData;
  return (
    <div className="space-y-4">
      <p className="text-2xl font-semibold">{product_name}</p>
      <p>{productData ? <span>In stock</span> : <span>out of stock</span>}</p>
      <p className="text-2xl">৳ {product_resale_price}</p>
      <p>{product_description}</p>
      <p>Condition type: {product_condition}</p>
      <p>Posted on: {product_postdate}</p>
      <p>Contact Number: {product_phoneNumber}</p>
      <div className="flex gap-6">
        <label htmlFor="booking-modal" className="btn btn-error text-white">
          Book now
        </label>
        <button>
          <CiHeart className="h-10 w-10" />
        </button>
      </div>
      <div className="border rounded mt-10">
        <div className=" m-6">
          <div className="flex gap-4">
            <div>
              <TbTruckDelivery className="h-10 w-10" />
            </div>
            <div className="font-semibold">
              <p>Free delivery</p>
              <Link className="underline text-xs">
                Enter your postal code for Delivery Availability
              </Link>
            </div>
          </div>
        </div>
        <div className=" m-6">
          <div className="flex gap-4">
            <div>
              <TbTruckReturn className="h-10 w-10" />
            </div>
            <div className="font-semibold">
              <p>Return Delivery</p>
              <p className="text-xs">
                Free 30 Days Delivery Returns{" "}
                <Link className="underline"> Details</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
