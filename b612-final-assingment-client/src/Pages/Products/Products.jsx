import React from "react";
import { useQuery } from "react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Categories from "./Categories/Categories";
import ProductsDisplay from "./ProductsDisplay/ProductsDisplay";

const Products = () => {
  const [axiosSecure] = useAxiosSecure();
  const { data: products = [] } = useQuery({
    queryKey: ["products"],
    queryFn: () =>
      axiosSecure.get("/products").then((res) => {
        return res.data.data;
      }),
  });
  return (
    <div className="md:mt-12 sm-8">
      <p className="md:text-3xl text-xl my-4">Here some devices you can buy</p>
      <div className="lg:grid lg:grid-cols-5 flex flex-col sm:gap-4">
        <div>
          <Categories products={products}></Categories>
        </div>
        <div className="col-span-4">
          <ProductsDisplay products={products}></ProductsDisplay>
        </div>
      </div>
    </div>
  );
};

export default Products;
