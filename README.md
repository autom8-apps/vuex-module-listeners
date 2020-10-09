# Vuex Listeners

## Overview

One of the primary pain points I have with Vuex is that modules become more tightly coupled as your application grows. This is especially true when your application has multiple API requirements. This plugin attempts to solve that problem by utilizing vuex's mutation and action subscriber system into the options API of each vuex module you are interacting with.

## Installation

```bash
npm i vuex-module-listeners
```

## Usage

Please see Vuex Plugin documentation for further information on what plugin mutations and action events plugins can listen to [Vuex Plugin Events](https://vuex.vuejs.org/api/#subscribe). Regardless of module type (namespaced or global), every action or mutation triggered in a module fires of an event that plugins can listen to; including namespaced modules. You can use this system so that other modules who depend behavior of a module can listen in to the module. This leads to looser coupling when utilized properly.

**Requirements**

1. the name of a listener must match that of the mutation or event being triggered.
2. Since actions typically result in a mutation, it's best practice to avoid using actions if you can.
3. this plugin only invokes one listener and using name matching of the mutation and action can very quickly handle the listener. No need for a switch statement!

## Example Vuex Module

```js
export default {
  mutations: {
    SET_SUBSCRIPTION() {
      ...
    }
  },
  actions: {
    GET_SUBSCRIPTIONS() {
      ...
    }
  }
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
```

### About namespaced modules

To listen to a namespaced module mutation or action you can name them listen to them like so:

```js
{
  listeners: {
    mutations: {
      "namespaced/module": () => {}
    },
    actions: {
      before: {
       "namespaced/module": () => {}
      },
      after: {
       "namespaced/module": () => {}
      }
    }
  }
}
```

## Testing

```bash
npm run test
```
*There is also a default vscode launch config installed to run the visual studio code debugger when testing.*