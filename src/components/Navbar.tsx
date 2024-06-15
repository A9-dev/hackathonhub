"use client";

import React from "react";
import Link from "next/link";
import { useUser } from "@/contexts/UserContext";
import { auth } from "@/utils/firebaseConfig";
import { signOut } from "firebase/auth";
import { toast } from "react-toastify";
import { useEffect } from "react";

const Navbar: React.FC = () => {
  const { username, loading } = useUser() || {};

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success("You've been signed out successfully.");
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("Failed to sign out.");
    }
  };

  // Dynamically import Bootstrap JS, manipulates DOM which is not SSR compatible
  // TODO: Find a better way to handle this. Move to react-bootstrap?
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark">
      <div className="container-fluid">
        <Link href="/" passHref className="navbar-brand">
          HackathonHub
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-md-0">
            <li className="nav-item">
              <Link href="/" passHref className="nav-link">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/teams" passHref className="nav-link">
                Teams
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/submissions" passHref className="nav-link">
                Submissions
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/calendar" passHref className="nav-link">
                Calendar
              </Link>
            </li>
          </ul>
          <div className="ms-auto">
            {loading ? (
              <div className="spinner-border text-light" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            ) : username ? (
              <>
                <span className="navbar-text me-3">
                  Signed in as: <strong>{username}</strong>
                </span>
                <button
                  onClick={handleLogout}
                  className="btn btn-outline-danger"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <Link href="/login" passHref className="btn btn-outline-success">
                Log In
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
