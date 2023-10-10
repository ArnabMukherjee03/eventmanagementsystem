
import React from "react";

const Banner = () => {
  return (
    <div className="banner h-[90vh] flex ">
      <div className="z-10 w-full flex gap-2 flex-col items-center justify-center">
        <h1 className="text-4xl font-primary font-medium text-white">
          Locate ATMs with Cash Availability
        </h1>
        <p className="text-lg  font-secondary text-white">
          Helping You Find Cash-Ready ATMs in Your Area
        </p>
        <button className="banner-btn relative text-base text-white font-primary mt-4 w-[180px] border-[1px] border-white py-3 hover:text-black ">
          Find Now
        </button>
      </div>
    </div>
  );
};

export default Banner;
