import { ModeToggle } from "./components/theme/mode-toggle";
import { Dashboard } from "./components/dashboard";
function App() {
  return (
      <div>
        <div className="flex justify-end mt-10 mr-10">
          <ModeToggle />
        </div>
        <div>
          <Dashboard />
        </div>
      </div>
  );
}

export default App;
