import * as React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
declare type Props = {
    visible: boolean;
    children: React.ReactNode;
    enabled: boolean;
    style?: StyleProp<ViewStyle>;
};
export default function ScreenFallback({ visible, children, ...rest }: Props): JSX.Element;
export {};
