"use client";

import React, { useState } from "react";

const Navbar: React.FC = () => {
  const [active, setActive] = useState<string>("home");

  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          HackathonHub
        </a>
        <button className="navbar-toggler" type="button">
          <span className="navbar-toggler-icon"></span>
        </button>

        <ul className="navbar-nav me-auto mb-2 mb-md-0">
          <li className="nav-item">
            <a
              className={`nav-link ${active === "home" ? "active" : ""}`}
              href="/"
              onClick={() => setActive("home")}
            >
              Home
            </a>
          </li>

          <li className="nav-item">
            <a
              className={`nav-link ${active === "submissions" ? "active" : ""}`}
              href="/submissions"
              onClick={() => setActive("submissions")}
            >
              Submissions
            </a>
          </li>
          <li className="nav-item">
            <a
              className={`nav-link ${active === "calendar" ? "active" : ""}`}
              href="/calendar"
              onClick={() => setActive("calendar")}
            >
              Calendar
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#"></a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
