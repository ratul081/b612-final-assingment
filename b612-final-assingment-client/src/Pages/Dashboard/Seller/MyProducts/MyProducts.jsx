import React from "react";
import MyProductCard from "./MyProductCard";
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
      const res = await axiosSecure.get(`/products-email/${user?.email}`);
      return res.data.data;
    },
  });
  console.log("🚀 ~ MyProducts ~ myProducts:", myProducts);
  return (
    <div className="m-4">
      {myProducts.length === 0 ? (
        <div> No data found</div>
      ) : (
        <>
          <p className="text-3xl font-semibold mb-8">Here are your products</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
            {myProducts.map((myProduct) => (
              <MyProductCard
                key={myProduct._id}
                myProduct={myProduct}></MyProductCard>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default MyProducts;
