export default {
  mutations: {
    type: "SET_SUBSCRIPTION",
    payload: "test",
  },
  actions: {
    before: {
      type: "GET_SUBSCRIPTIONS",
      payload: "test"
    },
    after: {
      type: "GET_SUBSCRIPTIONS",
      payload: "test"
    },
  },
};