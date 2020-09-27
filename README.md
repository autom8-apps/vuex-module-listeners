## Vuex Listeners

One of the primary pain points I have with Vuex is that modules become more tightly coupled as your application grows. This is especially true when your application has multiple API requirements. In these scenarios, it's typical to dispatch many cross module actions which inevitably makes your code brittle and dependent upon a given executing an action at a certain point. This is poor asynchronous architecture.

### The Solution

This plugin solves the above problem by implementing an event system into the Vuex ecosystem. When installed on an module, the vuex listeners object will listen to mutations and actions and using it's identical name as an identifier, will react to the corresponding mutation or action when it is triggered.

### The thing about actions

Most of the time, you'll probably listen to mutations as an action typically results in a mutation you can be sure that the data you need will always be available after a mutation occurs. However, there are scenarios where you want to listen to an action. To accomodate for asynchronous actions like API calls, Vue natively exposes two lifecycle methods when an action is fired, the "before" action and the "after" action. These two lifecycle methods are utilized in this plugin on a per action basis. However, only a single global listener is registered so the code does create unnecessary subscribers and keep the memory footprint minimal.
