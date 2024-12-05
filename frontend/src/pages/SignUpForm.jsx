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

const SignUpForm = ({ onSignUpSuccess }) => {
  const [userId, setUserId] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Handle sign-up process
  const handleSignUp = async () => {
    try {
      const response = await axios.post("http://localhost:3000/users/register", {
        userId,
        name,
        email,
        password,
      });

      if (response.status === 201) {
        console.log("Sign-up successful:", response.data);

        // Clear form fields
        setUserId("");
        setEmail("");
        setPassword("");
        setName("");
        setError("");

        // Show success message
        setSuccessMessage("Sign-up successful! You can now log in.");

        // Notify parent component of success
        if (onSignUpSuccess) onSignUpSuccess();
      }
    } catch (error) {
      console.error("Sign-up failed:", error);
      setError("Failed to sign up. Please try again.");
      setSuccessMessage("");
    }
  };

  return (
    <DialogContent className="dialog-content">
      <DialogHeader>
        <DialogTitle className="dialog-title">Sign Up</DialogTitle>
      </DialogHeader>
      <DialogDescription>
        Enter your details to create a new account.
      </DialogDescription>
      <div className="grid gap-4 py-4">
        {error && <p className="text-red-500">{error}</p>}
        {successMessage && <p className="text-green-500">{successMessage}</p>}
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="userId">User ID</Label>
          <Input
            id="userId"
            type="text"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            className="col-span-3"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="col-span-3"
          />
        </div>
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
          <Button variant="primary" onClick={handleSignUp}>
            Sign Up
          </Button>
        </div>
      </DialogFooter>
    </DialogContent>
  );
};

export default SignUpForm;
