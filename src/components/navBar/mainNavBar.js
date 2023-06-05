import React from "react";
import logoSvg from "./logoSvg";

const MainNavBar = () => {
  return (
    <section className="main-nav-bar-section flex-row">
      <h1 className="main-nav-bar-title">Movie Fight</h1>
      {logoSvg}
    </section>
  );
};

export default MainNavBar;
