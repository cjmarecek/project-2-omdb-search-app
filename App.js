import React from 'react';
import { createAppContainer } from 'react-navigation';
import RootStack from './navigation/RootStack'

const AppContainer = createAppContainer(RootStack);

export default () => <AppContainer />;
