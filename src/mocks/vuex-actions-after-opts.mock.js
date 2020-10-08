import VuexMock from "./vuex.mock";
import VuexEventMock from "./vuex-event.mock";
export default {
  listenerType: "actions",
  actionTiming: "after",
  store: VuexMock,
  event: VuexEventMock.actions.after,
};
