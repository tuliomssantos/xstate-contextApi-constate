import { createMachine } from "xstate";
import {
  LightConectorContext,
  LightConectorEvent,
  LightConectorState,
} from "../../types/lightConector";

export const lightConectorMachine = createMachine<
  LightConectorContext,
  LightConectorEvent,
  LightConectorState
>({
  id: "lightConectorMachine",
  initial: "lightOff",

  states: {
    lightOff: {
      on: {
        SELECT_LAMP: "energizingLamp",
      },
    },

    energizingLamp: {
      invoke: {
        src: "enerzigeLamp",
        onDone: "lightOn",
        onError: "lightBroken",
      },
    },

    lightOn: {
      on: {
        TURN_OFF: "lightOff",
      },
    },

    lightBroken: {},
  },
});
