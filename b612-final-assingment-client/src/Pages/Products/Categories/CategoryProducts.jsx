import React from "react";
import { useLoaderData } from "react-router-dom";

import Categories from "./Categories";
import ProductsDisplay from "../ProductsDisplay/ProductsDisplay";

const CategoryProducts = () => {
  const categoryProduct = useLoaderData().data;
  console.log("🚀 ~ CategoryProducts ~ categoryProduct:", categoryProduct);

  return (
    <div className="md:mt-12 sm-8">
      <p className="md:text-3xl text-xl my-4">Here some devices you can buy</p>
      <div className="lg:grid lg:grid-cols-5 flex flex-col sm:gap-4">
        <div>
          <Categories products={categoryProduct}></Categories>
        </div>
        <div className="col-span-4">
          <ProductsDisplay products={categoryProduct}></ProductsDisplay>
        </div>
      </div>
    </div>
  );
};

export default CategoryProducts;
