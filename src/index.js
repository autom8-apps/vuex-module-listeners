import { trigger } from "./plugin";
import { CONSTANTS } from "./plugin";

export default function(store, router) {
  store.subscribe((event, state) =>
    trigger({
      listenerType: CONSTANTS.mutations,
      store,
      event,
      state,
      router
    })
  );

  store.subscribeAction({
    before: (event, state) =>
      trigger({
        listenerType: CONSTANTS.actions,
        actionTiming: CONSTANTS.before,
        store,
        event,
        state,
        router,
      }),
    after: (event, state) =>
      trigger({
        listenerType: CONSTANTS.actions,
        actionTiming: CONSTANTS.after,
        store,
        event,
        state,
        router,
      }),
  });
}
