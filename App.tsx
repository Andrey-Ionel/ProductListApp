import React, { FC } from 'react';

import { Navigation } from './src/components/Navigation';
import { Provider } from 'react-redux';
import store from './src/store';

const App: FC = () => {
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
};

export default App;
