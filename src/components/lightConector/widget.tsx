import { useSelector } from "@xstate/react";

import { useLightConectorMachine } from "../../context";

import {
  lightBrokenSelector,
  lightOffSelector,
  energizingLampSelector,
} from "../../machine/lightConector";

import lampOff from "../../images/lightOff.png";
import lampOn from "../../images/lightOn.png";
import lightBroken from "../../images/lightBroken.png";
import bolt from "../../images/bolt.png";

const LightConectorWidget = () => {
  const lightConectorMachineService = useLightConectorMachine();

  const { send } = lightConectorMachineService;

  const isLightOff = useSelector(lightConectorMachineService, lightOffSelector);

  const isLightBroken = useSelector(
    lightConectorMachineService,
    lightBrokenSelector
  );

  const isEnergizingLamp = useSelector(
    lightConectorMachineService,
    energizingLampSelector
  );

  const lampImage = () => {
    if (isEnergizingLamp) {
      return <img src={bolt} alt="Bolt" data-testid="bolt" />;
    } else if (isLightBroken) {
      return (
        <img src={lightBroken} alt="Lamp broken" data-testid="lightBroken" />
      );
    } else {
      if (isLightOff) {
        return <img src={lampOff} alt="Lamp off" data-testid="lampOff" />;
      } else {
        return <img src={lampOn} alt="Lamp on" data-testid="lampOn" />;
      }
    }
  };

  const handleSwitchOn = (voltage: number) => {
    send("SELECT_LAMP", { voltage });
  };

  const handleSwitchOff = () => {
    send("TURN_OFF");
  };

  return (
    <div className="container energizing-bg">
      <div className="box">
        <div className="wrapper-img">{lampImage()}</div>

        <div>
          <button
            className="btn red-bg"
            onClick={() => {
              handleSwitchOn(110);
            }}
          >
            Usar lâmpada de 110V
          </button>

          <button
            className="btn"
            onClick={() => {
              handleSwitchOn(220);
            }}
          >
            Usar lâmpada de 220V
          </button>

          <button className="btn dark-bg" onClick={handleSwitchOff}>
            Apagar
          </button>
        </div>
      </div>
    </div>
  );
};

export default LightConectorWidget;
