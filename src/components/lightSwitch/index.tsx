import { useSelector } from "@xstate/react";
import { lightOffSelector } from "../../machine/lightSwitch";
import { useLightSwitchMachine } from "../../context";

import lampOff from "../../images/lightOff.png";
import lampOn from "../../images/lightOn.png";

const LightSwitch = () => {
  const lightMachineService = useLightSwitchMachine();

  const { send } = lightMachineService;

  const isLightOff = useSelector(lightMachineService, lightOffSelector);

  const lampImage = () => {
    if (isLightOff) {
      return <img src={lampOff} alt="Lamp off" data-testid="lightOff" />;
    } else {
      return <img src={lampOn} alt="Lamp on" data-testid="lightOn" />;
    }
  };

  const handleClick = () => {
    if (isLightOff) {
      send("TURN_ON");
    } else {
      send("TURN_OFF");
    }
  };

  return (
    <div className="container energizing-bg">
      <div className="box">
        <div className="wrapper-img">{lampImage()}</div>

        <button
          className={isLightOff ? "btn" : "btn dark-bg"}
          onClick={handleClick}
        >
          {isLightOff ? "Acender" : "Apagar"}
        </button>
      </div>
    </div>
  );
};

export default LightSwitch;
