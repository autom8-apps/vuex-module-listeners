import VuexMock from "./vuex.mock";
import VuexEventMock from "./vuex-event.mock";
export default {
  listenerType: "actions",
  actionTiming: "before",
  store: VuexMock,
  event: VuexEventMock.actions.before,
  state: {},
  router: {},
};