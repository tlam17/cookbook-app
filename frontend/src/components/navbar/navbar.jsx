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

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    if (onLoginSuccess) onLoginSuccess();
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-title">
          <h1>Cookbook App</h1>
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
    </nav>
  );
};

export default Navbar;
