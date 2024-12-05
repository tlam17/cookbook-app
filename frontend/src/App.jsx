import { Toaster } from "@/components/ui/toaster";
import HomePage from "./pages/home";
import Navbar from "./components/navbar/navbar";
import "./App.css";

function App() {
  return (
    <div id="app-container">
      <Navbar />
      <main className="content">
        <HomePage />
      </main>
      <Toaster />
    </div>
  );
}

export default App;
