import request from 'superagent';

export const CpuInfo = {
    name: 'cpuInfo',
    state: 0, // initial state
    reducers: {
      // handle state changes with pure functions
      update: (state = 0, payload) => {
        console.log(payload.loadavg);
        return payload.loadavg
      }
    },
    effects: dispatch => ({
      async loadData(rootState) {
        request
          .get('/cpuInfo')
          .then(res => {
            console.log(res);
            dispatch.cpuInfo.update(res.body);
          // dispatch.cpuInfo.setPayload(res.body);
          })
          .catch(err => {
          console.log(err);
          });
      },
      logState(payload, rootState) {
        console.log(rootState);
        console.log(payload);
      }
    })
  };
  