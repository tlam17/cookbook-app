import { Toaster } from "@/components/ui/toaster"
import HomePage from "./pages/home";

function App() {
  return (
    <>
      <div className="mt-10">
        <HomePage />
      </div>
      <Toaster></Toaster>
    </>
  );
}

export default App;
