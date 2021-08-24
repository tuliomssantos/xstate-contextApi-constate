/* eslint-disable jest/valid-title */
import { createMachine, assign } from "xstate";
import { createModel } from "@xstate/test";

import {
  RenderResult,
  fireEvent,
  waitFor,
  render,
} from "@testing-library/react";

import { LightSwitchStateProvider } from "../../context";
import LightSwitch from ".";

const eventConfigs = {
  TURN_ON: {
    exec: async ({ getByRole }: RenderResult) => {
      fireEvent.click(
        getByRole("button", {
          name: /Acender/i,
        })
      );
    },
  },

  TURN_OFF: {
    exec: async ({ getByRole }: RenderResult) => {
      fireEvent.click(
        getByRole("button", {
          name: /Apagar/i,
        })
      );
    },
  },
};

const lightOffTest = {
  test: async ({ getByTestId }: RenderResult) => {
    await waitFor(() =>
      expect(() => getByTestId("lightOff")).not.toThrowError()
    );
  },
};

const lightOnTest = {
  test: async ({ getByTestId }: RenderResult) => {
    await waitFor(() =>
      expect(() => getByTestId("lightOn")).not.toThrowError()
    );
  },
};

describe("<LightSwitch />", () => {
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

    const testModel = createModel(testMachine).withEvents(eventConfigs as any);

    const testPlans = testModel.getSimplePathPlans({
      filter: (state) => state.context.counter <= 1,
    });

    testPlans.forEach((plan) => {
      describe(plan.description, () => {
        plan.paths.forEach((path) => {
          it(path.description, async () => {
            await path.test(
              render(
                <LightSwitchStateProvider>
                  <LightSwitch />
                </LightSwitchStateProvider>
              )
            );
          });
        });
      });
    });

    it("should have full coverage", () => {
      return testModel.testCoverage();
    });
  });
});
