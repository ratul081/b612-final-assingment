import React from "react";
import { Link } from "react-router-dom";

const Categories = ({ products }) => {
  console.log("🚀 ~ Categories ~ products:", products);

  const categories = [
    ...new Set(products.map((item) => item.product_category)),
  ];
  console.log("🚀 ~ categories ~ categories:", categories);
  return (
    <div>
      {categories &&
        categories.map((category) => (
          <>
            <ol className="mt-8">
              <Link
                className="text-xl font-semibold"
                to={`/category/${category}`}>
                {category}
              </Link>
            </ol>
          </>
        ))}
    </div>
  );
};

export default Categories;
