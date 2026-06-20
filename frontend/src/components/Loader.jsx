import React from "react";
import loaderImage from "../assets/loader.svg";

const Loader = ({ text = "Loading..." }) => {
  return (
    <div className="flex min-h-[16rem] flex-col items-center justify-center gap-4 p-8">
      
      <img src={loaderImage} alt="Loading icon" className="h-12 w-12 animate-spin drop-shadow-sm" loading="lazy" />

      <p className="text-sm font-medium text-slate-500 dark:text-slate-400 animate-pulse tracking-wide">
        {text}
      </p>
      
    </div>
  );
};

export default Loader;