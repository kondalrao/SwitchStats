
const delay = (time) => new Promise(resolve => setTimeout(() => resolve(), time));

// count model
export const count = {
    state: 0,
    reducers: {
        addBy: (state, payload) => state + payload,
    },
    effects: {
        async addByAsync(payload, state) {
            await delay(1000)
            dispatch.count.addBy(1)
        },
        logState(payload, rootState) {
            console.log(rootState)
            console.log(payload)
        }
    }
  };
  