import React from "react";
import './Loader.css'

function Loader() {
  return (
    <div className="loader">
      <span className="loader-text">loading</span>
      <span className="load"></span>
    </div>
  );
}

export default Loader;
