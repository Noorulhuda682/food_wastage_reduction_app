import { DefaultNavigatorOptions, DrawerNavigationState, DrawerRouterOptions, ParamListBase } from '@react-navigation/native';
import type { DrawerNavigationOptions, DrawerNavigationConfig, DrawerNavigationEventMap } from '../types';
declare type Props = DefaultNavigatorOptions<DrawerNavigationOptions> & DrawerRouterOptions & DrawerNavigationConfig;
declare function DrawerNavigator({ initialRouteName, openByDefault, backBehavior, children, screenOptions, lazy, drawerContentOptions, ...rest }: Props): JSX.Element;
declare const _default: <ParamList extends ParamListBase>() => import("@react-navigation/native").TypedNavigator<ParamList, DrawerNavigationState<ParamListBase>, DrawerNavigationOptions, DrawerNavigationEventMap, typeof DrawerNavigator>;
export default _default;
