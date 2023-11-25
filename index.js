/**
 * @format
 */

import {AppRegistry} from 'react-native';
import 'react-native-reanimated';
import Apps from './src/container/App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => Apps);
