import { createMachine } from "xstate";
import {
  LightSwitchContext,
  LightSwitchState,
  LightSwitchEvent,
} from "../../types";

export const lightSwitchMachine = createMachine<
  LightSwitchContext,
  LightSwitchEvent,
  LightSwitchState
>({
  id: "lightSwitchMachine",
  initial: "lightOff",
  strict: true,
  states: {
    lightOff: {
      on: {
        TURN_ON: "lightOn",
      },
    },

    lightOn: {
      on: {
        TURN_OFF: "lightOff",
      },
    },
  },
});
