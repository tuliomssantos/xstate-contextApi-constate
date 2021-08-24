import { State } from "xstate";
import {
  LightSwitchContext,
  LightSwitchEvent,
  LightSwitchState,
} from "../types";

export const lightOnSelector = (
  state: State<LightSwitchContext, LightSwitchEvent, any, LightSwitchState>
) => {
  return state.matches("lightOn");
};

export const lightOffSelector = (
  state: State<LightSwitchContext, LightSwitchEvent, any, LightSwitchState>
) => {
  return state.matches("lightOff");
};
