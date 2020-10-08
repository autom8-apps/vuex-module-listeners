import VuexMock from "./vuex.mock";
import VuexEventMock from "./vuex-event.mock";
import VuexModuleMock from "./vuex-module.mock"
export default new ListenerMediator(
  "mutations",
  VuexMock,
  VuexEventMock,
  VuexModuleMock,
  {}
);