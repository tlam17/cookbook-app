import React, { useState } from "react";
import LoginForm from "@/pages/LoginForm";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import "./navbar.css";

const Navbar = ({ onLoginSuccess }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    if (onLoginSuccess) onLoginSuccess();
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen((prevState) => !prevState);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Hamburger Menu Icon */}
        <div className="navbar-menu-icon" onClick={toggleSidebar}>
          {!isSidebarOpen ? (
            <>
              <div className="menu-line"></div>
              <div className="menu-line"></div>
              <div className="menu-line"></div>
            </>
          ) : null}
        </div>

        <div className="navbar-title">
          <h1>Recipe App</h1>
        </div>

        <div className="navbar-buttons">
          {isLoggedIn ? (
            <Button className="navbar-button" onClick={handleLogout}>
              Logout
            </Button>
          ) : (
            <Dialog>
              <DialogTrigger asChild>
                <Button className="navbar-button">Login</Button>
              </DialogTrigger>
              <DialogContent className="dialog-content">
                <LoginForm onLoginSuccess={handleLoginSuccess} />
              </DialogContent>
            </Dialog>
          )}
          <Button className="navbar-button navbar-add">Add Recipe</Button>
        </div>
      </div>

      {/* Sidebar */}
      <div className={`navbar-sidebar ${isSidebarOpen ? "expanded" : ""}`}>
        {isSidebarOpen && (
          <button className="close-sidebar-btn" onClick={toggleSidebar}>
            X
          </button>
        )}
        <div className="navbar-sidebar-content">
          <p>Sidebar Content</p>
          <p>Additional Links</p>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
