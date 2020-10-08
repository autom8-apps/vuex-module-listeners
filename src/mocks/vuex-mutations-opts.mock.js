import VuexMock from "./vuex.mock";
import VuexEventMock from "./vuex-event.mock";
export default {
  listenerType: "mutations",
  store: VuexMock,
  event: VuexEventMock.mutations,
};
