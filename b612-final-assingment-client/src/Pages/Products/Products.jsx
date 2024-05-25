import React from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "react-query";
import Categories from "./Categories/Categories";
import ProductsDisplay from "./ProductsDisplay/ProductsDisplay";

const Products = () => {
  const [axiosSecure] = useAxiosSecure();
  const { data: products = [], refetch } = useQuery({
    queryKey: ["products"],
    queryFn: () =>
      axiosSecure.get("/products").then((res) => {
        return res.data;
      }),
  });
  // console.log(products);
  return (
    <div className="mt-12">
      <p className="text-3xl my-4">Here some devices you can buy</p>
      <ProductsDisplay products={products}></ProductsDisplay>
    </div>
  );
};

export default Products;
