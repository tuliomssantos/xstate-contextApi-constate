export interface LightSwitchContext {}

export type LightOffState = {
  value: "lightOff";
  context: LightSwitchContext;
};

export type LightOnState = {
  value: "lightOn";
  context: LightSwitchContext;
};

export type LightSwitchState = LightOffState | LightOnState;

export type Turn_On = {
  type: "TURN_ON";
};

export type Turn_Off = {
  type: "TURN_OFF";
};

export type LightSwitchEvent = Turn_On | Turn_Off;
