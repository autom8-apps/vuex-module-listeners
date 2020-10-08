const types = {
  mutations: {
    set: "SET_EXAMPLE_DATA",
  },
};

/**
 * Couple of notes here:
 * 1. the name of a listener must match that of the mutation or event being triggered.
 * 2. Since actions typically result in a mutation, it's best practice to avoid using actions if you can.
 * 3. this plugin only invokes one listener and using name matching of the mutation and action can very quickly handle the listener. No need for a switch statement!
 */

export default {
  state: () => ({
    dataReliantUponSubscriptions: {},
  }),
  mutations: {
    [types.mutations.set](state, subscription) {
      state.dataReliantUponSubscriptions[subscription.id] = subscription;
    },
  },
  actions: {},
  getters: {},
  listeners: {
    mutations: {
      SET_SUBSCRIPTION({ commit }, payload) {
        commit(types.mutations.set, { ...payload });
      },
    },
    actions: {
      before: {
        GET_SUBSCRIPTIONS({ commit }, payload) {
          const clone = { ...payload };
          commit(types.mutations.set, clone);
        },
      },
      after: {
        GET_SUBSCRIPTIONS({ commit }, payload) {
          const clone = { ...payload };
          commit(types.mutations.set, clone);
        },
      },
    },
  },
};
