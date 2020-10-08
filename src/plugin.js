const CONSTANTS = {
  actions: "actions",
  mutations: "mutations",
  before: "before",
  after: "after"
}

export const hasListener = (vuexModule, opts) => {
  return opts.listenerType === CONSTANTS.actions
    ? opts.hasAction(vuexModule, opts)
    : opts.hasMutation(vuexModule, opts);
}

export const hasMutation = (vuexModule, opts) => {
  return (
    vuexModule &&
    vuexModule.listeners &&
    vuexModule.listeners[opts.listenerType][opts.actionTiming][opts.event.type]
  );
}

export const hasAction = (vuexModule, opts) => {
  return (
    vuexModule.listeners &&
    vuexModule.listeners[opts.listenerType] &&
    vuexModule.listeners.actions[opts.listenerType][opts.event.type] &&
    vuexModule.listeners.actions[opts.listenerType][opts.actionTiming][
      opts.event.type
    ]
  );
}

export const handleMutation = (vuexModule, opts) => {
  if (hasListener(modules[key], opts)) {
    return vuexModule.listeners
      [opts.event.type]
      [opts.listenerType]
      .apply(opts.store, [
        opts.store,
        opts.payload,
        opts.state,
        opts.router
      ]);
  }
}

export const handleAction = (opts, vuexModule) => {
  if (hasListener(modules[key], opts)) {
    return vuexModule.listeners
      [opts.listenerType]
      [opts.actionTiming]
      [opts.event.type]
      .apply(opts.store, [
        opts.store,
        opts.event.payload,
        opts.state,
        opts.router,
      ]);
  }
}

export const proxyAction = (vuexModule, opts) => {
  if (opts.listenerType === CONSTANTS.mutations) {
    return handleMutation(vuexModule, opts);
  }

  if (opts.listenerType === CONSTANTS.actions) {
    return handleAction(vuexModule, opts);
  }
}

export const trigger = (opts) => {
  try {
    const { modules } = opts.store._modules.root._rawModule;
    for (const key in modules) proxyAction(modules[key], opts);
  } catch (error) {
    console.error(error);
  }
}
