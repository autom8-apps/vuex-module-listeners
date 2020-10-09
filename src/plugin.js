const CONSTANTS = {
  actions: "actions",
  mutations: "mutations",
  before: "before",
  after: "after"
}

export const hasListener = (vuexModule, opts) => {
  return opts.listenerType === CONSTANTS.actions
    ? hasAction(vuexModule, opts)
    : hasMutation(vuexModule, opts);
}

export const hasMutation = (vuexModule, opts) => {
  return (
    typeof vuexModule === "object" &&
    typeof vuexModule.listeners === "object" &&
    typeof vuexModule.listeners[opts.listenerType] === "object" &&
    typeof vuexModule.listeners[opts.listenerType][opts.event.type] === "function"
  );
}

export const hasAction = (vuexModule, opts) => {
  return (
    typeof vuexModule.listeners === "object" &&
    typeof vuexModule.listeners[opts.listenerType] === "object" &&
    typeof vuexModule.listeners[opts.listenerType][opts.actionTiming] === "object" &&
    typeof vuexModule.listeners[opts.listenerType][opts.actionTiming][opts.event.type] === "function"
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
