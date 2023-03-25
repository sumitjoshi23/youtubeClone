import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const isMenuOpen = useSelector((store) => store.app.isMenuOpen);
  if (!isMenuOpen) return null;
  return (
    <div className="min-w-[160px]">
      <ul className="m-2">
        <Link to="/">
          <li>Home</li>
        </Link>
        <li>Shorts</li>
        <li>Subscriptions</li>
      </ul>
      <hr />
      <ul className="m-2">
        <li>Library</li>
        <li>History</li>
        <li>Your videos</li>
        <li>Watch Later</li>
      </ul>
      <hr />
      <h1 className="font-bold m-1">Subscriptions</h1>
      <ul className="m-2">
        <li>Fireship</li>
        <li>Code Tips</li>
        <li>Mahindra</li>
        <li>Tata</li>
      </ul>
    </div>
  );
};

export default Sidebar;
