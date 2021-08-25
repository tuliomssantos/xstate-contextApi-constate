import {
  RenderResult,
  fireEvent,
  waitFor,
  cleanup,
  act,
  render,
} from "@testing-library/react";

import flushPromises from "flush-promises";

import { createMachine, assign } from "xstate";
import { createModel } from "@xstate/test";

import LightConector from ".";

import { PromiseCallbacks } from "../../types/helpers";

type Shared = {
  enerzigeLampCallbacks?: PromiseCallbacks;
};

type TestCycleContext = {
  target: RenderResult;
  shared: Shared;
  setEnerzigeLampCallbacks: (enerzigeLampCallbacks: PromiseCallbacks) => void;
  reqBMock: jest.Mock<any, any>;
};

const eventConfigs = {
  SELECT_LAMP_110: {
    exec: async ({ getByRole }: RenderResult) => {
      fireEvent.click(
        getByRole("button", {
          name: /Usar lâmpada de 110V/i,
        })
      );
    },
  },

  SELECT_LAMP_220: {
    exec: async ({ getByRole }: RenderResult) => {
      fireEvent.click(
        getByRole("button", {
          name: /Usar lâmpada de 220V/i,
        })
      );
    },
  },

  "done.invoke.enerzigeLamp": {
    exec: async ({ shared: { enerzigeLampCallbacks } }: TestCycleContext) => {
      if (enerzigeLampCallbacks) {
        enerzigeLampCallbacks.resolve();
        return act(flushPromises);
      }
    },
  },

  "error.platform.enerzigeLamp": {
    exec: async ({ shared: { enerzigeLampCallbacks } }: TestCycleContext) => {
      if (enerzigeLampCallbacks) {
        enerzigeLampCallbacks.reject(new Error());
        return act(flushPromises);
      }
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
      expect(() => getByTestId("lampOff")).not.toThrowError()
    );
  },
};

const energizingLampTest = {
  test: async ({ getByTestId }: RenderResult) => {
    await waitFor(() => expect(() => getByTestId("bolt")).not.toThrowError());
  },
};

const lightOnTest = {
  test: async ({ getByTestId }: RenderResult) => {
    await waitFor(() => expect(() => getByTestId("lampOn")).not.toThrowError());
  },
};

const lightBrokenTest = {
  test: async ({ getByTestId }: RenderResult) => {
    await waitFor(() =>
      expect(() => getByTestId("lightBroken")).not.toThrowError()
    );
  },
};

describe("<LightConector />", () => {
  describe("matches all paths", () => {
    const testMachine = createMachine(
      {
        id: "lightConectorMachine",
        initial: "lightOff",
        strict: true,
        context: {
          counter: 0,
        },
        states: {
          lightOff: {
            on: {
              SELECT_LAMP_110: {
                target: "energizingLamp110",
              },

              SELECT_LAMP_220: {
                target: "energizingLamp220",
                actions: "incrementCounter",
              },
            },
          },

          energizingLamp110: {
            invoke: {
              src: "enerzigeLamp",
              onError: "lightBroken",
            },
          },

          energizingLamp220: {
            invoke: {
              src: "enerzigeLamp",
              onDone: "lightOn",
            },
          },

          lightOn: {
            on: {
              TURN_OFF: "lightOff",
            },
          },

          lightBroken: {},
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

    testMachine.states.energizingLamp110.meta = {
      ...energizingLampTest,
    };

    testMachine.states.energizingLamp220.meta = {
      ...energizingLampTest,
    };

    testMachine.states.lightOn.meta = {
      ...lightOnTest,
    };

    testMachine.states.lightBroken.meta = {
      ...lightBrokenTest,
    };

    const testModel = createModel(testMachine).withEvents(eventConfigs as any);

    const testPlans = testModel.getSimplePathPlans({
      filter: (state) => state.context.counter <= 1,
    });

    testPlans.forEach((plan) => {
      describe(plan.description, () => {
        afterEach(cleanup);

        plan.paths.forEach((path) => {
          it(path.description, async () => {
            const enerzigeLampMock = jest.fn();

            const shared: Shared = {};

            const setEnerzigeLampCallbacks = (
              enerzigeLampCallbacks: PromiseCallbacks
            ) => {
              shared.enerzigeLampCallbacks = enerzigeLampCallbacks;
            };

            path.test({
              target: render(
                <LightConector
                  services={{ enerzigeLamp: enerzigeLampMock as any }}
                />
              ),
              shared,
              setEnerzigeLampCallbacks,
            });
          });
        });
      });
    });
  });
});
