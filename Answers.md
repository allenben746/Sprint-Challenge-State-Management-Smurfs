1. What problem does the context API help solve?

    Contect allows the dev to use data without passing it down the component chain.

1. In your own words, describe `actions`, `reducers` and the `store` and their role in Redux. What does each piece do? Why is the store known as a 'single source of truth' in a redux application?

    Actions - send update from the application to the store

    Reducers - pure function that takes in the previous state and returns the new state

    Store - single state value handled within redux

1. What is the difference between Application state and Component state? When would be a good time to use one over the other?

    Application state usually containes global info where as component state contains info pertaining to that component and its children.  Application state is what redux provides a solution for with createStore().

1. Describe `redux-thunk`, what does it allow us to do? How does it change our `action-creators`?

    Redux-thunk allowed async request to work, as well as allows us to request APIs in action creators.

1. What is your favorite state management system you've learned and this sprint? Please explain why!

Context. It's pretty straight forward and easy to understand & implement.