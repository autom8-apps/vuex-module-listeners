export default class ListenerMediator {
  constructor(
    listenerType,
    store,
    { type, payload },
    state,
    router,
    actionTiming
  ) {
    this.listenerType = listenerType;
    this.store = store;
    this.type = type;
    this.state = state;
    this.payload = payload;
    this.router = router;
    this.actionTiming = actionTiming;
  }

  hasListener(vuexModule, listenerType, type) {
    return (
      vuexModule.listeners &&
      vuexModule.listeners[listenerType] &&
      vuexModule.listeners[listenerType][type]
    );
  }

  isRightAction(vuexModule) {
    return (
      vuexModule.listeners.actions[this.type] &&
      vuexModule.listeners.actions[this.type][this.actionTiming]
    );
  }

  async handleActionListener(vuexModule) {
    try {
      const action = vuexModule.listeners.actions[this.type][this.actionTiming];
      if (
        ["before", "after"].includes(this.actionTiming) &&
        action &&
        this.isRightAction(vuexModule)
      ) {
        await action.apply(this.store, [
          this.store,
          this.payload,
          this.state,
          this.router,
        ]);
      }

      if (typeof vuexModule.listeners.actions[this.type] === "function") {
        await vuexModule.listeners.actions[this.type].apply(this.store, [
          this.store,
          this.payload,
          this.state,
          this.router,
        ]);
      }
    } catch (error) {
      console.error(
        "The following error occurred in the Module-Listeners Vuex Plugin:",
        error
      );
    }
  }

  triggerListenersByType() {
    try {
      const { modules } = this.store._modules.root._rawModule;
      for (const key in modules) {
        if (this.hasListener(modules[key], "mutations", this.type)) {
          modules[key].listeners[this.listenerType][this.type].apply(
            this.store,
            [this.store, this.payload, this.state, this.router]
          );
        }

        if (this.hasListener(modules[key], "actions", this.type)) {
          this.handleActionListener(modules[key]);
        }
      }
    } catch (error) {
      console.error(
        "The following error occurred in the Module-Listeners Vuex Plugin:",
        error
      );
    }
  }
}
