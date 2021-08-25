import { State } from "xstate";
import {
  LightConectorContext,
  LightConectorEvent,
  LightConectorState,
} from "../../types/lightConector";

export const lightOffSelector = (
  state: State<
    LightConectorContext,
    LightConectorEvent,
    any,
    LightConectorState
  >
) => {
  return state.matches("lightOff");
};

export const energizingLampSelector = (
  state: State<
    LightConectorContext,
    LightConectorEvent,
    any,
    LightConectorState
  >
) => {
  return state.matches("energizingLamp");
};

export const lightOnSelector = (
  state: State<
    LightConectorContext,
    LightConectorEvent,
    any,
    LightConectorState
  >
) => {
  return state.matches("lightOn");
};

export const lightBrokenSelector = (
  state: State<
    LightConectorContext,
    LightConectorEvent,
    any,
    LightConectorState
  >
) => {
  return state.matches("lightBroken");
};
