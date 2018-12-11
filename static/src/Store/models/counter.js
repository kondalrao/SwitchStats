export const Counter = {
  name: 'counter',
  state: 0, // initial state
  reducers: {
    // handle state changes with pure functions
    cUpdate: (state = 0, payload) => state + payload
  }
};
