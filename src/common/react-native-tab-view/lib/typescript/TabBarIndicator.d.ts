/// <reference types="react" />
import {StyleProp, ViewStyle} from 'react-native';
import type {Route, SceneRendererProps, NavigationState} from './types';
export declare type GetTabWidth = (index: number) => number;
export declare type Props<T extends Route> = SceneRendererProps & {
  navigationState: NavigationState<T>;
  width: string | number;
  style?: StyleProp<ViewStyle>;
  getTabWidth: GetTabWidth;
  gap?: number;
};
export default function TabBarIndicator<T extends Route>({
  getTabWidth,
  layout,
  navigationState,
  position,
  width,
  gap,
  style,
}: Props<T>): JSX.Element;
