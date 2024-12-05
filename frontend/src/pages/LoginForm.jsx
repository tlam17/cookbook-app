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
        <Button variant="primary" onClick={handleLogin}>
          Login
        </Button>
      </DialogFooter>
    </DialogContent>
  );
};

export default LoginForm;
