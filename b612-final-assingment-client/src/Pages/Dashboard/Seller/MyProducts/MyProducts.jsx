import React from "react";
import ProductCard from "./ProductCard";
import { useQuery } from "react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useAuth from "../../../../hooks/useAuth";

const MyProducts = () => {
  const [axiosSecure] = useAxiosSecure();
  const { user } = useAuth();
  const {
    data: myProducts = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["myProduct", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/product/${user?.email}`);
      return res.data.data;
    },
  });
  console.log("🚀 ~ MyProducts ~ myProducts:", myProducts);
  return (
    <div>
      {(myProducts.length === 0) ? (
        <div> No data found</div>
      ) : (
        <>
          <p className="text-3xl font-semibold mb-8">Here are your products</p>
          <div className="grid grid-cols-3 gap-12">
            {myProducts.map((myProduct) => (
              <ProductCard
                key={myProduct._id}
                myProduct={myProduct}></ProductCard>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default MyProducts;
