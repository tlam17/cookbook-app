import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import axios from 'axios';

const LoginForm = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // This function handles the login process
  const handleLogin = async () => {
    try {
      // Send a POST request to the server with the email and password (route set in userRoutes.js)
      const response = await axios.post('http://localhost:3000/users/login', {
        email: email,
        password: password,
      });
      if (response.status === 200) {
        // Handle successful login
        console.log('Login successful:', response.data);
        setError('');
        onLoginSuccess();     // Call the onLoginSuccess function passed from the parent component
      }
    } catch (error) {
      // Handle login failure
      console.error('Login failed:', error);
      alert('Invalid email or password. Please try again.');
      setError('Invalid email or password');
    }
  };

  // This component renders the login form when you click the login button
  return (
    <Card className="w-full max-w-sm mx-auto p-6">
      <h2 className="text-lg font-medium mb-4">Login</h2>
      {error && <p className="text-red-500">{error}</p>}
      <Label htmlFor="email">Email</Label>
      <Input 
        id="email" 
        type="email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
      />
      <Label htmlFor="password">Password</Label>
      <Input 
        id="password" 
        type="password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
      />
      <Button variant="primary" className="mt-4" onClick={handleLogin}>
        Login
      </Button>
    </Card>
  );
};

export default LoginForm;