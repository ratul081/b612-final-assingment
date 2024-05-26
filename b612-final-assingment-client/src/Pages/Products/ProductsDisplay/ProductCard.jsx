import React from "react";

const ProductCard = ({ product }) => {
  const { _id, name, img, resalePrice } = product;
  const handleAddToCart = () => {
    if (user && user.email) {
      //send cart item to the database
      const cartItem = {
        productId: _id,
        email: user.email,
        name,
        image,
        price,
      };
      axiosSecure.post("/carts", cartItem).then((res) => {
        console.log(res.data);
        if (res.data.insertedId) {
          Swal.fire({
            // position: "top-end",
            icon: "success",
            title: `${name} added to your cart`,
            showConfirmButton: false,
            timer: 1500,
          });
          // refetch cart to update the cart items count
          refetch();
        }
      });
    } else {
      Swal.fire({
        title: "You are not Logged In",
        text: "Please login to add to the cart?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, login!",
      }).then((result) => {
        if (result.isConfirmed) {
          //   send the user to the login page
          navigate("/login", { state: { from: location } });
        }
      });
    }
  };
  return (
    <div className="card card-compact w-96">
      <figure>
        <img
          className="h-64 w-60 object-cover"
          src="https://i.postimg.cc/wTgsW1jx/Juging.jpg"
          alt={name}
        />
      </figure>
      <div className="card-body mx-2">
        <div>
          <p className="font-bold text-2xl">{name}</p>
          <p className="font-bold text-xl">
            ৳<span>{resalePrice}</span>
          </p>
        </div>
        <div className="flex justify-end">
          <button className=" text-lg p-2 rounded-xl">Add to cart</button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
