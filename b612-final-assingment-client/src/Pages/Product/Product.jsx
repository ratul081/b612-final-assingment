import React from "react";
import ProductImage from "./ProductImage";
import { useQuery } from "react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const Product = () => {
  const [axiosSecure] = useAxiosSecure();
  const { data: products = [], refetch } = useQuery({
    queryKey: ["products"],
    queryFn: () =>
      axiosSecure.get("/products").then((res) => {
        return res.data;
      }),
  });
  console.log(products);
  return (
    <div className="mt-10">
      <ProductImage></ProductImage>
    </div>
  );
};

export default Product;
