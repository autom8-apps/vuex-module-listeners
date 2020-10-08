export default {
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
  }
}