import constate from "constate";

import { useInterpret } from "@xstate/react";

import { lightConectorMachine } from "../machine/lightConector";

type UseLightConectorInterpreterProps = {
  actions?: any;
  services?: any;
};

function useLightConectorInterpreter({
  actions,
  services,
}: UseLightConectorInterpreterProps) {
  return useInterpret(lightConectorMachine, { actions, services });
}

export const [LightConectorStateProvider, useLightConectorMachine] = constate(
  useLightConectorInterpreter
);
