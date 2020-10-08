import {
  hasListener,
  trigger,
  hasMutation,
  hasAction,
  handleMutation,
  handleAction,
} from "../plugin";
import VuexModuleMock from "../__mocks__/vuex-module.mock";
import VuexMutationOptsMock from "../__mocks__/vuex-mutations-opts.mock";
import VuexActionsBeforeOptsMock from "../__mocks__/vuex-actions-before-opts.mock";
import VuexActionsAfterOptsMock from "../__mocks__/vuex-actions-after-opts.mock";

describe('ListenerMediator', () => {
  describe("hasAction", () => {
    it('should return false if vuexModule.listeners is not defined', () => {
      const vuexModule = {}
      const result = hasAction(vuexModule, VuexActionsBeforeOptsMock);
      expect(result).toBe(false);
    });
    it("should return false if vuexModule.listeners.actions is not defined", () => {
      const vuexModule = {
        listeners: {
          mutations: {}
        }
      };
      expect(vuexModule, VuexActionsBeforeOptsMock).toBe(false);
    });
    it("should return false if vuexModule.listeners.actions.before is not defined", () => {
      const vuexModule = {
        listeners: {
          actions: {
            after: {}
          }
        }
      };
      const opts = {
        listenerType: "actions",
        actionTiming: "before",
      }
      expect(vuexModule, opts).toBe(false);
    });
    it("should return false if vuexModule.listeners.actions.after is not defined", () => {
      const vuexModule = {
        listeners: {
          actions: {
            before: {}
          }
        }
      };
      const opts = {
        listenerType: "actions",
        actionTiming: "after",
      };
      expect(vuexModule, opts).toBe(false);
    });
    it("should return false if vuexModule.listeners.actions.before['TEST'] is not defined", () => {
      const opts = {
        listenerType: "actions",
        actionTiming: "before",
        event: {
          type: "TEST",
        },
      };
      const vuexModule = {
        listeners: {
          actions: {
            before: {
            }
          }
        }
      };
      expect(vuexModule,opts).toBe(false);
    });
    it("should return true if vuexModule.listeners.actions.before['TEST'] is defined", () => {
      const opts = {
        listenerType: "actions",
        actionTiming: "before",
        event: {
          type: "TEST",
        },
      };
      const vuexModule = {
        listeners: {
          actions: {
            before: {
              TEST: {}
            }
          }
        }
      };
      expect(vuexModule,opts).toBe(true);
    });
  });

  describe('hasMutation', () => {
    it("should return true if vuexModule.listeners.mutations['TEST'] is defined", () => {
      const opts = {
        listenerType: "mutations",
        event: {
          type: "TEST",
        },
      };
      const vuexModule = {
        listeners: {
          mutations: {
            TEST: {}
          }
        }
      };
      expect(hasMutation(vuexModule, opts)).toBe(true);
    });
    it("should return false if vuexModule.listeners.mutations['TEST'] is not defined", () => {
      const opts = {
        listenerType: "mutations",
        event: {
          type: "TEST",
        },
      };
      const vuexModule = {
        listeners: {
          mutations: {}
        }
      };
      expect(hasMutation(vuexModule, opts)).toBe(false);
    });
    it("should return false if vuexModule.listeners.mutations is not defined", () => {
      const opts = {
        listenerType: "mutations",
        event: {
          type: "TEST",
        },
      };
      const vuexModule = {
        listeners: {}
      };
      expect(hasMutation(vuexModule, opts)).toBe(false);
    });
    it("should return false if vuexModule.listeners is not defined", () => {
      const opts = {
        listenerType: "mutations",
        event: {
          type: "TEST",
        },
      };
      const vuexModule = {};
      expect(hasMutation(vuexModule, opts)).toBe(false);
    });
  });

  describe('hasListener', () => {
    it('should return true if module.listeners.mutations.SET_SUBSCRIPTION is defined', () => {
      expect(hasListener(VuexModuleMock, VuexMutationOptsMock)).toBe(true);
    });
    it('should return true if module.listeners.mutations.TEST isnt defined', () => {
      const opts = {
        listenerType: "mutations",
        event: {
          type: "TEST",
        },
      };
      expect(hasListener(VuexModuleMock, opts)).toBe(false);
    });
    it("should return false if module.listeners.actions.before.TEST is not defined", () => {
      const opts = { ...VuexActionsBeforeOptsMock };
      opts.event = {
        type: "TEST",
        payload: "test",
      };
      expect(hasListener(VuexModuleMock, opts)).toBe(false);
    });
    it('should return true if module.listeners.actions.before.GET_SUBSCRIPTIONS is defined', () => {
      expect(hasListener(VuexModuleMock, VuexActionsBeforeOptsMock)).toBe(true);
    });
    it("should return true if module.listeners.actions.after.GET_SUBSCRIPTIONS is defined", () => {
      expect(hasListener(VuexModuleMock, VuexActionsAfterOptsMock)).toBe(true);
    });
    it("should return false if module.listeners.actions.after.TEST is not defined", () => {
      expect(hasListener(VuexModuleMock, VuexActionsAfterOptsMock)).toBe(false);
    });
  });
});