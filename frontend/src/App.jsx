import { Button } from "@/components/ui/button";
import HomePage from "./pages/home";

function App() {
  return (
    <>
      <div className="px-20">
        <Button>Click me</Button>
      </div>
      <div className="mt-10">
        <HomePage />
      </div>
    </>
  );
}

export default App;
