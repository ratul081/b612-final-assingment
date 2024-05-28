import React from "react";
import Item from "./Item";

const ItemList = ({ pageName }) => {
  return (
    <section>
      <div className="mx-auto lg:p-0 sm:px-6 sm:py-12">
        <div className="mx-auto">
          <header className="text-center">
            <h1 className="lg:text-2xl font-bold text-gray-900 sm:text-xl">
              Your {pageName}
            </h1>
          </header>
          {[...Array(2).keys()].map((_, idx) => (
            <Item key={idx} ></Item>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ItemList;
