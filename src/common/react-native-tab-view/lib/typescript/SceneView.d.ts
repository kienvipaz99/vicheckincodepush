import * as React from 'react';
import {StyleProp, ViewStyle} from 'react-native';
import type {SceneRendererProps, EventEmitterProps, NavigationState, Route} from './types';
declare type Props<T extends Route> = SceneRendererProps &
  EventEmitterProps & {
    navigationState: NavigationState<T>;
    lazy: boolean;
    lazyPreloadDistance: number;
    index: number;
    children: (props: {loading: boolean}) => React.ReactNode;
    style?: StyleProp<ViewStyle>;
  };
export default function SceneView<T extends Route>({
  children,
  navigationState,
  lazy,
  layout,
  index,
  lazyPreloadDistance,
  addEnterListener,
  style,
}: Props<T>): JSX.Element;
export {};
