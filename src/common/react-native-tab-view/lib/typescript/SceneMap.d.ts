import * as React from 'react';
import type {SceneRendererProps} from './types';
declare type SceneProps = {
  route: any;
} & Omit<SceneRendererProps, 'layout'>;
export default function SceneMap<T extends any>(scenes: {
  [key: string]: React.ComponentType<T>;
}): ({route, jumpTo, position}: SceneProps) => JSX.Element;
export {};
