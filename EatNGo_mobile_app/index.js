global.Symbol = require('core-js/es6/symbol');
require('core-js/fn/symbol/iterator');
require('core-js/fn/map');
require('core-js/fn/set');
require('core-js/fn/array/find');
import { AppRegistry } from 'react-native';
import App from './App/App';
import { name as appName } from './app.json';
import bgMessaging from './utils/bgMessaging'

AppRegistry.registerComponent(appName, () => App);

AppRegistry.registerHeadlessTask('RNFirebaseBackgroundMessage', () => bgMessaging);
