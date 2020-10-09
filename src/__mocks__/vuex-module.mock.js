export default {
  listeners: {
    mutations: {
      SET_SUBSCRIPTION(store, payload, state, router) {
        console.log("test");
      },
    },
    actions: {
      before: {
        GET_SUBSCRIPTIONS(store, payload, state, router) {},
      },
      after: {
        GET_SUBSCRIPTIONS(store, payload, state, router) {},
      },
    },
  },
};