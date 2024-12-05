import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import axios from "axios";


const LoginForm = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");


  const [signUpUserId, setSignUpUserId] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [signUpName, setSignUpName] = useState("");
  const [signUpError, setSignUpError] = useState("");


  // Handle login process
  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:3000/users/login", {
        email,
        password,
      });
      if (response.status === 200) {
        console.log("Login successful:", response.data);
        setError("");
        onLoginSuccess(); // Notify parent of successful login
      }
    } catch (error) {
      console.error("Login failed:", error);
      setError("Invalid email or password. Please try again.");
    }
  };


  // Handle sign-up process
  const handleSignUp = async () => {
    try {
      const response = await axios.post("http://localhost:3000/users/register", {
        userId: signUpUserId,
        name: signUpName,
        email: signUpEmail,
        password: signUpPassword,
       
      });
      if (response.status === 201) {
        console.log("Sign-up successful:", response.data);
        setSignUpError("");
        setSignUpUserId("");
        setSignUpEmail("");
        setSignUpPassword("");
        setSignUpName("");
      }
    } catch (error) {
      console.error("Sign-up failed:", error);
      setSignUpError("Failed to sign up. Please try again.");
    }
  };


  return (
    <DialogContent className="dialog-content">
      <DialogHeader>
        <DialogTitle className="dialog-title">Login</DialogTitle>
      </DialogHeader>
      <DialogDescription>
        Enter your email and password to log into your account.
      </DialogDescription>
      <div className="grid gap-4 py-4">
        {error && <p className="text-red-500">{error}</p>}
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="col-span-3"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="col-span-3"
          />
        </div>
      </div>
      <DialogFooter>
        <div className="flex justify-center w-full">
          <Button variant="primary" onClick={handleLogin}>
            Login
          </Button>
        </div>
      </DialogFooter>


      <DialogHeader>
        <DialogTitle className="dialog-title">Sign Up</DialogTitle>
      </DialogHeader>
      <DialogDescription>
        Enter your details to create a new account.
      </DialogDescription>
      <div className="grid gap-4 py-4">
        {signUpError && <p className="text-red-500">{signUpError}</p>}
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="signUpUserId">User ID</Label>
          <Input
            id="signUpUserId"
            type="text"
            value={signUpUserId}
            onChange={(e) => setSignUpUserId(e.target.value)}
            className="col-span-3"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="signUpName">Name</Label>
          <Input
            id="signUpName"
            type="text"
            value={signUpName}
            onChange={(e) => setSignUpName(e.target.value)}
            className="col-span-3"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="signUpEmail">Email</Label>
          <Input
            id="signUpEmail"
            type="email"
            value={signUpEmail}
            onChange={(e) => setSignUpEmail(e.target.value)}
            className="col-span-3"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="signUpPassword">Password</Label>
          <Input
            id="signUpPassword"
            type="password"
            value={signUpPassword}
            onChange={(e) => setSignUpPassword(e.target.value)}
            className="col-span-3"
          />
        </div>
      </div>
      <DialogFooter>
        <div className="flex justify-center w-full">
          <Button variant="primary" onClick={handleSignUp}>
            Sign Up
          </Button>
        </div>
      </DialogFooter>
    </DialogContent>
  );
};


export default LoginForm;



