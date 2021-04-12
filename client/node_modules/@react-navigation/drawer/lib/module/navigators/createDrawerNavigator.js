function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import * as React from 'react';
import { createNavigatorFactory, useNavigationBuilder, DrawerRouter } from '@react-navigation/native';
import warnOnce from 'warn-once';
import DrawerView from '../views/DrawerView';

function DrawerNavigator({
  initialRouteName,
  openByDefault,
  backBehavior,
  children,
  screenOptions,
  // @ts-expect-error: lazy is deprecated
  lazy,
  // @ts-expect-error: drawerContentOptions is deprecated
  drawerContentOptions,
  ...rest
}) {
  let defaultScreenOptions = {};

  if (drawerContentOptions) {
    Object.assign(defaultScreenOptions, {
      drawerPosition: drawerContentOptions.drawerPosition,
      drawerType: drawerContentOptions.drawerType,
      swipeEdgeWidth: drawerContentOptions.edgeWidth,
      drawerHideStatusBarOnOpen: drawerContentOptions.hideStatusBar,
      keyboardDismissMode: drawerContentOptions.keyboardDismissMode,
      swipeMinDistance: drawerContentOptions.minSwipeDistance,
      overlayColor: drawerContentOptions.overlayColor,
      drawerStatusBarAnimation: drawerContentOptions.statusBarAnimation,
      gestureHandlerProps: drawerContentOptions.gestureHandlerProps
    });
    warnOnce(drawerContentOptions, `Drawer Navigator: 'drawerContentOptions' is deprecated. Migrate the options to 'screenOptions' instead.\n\nPlace the following in 'screenOptions' in your code to keep current behavior:\n\n${JSON.stringify(defaultScreenOptions, null, 2)}\n\nSee https://reactnavigation.org/docs/6.x/drawer-navigator#options for more details.`);
  }

  if (typeof lazy === 'boolean') {
    defaultScreenOptions.lazy = lazy;
    warnOnce(true, `Drawer Navigator: 'lazy' in props is deprecated. Move it to 'screenOptions' instead.`);
  }

  const {
    state,
    descriptors,
    navigation
  } = useNavigationBuilder(DrawerRouter, {
    initialRouteName,
    openByDefault,
    backBehavior,
    children,
    screenOptions,
    defaultScreenOptions
  });
  return /*#__PURE__*/React.createElement(DrawerView, _extends({}, rest, {
    state: state,
    descriptors: descriptors,
    navigation: navigation
  }));
}

export default createNavigatorFactory(DrawerNavigator);
//# sourceMappingURL=createDrawerNavigator.js.map