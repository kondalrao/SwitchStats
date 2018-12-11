import request from 'superagent';

export const SwitchDetails = {
  name: 'switchDetails',
  state: {
    bios_version: '',
    nxos_version: '',
    nxos_image: '',
    nxos_compile_time: '',
    payload: 'no payload!!',
    got_data: false
  },
  reducers: {
    update(prevState, data) {
      // console.log(data);
      var state = {...prevState};

      state.bios_version = data.version.bios_ver_str;
      state.nxos_version = data.version.kickstart_ver_str;
      state.nxos_image = data.version.kick_file_name;
      state.nxos_compile_time = data.version.kick_cmpl_time;
      state.payload = data;
      state.got_data = true;

      return state;
    }
  },
  effects: dispatch => ({
    async loadData(rootState) {
      request
        .get('/version')
        .then(res => {
          dispatch.switchDetails.update(res.body);
          // dispatch.switchDetails.setPayload(res.body);
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
