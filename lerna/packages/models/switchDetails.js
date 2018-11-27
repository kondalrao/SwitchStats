import request from 'superagent'

export const switchDetails = {
    state: {
        version: ''
    },
    reducers: {
        update(state, data) {
            state.version = data;
            return state;
        }
    },
    effects:  dispatch => ({
        async loadData(rootState) {
            // try {
            //     const response = await fetch('/version')
            //     const data = await response.json()
            //     this.update(data)
            //     // this.logState(data)
            // }
            // catch(e) {
            //     console.log('there was an error');
            //     console.log(e); 
            // }

            request
                .get('/version')
                .then(res => {
                    // console.log(res.body["kick_file_name"]);
                    // console.log(res.text);
                    this.update(res.body);
                })
                .catch(err => {
                    console.log(err)
                });
        },
        logState(payload, rootState) {
            console.log(rootState)
            console.log(payload)
        }
    })
};