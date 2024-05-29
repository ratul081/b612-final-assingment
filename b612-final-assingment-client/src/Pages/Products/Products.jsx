import React from "react";
import { useQuery } from "react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Categories from "./Categories/Categories";
import ProductsDisplay from "./ProductsDisplay/ProductsDisplay";

const Products = () => {
  const [axiosSecure] = useAxiosSecure();
  const { data: products = [], refetch } = useQuery({
    queryKey: ["products"],
    queryFn: () =>
      axiosSecure.get("/products").then((res) => {
        return res.data.data;
      }),
  });
  console.log(products.length);
  return (
    <div className="mt-12">
      <p className="text-3xl my-4">Here some devices you can buy</p>
      <div className="grid grid-cols-5">
        <div>
          <Categories products={products}></Categories>
        </div>
        <div className="col-span-4">
          <ProductsDisplay
            products={products}
            refetch={refetch}></ProductsDisplay>
        </div>
      </div>
    </div>
  );
};

export default Products;
