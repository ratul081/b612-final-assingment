import React from "react";
import AboutBanner from "./AboutBanner";
import MilestoneAchievement from "./MilestoneAchievement";
import ServicesInfo from "./ServicesInfo";
import Team from "./Team";

const About = () => {
  return (
    <>
      <AboutBanner></AboutBanner>
      <MilestoneAchievement></MilestoneAchievement>
      <Team></Team>
      <ServicesInfo></ServicesInfo>
    </>
  );
};

export default About;
