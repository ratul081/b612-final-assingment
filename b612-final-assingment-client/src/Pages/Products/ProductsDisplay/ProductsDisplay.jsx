import React, { useState } from "react";
import ProductDisplayCard from "./ProductDisplayCard";
import BookingModal from "../../../Components/Shared/BookingModal";

const ProductsDisplay = ({ products, refetch }) => {
  const [productDetails, setProductDetails] = useState([]);
  return (
    <div className="mb-4 mt-16 mx-8 grid grid-cols-3 gap-x-4 gap-y-12 place-items-center">
      {products &&
        products.map((product, idx) => (
          <ProductDisplayCard
            key={product._id}
            setProductDetails={setProductDetails}
            product={product}></ProductDisplayCard>
        ))}
      {productDetails && (
        <BookingModal
          productDetails={productDetails}
          refetch={refetch}
          setProductDetails={setProductDetails}></BookingModal>
      )}
    </div>
  );
};

export default ProductsDisplay;
