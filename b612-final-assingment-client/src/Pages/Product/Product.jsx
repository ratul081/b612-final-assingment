import React from "react";

const Product = () => {
  return (
    <div>
      <div>
        {[...Array(5).keys()].map((_, idx) => (
          <>
            <div className="flex flex-2">
              <img
                className="w-44 h-36 m-4"
                src="https://scontent.fdac24-3.fna.fbcdn.net/v/t39.30808-6/440848923_768799228681702_372204816515366253_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeEIhZxTbjVXZqzZfRmo4KpPHjGcarlQCHAeMZxquVAIcDHalAzgT3EhXZBXj4CDTrpAxqOENvWJ-KXWyZJ_N54A&_nc_ohc=W9Wuvp2eclsQ7kNvgFEnRGQ&_nc_ht=scontent.fdac24-3.fna&cb_e2o_trans=q&oh=00_AfANIqcDZhRjaTQdoEGG3D5n2VdNovfLchjwZLWUyVx-ow&oe=6637293C"
                alt=""
              />
            </div>
          </>
        ))}
      </div>
    </div>
  );
};

export default Product;
