import React from "react";
import { FaSearch, FaBell } from "react-icons/fa";

const Navbar = () => {
  return (
    <nav className="navbar bg-light px-4 d-flex justify-content-between align-items-center">
      <form className="d-flex w-50">
        <input
          className="form-control"
          type="search"
          placeholder="Search anything..."
          aria-label="Search"
        />
        <button className="btn btn-outline-primary ms-2" type="submit">
          <FaSearch />
        </button>
      </form>

      <div className="d-flex align-items-center gap-3">
        <FaBell size={20} />
        <img
          src="https://cdn-icons-png.flaticon.com/512/847/847969.png"
          alt="user"
          className="rounded-circle"
          width={20}
        />{" "}
      </div>
    </nav>
  );
};

export default Navbar;
