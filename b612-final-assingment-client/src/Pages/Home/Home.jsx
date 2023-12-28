import React from "react";
import Breadcrumbs from "../../Components/Shared/Breadcrumbs";
import HomeBanner from "./HomeBanner/HomeBanner";
import Newsletter from "./Newsletter/Newsletter";

const Home = () => {
  return (
    <div>
      <HomeBanner></HomeBanner>
      <Newsletter></Newsletter>
    </div>
  );
};

export default Home;
