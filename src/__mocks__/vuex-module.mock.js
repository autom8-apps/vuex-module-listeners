export default {
  listeners: {
    mutations: {
      SET_SUBSCRIPTION(store, payload, state, router) {
        return "mutation";
      },
    },
    actions: {
      before: {
        GET_SUBSCRIPTIONS(store, payload, state, router) {
          return "action.before";
        },
      },
      after: {
        GET_SUBSCRIPTIONS(store, payload, state, router) {
          return "action.after";
        },
      },
    },
  },
};