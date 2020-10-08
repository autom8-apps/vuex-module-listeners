import { trigger } from "./plugin";

export default function(store, router) {
  store.subscribe((event, state) =>
    trigger({
      listenerType: "mutations",
      store,
      event,
      state,
      router
    })
  );

  store.subscribeAction({
    before: (event, state) =>
      trigger({
        listenerType: "actions",
        actionTiming: "before",
        store,
        event,
        state,
        router,
      }),
    after: (event, state) =>
      trigger({
        listenerType: "actions",
        actionTiming: "after",
        store,
        event,
        state,
        router,
      }),
  });
}
