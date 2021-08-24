import constate from "constate";

import { useInterpret } from "@xstate/react";

import { lightSwitchMachine } from "../machine";

function useLightSwitcInterpreter() {
  return useInterpret(lightSwitchMachine);
}

export const [LightSwitchStateProvider, useLightSwitchMachine] = constate(
  useLightSwitcInterpreter
);
