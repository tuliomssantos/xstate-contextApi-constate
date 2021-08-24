import LightSwitch from "./components/lightSwitch";
import { LightSwitchStateProvider } from "./context";

import "./App.css";

function App() {
  return (
    <LightSwitchStateProvider>
      <LightSwitch />
    </LightSwitchStateProvider>
  );
}

export default App;
