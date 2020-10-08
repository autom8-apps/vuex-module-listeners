import MediatiorMutationMock from "../mocks/mediator-mutation.mock";
import MediatiorActionBeforeMock from "../mocks/mediator-action-before.mock";
import MediatiorActionAfterMock from "../mocks/mediator-action-after.mock";
import VuexModuleMock from "../mocks/vuex-module.mock";

describe('ListenerMediator', () => {
  describe('hasListener', () => {
    it('should return true if module.listeners.mutations.SET_SUBSCRIPTION is defined', () => {
      expect(MediatiorMutationMock.hasListener(VuexModuleMock, "SET_SUBSCRIPTION", "mutations")).toBe(true);
    });
    it('should return false if module.listeners.mutations.SET_SUBSCRIPTION isnt defined', () => {
      expect(MediatiorMutationMock.hasListener(VuexModuleMock, "TEST", "mutations")).toBe(true);
    });
    it('should return true if module.listeners.actions.before.GET_SUBSCRIPTIONS is defined', () => {
      expect(MediatiorMutationMock.hasListener(VuexModuleMock, "TEST", "actions", "before")).toBe(true);
    });
  });
});