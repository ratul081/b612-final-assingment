import React from "react";
import ProductCard from "./ProductCard";

const ProductsDisplay = ({ products }) => {
  console.log(products);
  return (
    <div className="mb-4 mt-16 mx-8 grid grid-cols-3 gap-y-12 place-items-center">
      {products.map((product, idx) => (
        <ProductCard key={product._id} product={product}></ProductCard>
      ))}
    </div>
  );
};

export default ProductsDisplay;
