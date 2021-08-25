import { LightConectorStateProvider } from "../../context";

import { services as lightConectorServices } from "../../machine/lightConector";

import LightConectorWidget from "./widget";

type LightConectorProps = {
  actions?: any;
  services?: any;
};

const LightConector = ({ services }: LightConectorProps) => {
  return (
    <LightConectorStateProvider services={services ?? lightConectorServices}>
      <LightConectorWidget />
    </LightConectorStateProvider>
  );
};

export default LightConector;
