export interface LightConectorContext {}

export type LightOffState = {
  value: "lightOff";
  context: LightConectorContext;
};

export type EnergizingLampState = {
  value: "energizingLamp";
  context: LightConectorContext;
};

export type LightOnState = {
  value: "lightOn";
  context: LightConectorContext;
};

export type LightBrokenState = {
  value: "lightBroken";
  context: LightConectorContext;
};

export type LightConectorState =
  | LightOffState
  | EnergizingLampState
  | LightOnState
  | LightBrokenState;

export type Select_Lamp = {
  type: "SELECT_LAMP";
  voltage: number;
};

export type Turn_Off = {
  type: "TURN_OFF";
};

export type LightConectorEvent = Select_Lamp | Turn_Off;
