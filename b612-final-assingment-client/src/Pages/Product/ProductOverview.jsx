import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import ProductDetails from "./ProductDetails";
import BookingModal from "../../Components/Shared/BookingModal";
import useCart from "../../hooks/useCart";

const ProductOverview = () => {
  const productData = useLoaderData().data;
  const [productDetails, setProductDetails] = useState(productData);
  const [, refetch] = useCart();
  return (
    <div className="m-10 flex gap-12 justify-center">
      <div>
        <img
          className="w-[480px] h-[480px]"
          src={productData?.product_image}
          alt=""
          srcSet=""
        />
      </div>
      <ProductDetails productData={productData}></ProductDetails>
      {productDetails && (
        <BookingModal
          productDetails={productDetails}
          setProductDetails={setProductDetails}
          refetch={refetch}></BookingModal>
      )}
    </div>
  );
};

export default ProductOverview;
