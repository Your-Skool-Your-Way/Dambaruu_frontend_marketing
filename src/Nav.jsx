import React from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
const Nav = () => {
  return (
    <div>
      <BrowserRouter>
        <Link to="/">Home </Link>
        <Link to="/About"> About</Link>
        <Link to="/login"> Login</Link>
      </BrowserRouter>
    </div>
  );
};

export default Nav;