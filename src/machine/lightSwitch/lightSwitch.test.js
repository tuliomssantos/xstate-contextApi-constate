/* eslint-disable jest/valid-title */
import { createModel } from "@xstate/test";
import { createMachine, assign } from "xstate";
import { lightSwitchMachine } from "./lightSwitch";

const eventConfigs = {
  TURN_ON: {
    exec: async ({
      stateMachine,
      shared: { currentState },
      setCurrentState,
    }) => {
      setCurrentState(
        stateMachine.transition(currentState, {
          type: "TURN_ON",
        })
      );
    },
  },

  TURN_OFF: {
    exec: async ({
      stateMachine,
      shared: { currentState },
      setCurrentState,
    }) => {
      setCurrentState(
        stateMachine.transition(currentState, {
          type: "TURN_OFF",
        })
      );
    },
  },
};

const lightOffTest = {
  test: ({ shared: { currentState } }) => {
    expect(currentState.value).toBe("lightOff");
  },
};

const lightOnTest = {
  test: ({ shared: { currentState } }) => {
    expect(currentState.value).toBe("lightOn");
  },
};

describe("LightSwitch Pure Machine", () => {
  describe("matches all paths", () => {
    const testMachine = createMachine(
      {
        id: "lightSwitchMachine",
        initial: "lightOff",
        strict: true,
        context: {
          counter: 0,
        },
        states: {
          lightOff: {
            on: {
              TURN_ON: { target: "lightOn", actions: "incrementCounter" },
            },
          },

          lightOn: {
            on: {
              TURN_OFF: "lightOff",
            },
          },
        },
      },
      {
        actions: {
          incrementCounter: assign((context) => ({
            counter: context.counter + 1,
          })),
        },
      }
    );

    testMachine.states.lightOff.meta = {
      ...lightOffTest,
    };

    testMachine.states.lightOn.meta = {
      ...lightOnTest,
    };

    const testModel = createModel(testMachine).withEvents(eventConfigs);

    const testPlans = testModel.getSimplePathPlans({
      filter: (state) => state.context.counter <= 1,
    });

    testPlans.forEach((plan) => {
      describe(plan.description, () => {
        plan.paths.forEach((path) => {
          it(path.description, async () => {
            const shared = { currentState: lightSwitchMachine.initialState };

            const setCurrentState = (state) => {
              shared.currentState = state;
            };

            await path.test({
              stateMachine: lightSwitchMachine,
              shared,
              setCurrentState,
            });
          });
        });
      });
    });
  });
});
