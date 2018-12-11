import { init } from '@rematch/core';
import { withDefaultReducers } from 'rematch-default-reducers';
import createLoadingPlugin from '@rematch/loading';

import { default as models } from './models';

const loadingPlugin = createLoadingPlugin();

const store = init({
  models: withDefaultReducers(models),
  plugins: [loadingPlugin]
});

export default store;
