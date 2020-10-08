import ListenerMediator from "./mediator";

export default function run(store, router) {
  store.subscribe((event, state) => {
    new ListenerMediator(
      "mutations",
      store,
      event,
      state,
      router
    ).triggerListenersByType();
  });

  store.subscribeAction({
    before: (event, state) => {
      new ListenerMediator(
        "actions",
        store,
        event,
        state,
        router,
        "before"
      ).triggerListenersByType();
    },
    after: (event, state) => {
      new ListenerMediator(
        "actions",
        store,
        event,
        state,
        router,
        "after"
      ).triggerListenersByType();
    },
  });
}
