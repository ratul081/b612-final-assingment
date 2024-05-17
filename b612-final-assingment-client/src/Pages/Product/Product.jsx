import React from "react";
import ProductImage from "./ProductImage";
import { useQuery } from "react-query";

const Product = () => {
  const {data:data=[]}=useQuery({
    queryKey:[],
    queryFn: async ()=>{
      const res =  await fetch(`${import.meta.env.API_URL}/data`)
    }
  })
  const productDetails = async () =>
    await fetch(`${import.meta.env.API_URL}/data`)
      .then((res) => res.json())
      .catch((err) => console.log(err));
  console.log(productDetails);
  return (
    <div className="mt-10">
      <ProductImage></ProductImage>
    </div>
  );
};

export default Product;
